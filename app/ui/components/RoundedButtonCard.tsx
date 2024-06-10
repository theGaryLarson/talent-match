import RoundedButton from './RoundedButton';

export default function RoundedButtonCard(props: {
  title: string;
  desc: string;
  callToAction: string;
  buttonText: string;
  link: string;
}) {
  return (
    <div className="border-box m-7 flex w-[36rem] flex-col space-y-7 rounded-2xl border border-solid border-black px-5 py-5 shadow">
      <strong>{props.title}</strong>
      <p>{props.desc}</p>
      <strong>{props.callToAction}</strong>
      <RoundedButton content={props.buttonText} link={'/#'} invertColor={true} />
    </div>
  );
}
