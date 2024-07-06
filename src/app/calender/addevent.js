import React, { useState } from 'react';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { eventSave } from "@/lib/firebase";

const AddEventDrawer = ({ isOpen, onClose, selectedDate, selectedTime, setSelectedDate, setSelectedTime, events, setEvents }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
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
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add Event</DrawerHeader>
        <DrawerBody>
          <FormControl mb={4}>
            <FormLabel>Date</FormLabel>
            <Input 
              type="date" 
              value={selectedDate.toISOString().split('T')[0]} 
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
          <FormControl mb={4}>
            <FormLabel>Event Title</FormLabel>
            <Input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Event Description</FormLabel>
            <Input type="text" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} />
          </FormControl>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={submit}>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddEventDrawer;
