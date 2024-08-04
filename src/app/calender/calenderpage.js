'use client';
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation'; // Note: If your Next.js version supports it
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Flex, Button, Spinner, Card, Text } from "@chakra-ui/react";
import { getdatafromdb, auth, checkuserrole } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import EventList from './eventlist';
import AddEventDrawer from './addevent';
import EventDetailModal from './eventpopup';
import './calendar.css';

export default function Calendar() {
  const searchParams = useSearchParams();
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEventDetailModal, setShowEventDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadEventsFromFirebase = async () => {
      try {
        const eventsData = await getdatafromdb('content/approvedevents');
        setEvents(Object.values(eventsData || {}));
      } catch (error) {
        console.error("Error loading events from Firebase:", error);
      }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        setIsAdmin(await checkuserrole('admin'));
      }
    });

    loadEventsFromFirebase();
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const eventId = searchParams.get('eventId');
    if (eventId) {
      const event = events.find(event => event.id === eventId);
      if (event) {
        setSelectedEvent({
          title: event.title,
          id: event.id,
          startStr: `${event.date}T${event.time}`,
          extendedProps: {
            description: event.description,
            time: event.time,
            venue: event.venue,
          }
        });
        setShowEventDetailModal(true);
      }
    }
  }, [events, searchParams]);
  

  const handleDateClick = useCallback((arg) => {
    if (user && isAdmin) {
      setSelectedDate(arg.date);
      setShowAddEventModal(true);
    } else {
      alert('Please log in to add events.');
    }
  }, [user, isAdmin]);

  const handleEventClick = useCallback((arg) => {
    setSelectedEvent(arg.event);
    setShowEventDetailModal(true);
  }, []);

  const handleAddEvent = useCallback(() => {
    if (user) {
      setSelectedDate(new Date());
      setShowAddEventModal(true);
    } else {
      alert('Please log in to add events.');
    }
  }, [user]);

  const futureEvents = useMemo(() => 
    events.filter(event => new Date(`${event.date}T${event.time}`) > new Date()), 
    [events]
  );

  const eventList = useMemo(() => 
    events.map(event => ({
      title: event.title,
      id: event.id,
      start: `${event.date}T${event.time}`,
      extendedProps: {
        description: event.description,
        time: event.time,
        venue: event.venue,
      },
    })), 
    [events]
  );

  const handleEventContent = useCallback((arg) => (
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
  ), []);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" h="60vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box pt={{ base: "10vh", md: "10vh" }}>
      <Flex direction={{ base: "column", md: "row" }} className='container'>
        <Box className='bar' flex={{ base: "1", md: "3" }} mb={{ base: 4, md: 0 }}>
          <Card className='card'>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={'dayGridMonth'}
              headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: ""
              }}
              buttonText={{ today: 'Today' }}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              eventContent={handleEventContent}
              events={eventList}
            />
          </Card>
        </Box>
        <Box className='sidebar' flex={{ base: "1", md: "1" }} pl={{ base: 0, md: 4 }}>
          {isAdmin && (
            <Flex justifyContent="center" alignItems="center">
              <Button
                m={4}
                colorScheme='green'
                onClick={handleAddEvent}
                className='addbutton'
              >
                Add Event
              </Button>
            </Flex>
          )}
          <EventList futureEvents={futureEvents} />
        </Box>
        <AddEventDrawer
          isOpen={showAddEventModal}
          onClose={() => setShowAddEventModal(false)}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
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
