import RoundedButton from './RoundedButton';

export default function RoundedButtonCard(props: {
  title: string;
  desc: string;
  callToAction: string;
  buttonText: string;
  link: string;
}) {
  return (
    <div className="border-box flex max-w-[400px] min-w-[375px] flex-col space-y-2 rounded-2xl border border-solid border-black px-5 py-5 shadow">
      <strong>{props.title}</strong>
      <p>{props.desc}</p>
      <strong>{props.callToAction}</strong>
      <div className='flex justify-end'><RoundedButton content={props.buttonText} link={'/#'} invertColor={true} /></div>
    </div>
  );
}
