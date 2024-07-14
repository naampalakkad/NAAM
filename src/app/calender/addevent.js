import React, { useState, useMemo, useCallback } from 'react';
import { 
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, 
  DrawerCloseButton, FormControl, FormLabel, Input, Button, useToast, 
  Textarea
} from "@chakra-ui/react";
import { eventSave } from "@/lib/firebase";

const AddEventDrawer = ({ isOpen, onClose, selectedDate, selectedTime, setSelectedDate, setSelectedTime, events, setEvents }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventVenue, setEventVenue] = useState('');
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
  }, [setSelectedDate, setSelectedTime]);

  const addEvent = useCallback(() => {
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
      timestamp: new Date().getTime()
    };
    eventSave(newEvent);
    setEvents([...events, newEvent]);
    resetForm();
    onClose();
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
              type="text"
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