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

const init = () => {
    loadAccountDetails();
}

window.onload = init;

module.exports = { loadAccountType };