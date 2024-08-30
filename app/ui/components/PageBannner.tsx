import RoundedButton from "./RoundedButton";

export default function PageBanner({
    title,bg
  }: {
    title: string;
    bg: string;
  }){
    return (
      <div
      className={"h-[420px] content-center bg-blend-darken p-4 tablet:p-10 laptop:p-20 text-white bg-[#047F9C4D] bg-cover bg-center "+ bg}
    >
      {/* <img src={src}></img> */}
      <div className="max-w-[540px] bg-blue-trans rounded-xl p-10 space-y-5">
      <p className="text-4xl font-bold ">{title}</p>
      <RoundedButton content={"SIGN UP"} link={"/signup"} invertColor={false}/>
      </div>
      
    </div>
    );
}