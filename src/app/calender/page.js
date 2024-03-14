"use client" 
import React, { useState } from 'react';
import Calendar from 'react-calendar'; 
import './calendar.css'; 

export default function calendar() {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const events = [
        { id: 1, title: 'Event 1', date: '2024-03-08', time: '10:00 AM', location: 'Location 1' },
        { id: 2, title: 'Event 2', date: '2024-03-09', time: '11:00 AM', location: 'Location 2' },
        // Add more events as needed
    ];
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };
    
      const filteredEvents = events.filter((event) => {
        return new Date(event.date).toDateString() === selectedDate.toDateString();
      });
    // return (
    //     <div>gjS</div>
    // )
    return (
    <div className='partition'>

        <div className="event-list">
            <h2 className='title'>Active Events</h2>
            <ul>
                {events.map((event) => (
                <li key={event.id} className='event-card'>
                    <h3>{event.title}</h3>
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Location: {event.location}</p>
                </li>
                ))}
            </ul>
        </div>

        <div className="calendar">
          <h2 className='title'>Calendar</h2>
          <Calendar onChange={handleDateChange} value={selectedDate} className="custom-calendar"/>
          <div className="events-for-date">
            <h3 style={{padding:10}}>Events for {selectedDate.toDateString()}</h3>
            <ul>
              {filteredEvents.map((event) => (
                <li key={event.id} className='list'>{event.title} - {event.time}</li>
              ))}
            </ul>
          </div>
        </div>

    
    </div>
        
      );
}