import RoundedButton from "./RoundedButton";

export default function PageBanner({
    title,bg
  }: {
    title: string;
    bg: string;
  }){
    return (
      <div
      className={"h-96 content-center bg-blend-darken p-4 md:p-10 lg:p-20 text-white bg-[#00000066] bg-cover bg-center "+ bg}
    >
      {/* <img src={src}></img> */}
      <div className="w-80 bg-blue-trans rounded-xl p-10 space-y-5">
      <p className="text-4xl font-bold ">{title}</p>
      <RoundedButton content={"SIGN UP"} link={"/signup"} invertColor={false}/>
      </div>
      
    </div>
    );
}