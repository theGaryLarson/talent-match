import Link from 'next/link';

export default function RoundedButton(props: { content: string, link:string, invertColor:boolean}) {
  return (
    props.invertColor?<Link
      href={props.link}
      className="box-border inline-block w-fit rounded-full bg-blue-background px-14 py-3 text-white hover:bg-blue-400"
    >
      <strong>{props.content}</strong>
    </Link>
    :
    <Link
      href={props.link}
      className="box-border border inline-block w-fit rounded-full bg-white px-14 py-3 text-blue-text hover:bg-gray-200"
    >
      <strong>{props.content}</strong>
    </Link>

  );
}
