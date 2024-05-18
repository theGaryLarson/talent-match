import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image'
export default function Cfalogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
      alt="Picture of the author"
      src="/cfa_images/cfaLogoWithName.jpg"
      width={240}
      height={70}
      />
    </div>
  );
}
