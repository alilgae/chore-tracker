const React = require('react');
const ReactDOM = require('react-dom');
const tasks = require('./tasks.jsx');

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 
    this.state = {
        currentDay: new Date(),
    };
}  
changeCurrentDay = (day) => {
  let reload = this.state.currentDay.month !== day.month;
  this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  if(reload) tasks.reloadTasks();
}
previousMonth = () => { 
  const day = this.state.currentDay;
  day.setMonth(day.getMonth() - 1);
  this.setState({ currentDay: day }); 
  tasks.reloadTasks();
}
nextMonth = () => { 
  const day = this.state.currentDay;
  day.setMonth(day.getMonth() + 1);
  this.setState({ currentDay: day }); 
  tasks.reloadTasks();
}
  render() {
      return (
      <div className="cal">
      <div className="calendar-header">
        <div className="tools">
            <button onClick={this.previousMonth}>
              <span className="material-icons">
                {"<"}
                </span>
            </button>
            <h2>{this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}</h2>
            <button onClick={this.nextMonth}>
              <span className="material-icons">
                {">"}
                </span>
            </button>
          </div>
      </div>
      <div className="calendar-body">
        <div className="table-header">
          {
            this.weekdays.map((weekday) => {
              return <div className="weekday"><p>{weekday}</p></div>
            })
          }
        </div>
        <div className="table">
        <CalendarDays day={this.state.currentDay} changeCurrentDay={this.changeCurrentDay} />
        </div>
      </div>
    </div>
    );
    }
}

const CalendarDays = (props) => {
  let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
      date: (new Date(firstDayOfMonth)),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
      year: firstDayOfMonth.getFullYear()
    }

    currentDays.push(calendarDay);
  }

  return (
    <div className="table-content">
      {
      currentDays.map((day) => {
        return (
          <div className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}
                onClick={() => props.changeCurrentDay(day)}>
            <p>{day.number}</p>
            <ul className={"task-list" + ` _${day.year}-${day.month+1}-${day.number > 9 ? day.number : '0' + day.number}`}>

            </ul>
          </div>
        )
      })
    }
    </div>
  )
}

module.exports = Calendar;