const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleTask = (e) => {
    e.preventDefault();
    helper.hideError();

    const title = e.target.querySelector("#taskTitle").value;
    const frequency = e.target.querySelector("#taskFrequency").value;
    const startDate = `${e.target.querySelector("#taskStart").value}`;

    const date = startDate.split('-');
    console.log(date);

    const newDate = new Date(parseInt(date[0]), parseInt(date[1])-1, parseInt(date[2]));
    console.log(newDate);

    e.target.querySelector("#taskTitle").value = "";
    e.target.querySelector("#taskFrequency").value = "";

    if (!title || !frequency || !startDate) {
        helper.handleError('All fields are required');
        return false;
    }

    helper.sendPost(e.target.action, { title, startDate: newDate, frequency, }, loadTasksFromServer);

    return false;
}

const TaskForm = (props) => {
    return (
        <form id="taskForm"
            name="taskForm"
            onSubmit={handleTask}
            action='/maker'
            method='POST'
            className='taskForm'
        >
            <label htmlFor='title'>Title: </label>
            <input id='taskTitle' type='text' name='name' placeholder='Task Title' />
            <label htmlFor='frequency'>Frequency: </label>
            <input id='taskFrequency' type='number' min='0' name='frequency' placeholder='days' />
            <label for="taskStart">Start date:</label>
            <input type="date" id="taskStart" name="taskStart" />
            <input className='makeTaskSubmit' type='submit' value='Make Task' />
        </form>
    );
};

const TaskList = (props) => {
    if (props.tasks.length === 0) {
        return (
            <div className='taskList'>
                <h3 className='emptyTask'>No Tasks Yet!</h3>
            </div>
        );
    }

    const taskNodes = props.tasks.map(task => {
        return (
            <div key={task._id} className='task'>
                <img src='/assets/img/domoface.jpeg' alt='domo face' className='domoFace' />
                <h3 className='taskTitle'>Title: {task.title}</h3>
                <h3 className='taskFrequency'>Frequency: Every {task.frequency} days</h3>
                <h3 className='taskStart'>Starting on {task.startDate}</h3>
            </div>
        );
    });

    return (
        <div className='taskList'>
            {taskNodes}
        </div>
    );
}

const loadTasksFromServer = async () => {
    const response = await fetch('/getTasks');
    const data = await response.json();
    ReactDOM.render(
        <TaskList tasks={data.tasks} />,
        document.getElementById('tasks')
    );
}

const loadAccountType = async () => {
    const response = await fetch('/getAccountUsernameType');
    const data = await response.json();
    ReactDOM.render(
        <AccountType paid={data.account[0].paidAccount} />,
        document.getElementById("accountType")
    )
}

const handleUpgrade = (e) => {
    e.preventDefault();
    helper.hideError();

    helper.sendPost('./upgradeAccount');

    loadAccountType();
    return false;
}

const AccountType = (props) => {
    return (
        <div className='account'>
            <h3 className='accountType'>Account type: {props.paid ? "Premium" : "Free"}</h3>
            {!props.paid ?
                <form id="upgradeForm"
                    name="upgradeForm"
                    onSubmit={handleUpgrade}
                    action='/upgradeAccount'
                    method='POST'
                    className='upgradeForm'
                >
                    <input className='upgradeAccount' type='submit' value='Upgrade to Premium Account' />
                </form> : null}
        </div>
    )
}

const init = () => {
    ReactDOM.render(<TaskForm />, document.getElementById('makeTask'));
    ReactDOM.render(<TaskList tasks={[]} />, document.getElementById('tasks'));
    loadAccountType();
    loadTasksFromServer();
}

window.onload = init;