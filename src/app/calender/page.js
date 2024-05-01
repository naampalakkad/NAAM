'use client';  
import React, { useState, useRef } from 'react';
import DateTimePicker from './DateTimePicker';  
import './calendar.css'; 
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import eventSave  from "@/lib/firebase";
export default function CalendarComponent() {
    const calendarRef = useRef(null);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('00:00');
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [eventTitle, setEventTitle] = useState(''); 
    const [events, setEvents] = useState([]);

    const handleClose = () => {
        setShowAddEventModal(false);
    };

    const handleEventTitleChange = (event) => {
        setEventTitle(event.target.value);
    }; 

    const submit = (e) => {
        e.preventDefault();
        addEvent();
        setEventTitle(''); 
    };

    const handleDateClick = (arg) => {
        setSelectedDate(arg.date);
        setShowAddEventModal(true);
    };

    const handleEventClick = (arg) => { 
        console.log('Event clicked:', arg.event);
    };

    const handleAddEvent = () => {
        setShowAddEventModal(true);
    };

    const addEvent = () => {
        const newEvent = {
            title: eventTitle,
            date: selectedDate.toISOString().split('T')[0],
            time: selectedTime,
            timestamp:new Date().getTime()
        };
        eventSave(newEvent);
       
        setEvents([...events, newEvent]);
        setShowAddEventModal(false);
    };
    

    const eventList = events.map((event, index) => ({
        title: event.title,
        start: event.date + 'T' + event.time
    }));

    const handleEventContent = (arg) => {
        return (
            <div className="custom-event">
                <div className="event-title">{arg.event.title}</div>
                <div className="event-time">{arg.timeText}</div>
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: '0 0 calc(75vw)', height: '100%', overflow: 'hidden', padding: '0vh', margin: '1rem' }}>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    headerToolbar={{
                        start: "today prev,next",
                        center: "title",
                        end: ""
                    }}
                    height={"100vh"}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    eventContent={handleEventContent}
                    events={eventList}
                />
            </div>
            <div style={{ flex: '1',  backgroundColor: 'rgba(120, 119, 160, 0.558)' }}>
                <div style={{ padding: 10 }}>
                    <button onClick={handleAddEvent} className='addbutton'>Add Event</button>
                    <ul className="event-list">
                        {events.map((event, index) => (
                            <li key={index}>
                                <span className="event-title">{event.title}</span>  <span className="event-date">{event.date}</span>  <span className="event-time">{event.time}</span>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>

            {/* Modal for adding events */}
            {showAddEventModal && (
                <div className="add-event-form">
                    <p className='title' style={{ fontSize: 16 }}>{selectedDate.toDateString()}</p>
                    <label>
                        Event Title:
                        <input type="text" value={eventTitle} onChange={handleEventTitleChange} />
                    </label>
                    <DateTimePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                    <button type="submit" onClick={submit}>Submit</button>
                    <button type="button" onClick={handleClose}>Close</button>
                </div>
            )}
        </div>
    );
}
