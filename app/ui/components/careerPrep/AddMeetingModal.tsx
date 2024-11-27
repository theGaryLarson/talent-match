'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormEvent } from 'react';
import { CreateMeetingDTO } from '@/app/lib/admin/careerPrep';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddMeetingModal(params:{jsId:string}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmit = async (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const submitButton = event.currentTarget.querySelector(
        'button[type="submit"]',
      ) as HTMLButtonElement;
      if (submitButton) submitButton.disabled = true;
      const meetingData:CreateMeetingDTO ={
        jobseekerId: params.jsId,
        meetingTitle: formData.get('meeting_title') as string,
        meetingDatetime: new Date(formData.get('meeting_datetime') as string)
      }
      try {
        const response = await fetch('/api/jobseekers/career-prep/meeting', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(meetingData), // Send as JSON
        });
  
        if (!response.ok) {
          // If response is not OK, handle error
          console.error('Failed to create job listing');
          return;
        } else {
          // Await the response JSON
          const data = await response.json();
          console.log('Meeting created:', data);
        }
      } catch (error) {
        console.error('Error creating meeting:', error);
      }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div>
        <form onSubmit={onSubmit} className="space-y-3">
              {/* Meeting Title */}
              <div className="grid grid-cols-1">
                <label htmlFor="meeting_title">Meeting Title</label>
                <input type="text" name="meeting_title" required />
              </div>

              {/* Meeting DateTime */}
              <div className="grid grid-cols-1">
                <label htmlFor="meeting_datetime">Meeting Date & Time</label>
                <input type="datetime-local" name="meeting_datetime" required />
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={handleClose} className="btn">
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Meeting
                </button>
              </div>
            </form>
        </div>
        </Box>
      </Modal>
    </div>
  );
}