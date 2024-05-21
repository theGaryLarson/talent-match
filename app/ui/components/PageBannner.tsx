export default function PageBanner({
    title,
  }: {
    title: string;
  }){
    return (
        <div className="h-80 bg-gray-700 content-center p-24 text-white">
        <p className="text-4xl">{title}</p>
        </div>
    );
}