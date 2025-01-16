export default function AddProviderProgramsFrom(props:{providerId:string}){
    //todo on submit hit this api: app/api/edu-providers/programs/add
    return(
        <form className="border">
            <legend className="text-xl">Add Programs</legend>
            <p>This will be the form to add a program, not implemented yet {props.providerId}</p>
        </form>
    );
}