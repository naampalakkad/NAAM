import React, { useState, useMemo, useCallback } from 'react';
import {
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent,
  DrawerCloseButton, FormControl, FormLabel, Input, Button, useToast,
  Textarea
} from "@chakra-ui/react";
import { savedatatodb } from "@/lib/firebase";
import { auth } from '@/lib/firebase';

const AddEventDrawer = ({ isOpen, onClose, selectedDate, setSelectedDate, events, setEvents }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [selectedTime, setSelectedTime] = useState('00:00');
  const toast = useToast();

  const formatDate = useCallback((date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const resetForm = useCallback(() => {
    setEventTitle('');
    setEventDesc('');
    setEventVenue('');
    setSelectedDate(new Date());
    setSelectedTime('00:00');
  }, [setSelectedDate]);

  const addEvent = useCallback(async () => {
    if (!eventTitle || !eventDesc || !eventVenue || !selectedDate || !selectedTime) {
      toast({
        title: "All fields are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newEvent = {
      title: eventTitle,
      venue: eventVenue,
      description: eventDesc,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      timestamp: new Date().getTime(),
      id: new Date().getTime(),
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName
    };

    try {
      await savedatatodb(`content/pendingevents/${newEvent.timestamp}`, newEvent);
      setEvents([...events, newEvent]);
      toast({
        title: 'Event Added',
        description: 'Your event has been successfully Submitted for Review, Kindly wait for the administrator to Approve it.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      resetForm();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error saving your event. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [eventTitle, eventDesc, eventVenue, selectedDate, selectedTime, events, setEvents, onClose, resetForm, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent();
  };

  const formattedDate = useMemo(() => formatDate(selectedDate), [selectedDate, formatDate]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add Event</DrawerHeader>
        <DrawerBody as="form" onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              value={formattedDate}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Time</FormLabel>
            <Input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Event Title</FormLabel>
            <Input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Event Description</FormLabel>
            <Textarea
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Event Venue</FormLabel>
            <Input
              type="text"
              value={eventVenue}
              onChange={(e) => setEventVenue(e.target.value)}
              focusBorderColor="blue.500"
            />
          </FormControl>
          <Button type="submit" style={{ display: 'none' }}></Button>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddEventDrawer;
