"use client"

import React, { useState } from 'react';
import { Box, Grid2, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

interface Event {
    date: Date;
    title: string;
    description: string;
}

interface CalendarProps {
    events: Event[];
}

export default function Calendar({ events }: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dialogOpen, setDialogOpen] = useState(false);
    const [eventDetails, setEventDetails] = useState<Event | null>(null);

    const handleEventClick = (details: Event) => {
        setEventDetails(details);
        setDialogOpen(true);
    };

    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const startDay = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const renderDays = () => {
        const days = [];
        const totalDays = daysInMonth(currentDate);
        const startingDay = startDay(currentDate);

        for (let i = 0; i < startingDay; i++) {
            days.push(<Grid2 size={1} key={`empty-${i}`} />);
        }

        for (let i = 1; i <= totalDays; i++) {
            const dayEvents = events.filter(event =>
                event.date.getFullYear() === currentDate.getFullYear() &&
                event.date.getMonth() === currentDate.getMonth() &&
                event.date.getDate() === i
            );

            days.push(
                <Grid2 size={1} key={i}>
                    <Grid2
                        sx={{
                            minHeight: { xs: 200 },
                            border: '1px solid #e0e0e0',
                        }}
                    >
                        <Typography sx={{ margin: 1 }}>{i}</Typography>
                        {dayEvents.map((event, index) => (
                            <Button
                                key={index}
                                sx={{ wordBreak: 'break-word', width: "100%", textAlign: 'left' }}
                                onClick={() => handleEventClick(event)}
                                variant='text'
                            >
                                {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {event.title}
                            </Button>
                        ))}
                    </Grid2>
                </Grid2>
            );
        }

        return days;
    };

    return (
        <Box sx={{ margin: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={prevMonth}>
                    <ArrowLeft />
                </IconButton>
                <Typography variant="h6">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </Typography>
                <IconButton onClick={nextMonth}>
                    <ArrowRight />
                </IconButton>
            </Box>
            <Grid2 container columns={7}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <Grid2 size={1} key={day}>
                        <Typography variant="subtitle2" align="center">
                            {day}
                        </Typography>
                    </Grid2>
                ))}
                {renderDays()}
            </Grid2>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>{eventDetails && eventDetails.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Event Details</DialogContentText>
                    <DialogContentText>
                        {eventDetails ? `${eventDetails.description}` : ''}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};