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

class ListHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            listData: [],
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

        this.loadDataHistory();
    }

    loadDataHistory = (number = this.state.currentPage) => {
        axios.get(dataurl+'/dashboard-admin/history-pekerjaan/listdata?nip='+nipdata+
            '&limit='+this.state.limit+'&offset='+number)
            .then(response => {
                this.setState({
                    loading: false,
                    listData: JSON.parse(JSON.stringify(response.data.result)),
                    totalItem: JSON.parse(JSON.stringify(response.data.total))
                });
            })
    }

    loadDataHistoryWithLoading() {
        this.setState({
            loading: true
        })
        this.loadDataHistory();
    }

    changePage = (number) => {
        this.setState({
            loading: true,
            currentPage: number
        })
        this.setPager(number)
        this.loadDataHistory(number);
    }

    /* === Pagination === */
    setPager = (currentPage) => {
        console.log(this.state.totalItem);
        var startPage, endPage

        var limitPageNumber = 4;
        var totalPager = Math.ceil(this.state.totalItem / this.state.limit);

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
                <button style={{ float: 'left', marginRight: '20px' }} className="btn" onClick={() => this.loadDataHistoryWithLoading()}>
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                </button>
                        <table className="table table-striped table-bordered">
                            <thead className=" text-primary" style={{ fontSize: '17px', fontWeight: 'bold' }}>
                                <tr>
                                    <td>
                                        No
                                    </td>
                                    <td>
                                        Pekerjaan
                                    </td>
                                    <td>
                                        Deskripsi 
                                    </td>
                                    <td>
                                        Pekerjaan Dari
                                    </td>
                                    <td>
                                        Tanggal Dibuat
                                    </td>
                                    <td>
                                        Tanggal Dikerjakan
                                    </td>
                                    <td>
                                        Tanggal Selesai
                                    </td>
                                    <td>
                                        Feedback
                                    </td>
                                </tr>
                            </thead>
                            {
                                this.state.loading ?
                                    <tbody>
                                        <tr>
                                            <td colSpan="7">
                                                <i style={{ textAlign: 'center', display: 'block', margin: '0px auto' }} className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                :
                                    <tbody>
                                        {
                                            this.state.listData.length == 0 ?
                                                <tr>
                                                    <td colSpan="8">
                                                        <h6 style={{ textAlign: 'center' }}>Data tidak ditemukan!</h6>
                                                    </td>
                                                </tr>
                                            :
                                            this.state.listData.map((value,i) => 
                                                <tr key={i}>
                                                    <td>
                                                        {i+1}
                                                    </td>
                                                    <td>
                                                        {value.nama_helpdesk}
                                                    </td>
                                                    <td>
                                                        {value.des_helpdesk}
                                                    </td>
                                                    <td>
                                                        {value.nama} - {value.nama_devisi} ({value.jabatan})
                                                    </td>
                                                    <td>
                                                        <i style={{ marginRight: '5px' }} className="fa fa fa-calendar" aria-hidden="true"></i>
                                                        {
                                                            moment(value.tanggal_laporan).format('D MMMM YYYY')
                                                        }
                                                        <i style={{ margin: '0px 5px 0px 10px' }} className="fa fa-clock-o" aria-hidden="true"></i>
                                                        {
                                                            moment(value.tanggal_laporan).format('HH:mm:ss')
                                                        }
                                                    </td>
                                                    <td>
                                                        <i style={{ marginRight: '5px' }} className="fa fa fa-calendar" aria-hidden="true"></i>
                                                        {
                                                            moment(value.tanggal_pengerjaan).format('D MMMM YYYY')
                                                        }
                                                        <i style={{ margin: '0px 5px 0px 10px' }} className="fa fa-clock-o" aria-hidden="true"></i>
                                                        {
                                                            moment(value.tanggal_pengerjaan).format('HH:mm:ss')
                                                        }
                                                    </td>
                                                    <td>
                                                        <i style={{ marginRight: '5px' }} className="fa fa fa-calendar" aria-hidden="true"></i>
                                                        {
                                                            moment(value.tanggal_selesai).format('D MMMM YYYY')
                                                        }
                                                        <i style={{ margin: '0px 5px 0px 10px' }} className="fa fa-clock-o" aria-hidden="true"></i>
                                                        {
                                                            moment(value.tanggal_selesai).format('HH:mm:ss')
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            value.feedback == 1 ?
                                                                <span style={{ color: 'green' }}>PUAS</span>
                                                            :
                                                                <span style={{ color: 'orange' }}>TIDAK PUAS</span>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                            }
                        </table>
                {/* Pagination */}
                {renderPageNumbers}
            </div>
        );
    }
}

ReactDOM.render(<ListHistory />, document.getElementById('list-history'));