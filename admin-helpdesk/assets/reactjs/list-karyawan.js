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

class ListStaf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            listData: [],
            changeStatusUser: false,
            nip: '',
            totalItem: 0,
            limit: 15,
            currentPage: 1,
            pager: []
        };

    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this.loadDataKaryawan();
        setTimeout(() => {
            this.setPager(this.state.currentPage);
        }, 2000)
    }

    loadDataKaryawan = (number = this.state.currentPage) => {
        axios.get(dataurl+'/dashboard-admin/karyawan/listdata?limit='+this.state.limit+'&offset='+number)
            .then(response => {
                this.setState({
                    loading: false,
                    listData: JSON.parse(JSON.stringify(response.data.result)),
                    totalItem: JSON.parse(JSON.stringify(response.data.total))
                });
            })
    }

    changeStatusActiveUser = (status,nip) => {

        var csrfName = $('#hidden-csrf').attr('name');
        var csrfHash = $('#hidden-csrf').val();

        var status;
        if(status == "2")
            status = "1";
        else 
            status = "2";    
        var data = {
            nip: nip, 
            status_a: status, 
            [csrfName]: csrfHash
        }
        axios.post(dataurl+'/dashboard-admin/karyawan/update_status__', data)
            .then(response => {
                $('#hidden-csrf').val(JSON.parse(JSON.stringify(response.data.token)));
                this.loadDataKaryawan();

                // console.log(JSON.parse(JSON.stringify(response.data)));
            })
        // console.log(status);   
    }

    changeStatusUser = (state, nip, status_u) => {
        state ?
            this.setState({
                changeStatusUser: false,
                nip: nip,
                // status_u: status_u
            })
            : 
            this.setState({
                changeStatusUser: true,
                nip: nip,
                // status_u: ''
            })
    }

    prosesUpdateStatus = e => {
        // console.log(e.target.value);
        var csrfName = $('#hidden-csrf').attr('name');
        var csrfHash = $('#hidden-csrf').val();

        var data = {
            nip: this.state.nip, 
            status_u: e.target.value, 
            [csrfName]: csrfHash
        }

        axios.post(dataurl+'/dashboard-admin/karyawan/update_status__', data)
        .then(response => {
            $('#hidden-csrf').val(JSON.parse(JSON.stringify(response.data.token)));
            
            this.setState({
                changeStatusUser: false,
                nip: '',
                // status_u: ''
            })

            this.loadDataKaryawan();

            // console.log(JSON.parse(JSON.stringify(response.data)));
        })
    }

    changePage = (number) => {
        this.setState({
            loading: true,
            currentPage: number
        })
        this.setPager(number)
        this.loadDataKaryawan(number);
    }

    /* === Pagination === */
    setPager = (currentPage) => {
        console.log(this.state.totalItem);
        var startPage, endPage

        var limitPageNumber = 4;
        var totalPager = Math.ceil(this.state.totalItem / this.state.limit);

        // if (currentPage <= limitPageNumber - 1 && totalPager >= limitPageNumber) {
        if (currentPage <= limitPageNumber - 1 && currentPage <= totalPager) {
            startPage = 1;
            if(currentPage < limitPageNumber && totalPager < limitPageNumber) {
                endPage = totalPager;
            } else {
                endPage = limitPageNumber;
            }
        } else {
            if(currentPage <= 2) {
                startPage = currentPage + 2;
                endPage = totalPager;
            } else if (currentPage + 2 >= totalPager) {
                startPage = totalPager - 3;
                endPage = totalPager;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        this.setState({
            pager: [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i)
        });

        // console.log(Math.ceil(totalPager / limitPageNumber));
        // console.log(totalPager);
        // console.log(this.state.pager);
    }
    
    render() {
        const { totalItem, limit, currentPage} = this.state;
        var totalPager = Math.ceil(totalItem / limit);

        const renderPageNumbers = (
            this.state.pager.length <= 1 ?
                null
            : 
                <ul className="pagination" style={{ cursor: 'pointer' }}>
                    <li className={currentPage === 1 ? 'disabled page-item' : 'page-item'}>
                        <a className="page-link" onClick={() => this.changePage(1)}>First</a>
                    </li>
                    <li className={currentPage === 1 ? 'disabled page-item' : 'page-item'}>
                        <a className="page-link" onClick={() => this.changePage(currentPage - 1)}>Prev</a>
                    </li>
                    {this.state.pager.map((page, index) =>
                        <li key={index} className={currentPage === page ? 'active page-item' : 'page-item'}>
                            <a className="page-link" onClick={() => this.changePage(page)}>{page}</a>
                        </li>
                    )}
                    <li className={currentPage === totalPager ? 'disabled page-item' : 'page-item'}>
                        <a className="page-link" onClick={() => this.changePage(currentPage + 1)}>Next</a>
                    </li>
                    <li className={currentPage === totalPager ? 'disabled page-item' : 'page-item'}>
                        <a className="page-link" onClick={() => this.changePage(totalPager)}>Last</a>
                    </li>
                </ul>
        );

        return (
            <div className="table-responsive">
                {
                    this.state.loading ?
		                <i style={{ textAlign: 'center', display: 'block', margin: '0px auto' }} className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                    :
                        <table className="table table-striped table-bordered">
                            <thead className=" text-primary" style={{ fontSize: '17px', fontWeight: 'bold' }}>
                                <tr>
                                    <td>
                                        No
                                    </td>
                                    <td>
                                        NIP
                                    </td>
                                    <td>
                                        Nama
                                    </td>
                                    <td>
                                        Jenis Kelamin
                                    </td>
                                    <td>
                                        No Hp
                                    </td>
                                    <td>
                                        Email
                                    </td>
                                    <td>
                                        Devisi
                                    </td>
                                    <td>
                                        Jabatan
                                    </td>
                                    <td>
                                        Status User
                                    </td>
                                    <td>
                                        Status Aktif
                                    </td>
                                    <td>
                                        Status (Online or Offline)
                                    </td>
                                    {/* Jika Super Admin */}
                                    {
                                        status_user == 3 ?
                                            <td>
                                                Action
                                            </td>
                                        : null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.listData.map((value,i) => 
                                        <tr key={i}>
                                            <td>
                                                {i+1}
                                            </td>
                                            <td style={{ position: 'relative' }}>
                                                {
                                                    value.nip == nipdata ?
                                                        <span style={{ fontSize: '10px', background: 'green', borderRadius: '50px', color: '#fff', padding: '5px', position: 'absolute', left: '-20px', top: '0px' }}>
                                                            You
                                                        </span>
                                                    : null
                                                }
                                                {value.nip}
                                            </td>
                                            <td>
                                                {value.nama}
                                            </td>
                                            <td>
                                                {
                                                    value.jk == 1 ?
                                                        <span>
                                                            Laki-Laki
                                                        </span>
                                                    :
                                                    <span>
                                                        Perempuan
                                                    </span>
                                                }       
                                            </td>
                                            <td>
                                                {value.no_hp}
                                            </td>
                                            <td>
                                                {value.email}
                                            </td>
                                            <td>
                                                {value.nama_devisi}
                                            </td>
                                            <td>
                                                {value.jabatan}
                                            </td>
                                            <td style={{ position: 'relative' }}>
                                                {
                                                    this.state.changeStatusUser && this.state.nip == value.nip ?
                                                        <select className="form-control" defaultValue={value.status_u} onChange={this.prosesUpdateStatus}>
                                                            <option value="1">Admin</option>
                                                            <option value="2">User</option>
                                                            <option value="3">Super Admin</option>
                                                        </select>
                                                    : 
                                                        value.status_u == 1 ?
                                                            <span>
                                                                Admin
                                                            </span>
                                                        :
                                                            value.status_u == 2 ?
                                                            <span>
                                                                User
                                                            </span>
                                                        :
                                                            value.status_u == 3 ?
                                                            <span>
                                                                Super Admin
                                                            </span>
                                                        : null
                                                }       
                                                {
                                                    value.nip != nipdata && status_user != "2" && status_user != "1" ?
                                                        <button onClick={() => this.changeStatusUser(this.state.changeStatusUser, value.nip, value.status_u) } 
                                                        className={this.state.changeStatusUser && value.nip == this.state.nip ? "btn btn-danger" :"btn btn-primary"} style={{ padding: '2px 5px', position: 'absolute', top: '0px', right: '1px' }}>
                                                            { 
                                                                this.state.changeStatusUser && value.nip == this.state.nip ? 
                                                                    <i className="fa fa-times" aria-hidden="true"></i>
                                                                : 
                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                            }
                                                        </button>
                                                    : null
                                                }
                                            </td>
                                            <td>
                                                {
                                                    value.status_a == 1 ?
                                                        <span className="text-success">
                                                            Aktif
                                                        </span>
                                                    :
                                                    <span className="text-danger">
                                                        Tidak Aktif
                                                    </span>
                                                }      
                                            </td>
                                            <td>
                                                {
                                                    value.status_o == 1 ?
                                                        <span className="text-primary">
                                                            <b>Sedang Online</b>
                                                        </span>
                                                    :
                                                        <span className="text-danger">
                                                            <b>Sedang Offline</b>
                                                        </span>
                                                }
                                            </td>
                                            {
                                                status_user == 3 ?
                                                    <td>
                                                        {
                                                            value.password === null && value.status_a === "2" && value.nip != nipdata ?
                                                                null
                                                            : 
                                                                value.nip == nipdata ?
                                                                    null
                                                                : 
                                                                    <button className={value.status_a == "1" ? "btn btn-danger" : "btn btn-primary"} onClick={() => this.changeStatusActiveUser(value.status_a,value.nip)}>
                                                                        {
                                                                            value.status_a == "1" ?
                                                                                <b>Non Aktifkan User</b>
                                                                            :
                                                                                <b>Aktifkan User</b>
                                                                        }
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
                }
                {/* Pagination */}
                {renderPageNumbers}
            </div>
        )
    }
}

ReactDOM.render(<ListStaf />, document.getElementById('list-staf'));