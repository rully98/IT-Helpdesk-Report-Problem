var scripts =  document.getElementById('scripts-list-data').getAttribute("src");

// myScript now contains our script object
var queryString = scripts.replace(/^[^\?]+\??/,'');

// console.log(queryString);
var res = queryString.split("=");
var res_param = queryString.split("&");
var dataurl = res[1].split("=")[0].split("&")[0];

class TestLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nip: '',
            password: ''
        };
    }

    typing = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }

    login = () => {
        axios.post(dataurl+'/api/login', this.state)
            .then(response => {
                console.log(response)
            })
    }

    render() {
        return(
            <div>
                <input onChange={this.typing} name="nip" type="text" value={this.state.nip} />
                <input onChange={this.typing} name="password" type="password" value={this.state.password} />
                <button onClick={() => this.login()}>
                    Login
                </button>
            </div>
        )
    }

}

ReactDOM.render(<TestLogin />, document.getElementById('test-login'));