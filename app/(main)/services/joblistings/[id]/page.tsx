export default async function page({params}:{params: {id:string}}){
    return(
        <main className="space-y-3 py-8 mx-4 md:mx-[150px] lg:mx-[200px] font-['Roboto']">
            <h1 className="text-xl">{params.id}</h1>
        </main>


    );}