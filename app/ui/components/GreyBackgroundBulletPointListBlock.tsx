export default function GreyBackgroundBulletPointListBlock({title = "Technical Skills Development", 
                                                            bulletPoints = ["Cloud Computing", "Cyber Security", "Data Analyst", "IT Support",
                                                            "Project Management", "Software Development", "Web Development", "UX Design"],
                                                            paragraph,
                                                            singleColumn = false} :
                                                            {title?: string, bulletPoints?: Array<string>, paragraph?: string, singleColumn?: boolean}){
    let list = [];
    for(let bullet of bulletPoints){
        list.push(<li>{bullet}</li>);
    }
    
    return(
    <div className="outline outline-2 outline-gray-400 rounded-xl px-4 py-6">
        <div className="space-y-4 text-left items-center">
            <h2 className="font-medium text-blue-textdark">{title}</h2>

            <p className="text-sm">{paragraph}</p>
            <ul className={`${singleColumn ? "columns-1" : "columns-2"} list-square list-inside text-blue-text`}>
                {list}
            </ul>
        </div>
    </div>
    );
}