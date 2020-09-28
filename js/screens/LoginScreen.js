import { BaseComponent } from "../BaseComponent.js";
import { validateEmail, md5, getDataFromDocs, getDataFromDoc, saveCurrentUser } from "../utils.js";

const style = /*html*/`
<style>
    * {
        font-family: 'Montserrat', sans-serif;
        color: #ccc;
    }

    .name-game {
        font-size: 30px;
        margin-bottom: 15px;
        
    }
    .login-screen {
        margin: 10% auto;
        width: 350px;
        padding: 0;
    }
    
    .form-login {
        width: 100%;
        background: #001427;
        padding: 20px 20px;
        border: none;
        border-radius: 10px;
        box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.9);
        text-align: center;
    }

    input-wrapper {
        text-align: left;
    }
    
    img {
        width: 50%;
    }

    button {
        height: 25px;
        margin-top: 15px;
        background: #4EFF0B;
        color: #001427;
        border: none;
        border-radius: 5px;
        outline: none;
        font-size: 15px;
    }

    button:hover {
        opacity: 0.6;
        cursor: pointer;
    }

    button:active {
        outline: none;
    }
    a {
        font-size: 14px;
    }
    a:hover {
        color: #007acc;
    }

</style>    
`;
class LoginScreen extends BaseComponent {
    constructor() {
        super();

        this.state = {
            errors: {
                email: '',
                password: '',
            },

            data: {
                email: '',
                password: '',
            }
        }
    }

    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        ${style}
        <section class="login-screen">
            <form class="form-login">
                <div class="name-game"><b>CARO ONLINE</b></div>
                <img src="https://lh3.googleusercontent.com/R2NTrDbjejFDmh-ejLbTZyIv5mY6bN3opl1rfVKibNc-AxlCD9h62lE5yrab0p3babg">
                <input-wrapper class="email" label="Email" type="email" error="${this.state.errors.email}" value="${this.state.data.email}"></input-wrapper>
                <input-wrapper class="password" label="Password" type="password" error="${this.state.errors.password}" value="${this.state.data.password}"></input-wrapper>
                <button class="btn-login">Login</button>
                <a href="#!/register">Not have an account? Register</a>
            </form>
        </section>
        `;

        this.$formLogin = this._shadowRoot.querySelector('.form-login');
        this.$formLogin.onsubmit = async (event) => {
            event.preventDefault();

            // lấy dữ liệu từ các input-wrapper
            let email = this._shadowRoot.querySelector('.email').value;
            let password = this._shadowRoot.querySelector('.password').value;

            // kiểm tra dữ liệu nhập vào, nếu có lỗi thì show ra
            let isPassed = true;

            if (email == '' || !validateEmail(email)) {
                isPassed = false;
                this.state.errors.email = "Invalid email";
            } else {
                this.state.errors.email = "";
                this.state.data.email = email;
            }

            if (password == '') {
                isPassed = false;
                this.state.errors.password = "Input your password";
            } else {
                this.state.errors.password = "";
                this.state.data.password = password;
            }

            // kiểm tra dữ liệu ng dùng
            if (isPassed) {
                let response = await firebase
                    .firestore()
                    .collection('users')
                    .where('email', '==', email)
                    .where('password', '==', md5(password))
                    .get();

                if(response.empty) {
                    alert('Email or password is not correct');
                } else {
                    // alert('Sign in successfully');
                    // console.log(response);
                    // console.log(getDataFromDoc(response.docs));
                    let currentUser = getDataFromDocs(response.docs)[0];
                    console.log(currentUser);
                    //lưu ng dùng hiện tại
                    saveCurrentUser(currentUser);
                    //chuyển sang trang index
                    router.navigate('/index');
                }
            }

            this.setState(this.state);
        }
    }
}

window.customElements.define('login-screen', LoginScreen);