const React = require('react');
const ReactDOM = require('react-dom');
const Calendar = { core: require('@fullcalendar/core'), interaction: require('@fullcalendar/interaction'), daygrid: require('@fullcalendar/daygrid'), timegrid: require('@fullcalendar/timegrid'), list: require('@fullcalendar/list'), multimonth: require('@fullcalendar/multimonth')};
const ReactCalendar = require('@fullcalendar/react');

class CalendarView extends React.Component {
    render() {
      return (
        <ReactCalendar
          plugins={[ Calendar.daygrid ]}
          initialView="dayGridMonth"
        />
      )
    }
  }

const init = () => {
    ReactDOM.render(
        <CalendarView/>,
        document.getElementById("test")
    );
}

window.onload = init;