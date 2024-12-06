'use client'
import { CareerPrepStatus } from '@/app/lib/admin/careerPrep';
import { CareerPrepTrack } from '@/app/lib/poolAssignment';

export default function RecomendedTrackDropDown(props: {
  careerPrepTrack: CareerPrepTrack|undefined;
  jobseekerId:string
}) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        //todo add fetch call here to update status
        console.log("TRACK IS: ", props.careerPrepTrack )
        const newStatus = event.target.value as CareerPrepTrack;
        console.log("change detected: ", props.jobseekerId)
        fetch('/api/admin/career-prep/update-recomended-track/', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jobseekerId: props.jobseekerId, 
            track: newStatus
          }),
        }).then((response) => {
          if (!response.ok) {
            event.target.value = props.careerPrepTrack??'';
            throw new Error('Failed to update status');
            
          }
          return response.json();
        })
        .then((data) => {
          console.log('Status updated successfully:', data);
        })
        .catch((error) => {
          console.error('Error updating status:', error);
        });
    };
  return (
    <select onChange={handleChange} defaultValue={props.careerPrepTrack}>
      {props.careerPrepTrack == undefined ? (
        <option>Unknown</option>
      ) : (
        ''
      )}
      {Object.values(CareerPrepTrack).map((stat) => (
        <option
          key={stat}
          value={stat}
        //   selected={stat == props.careerPrepEnrollmentStatus}
        >
          {stat}
        </option>
      ))}
    </select>
  );
}
