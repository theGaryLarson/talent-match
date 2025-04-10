import RoundedButton from "../RoundedButton";

export default function MarketingCards() {
  return (
    <div>
      <MarketCard />
    </div>
  );
}
function MarketCard() {
  return (
    <div className="bg-gray-200 p-[32px] rounded-4xl">
      <TextHalf />
    </div>
  );
}

function TextHalf() {
  return (
    <div className="max-w-[600px] space-y-[32px]">
      <h3 className="portfolio text-5xl capitalize leading-[58px]">
        Create Externships Tailored to Your Needs
      </h3>
      <p>
        Collaborate with our skilled candidates on real projects. Observe their
        skills, teamwork, and problem-solving abilities firsthand before making
        a hiring decision. Shape projects to meet your specific hiring needs and
        evaluate potential hires in a real-world setting.
      </p>
      <RoundedButton
        content={"More Info Coming Soon"}
        invertColor={true}
        link="/underconstruction"
        disabled={true}
      />
    </div>
  );
}
