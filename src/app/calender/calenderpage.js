'use client';
import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Flex, Heading, Button, Spinner, Card, useMediaQuery, Text } from "@chakra-ui/react";
import { fetchEventsFromDB, auth, checkuserrole } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import EventList from './eventlist';
import AddEventDrawer from './addevent';
import EventDetailModal from './eventpopup';
import './calendar.css';

export default function Calendar() {
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('00:00');
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [showEventDetailModal, setShowEventDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadEventsFromFirebase = async () => {
      try {
        const eventsData = await fetchEventsFromDB();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error loading events from Firebase:", error);
      }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    loadEventsFromFirebase();

    return () => {
      unsubscribeAuth();
    };
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

  const handleDateClick = (arg) => {
    if (user && isAdmin) {
      setSelectedDate(arg.date);
      setShowAddEventModal(true);
    } else {
      alert('Please log in to add events.');
    }
  };

  const handleEventClick = (arg) => {
    setSelectedEvent(arg.event);
    setShowEventDetailModal(true);
  };

  const handleAddEvent = () => {
    if (user) {
      setShowAddEventModal(true);
    } else {
      alert('Please log in to add events.');
    }
  };

  const futureEvents = events.filter(event => new Date(event.date + 'T' + event.time) > new Date());

  const eventList = events.map((event) => ({
    title: event.title,
    start: event.date + 'T' + event.time,
    time: event.time,
    extendedProps: {
      description: event.description,
      time: event.time,
    },
  }));

  const handleEventContent = (arg) => (
    <Box
      className="custom-event"
      p={1}
      m={1}
      bg="blue.500"
      borderRadius="md"
      color="white"
      textAlign="center"
      _hover={{ bg: "blue.600" }}
    >
    <Text className="event-title" fontSize="sm" isTruncated>
      {arg.event.title}
    </Text>
  </Box>
  );

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" h="60vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box pt={{ base: "5vh", md: "10vh" }}>
      <Flex direction={{ base: "column", md: "row" }} className='container'>
        <Box className='bar' flex={{ base: "1", md: "3" }} mb={{ base: 4, md: 0 }}>
          <Card className='card'>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={isMobile ? 'timeGridDay' : 'dayGridMonth'}
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
        </Box>
        <Box className='sidebar' flex={{ base: "1", md: "1" }} pl={{ base: 0, md: 4 }}>
          {isAdmin &&<Flex justifyContent="center" alignItems="center"> <Button onClick={handleAddEvent} className='addbutton'>Add Event</Button></Flex>}
          <EventList futureEvents={futureEvents} />
        </Box>
        <AddEventDrawer
          isOpen={showAddEventModal}
          onClose={() => setShowAddEventModal(false)}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setSelectedDate={setSelectedDate}
          setSelectedTime={setSelectedTime}
          events={events}
          setEvents={setEvents}
        />
         {selectedEvent && (
         <EventDetailModal
         showEventDetailModal={showEventDetailModal}
         setShowEventDetailModal={setShowEventDetailModal}
         selectedEvent={selectedEvent}
       />
        )}
        
      </Flex>
      
    </Box>
  );
}