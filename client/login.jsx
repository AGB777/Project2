const helper = require('./helper.js');


//called when the user presses the button to login
//collects relevant data (ie username and password) and sends a request to the server
const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();
    
    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;
    
    if(!username || !pass){
        helper.handleError('Username and Password are required');
        return false;
    }
    
    helper.sendPost(e.target.action, {username, pass, _csrf});
    return false;
}


//called when the user presses the button to sign up
//collects relevant data (ie username and password) and sends a request to the server
const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();
    
    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;
    
    if(!username || !pass || !pass2){
        helper.handleError('All fields are required');
        return false;
    }
    
    if(pass !== pass2){
        helper.handleError('Passwords do not match!');
        return false;
    }
    
    helper.sendPost(e.target.action, {username, pass, pass2, _csrf});
    
    return false;
}


//react component for the login window
const LoginWindow = (props) => {
    return(
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
            >
            <label htmlFor="username">Username:</label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="password">Password:</label>
            <input id="pass" type="password" name="password" placeholder="password"/>
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign in"/>
        </form>
    );
}


//react component for the signup window
const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
            >
            <label htmlFor="username">Username:</label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="password">Password:</label>
            <input id="pass" type="password" name="password" placeholder="password"/>
            <label htmlFor="password2">Password:</label>
            <input id="pass2" type="password" name="password2" placeholder="retype password"/>
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign in"/>
        </form>
    );
}

const init = async () => {
    const response = await fetch('getToken');
    const data = await response.json();
    
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow csrf = { data.csrfToken }/>, document.getElementById('content'));
        return false;
    });
    
    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignupWindow csrf = { data.csrfToken }/>, document.getElementById('content'));
        return false;
    });
    
    ReactDOM.render(<LoginWindow csrf = { data.csrfToken }/>, document.getElementById('content'));
}

window.onload = init;