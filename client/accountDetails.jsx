const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const AccountDetails = (props) => {
    return (
        <div className='account'>
            {props.user ? <h3 className='accountUser'>Username: {props.user}</h3> : ""}
            <h3 className='accountType'>Account type: {props.paid ? "Premium" : "Free"}</h3>
            <ChangeAccountType paid={props.paid} />
        </div>
    )
}

const ChangeAccountType = (props) => {
    return (
        <div id='changeType'>
                <form id="upgradeForm"
                    name="upgradeForm"
                    onSubmit={changeTypeHandler}
                    action={!props.paid ? '/upgradeAccount' : '/downgradeAccount'}
                    method='POST'
                    className='upgradeForm'
                >
                    <input className='upgradeAccount' type='submit' value={!props.paid ? 'Upgrade to Premium Account' : 'Downgrade to Free Account'} />
                </form>
        </div>
    );
}

const loadAccountDetails = async () => {
    const response = await fetch('/getAccountUsernameType');
    const data = await response.json();
    ReactDOM.render(
        <AccountDetails paid={data.account[0].paidAccount} user={data.account[0].username} />,
        document.getElementById("details")
    );
}

const loadAccountType = async () => {
    const response = await fetch('/getAccountUsernameType');
    const data = await response.json();
    ReactDOM.render(
        <AccountDetails paid={data.account[0].paidAccount} />,
        document.getElementById("accountType")
    )
}

const changeTypeHandler = (e) => {
    e.preventDefault();
    helper.hideError();

    helper.sendPost(e.target.action);

    if(document.querySelector("#details")) loadAccountDetails();
    else if (document.querySelector("#accountType")) loadAccountType();
    else console.log("updated"); 
    return false;
}

const ChangePassWindow = (props) => {
    return (
        <form   id="loginForm"
                name="loginForm"
                onSubmit={handlePasswordChange}
                action='/changePass'
                method='POST'
                className='mainForm'
        >
            <label htmlFor='pass'>Password: </label>
            <input id='pass' type='text' name='pass' placeholder='password' />
            <label htmlFor='pass2'>Password: </label>
            <input id='pass2' type='password' name='pass2' placeholder='re-enter password' />
            <input className='formSubmit' type='submit' value='Change password' />
        </form>
    );
};

const handlePasswordChange = (e) => {
    e.preventDefault();
    helper.hideError();
    
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if(!pass || !pass2) {
        helper.handleError('All fields required');
        return false;
    }

    helper.sendPost(e.target.action, {pass, pass2});
    return false;
};

const init = () => {
    loadAccountDetails();
    ReactDOM.render(<ChangePassWindow />, document.querySelector("#pass"));
}

window.onload = init;

module.exports = { loadAccountType };