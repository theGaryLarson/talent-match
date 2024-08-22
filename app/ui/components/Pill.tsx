export default function pill({text, href}:{text:string, href:string}){
    return (
        <a className="bg-cyan-600 hover:bg-cyan-700 text-white py-0 px-4 rounded-full inline-block mt-1 h-fit" href={href} target="_blank">
            {text}
        </a>
    )
}