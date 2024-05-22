import Link from 'next/link';

export default function RoundedButton(props: { content: string }) {
  return (
    <Link
      href={'/#'}
      className="box-border inline-block w-fit rounded-full bg-blue-background px-14 py-3 text-white hover:bg-blue-400"
    >
      <strong>{props.content}</strong>
    </Link>
  );
}
