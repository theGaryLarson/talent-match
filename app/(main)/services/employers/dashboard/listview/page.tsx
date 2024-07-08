
import JobSeekerCardView from '@/app/ui/components/JobSeekerCardView';
import SearchBar from '@/app/ui/components/SearchBar';
import { getUsers } from '@/app/lib/prisma';
import { GetServerSideProps } from 'next';
const jobSeekers = [
  {
    isLarge: true,
    name: 'Alex Johnson',
    school: 'Stanford University',
    pathway: 'Data Science',
    skillsList: ['python', 'r', 'sql', 'tableau'],
    pfpPicSrc:
      'https://media.istockphoto.com/id/1292475584/photo/headshot-portrait-of-smiling-biracial-man-posing.webp?b=1&s=170667a&w=0&k=20&c=i2v7YzPvKM68hvetTCyjojBfUbdahyi7h_STDYEzfZk=',
    aboutMe:
      'Data Science enthusiast with a passion for uncovering insights through data analysis and visualization. Experienced with Python, R, SQL, and Tableau. Eager to apply my knowledge to real-world problems.',
  },
  {
    isLarge: true,
    name: 'Morgan Lee',
    school: 'MIT',
    pathway: 'Software Engineering',
    skillsList: ['c++', 'java', 'kotlin', 'docker'],
    pfpPicSrc:
      'https://media.istockphoto.com/id/1144287292/photo/headshot-portrait-of-happy-mixed-race-african-girl-wearing-glasses.jpg?s=612x612&w=0&k=20&c=cdW-kkerUEhV80xLvE-Jg8Zpf4sR5YTR2YiH3K5IkNQ=',
    aboutMe:
      'Software Engineer with a strong background in C++, Java, and Kotlin. Passionate about developing scalable and efficient software solutions. Proficient with Docker and containerization.',
  },
  {
    isLarge: true,
    name: 'Jordan Smith',
    school: 'Harvard University',
    pathway: 'Cyber Security',
    skillsList: ['networking', 'linux', 'python', 'penetration testing'],
    pfpPicSrc:
      'https://media.istockphoto.com/id/1288538088/photo/portrait-young-confident-smart-asian-businessman-look-at-camera-and-smile.jpg?s=612x612&w=0&k=20&c=qkOwVHZFC-fbtbTnufVGaXFhnQBcfEjzbu5ThSXVLR0=',
    aboutMe:
      'Cyber Security specialist with a keen interest in network security, Linux systems, and penetration testing. Skilled in Python scripting for security automation. Committed to protecting data and systems.',
  },
  {
    isLarge: true,
    name: 'Shawn Brown',
    school: 'Carnegie Mellon University',
    pathway: 'Artificial Intelligence',
    skillsList: ['tensorflow', 'pytorch', 'python', 'machine learning'],
    pfpPicSrc:
      'https://t3.ftcdn.net/jpg/03/91/34/72/360_F_391347204_XaDg0S7PtbzJRoeow3yWO1vK4pnqBVQY.jpg',
    aboutMe:
      'AI enthusiast focused on machine learning and deep learning. Proficient in TensorFlow, PyTorch, and Python. Passionate about developing innovative AI solutions to solve complex problems.',
  },
  {
    isLarge: true,
    name: 'Casey White',
    school: 'University Of California, Berkeley',
    pathway: 'Web Development',
    skillsList: ['javascript', 'html', 'css', 'react'],
    pfpPicSrc:
      'https://media.istockphoto.com/id/1560360283/photo/confident-smiling-young-asian-business-woman-in-office-headshot-portrait.webp?b=1&s=170667a&w=0&k=20&c=s7wgWSfWCU5YJRelANTDiiH_NNEUJG0pkRkG5Q0UMwA=',
    aboutMe:
      'Web Developer with expertise in JavaScript, HTML, CSS, and React. Passionate about creating responsive and user-friendly web applications. Dedicated to continuous learning and improvement.',
  },
  {
    isLarge: true,
    name: 'Drew Green',
    school: 'Caltech',
    pathway: 'Robotics',
    skillsList: ['ros', 'c++', 'python', 'matlab'],
    pfpPicSrc:
      'https://media.istockphoto.com/id/1467553187/photo/portrait-of-handsome-smiling-young-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=Vj5uyriPr8XlhRoFvEmIPBKwevab6aqMlMYjYyYTQfs=',
    aboutMe:
      'Robotics engineer with a strong foundation in ROS, C++, Python, and MATLAB. Passionate about designing and programming autonomous systems. Committed to advancing robotics technology.',
  },
  {
    isLarge: true,
    name: 'Riley Black',
    school: 'University Of Texas',
    pathway: 'Mobile Development',
    skillsList: ['swift', 'kotlin', 'flutter', 'react native'],
    pfpPicSrc: '',
    aboutMe:
      'Mobile Developer skilled in Swift, Kotlin, Flutter, and React Native. Focused on creating intuitive and efficient mobile applications. Passionate about mobile technology and user experience.',
  },
  {
    isLarge: true,
    name: 'Jamie Gray',
    school: 'University Of Michigan',
    pathway: 'Cloud Computing',
    skillsList: ['aws', 'azure', 'gcp', 'terraform'],
    pfpPicSrc: '',
    aboutMe:
      'Cloud Computing expert with experience in AWS, Azure, GCP, and Terraform. Skilled in cloud infrastructure and deployment automation. Committed to optimizing cloud resources and performance.',
  },
  {
    isLarge: true,
    name: 'Peyton Reed',
    school: 'Georgia Institute Of Technology',
    pathway: 'DevOps',
    skillsList: ['jenkins', 'docker', 'kubernetes', 'ansible'],
    pfpPicSrc: '',
    aboutMe:
      'DevOps Engineer experienced with Jenkins, Docker, Kubernetes, and Ansible. Passionate about automating and streamlining development processes. Focused on improving efficiency and collaboration.',
  },
  {
    isLarge: true,
    name: 'Quinn Davis',
    school: 'Princeton University',
    pathway: 'Game Development',
    skillsList: ['unity', 'c#', 'blender', 'unreal engine'],
    pfpPicSrc: '',
    aboutMe:
      'Game Developer with expertise in Unity, C#, Blender, and Unreal Engine. Passionate about creating immersive gaming experiences. Dedicated to pushing the boundaries of interactive entertainment.',
  },
];

export default async function page() {
  const jobSeekers = await getUsers();
  return (
    <main className="space-y-8 px-[200px] py-16">
      <h1 className="text-2xl">Search Results</h1>
      <SearchBar />
      {jobSeekers.map((jobSeeker, index) => (
        <JobSeekerCardView
          key={index}
          isLarge={true}
          name={jobSeeker.name}
          school={"Place Holder U"}
          pathway={"pathway"}
          skillsList={["JavaScript","skill2","skill3"]}
          pfpPicSrc={jobSeeker.image}
          aboutMe={"This is a short bio about myself "}
        />
      ))}
    </main>
  );
}
