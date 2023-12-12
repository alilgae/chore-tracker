const React = require('react');
const ReactDOM = require('react-dom');

const loadTasksFromServer = async () => {
    const response = await fetch('/getTasks');
    const data = await response.json();
    renderTasks(data);
}

const renderTasks = (data) => {
    for(let task of data.tasks) {
        let date = task.startDate.split('-');
        date[2] = date[2].substring(0, 2);
        date = `_${date[0]}-${date[1]}-${date[2]}`;
        if(document.querySelector(`.${date}`) !== null) {
            const taskLI = `<li key=${task._id} class='taskItem'>${task.title}</li>`;
            document.querySelector(`.${date}`).innerHTML += taskLI;
        }
    }
}

const reloadTasks = () => {
    document.querySelectorAll(".taskItem").forEach(task => { task.remove(); });
    loadTasksFromServer();
}

module.exports = {
    loadTasksFromServer,
    reloadTasks,
};
