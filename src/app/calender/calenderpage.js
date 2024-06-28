'use client';
import React, { useState, useRef, useEffect } from 'react';
import DateTimePicker from './DateTimePicker';
import './calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { eventSave, fetchEventsFromDB, auth, checkuserrole } from "@/lib/firebase";
import { Card } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";

export default function Calendar() {
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('00:00');
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadEventsFromFirebase = async () => {
      try {
        const eventsData = await fetchEventsFromDB();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error loading events from Firebase:", error);
      }
    };

    loadEventsFromFirebase();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const isUserAdmin = await checkuserrole('admin');
        setIsAdmin(isUserAdmin);
      } else {
        setIsAdmin(false);
      }
    };

    fetchUserRole();
  }, [user]);

  const handleClose = () => setShowAddEventModal(false);

  const handleEventTitleChange = (event) => setEventTitle(event.target.value);
  const handleEventDescChange = (event) => setEventDesc(event.target.value);

  const handleDateClick = (arg) => {
    if (user) {
      setSelectedDate(arg.date);
      setShowAddEventModal(true);
    } else {
      alert('Please log in to add events.');
    }
  };

  const handleEventClick = (arg) => {
    console.log('Event clicked:', arg.event);
  };

  const handleAddEvent = () => {
    if (user) {
      setShowAddEventModal(true);
    } else {
      alert('Please log in to add events.');
    }
  };

  const submit = (e) => {
    e.preventDefault();
    addEvent();
    setEventTitle('');
    setEventDesc('');
    setSelectedDate(new Date());
    setSelectedTime('00:00');
  };

  const addEvent = () => {
    const newEvent = {
      title: eventTitle,
      description: eventDesc,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      timestamp: new Date().getTime()
    };
    eventSave(newEvent);
    setEvents([...events, newEvent]);
    setShowAddEventModal(false);
  };

  const futureEvents = events.filter(event => new Date(event.date + 'T' + event.time) > new Date());

  const eventList = events.map((event) => ({
    title: event.title,
    start: event.date + 'T' + event.time
  }));

  const handleEventContent = (arg) => (
    <div className="custom-event">
      <div className="event-title">{arg.event.title}</div>
      <div className="event-time">{arg.timeText}</div>
    </div>
  );

  return (
    <div style={{ paddingTop: "10vh" }}>
      <div className='container'>
        <div className='bar'>
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
        <div className='sidebar'>
          {isAdmin && <button onClick={handleAddEvent} className='addbutton'>Add Event</button>}
          <h1 style={{ textAlign: 'center', fontWeight: 'bold', color: 'rgb(5, 5, 68)' }}>Upcoming Events</h1>
          <ul className="event-list">
            {futureEvents.map((event, index) => (
              <li key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <span className="event-title" style={{ fontWeight: 'bold', marginLeft: '10px' }}>{event.title}</span>
                <span className="event-date" style={{ color: '#666', marginLeft: '10px' }}>{event.date}</span>
                <br />
                <span className="event-date" style={{ color: 'grey', marginLeft: '10px' }}>{event.description}</span>
                <span className="event-time" style={{ color: '#666', marginLeft: '10px' }}>{event.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {showAddEventModal && isAdmin && (
          <div className="add-event-form">
            <p className='title' style={{ fontSize: 16 }}>{selectedDate.toDateString()}</p>
            <label>
              Event Title
              <input type="text" value={eventTitle} onChange={handleEventTitleChange} />
            </label>
            <label>
              Event Description
              <input type="text" value={eventDesc} onChange={handleEventDescChange} />
            </label>
            <DateTimePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
            <button type="submit" onClick={submit}>Submit</button>
            <button type="button" onClick={handleClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
