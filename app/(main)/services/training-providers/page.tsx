import TrainingProviderMembers from '@/app/ui/components/TrainingProviderMembers';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
    return (
        <main>
            <div className="px-64 flex-col justify-start items-center gap-5 inline-flex">
                <div className="self-stretch flex-col justify-center items-center gap-6 flex">
                    <div className="mt-24 mb-12 self-stretch text-center text-cyan-700 text-6xl font-normal font-['Roboto'] capitalize leading-10">
                        Coalition Training Providers
                    </div>
                    <div className="self-stretch"><span className="text-red-600 text-xl font-normal font-['Roboto'] leading-loose">
                        [NEED COPY FROM MARKETING - MICHAEL, SCOTTY, JIM]</span><span className="text-zinc-900 text-xl font-normal font-['Roboto'] leading-loose"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.</span>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <TrainingProviderMembers></TrainingProviderMembers>
            </div>
        </main>
    );
}