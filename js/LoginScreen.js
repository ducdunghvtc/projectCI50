import {BaseComponent} from './BaseComponent.js'
import {validateEmail} from './utils.js'
import {MD5} from './utils.js'

const style = /* html */ `
<style>
    * {
        font-family: 'Titillium Web', sans-serif;
        text-align: center;  
    }
    h1 {
        color: yellow;
        font-size: 40px;
    }
    img {
        margin-bottom: 50px;
        max-width:200px;
    }
    a:hover {
        color: #007acc;
    }

    .login-screen {
        border: 0;
        background: url(./images/bg.png) no-repeat center;
        background-size: cover;
        width: 100%;
	    min-height:100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: auto;

    }

    .btn-login {
        color: #ffffff;
        font-family: Titillium Web, sans-serif;
        font-size: 20px;
        background: #0bffe8;
        color: white;
        border: none;
        border-radius: 20px;
        outline: none;
        width:100px;
        border: 0;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .btn-login:hover {
        background-color: #607a94;
        cursor: pointer;
        
    }

</style>
`;

class LoginScreen extends BaseComponent {
    constructor() {
        super();

        this.state = {
            errors: {
                email: '',
                password: ''
            },

            data: {
                email: '',
                password: ''
            }
        }
    }
    render() {
        this._shadowRoot.innerHTML = /* html */ `
        ${style}
       
        <section class='login-screen'>
        <h1>Flappy Bird Login</h1>
        <img src="./images/bird.png">
            <form class='form-login'>
                <i class="fas fa-envelope"></i>
                <input-wrapper class='email' label='Email' type='email' required error='${this.state.errors.email}' value='${this.state.data.email}'></input-wrapper>
                <input-wrapper class='password' label='Password' type='password' error='${this.state.errors.password}' value='${this.state.data.password}'></input-wrapper>
                <button class='btn-login'>Log in</button>
                <br>
                <a href="#!/register">Not have an account? Register</a>
            </form>
        </section>
        `;

        this.$formLogin = this._shadowRoot.querySelector('.form-login');
        this.$formLogin.onsubmit = async (event) => {
            event.preventDefault();
            // Lấy dữ liệu từ các input-wrapper
            let email = this._shadowRoot.querySelector('.email').value;
            let password = this._shadowRoot.querySelector('.password').value;
            localStorage.clear();
            // Kiểm tra dữ liệu nhập vào, nếu có lỗi thì show ra
            let isPassed = true;

            if (email == '' || !validateEmail(email)) {
                isPassed = false;
                this.state.errors.email = 'Input your email!';
            } else {
                this.state.errors.email = '';
                this.state.data.email = email;
            }

            if (password == '') {
                isPassed = false;
                this.state.errors.password = 'Input your password!';
            } else {
                this.state.errors.password = '';
                this.state.data.password = password;
            }

            // Lưu dữ liệu vào firebase
            if (isPassed) {
                let response = await firebase.firestore()
                    .collection('users')
                    .where('email', '==', email)
                    .where('password', '==', MD5(password))
                    .get();

                if (response.empty) {
                    alert('Your email or password is not correct!')
                } else {
                    let currentPlayer = response.docs[0].data();
                    localStorage.setItem('Current-Player',JSON.stringify(currentPlayer));
                            router.navigate("#!/play");

                }
            }

            this.setState(this.state);
        }
    }
}

window.customElements.define('login-screen', LoginScreen)