import React from 'react';

const DateTimePicker = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }) => {
    const handleDateChange = (e) => {
        const newDate = new Date(e.target.value);
        setSelectedDate(newDate);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    

    return (
        <div>
            <div>
                <label>Date:</label>
                <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={handleDateChange} />
                
            </div>
            <div>
                <label>Time:</label>
                <input type="time" value={selectedTime} onChange={handleTimeChange} /> 
            </div>
        </div>
    );
};

export default DateTimePicker;
