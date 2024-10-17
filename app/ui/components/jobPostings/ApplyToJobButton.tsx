'use client'
export default function SaveJobPostButton(params: {id:string}){
    const save = async () => {
        try {
            const response = await fetch(`/api/jobseekers/saveJobPost/${params.id}`, {
              method: 'POST', // or 'PUT', depending on the behavior of your API
              headers: {
                'Content-Type': 'application/json'
              },
            });
        
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('Job post saved successfully:', data);
            return data;
          } catch (error) {
            console.error('Error saving job post:', error);
          }
    }
return <button onClick={save}>Apply</button>
}