import JobSeekerCardView from "@/app/ui/components/JobSeekerCardView";

export default function page(){
    return(
        <main className="py-16 px-[200px] space-y-8">
            <JobSeekerCardView isLarge={true} name={"Damien Cruz"} school={"University Of Washington"} pathway={"Web Devolpment"} skillsList={["java", "rust","react","figma"]}/>
            <JobSeekerCardView isLarge={true} name={"Damien Cruz"} school={"University Of Washington"} pathway={"Web Devolpment"} skillsList={["java", "rust","react","figma"]}/>
            <JobSeekerCardView isLarge={true} name={"Damien Cruz"} school={"University Of Washington"} pathway={"Web Devolpment"} skillsList={["java", "rust","react","figma"]}/>
            <JobSeekerCardView isLarge={true} name={"Damien Cruz"} school={"University Of Washington"} pathway={"Web Devolpment"} skillsList={["java", "rust","react","figma"]}/>
        </main>
    );
}