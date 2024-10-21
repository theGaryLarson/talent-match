'use client'
export default function SaveJobPostButton(params: {id:string}){
    const save = async (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
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
            button.textContent = 'Saved'
            const data = await response.json();
            console.log('Job post saved successfully:', data);
            return data;
          } catch (error) {
            console.error('Error saving job post:', error);
          }
    }
return <button onClick={save} className="box-border inline-block w-fit rounded-full bg-blue-background px-10 py-3 text-white hover:bg-blue-400">Save</button>
}