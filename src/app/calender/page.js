'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';

export default function CalendarComponent() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventTitle, setEventTitle] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [events, setEvents] = useState([]);
    const [showAddEventForm, setShowAddEventForm] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const filteredEvents = events.filter((event) => {
        return new Date(event.date).toDateString() === selectedDate.toDateString();
    });

    const handleEventTitleChange = (event) => {
        setEventTitle(event.target.value);
    };

    const handleEventDescChange = (event) => {
        setEventDesc(event.target.value);
    };
    const addEvent = () => {
        const newEvent = {
            id: events.length + 1,  
            date: selectedDate.toDateString(),
            title: eventTitle,
            desc: eventDesc, 
        };
        setEvents([...events, newEvent]);
        setShowAddEventForm(false); 
    };
    
    

    const handlePlus = () => {
        setShowAddEventForm(true);
    };

    const handleClose = () => {
        setShowAddEventForm(false);
    };

    const submit=(e)=>{
        e.preventDefault();
        addEvent(); 
        setEventTitle('');
        setEventDesc('');
    }
   
    
    
    
    return (
        <div className='partition'>
            <div className="event-list">
                <h2 className='title'>Active Events</h2>
                <ul>
                    {filteredEvents.map((event) => (
                        <li key={event.id} className='event-card'>
                            <h3>{event.title}</h3>
                            <p>Date: {event.date}</p>
                            <p>Description: {event.desc}</p>
                            {/* <p>Location: {event.location}</p> */}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="calendar">
                <h2 className='title'>Calendar</h2>
                <Calendar onChange={handleDateChange} value={selectedDate} className="custom-calendar"/>
                <div className="events-for-date">
                    <div className='row'>
                        <h3 style={{padding:10}}>Events for {selectedDate.toDateString()}</h3>
                        <i className="fas fa-plus" onClick={handlePlus}>+</i>
                    </div>
                    <ul>
                        {filteredEvents.map((event) => (
                            <li key={event.id} className='list'>
                                {event.title} - {event.desc}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {showAddEventForm && (
                <div className="add-event-form"> 
                    <p className='title' style={{fontSize:16}}>{selectedDate.toDateString()}</p>
                        <label>
                            Event Title:
                            <input type="text" value={eventTitle} onChange={handleEventTitleChange} />
                        </label>
                        <label>
                            Event Description:
                            <input type="text" value={eventDesc} onChange={handleEventDescChange} />
                        </label>
                        <button type="submit" onClick={submit}>Submit</button>
                        <button type="button" onClick={handleClose}>Close</button>
                   
                </div>
            )}
        </div>
    );
}
