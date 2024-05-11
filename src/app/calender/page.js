'use client';  
import React, { useState, useRef ,useEffect} from 'react';
import DateTimePicker from './DateTimePicker';  
import './calendar.css'; 
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {eventSave}  from "@/lib/firebase"

import { fetchEventsFromDB } from "@/lib/firebase";
import {  Card } from "@chakra-ui/react";
export default function CalendarComponent() {
    const calendarRef = useRef(null);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('00:00');
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [eventTitle, setEventTitle] = useState(''); 
    const [events, setEvents] = useState([]);

    const loadEventsFromFirebase = async () => {
        try {
            const eventsData = await fetchEventsFromDB();
            setEvents(eventsData);
        } catch (error) {
            console.error("Error loading events from Firebase:", error);
        }
    };

    // Load events from Firebase when component mounts
    useEffect(() => {
        loadEventsFromFirebase();
    }, []);
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
        setSelectedDate(new Date());
        setSelectedTime('00:00');
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
    
    const futureEvents = events.filter(event => new Date(event.date + 'T' + event.time) > new Date());

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
        <div style={{paddingTop:"10vh", display: 'flex'  }}>
            <div style={{ flex: '0 0 calc(75vw)', padding: '0vh', margin: '1rem' }}>
                <Card className='card'>
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
                </Card>
                
            </div>
            <div style={{ flex: '1',   }}>
                 
                    <button onClick={handleAddEvent} className='addbutton'>Add Event</button>
                    <h1 style={{ textAlign: 'center', fontWeight: 'bold', color: 'rgb(5, 5, 68)' }}>Upcoming Events</h1>

                    <ul className="event-list">
                {futureEvents.map((event, index) => (
                    <li key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <span className="event-title" style={{ fontWeight: 'bold' }}>{event.title}</span>
                        <span className="event-date" style={{ color: '#666', marginLeft: '10px' }}>{event.date}</span>
                        <span className="event-time" style={{ color: '#666', marginLeft: '20px' }}>{event.time}</span>
                    </li>
                ))}
            </ul>
 
            </div>

            {/* Modal for adding events */}
            {showAddEventModal && (
                <div className="add-event-form">
                    <p className='title' style={{ fontSize: 16 }}>{selectedDate.toDateString()}</p>
                    <label>
                        Event Title
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
