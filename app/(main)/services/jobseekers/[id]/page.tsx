export default function page({params}:{params: {id:string}}){
    return(
        <main>
            <h1>Job Seeker profile</h1>
            <p>Student is:{params.id}</p>
        </main>
    );
}