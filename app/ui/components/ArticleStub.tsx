import Image from "next/image"

export default function ArticleStub({isPhotoFirst, imagesrc}:{isPhotoFirst:boolean, imagesrc:string}){
    return(
        <div className={`flex flex-row ${isPhotoFirst ? "" : "flex-row-reverse"} justify-evenly flex-wrap gap-[42px] 2xl:justify-evenly xl:flex-nowrap`}>
          <Image className="rounded-xl object-contain" src={imagesrc} alt={""} width={600} height={332}/>
            <div className="w-[600px] flex flex-col gap-[32px]">
                <div className="font-['Roboto'] text-xl font-bold capitalize text-neutral-800">
                Become a Mentor
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
              <div className=" inline-flex h-[31px] w-[478px] items-center justify-center">
                <div className="h-[31px] w-[478px] font-['Roboto'] text-base font-normal leading-tight text-slate-500">
                  Cick here to learn more
                </div>
              </div>
            </div>
          </div>
    );
}