export default function VideoBlock(){
    return (
        <div>
        <h2 className="py-7 text-lg font-bold text-center">Welcome to CFA Career Services</h2>
        <iframe className="px-20 w-full aspect-video" src="https://www.youtube.com/embed/cV2gBU6hKfY?si=RuLYZH2_hP3e37jD" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    );
}