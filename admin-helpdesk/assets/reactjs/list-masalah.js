var scripts =  document.getElementById('scripts-list-data').getAttribute("src");

// myScript now contains our script object
var queryString = scripts.replace(/^[^\?]+\??/,'');

// console.log(queryString);
var res = queryString.split("=");
var res_param = queryString.split("&");
var dataurl = res[1].split("=")[0].split("&")[0];
var status_user = res_param[1].split("=")[1];
var nipdata = res_param[2].split("=")[1];

moment.locale('id');

class ListMasalah extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingall: false,
            loadingUpdate: false,
            updateStatus: false,
            loadingPesan: false,
            loadingProsesPesan: false,
            statusSendPesan: false,
            emptyPesan: false,
            id_helpdesk: 0,
            pesan:'',
            board: '',
            card: '',
            listDataAll: [],
            listDataByNip: [],
            listPesan: [],
            totalItem: 0,
            limit: 50,
            currentPage: 1,
            pager: []
        };

    }

    componentDidMount() {
        this.setState({
            loading: true,
            loadingall: true,
        })
        this.loadDataAll();
        this.loadDataByNip();
    }
    
    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        // console.log(prevState);
        if(prevState.loadingUpdate !== this.state.loadingUpdate){

        }
    }

    loadDataAll = (number = this.state.currentPage) => {
        this.setState({
            listDataAll: []
        })
        axios.get(dataurl+'/dashboard-admin/laporan-masalah/listdata?limit='
                +this.state.limit+'&offset='+number
                +'&status_u=admin&order_by_date=asc&not_in_nip=1&nip='+nipdata)
            .then(response => {
                this.setState({
                    loadingall: false,
                    listDataAll: JSON.parse(JSON.stringify(response.data.result)),
                    totalItem: JSON.parse(JSON.stringify(response.data.total))
                });
            })
    }

    loadDataByNip = (number = this.state.currentPage) => {
        this.setState({
            listDataByNip: []
        })
        axios.get(dataurl+'/dashboard-admin/laporan-masalah/listdata?limit='
                +this.state.limit+'&offset='+number
                +'&status_u=admin&order_by_date=asc&not_in_nip=0&nip='+nipdata)
            .then(response => {
                this.setState({
                    loading: false,
                    listDataByNip: JSON.parse(JSON.stringify(response.data.result)),
                    totalItem: JSON.parse(JSON.stringify(response.data.total))
                });
            })
    }

    updateStatusPengerjaan = (id_h, id_s_p, board_id) => {
        var csrfName = $('#hidden-csrf').attr('name');
        var csrfHash = $('#hidden-csrf').val();

        this.setState({
            loadingUpdate: true,
        })

        var data = {
            id_helpdesk: id_h, 
            id_status_pengerjaan: id_s_p, 
            nip_executor: nipdata,
            [csrfName]: csrfHash
        }

        axios.post(dataurl+'/dashboard-admin/laporan-masalah/update_status_masalah__', data)
            .then(response => {
                // console.log(response);
                $('#hidden-csrf').val(JSON.parse(JSON.stringify(response.data.token)));

                $("#"+this.state.board+" "+"#"+this.state.card).remove();

                this.loadDataByNip();

                this.setState({
                    loadingUpdate: false,
                    board: '',
                    card: '',
                    updateStatus: false
                })
            })
    }

    prosessUpdate = (e) => {
        var csrfName = $('#hidden-csrf').attr('name');
        var csrfHash = $('#hidden-csrf').val();

        var data = {
            id_helpdesk: this.state.id_helpdesk, 
            id_status_pengerjaan: e.target.value ,
            [csrfName]: csrfHash
        }

        axios.post(dataurl+'/dashboard-admin/laporan-masalah/update_status_masalah__', data)
            .then(response => {
                // console.log(response);
                $('#hidden-csrf').val(JSON.parse(JSON.stringify(response.data.token)));

                this.loadDataByNip();

                this.setState({
                    id_helpdesk: 0,
                    updateStatus: false
                })
            })
    }

    changeStatus = (updateStatus, id) => {
        updateStatus ?
                this.setState({
                    updateStatus: false,
                    id_helpdesk: id
                })
            : 
                this.setState({
                    updateStatus: true,
                    id_helpdesk: id
                })

    }

    loadUpdateData = (card_id, board_id) => {
        // console.log(board_id)
        this.setState({
            board: board_id,
            card: card_id,
        })
        if(board_id == "board-1"){
            this.updateStatusPengerjaan(card_id, 1, board_id);
        } else {
            this.updateStatusPengerjaan(card_id, 2, board_id);
        }
    } 

    loadMessage = (id_helpdesk = this.state.id_helpdesk) => {
        axios.get(dataurl+'/dashboard-admin/pesan?id_helpdesk='+id_helpdesk)
            .then(response => {
                // console.log(response);
                this.setState({
                    loadingPesan: false,
                    listPesan: JSON.parse(JSON.stringify(response.data.result)),
                });
            })
    }

    sendMessage = () => {
        if(this.state.pesan == '') {
            this.setState({
                emptyPesan: true,
            })
            setTimeout(() => {
                this.setState({
                    emptyPesan: false,
                })
            }, 3000);
        } else {
            var csrfName = $('#hidden-csrf').attr('name');
            var csrfHash = $('#hidden-csrf').val();

            this.setState({
                loadingProsesPesan: true
            })
    
            var data = {
                id_helpdesk: this.state.id_helpdesk, 
                nip_pengirim: nipdata,
                message: this.state.pesan,
                [csrfName]: csrfHash
            }
    
            axios.post(dataurl+'/dashboard-admin/pesan/add', data)
                .then(response => {
                    // console.log(response);
                    $('#hidden-csrf').val(JSON.parse(JSON.stringify(response.data.token)));
                    if(response.data.status_code == 200){
                        this.setState({
                            pesan: '',
                            statusSendPesan: true,
                            loadingProsesPesan: false
                        })
                        this.loadMessage();
                        setTimeout(() => {
                            this.setState({
                                statusSendPesan: false,
                            })
                        }, 3000);
                    }
                })
        }
    }

    handleChangePesan = (e) => {
        this.setState({
            pesan: e.target.value
        })
    }

    openMessage = (id_h = this.state.id_helpdesk) => {
        this.setState({
            id_helpdesk: id_h,
            loadingPesan: true
        })
        this.loadMessage(id_h);
    }

    closeMessage = () => {
        this.setState({
            id_helpdesk: 0,
            listPesan: []
        })
    }
    
    render() {
        return (
            <div style={{ background: '#fff' }}>
                <button style={{ float: 'right', marginRight: '20px' }} className="btn" onClick={() => this.loadDataByNip(this.state.currentPage)}>
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                </button>
                <div className="board-list">
                    <div className="wrap-board">
                        <h4 className="m-b-0 m-t-10">Semua Kerjaan</h4>
                        <small className="m-b-15" style={{ display: 'block' }}>
                            Drag & Drop untuk menambahkan list kerjaan anda
                        </small>
                        <Board loadUpdateData={this.loadUpdateData} id="board-1">
                            {
                                this.loadingall ?
                                    <i style={{ textAlign: 'center', display: 'block', margin: '0px auto' }} className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                                :   
                                    this.state.listDataAll.length == 0 ?
                                        <h6>Belum ada kerjaan</h6>
                                    :
                                        this.state.listDataAll.map((value, i) => 
                                            <Card key={i} id={value.id_helpdesk} className="card" draggable="true">
                                                <h6>{value.nama_helpdesk}</h6>
                                                <span style={{ color: '#bbb'}}>Deskripsi</span>
                                                <p className="m-b-0">
                                                    {value.des_helpdesk}
                                                </p>
                                                <div className="card-footer p-0">
                                                    <hr/>
                                                    <div className="stats">
                                                        <span className="italic" style={{ fontSize: '11px' }}>
                                                            <i className="fa fa fa-calendar" aria-hidden="true"></i>
                                                            {
                                                                moment(value.tanggal_laporan).format('D MMMM YYYY')
                                                            }
                                                            <i className="fa fa-clock-o m-lr10" aria-hidden="true"></i>
                                                            {
                                                                moment(value.tanggal_laporan).format('HH:mm:ss')
                                                            }
                                                        </span>
                                                        <br/>
                                                        From: <b>{  value.nama } - { value.nama_devisi } ({value.jabatan})</b>
                                                    </div>
                                                </div>
                                            </Card>
                                        )
                            }
                        </Board>
                    </div>
                    {/* <div className="wrap-board"> */}
                        {/* <h3 className="m-b-15 m-t-10">Kerjaan Anda</h3> */}
                        <Board loadUpdateData={this.loadUpdateData} id="board-2" className="wrap-board">
                            <h3 className="m-b-15 m-t-10">Kerjaan Anda</h3>
                            <div className="appendData">
                                Taro disini..
                            </div>
                            {
                                this.loading ?
                                    <i style={{ textAlign: 'center', display: 'block', margin: '0px auto' }} className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                                : 
                                    this.state.listDataByNip.length == 0 ?
                                        <h6>Belum ada kerjaan</h6>
                                    :
                                    this.state.listDataByNip.map((value, i) => 
                                        <Card key={i} id={value.id_helpdesk} className="card">
                                            <h6>{value.nama_helpdesk}</h6>
                                            <span style={{ color: '#bbb'}}>Deskripsi</span>
                                            <p className="m-b-0">
                                                {value.des_helpdesk}
                                            </p>
                                            <div className="card-footer p-0">
                                                <hr/>
                                                <div className="stats" style={{ position: 'relative'}}>
                                                    <span className="italic" style={{ fontSize: '11px' }}>
                                                        <i className="fa fa fa-calendar" aria-hidden="true"></i>
                                                        {
                                                            moment(value.tanggal_laporan).format('D MMMM YYYY')
                                                        }
                                                        <i className="fa fa-clock-o m-lr10" aria-hidden="true"></i>
                                                        {
                                                            moment(value.tanggal_laporan).format('HH:mm:ss')
                                                        }
                                                    </span>
                                                    <br/>
                                                    From: <b>{  value.nama } - { value.nama_devisi } ({value.jabatan})</b>
                                                    <br/>
                                                    {
                                                        this.state.updateStatus && value.id_helpdesk == this.state.id_helpdesk ?
                                                            <select className="form-control" defaultValue={value.id_status_pengerjaan} onChange={this.prosessUpdate}
                                                                style={{ width: '200px' }}
                                                            >
                                                                <option value="2">On Progress</option>
                                                                <option value="3">Pending</option>
                                                            </select>
                                                        : 
                                                            value.id_status_pengerjaan == '2' ?
                                                                <small>
                                                                    Status:
                                                                    <b className="text-warning m-l-5">{ value.status_pengerjaan }</b>
                                                                </small>
                                                            :
                                                                value.id_status_pengerjaan == '3' ?
                                                                <small>
                                                                    Status:
                                                                    <b className="text-danger m-l-5">{ value.status_pengerjaan }</b>

                                                                    <i onClick={() => this.openMessage(value.id_helpdesk)} style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#pesan" className="fa fa-comment-o m-l-20" aria-hidden="true"></i>
                                                                </small>
                                                            : 
                                                                value.id_status_pengerjaan == '4' ?
                                                                <small>
                                                                    Status:
                                                                    <b className="text-success m-l-5">{ value.status_pengerjaan }</b>
                                                                </small>
                                                            : null
                                                    }
                                                    <button onClick={() => this.changeStatus(this.state.updateStatus, value.id_helpdesk) } 
                                                        className={this.state.updateStatus && value.id_helpdesk == this.state.id_helpdesk ? "btn btn-danger" :"btn btn-primary"} style={{ padding: '4px 5px 4px 10px', position: 'absolute', bottom: '0px', right: '1px' }}>
                                                        { 
                                                            this.state.updateStatus && value.id_helpdesk == this.state.id_helpdesk ? 
                                                                <i style={{ color: '#fff' }} className="fa fa-times" aria-hidden="true"></i>
                                                            : 
                                                                <i style={{ color: '#fff' }} className="fa fa-pencil" aria-hidden="true"></i>
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        </Card>
                                )
                            }
                        </Board>
                    {/* </div> */}

                </div>
                {/* <!-- ============================ MODAL PESAN ======================== --> */}
                <div className="modal fade" id="pesan" tabIndex="-1" role="dialog" aria-labelledby="PesanLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="PesanLabel">Tulis Pesan</h5>
                                <button type="button" className="close" data-dismiss="modal" onClick={() => this.closeMessage()} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {
                                    this.state.statusSendPesan ?
                                        <div className="alert alert-success" role="alert">
                                            Pesan berhasil terkirim
                                        </div>
                                    : null
                                }
                                <div className="form-group">
                                    <textarea defaultValue={this.state.pesan} value={this.state.pesan} onChange={this.handleChangePesan} className="form-control"></textarea>
                                    {
                                        this.state.emptyPesan ?
                                            <div className="alert alert-danger" role="alert">
                                                Pesan tidak boleh kosong!
                                            </div>
                                        : null
                                    }
                                </div>
                                <button type="button" onClick={() => this.sendMessage()} className="btn btn-primary">
                                    Kirim {
                                        this.state.loadingProsesPesan ?
                                            <i style={{ fontSize: '10px' }} className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                                        : null
                                    }
                                </button>
                                <br/>
                                <h6 style={{ marginTop: '5px'}}>List Pesan:</h6>
                                <button style={{ margin: '0px' }} className="btn" onClick={() => this.openMessage()}>
                                    <i className="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                                <ul className="list-pesan">
                                    {
                                        this.state.loadingPesan ? 
                                            <i style={{ textAlign: 'center', display: 'block', margin: '0px auto' }} className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                                        : 
                                            this.state.listPesan.length == 0 ?
                                                <li>
                                                    Belum ada pesan!
                                                </li>
                                            :
                                                this.state.listPesan.map((value,i) =>
                                                    <li key={i} style={ value.nip_pengirim == nipdata ? { float: 'right' } : { float: 'left'}}>
                                                        <p>{value.message}</p>
                                                        <small>
                                                            <i>
                                                                <i style={{ marginRight: '5px' }} className="fa fa fa-calendar" aria-hidden="true"></i>
                                                                {
                                                                    moment(value.message_created_at).format('D MMMM YYYY')
                                                                }
                                                                <i style={{ margin: '0px 5px 0px 10px' }} className="fa fa-clock-o" aria-hidden="true"></i>
                                                                {
                                                                    moment(value.message_created_at).format('HH:mm:ss')
                                                                }
                                                            </i>
                                                        </small>
                                                    </li>
                                                )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

function Board(props) {
    const drop = e => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');

        const card = document.getElementById(card_id);
        card.style.display = 'block';

        var id_append = e.target.getAttribute('id');
        var class_append = e.target.getAttribute('class');

        // console.log(class_append);
        if(class_append == "appendData"){
            // e.target.appendChild(card);
            document.getElementById('board-2').appendChild(card);

            props.loadUpdateData(card_id, "board-2");
        }
        $('.appendData').css({ display: 'none'});
        // e.stopPropagation();

    }

    const dragOver = e => {
        e.preventDefault();
        // $('.appendData').css({ display: 'none'});
    }

    return(
        <div
            id={props.id}
            className={props.className}
            onDrop={drop}
            onDragOver={dragOver}
        >
            { props.children }
        </div>
    )
}

function Card(props){

    const dragStart = e => {
        const target = e.target;

        e.dataTransfer.setData('card_id', target.id);

        // console.log(e)
        $('.appendData').css({ display: 'flex'});

        // setTimeout(() => {
        //     target.style.display = 'none';
        // }, 0);

    } 

    const dragOver = e => {
        $('.appendData').css({ display: 'none'});
        e.stopPropagation();
    }

    return( 
        <div
            id={props.id}
            className={props.className}
            draggable={props.draggable}
            onDragStart={dragStart}
            onDragStop={dragOver}
        >
            {props.children}
        </div>
    )
}

ReactDOM.render(<ListMasalah />, document.getElementById('list-masalah'));