const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');
const Calendar = require('./calendar.jsx');
const tasks = require('./tasks.jsx');
const account = require('./accountDetails.jsx');

const handleTask = (e) => {
    e.preventDefault();
    helper.hideError();

    const title = e.target.querySelector("#taskTitle").value;
    const startDate = `${e.target.querySelector("#taskStart").value}`;

    const date = startDate.split('-');
    const newDate = new Date(parseInt(date[0]), parseInt(date[1])-1, parseInt(date[2]));

    e.target.querySelector("#taskTitle").value = "";
    e.target.querySelector("#taskStart").value = "";

    if (!title || !startDate) {
        helper.handleError('All fields are required');
        return false;
    }

    helper.sendPost(e.target.action, { title, startDate: newDate, }, tasks.reloadTasks);

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
            <label for="taskStart">Start date:</label>
            <input type="date" id="taskStart" name="taskStart" />
            <input className='makeTaskSubmit' type='submit' value='Make Task' />
        </form>
    );
};

const init = () => {
    ReactDOM.render(<TaskForm />, document.getElementById('makeTask'));
    ReactDOM.render(<Calendar />, document.getElementById('calendar'));
    tasks.loadTasksFromServer();
    account.loadAccountType();
}

window.onload = init;