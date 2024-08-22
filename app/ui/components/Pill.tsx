export default function Pill({ text, href, grayscale }: {
    text: string,
    href: string,
    grayscale: boolean
}) {
    var pill = <a className="bg-cyan-600 hover:bg-cyan-700 text-white py-0 px-4 rounded-full inline-block mt-1 h-fit" href={href} target="_blank">
        {text}
    </a>;

    if (grayscale) pill = <a className="bg-slate-700 hover:bg-slate-900 text-white py-0 px-4 rounded-full inline-block mt-1 h-fit" href={href} target="_blank">
        {text}
    </a>;
    return (pill);
}