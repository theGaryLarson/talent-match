export default function InfoCard({title, paragraph} : {title:string, paragraph:string}){
    return (
    <div className = "flex flex-col text-center gap-4">
        <div className="w-[105px] h-[75px] self-center bg-neutral-800 rounded-xl"></div>
        <strong>{title}</strong>
        <p>{paragraph}</p>
    </div>
    );
}