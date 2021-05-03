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

class ListWaktu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            listData: [],
            errAddName: false,
            errAddDes: false,
            valAddName: '',
            valAddDes: '',
            loadingAdd: false,
            loadingUpdate: false, 
            statusAdd: false,
            statusUpdate: false,

            errUpdateName: false,
            errUpdateDes: false,
            valUpdateName: '',
            valUpdateDes: '',

            idUpdate: '',
            onUpdate: false
        };
    }

    componentDidMount() {
        this.setState({
            loading: true
        })

        this.loadDataWaktu();
    }

    loadDataWaktu = () => {
        axios.get(dataurl+'/dashboard-admin/list-waktu-pengerjaan/listdata')
            .then(response => {
                this.setState({
                    loading: false,
                    listData: JSON.parse(JSON.stringify(response.data.result))
                });
            })
    }

    loadDataWaktuWithLoading() {
        this.setState({
            loading: true
        })
        this.loadDataWaktu();
    }

    addValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addListWaktu = () => {
        var csrfName = $('#hidden-csrf').attr('name');
        var csrfHash = $('#hidden-csrf').val();

        if(this.state.valAddName === '') {
            this.setState({
                errAddName: true
            })
            setTimeout(() => {
                this.setState({
                    errAddName: false
                })
            }, 3000);
        }
        if(this.state.valAddDes === '') {
            this.setState({
                errAddDes: true
            })
            setTimeout(() => {
                this.setState({
                    errAddDes: false
                })
            }, 3000);
        }
        if(this.state.valAddDes !== '' && this.state.valAddName !== '') {
            this.setState({
                errAddDes: false,
                errAddName: false,
                loadingAdd: true
            })

            const data = {
                nama_pengerjaan: this.state.valAddName,
                deskripsi_waktu_pengerjaan: this.state.valAddDes,
                [csrfName]: csrfHash
            }

            axios.post(dataurl+'/dashboard-admin/list-waktu-pengerjaan/add', data)
                .then(response => {

                    $('#hidden-csrf').val(JSON.parse(JSON.stringify(response.data.token)));

                    this.setState({
                        loadingAdd: false
                    });

                    if(response.data.status_code == 200){
                        this.setState({
                            statusAdd: true,
                            valAddName: '',
                            valAddDes: '',
                        });
                        setTimeout(() => {
                            this.setState({
                                statusAdd: false
                            });
                        }, 5000);

                        this.loadDataWaktu();
                    }
                })
        }
    }

    updateValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    update = (id, nama, des) => {
        this.setState({
            onUpdate: true,
            idUpdate: id,
            valUpdateName: nama,
            valUpdateDes: des
        })
    }

    cancelUpdate = () => {
        this.setState({
            onUpdate: false,
            idUpdate: '',
            valUpdateName: '',
            valUpdateDes: ''
        })
    }


    updateListWaktu = () => {
        var csrfName = $('#hidden-csrf').attr('name');
        var csrfHash = $('#hidden-csrf').val();

        if(this.state.valUpdateName === '') {
            this.setState({
                errUpdateName: true
            })
            setTimeout(() => {
                this.setState({
                    errUpdateName: false
                })
            }, 3000);
        }
        if(this.state.valUpdateDes === '') {
            this.setState({
                errUpdateDes: true
            })
            setTimeout(() => {
                this.setState({
                    errUpdateDes: false
                })
            }, 3000);
        }
        if(this.state.valUpdateDes !== '' && this.state.valUpdateName !== '') {
            this.setState({
                errAddDes: false,
                errAddName: false,
                loadingUpdate: true
            })

            const data = {
                id_list_waktu: this.state.idUpdate,
                nama_pengerjaan: this.state.valUpdateName,
                deskripsi_waktu_pengerjaan: this.state.valUpdateDes,
                [csrfName]: csrfHash
            }

            axios.post(dataurl+'/dashboard-admin/list-waktu-pengerjaan/update', data)
                .then(response => {

                    $('#hidden-csrf').val(JSON.parse(JSON.stringify(response.data.token)));

                    this.setState({
                        loadingUpdate: false
                    });

                    if(response.data.status_code == 200){
                        this.setState({
                            statusUpdate: true,
                            onUpdate: false,
                            idUpdate: '',
                            valUpdateName: '',
                            valUpdateDes: ''
                        });
                        setTimeout(() => {
                            this.setState({
                                statusUpdate: false
                            });
                        }, 5000);

                        this.loadDataWaktu();
                    }
                })
        }
    }

    render() {

        return (
            <div>
                <div className="row">
                    {
                        status_user == '3' ?
                            <div className="col-md-4">
                                <h6>Tambah Waktu Pengerjaan</h6>
                                {
                                    this.state.statusAdd ?  
                                        <span style={{ color: 'green' }}>
                                            Berhasil tambah list waktu!
                                        </span>
                                    : null
                                }
                                <div className="form-group">
                                    <label>Nama Pengerjaan</label>
                                    <input name="valAddName" value={this.state.valAddName} onChange={this.addValue} type="text" className="form-control" />  
                                    {
                                        this.state.errAddName ?
                                            <span style={{ color: 'red' }}>Nama Tidak Boleh Kosong</span>
                                        : null
                                    }                          
                                </div>
                                <div className="form-group">
                                    <label>Deskripsi Waktu Pengerjaan</label>
                                    <textarea name="valAddDes" value={this.state.valAddDes} onChange={this.addValue} className="form-control" col="4"></textarea>     
                                    {
                                        this.state.errAddDes ?
                                            <span style={{ color: 'red' }}>Deskripsi Waktu Tidak Boleh Kosong</span>
                                        : null
                                    }                          
                                </div>
                                <button className="btn btn-primary" onClick={() => this.addListWaktu()}
                                    disabled=
                                    {
                                        this.state.loadingAdd ?
                                            true
                                        : 
                                            false
                                    }
                                >
                                    Simpan
                                    {
                                        this.state.loadingAdd ?
                                            <i style={{ fontSize: '13px' }} className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                                        : null
                                    }
                                </button>
                            </div>
                        : null
                    }
                </div>
                <button style={{ float: 'right', marginRight: '20px' }} className="btn" onClick={() => this.loadDataWaktuWithLoading()}>
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                </button>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <td><b>No</b></td>
                                <td><b>Nama Pengerjaan</b></td>
                                <td><b>Deksripsi Waktu</b></td>
                                {
                                    status_user == '3' ?
                                        <td><b>Action</b></td>
                                    : null
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.loading ?
                                    <tr>
                                        <td colSpan="5">
                                            <i style={{ textAlign: 'center', display: 'block', margin: '0px auto' }} className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                                        </td>
                                    </tr>
                                :
                                    this.state.listData.length == 0 ?
                                        <tr>
                                            <td colSpan="5">
                                                <h6>Data tidak ditemukan!</h6>
                                            </td>
                                        </tr>
                                    :
                                        this.state.listData.map((value, i) =>
                                            <tr key={i}>
                                                <td>
                                                    {i + 1}
                                                </td>
                                                <td>
                                                    {
                                                        this.state.onUpdate && this.state.idUpdate === value.id_list_waktu ?
                                                            <div className="form-group">
                                                                <input name="valUpdateName" type="text" defaultValue={this.state.valUpdateName} onChange={this.updateValue} className="form-control" />
                                                                {
                                                                    this.state.errUpdateName ?
                                                                        <span style={{ color: 'red' }}>Nama Tidak Boleh Kosong</span>
                                                                    : null
                                                                }
                                                            </div>
                                                        : 
                                                            value.nama_pengerjaan
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        this.state.onUpdate && this.state.idUpdate === value.id_list_waktu ?
                                                            <div className="form-group">
                                                                <textarea name="valUpdateDes" defaultValue={this.state.valUpdateDes} onChange={this.updateValue} className="form-control" ></textarea>
                                                                {
                                                                    this.state.errUpdateDes ?
                                                                        <span style={{ color: 'red' }}>Deskripsi Waktu Tidak Boleh Kosong</span>
                                                                    : null
                                                                }
                                                            </div>
                                                        : 
                                                            value.deskripsi_waktu_pengerjaan
                                                    }
                                                </td>
                                                {
                                                    status_user == '3' ?
                                                        <td>
                                                            {
                                                                this.state.onUpdate && this.state.idUpdate === value.id_list_waktu ?
                                                                    <div>
                                                                        <button className="btn btn-primary" onClick={() => this.updateListWaktu()}
                                                                            disabled={
                                                                                this.state.loadingUpdate ?
                                                                                    true
                                                                                : false
                                                                            }
                                                                        >
                                                                            Update  
                                                                                {
                                                                                    this.state.loadingUpdate ?
                                                                                        <i style={{ fontSize: '13px' }} className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                                                                                    : null
                                                                                }
                                                                        </button>
                                                                        <button style={{ marginLeft: '10px' }} onClick={() => this.cancelUpdate()} className="btn btn-danger">
                                                                            Batal
                                                                        </button>
                                                                    </div>
                                                                : 
                                                                    <button className="btn btn-primary" onClick={() => this.update(value.id_list_waktu, value.nama_pengerjaan, value.deskripsi_waktu_pengerjaan)}>
                                                                        <i style={{ color: '#fff' }} className="fa fa-pencil" aria-hidden="true"></i>
                                                                    </button>
                                                            }
                                                        </td>
                                                    : null
                                                }
                                            </tr>
                                        )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<ListWaktu />, document.getElementById('list-waktu'));