import RoundedButton from "./RoundedButton";

export default function PageBanner({
    title,bg
  }: {
    title: string;
    bg: string;
  }){
    return (
      <div
      className={"h-96 content-center p-24 text-white bg-cover bg-center "+ bg}
    >
      {/* <img src={src}></img> */}
      <div className="w-80 bg-gray-trans rounded-xl p-10 space-y-5">
      <p className="text-4xl font-bold ">{title}</p>
      <RoundedButton content={"SIGN UP"} link={"/#"}/>
      </div>
      
    </div>
    );
}