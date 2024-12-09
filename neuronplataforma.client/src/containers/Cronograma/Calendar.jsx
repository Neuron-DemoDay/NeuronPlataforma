// src/components/Calendar.jsx
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

// Cores definidas para cada categoria
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
};

const eventsData = [
  { title: "Conhecendo os adjetivos", start: "2024-10-14T09:20:00", end: "2024-10-14T10:20:00", category: "Português" },
  { title: "Adição e Subtração", start: "2024-10-15T11:00:00", end: "2024-10-15T12:00:00", category: "Matemática" },
  { title: "Plantas e Animais", start: "2024-10-16T10:00:00", end: "2024-10-16T11:00:00", category: "Biologia" },
  { title: "Revolução Industrial", start: "2024-10-17T13:00:00", end: "2024-10-17T14:00:00", category: "Filosofia" },
  { title: "Regiões do Brasil", start: "2024-10-18T08:30:00", end: "2024-10-18T09:30:00", category: "Geografia" },
  // Adicione mais eventos conforme necessário...
];

const Calendar = forwardRef((props, ref) => {
  const calendarRef = useRef(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

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

  const handleCategoryClick = (category) => {
    const calendarApi = calendarRef.current.getApi();
    if (calendarApi) {
      if (category === "Todos") {
        setFilteredEvents(eventsData);
      } else {
        const filtered = eventsData.filter(event => event.category === category);
        setFilteredEvents(filtered);
        if (filtered.length === 0) {
          calendarApi.gotoDate(new Date()); // Voltar para o dia atual
        }
      }
    }
  };

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    if (calendarApi && filteredEvents.length > 0) {
      const allStartDates = filteredEvents.map(event => new Date(event.start));
      const allEndDates = filteredEvents.map(event => new Date(event.end));

      const minTime = new Date(Math.min(...allStartDates));
      const maxTime = new Date(Math.max(...allEndDates));

      // Ajustar o horário mínimo e máximo com 2 horas antes e depois
      const minTimeAdjusted = new Date(minTime.getTime() - 2 * 60 * 60 * 1000); // Duas horas antes
      const maxTimeAdjusted = new Date(maxTime.getTime() + 2 * 60 * 60 * 1000); // Duas horas depois

      // Definindo as opções de horário mínimo e máximo corretamente
      calendarApi.setOption("slotMinTime", minTimeAdjusted.toISOString().substring(11, 16));
      calendarApi.setOption("slotMaxTime", maxTimeAdjusted.toISOString().substring(11, 16));
    }
  }, [filteredEvents]);

  return (
    <div className="calendar">
    <div className="calendar-container">
      <div className="toolbar">
        <div className="categories-bar">
          {Object.keys(categoryColors).map((category) => (
            <button
              key={category}
              className="category-item"
              style={{ color: categoryColors[category].border }} // Cor do texto
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
        ref={calendarRef} // A ref é passada para o FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        locale="pt-br"
        headerToolbar={false}
        allDaySlot={false}
        nowIndicator={true}
        events={filteredEvents}
        eventContent={(eventInfo) => {
          const { category } = eventInfo.event.extendedProps; // Obtém a categoria do evento
          const { border, background } = categoryColors[category]; // Obtém as cores da categoria
          return (
            <div
              className="event-item"
              style={{
                borderRadius: "0.3125rem",
                border: `2px solid ${border}`,
                background: background, // Aplicando a cor de fundo correta
                padding: "0.25rem", // Adicione padding se necessário
              }}
            >
              <span style={{ color: border }}>{eventInfo.event.title}</span>
            </div>
          );
        }}
      />
    </div>
    </div>
  );
});

export default Calendar;
