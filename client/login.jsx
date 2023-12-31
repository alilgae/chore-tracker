const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();
    
    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if(!username || !pass) {
        helper.handleError('Enter a username and password');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass});
    return false;
};

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();
    
    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const premium = e.target.querySelector('#premium').checked;

    if(!username || !pass || !pass2) {
        helper.handleError('All fields required');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2, premium});
    return false;
};

const LoginWindow = (props) => {
    return (
        <form   id="loginForm"
                name="loginForm"
                onSubmit={handleLogin}
                action='/login'
                method='POST'
                className='mainForm'
        >
            <label htmlFor='username'>Username: </label>
            <input id='user' type='text' name='username' placeholder='username' />
            <label htmlFor='pass'>Password: </label>
            <input id='pass' type='password' name='pass' placeholder='password' />
            <input className='formSubmit' type='submit' value='Sign in' />
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form   id="signupForm"
                name="signupForm"
                onSubmit={handleSignup}
                action='/signup'
                method='POST'
                className='mainForm'
        >
            <label htmlFor='username'>Username: </label>
            <input id='user' type='text' name='username' placeholder='username' />
            <label htmlFor='pass'>Password: </label>
            <input id='pass' type='password' name='pass' placeholder='password' />
            <label htmlFor='pass'>Re-enter Password: </label>
            <input id='pass2' type='password' name='pass2' placeholder='re-enter password' />
            <label htmlFor='premium'>Premium Account</label>
            <input id='premium' type='checkbox' name='premium' value='yes' />
            <input className='formSubmit' type='submit' value='Sign up' />
        </form>
    );
};

const init = () => {
    const loginButton = document.getElementById("loginButton");
    const signupButton = document.getElementById("signupButton");
    
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow />, document.getElementById('content'));
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignupWindow />, document.getElementById('content'));
        return false;
    });

    ReactDOM.render(<LoginWindow />, document.getElementById('content'));
};

window.onload = init;