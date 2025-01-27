export default function GreyBackgroundBulletPointListBlock({
  title = "Technical Skills Development",
  bulletPoints = [
    "Cloud Computing",
    "Cyber Security",
    "Data Analyst",
    "IT Support",
    "Project Management",
    "Software Development",
    "Web Development",
    "UX Design",
  ],
  paragraph,
  singleColumn = false,
}: {
  title?: string;
  bulletPoints?: Array<any>;
  paragraph?: string;
  singleColumn?: boolean;
}) {
  let buildBulletList = (bullets: Array<any>) => {
    let list = [];
    for (let bullet of bullets) {
      let element;
      if (Array.isArray(bullet)) {
        let subBullets = buildBulletList(bullet.slice(1));
        element = (
          <li>
            <p className="bg-blue-square bg-no-repeat bg-left pl-8">
              {bullet[0]}
            </p>
            <ul className="list-inside pl-8">{subBullets}</ul>
          </li>
        );
      } else {
        element = (
          <li>
            <p className="bg-blue-square bg-no-repeat bg-left pl-8">{bullet}</p>
          </li>
        );
      }
      list.push(element);
    }
    return list;
  };

  let list = buildBulletList(bulletPoints);

  return (
    <div className="outline outline-2 outline-gray-400 rounded-xl px-4 py-6">
      <div className="space-y-4 text-left items-center">
        <h2 className="font-medium text-blue-text2">{title}</h2>

        <p className="text-sm">{paragraph}</p>
        <ul
          className={`${singleColumn ? "columns-1" : "columns-2"} leading-10 list-inside text-blue-text2`}
        >
          {list}
        </ul>
      </div>
    </div>
  );
}
