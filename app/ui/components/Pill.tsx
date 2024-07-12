export default function pill({text, href}:{text:string, href:string}){
    return (
        <a className="bg-blue-background hover:bg-blue-700 text-white py-0 px-4 rounded-full inline-block mt-1" href={href} target="_blank">
            {text}
        </a>
    )
}