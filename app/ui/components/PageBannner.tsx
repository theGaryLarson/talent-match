import RoundedButton from "./RoundedButton";

export default function PageBanner({
  title,
  bg,
  buttonText,
  buttonLink,
}: {
  title: string;
  bg: string;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <div
      className={
        "h-[420px] content-center bg-blend-darken p-4 tablet:p-10 laptop:p-20 text-white bg-[#047F9C4D] bg-cover bg-center " +
        bg
      }
    >
      {/* <img src={src}></img> */}
      <div className="max-w-[540px] h-[230px] bg-blue-trans rounded-xl p-10 space-y-5 flex items-center">
        <p className="text-4xl font-bold ">{title}</p>
        {/* <div className="REPLACE-BEFORE-RELEASE"><RoundedButton content={buttonText} link={buttonLink} invertColor={false}/></div> */}
      </div>
    </div>
  );
}
