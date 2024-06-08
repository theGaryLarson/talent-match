export default function GreyBackgroundBulletPointListBlock({title = "Technical Skills Development", 
                                                            bulletPoints = ["Cloud Computing", "Cyber Security", "Data Analyst", "IT Support",
                                                            "Project Management", "Software Development", "Web Development", "UX Design"],
                                                            singleColumn = false} :
                                                            {title?: string, bulletPoints?: Array<string>, singleColumn?: boolean}){
    let list = [];
    for(let bullet of bulletPoints){
        list.push(<li>{bullet}</li>);
    }
    
    return(
    <div className="bg-gray-300 rounded-2xl">
        <h2 className="py-7 text-lg font-bold text-center">{title}</h2>
        <ul className={`columns-1 ${singleColumn ? "" : "lg:columns-2"} list-square list-inside px-16 pb-20 text-blue-600`}>
            {list}
        </ul>
    </div>
    );
}