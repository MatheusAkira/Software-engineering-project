import React, { useState } from 'react';
import './Calendar.css';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderCalendar = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startingDay = firstDayOfMonth.getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const blanks = [];
    for (let i = 0; i < startingDay; i++) {
      blanks.push(<td key={`blank-${i}`} className="calendar-day empty">{''}</td>);
    }

    const daysInMonthArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
      daysInMonthArray.push(
        <td key={`day-${day}`} className="calendar-day">
          {day}
        </td>
      );
    }

    const totalSlots = [...blanks, ...daysInMonthArray];
    const rows = [];
    let cells = [];

    totalSlots.forEach((day, i) => {
      if (i % 7 !== 0) {
        cells.push(day);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(day);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={prevMonth}>&lt;</button>
          <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <button onClick={nextMonth}>&gt;</button>
        </div>
        <table className="calendar-table">
          <thead>
            <tr>
              {daysOfWeek.map(day => (
                <th key={day} className="calendar-header-day">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div>
      {renderCalendar()}
    </div>
  );
}

export default Calendar;
