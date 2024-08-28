import Head from 'next/head'
export default function page(){
    return(
        <div>
        <Head>
        <title>My page title</title>
        </Head>
        <div className="container h-[700px] mx-auto flex flex-col items-center justify-center space-y-8 px-8 py-16 md:px-12 lg:px-16">
        <h1 className="text-6xl">Sorry This page is currently under construction</h1>
        </div>
        </div>
    );
}