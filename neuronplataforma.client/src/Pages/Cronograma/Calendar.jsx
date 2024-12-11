import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from 'react-router-dom';
import "./Calendar.css";

const categoryColors = {
    "Todos": { border: "#000000", background: "rgba(0, 0, 0, 0.05)" },
    "Português": { border: "#4caf50", background: "rgba(76, 175, 80, 0.1)" },
    "Matemática": { border: "#f44336", background: "rgba(244, 67, 54, 0.1)" },
    "Física": { border: "#009688", background: "rgba(0, 150, 136, 0.1)" },
    "Química": { border: "#ff5722", background: "rgba(255, 87, 34, 0.1)" },
    "Biologia": { border: "#03a9f4", background: "rgba(3, 169, 244, 0.1)" },
    "Filosofia": { border: "#ffeb3b", background: "rgba(255, 235, 59, 0.1)" },
    "Sociologia": { border: "#ff9800", background: "rgba(255, 152, 0, 0.1)" },
    "Geografia": { border: "#9c27b0", background: "rgba(156, 39, 176, 0.1)" },
    "Revisão": { border: "#795548", background: "rgba(121, 85, 72, 0.1)" },
};

const Calendar = forwardRef((props, ref) => {
    const calendarRef = useRef(null);
    const [currentView, setCurrentView] = useState("dayGridMonth");
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/events.json")
            .then((response) => response.json())
            .then((data) => {
                setEvents(data);
                setFilteredEvents(data);
            })
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

    useImperativeHandle(ref, () => ({
        getApi: () => calendarRef.current?.getApi(),
    }));

    const handleViewChange = (view) => {
        const calendarApi = calendarRef.current.getApi();
        if (calendarApi) {
            calendarApi.changeView(view)
            setCurrentView(view)
        }
    };

    const handleCategoryClick = (category) => {
        if (category === "Todos") {
            setFilteredEvents(events)
        } else {
            const filtered = events.filter((event) => event.category === category);
            setFilteredEvents(filtered)
        }
    };

    const handleEventClick = (clickInfo) => {
        const eventId = clickInfo.event.id
        const eventTitle = clickInfo.event.title
        navigate(`/aula/${eventId}`, { state: { title: eventTitle } }) // Redireciona para a página da aula com o ID
    };

    return (
        <div className="calendar-container">
            <div className="toolbar">
                <div className="categories-bar">
                    {Object.keys(categoryColors).map((category) => (
                        <button
                            key={category}
                            className="category-item"
                            style={{
                                color: categoryColors[category].border,
                                backgroundColor: categoryColors[category].background,
                            }}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="view-buttons">
                    <button onClick={() => handleViewChange("timeGridDay")}>Dia</button>
                    <button onClick={() => handleViewChange("timeGridWeek")}>Semana</button>
                    <button onClick={() => handleViewChange("dayGridMonth")}>Mês</button>
                </div>
            </div>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={currentView}
                locale="pt-br"
                headerToolbar={false}
                allDaySlot={false}
                nowIndicator={true}
                events={filteredEvents}
                eventClick={handleEventClick}
                eventContent={(eventInfo) => {
                    const { category } = eventInfo.event.extendedProps;
                    const { border, background } = categoryColors[category] || categoryColors["Todos"];
                    return (
                        <div
                            className="event-item"
                            style={{
                                borderLeft: `4px solid ${border}`,
                                backgroundColor: background,
                            }}
                        >
                            <span className="event-title">{eventInfo.event.title}</span>
                            <span className="event-time">{eventInfo.timeText}</span>
                        </div>
                    );
                }}
                eventClick={handleEventClick}
            />
        </div>
    );
});

export default Calendar;
