export default function Pill({text}: { text: string }) {
    return (
        <button className="bg-blue-background hover:bg-blue-700 text-white mt-1 py-0 px-4 rounded-full">
            {text}
        </button>
    )
}