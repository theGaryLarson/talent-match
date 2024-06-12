import JobSeekerCardView from "@/app/ui/components/JobSeekerCardView";
import SearchBar from "@/app/ui/components/SearchBar";

export default function page(){
    return(
        <main className="py-16 px-[200px] space-y-8">
            <h1 className="text-2xl">Search Results</h1>
            <SearchBar/>
            <JobSeekerCardView isLarge={true} name={"Damien Cruz"} school={"University Of Washington"} pathway={"Web Devolpment"} skillsList={["java", "rust","react","figma"]}/>
            <JobSeekerCardView isLarge={true} name={"Damien Cruz"} school={"University Of Washington"} pathway={"Web Devolpment"} skillsList={["java", "rust","react","figma"]}/>
            <JobSeekerCardView isLarge={true} name={"Damien Cruz"} school={"University Of Washington"} pathway={"Web Devolpment"} skillsList={["java", "rust","react","figma"]}/>
            <JobSeekerCardView isLarge={true} name={"Damien Cruz"} school={"University Of Washington"} pathway={"Web Devolpment"} skillsList={["java", "rust","react","figma"]}/>
        </main>
    );
}