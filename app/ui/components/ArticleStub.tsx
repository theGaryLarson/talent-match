import Image from "next/image"
import Link from "next/link";

export default function ArticleStub({isPhotoFirst, imagesrc}:{isPhotoFirst:boolean, imagesrc:string}){
    return(
        <div className={`flex flex-row ${isPhotoFirst ? "" : "flex-row-reverse"} justify-evenly flex-wrap gap-[42px] desktop:justify-evenly laptop:flex-nowrap`}>
          <Image className="rounded-xl object-contain" src={imagesrc} alt={""} width={600} height={332}/>
            <div className="max-w-[600px] flex flex-col gap-[32px]">
                <div className="font-['Roboto'] text-xl font-bold capitalize text-neutral-800">
                Become a Volunteer
                </div>
                  <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
                  </p>
                  <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolo.{' '}
                  </p>
                <Link href={'/#'}>
                  Cick here to learn more
                </Link>
            </div>
          </div>
    );
}