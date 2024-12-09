// src/components/Calendar.jsx
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

const Calendar = forwardRef((props, ref) => {
  const calendarRef = useRef(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useImperativeHandle(ref, () => ({
    getApi: () => calendarRef.current?.getApi(),
  }));

  const handleViewChange = (view) => {
    const calendarApi = calendarRef.current.getApi();
    if (calendarApi) {
      calendarApi.changeView(view);
      setCurrentView(view);
    }
  };

  const handleNavigate = (direction) => {
    const calendarApi = calendarRef.current.getApi();
    if (calendarApi) {
      if (direction === "prev") {
        calendarApi.prev();
      } else if (direction === "next") {
        calendarApi.next();
      }
      setCurrentDate(calendarApi.getDate());
    }
  };

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    if (calendarApi) {
      setCurrentDate(calendarApi.getDate());
    }
  }, [currentView]);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={() => handleNavigate("prev")}>&lt;</button>
          <span>{currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</span>
          <button onClick={() => handleNavigate("next")}>&gt;</button>
        </div>
        <div className="calendar-card">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={currentView}
            locale="pt-br"
            headerToolbar={false}
            allDaySlot={false}
            nowIndicator={true}
          />
        </div>
      </div>
    </div>
  );
});

export default Calendar;
