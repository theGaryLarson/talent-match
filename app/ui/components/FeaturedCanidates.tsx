import JobSeekerCardView from "./JobSeekerCardView";

export default function FeaturedCanidates(){
    return(
    <div>
    <h2 className="text-lg font-bold py-5">Featured candidates</h2>
      <div className="flex flex-wrap gap-5">
        <JobSeekerCardView
          isLarge={false}
          name="Alex Johnson"
          school="Stanford University"
          pathway="Data Science"
          skillsList={['python', 'r', 'sql', 'tableau']}
          pfpPicSrc="https://media.istockphoto.com/id/1292475584/photo/headshot-portrait-of-smiling-biracial-man-posing.webp?b=1&s=170667a&w=0&k=20&c=i2v7YzPvKM68hvetTCyjojBfUbdahyi7h_STDYEzfZk="
          aboutMe="Data Science enthusiast with a passion for uncovering insights through data analysis and visualization. Experienced with Python, R, SQL, and Tableau. Eager to apply my knowledge to real-world problems."
        />

        <JobSeekerCardView
          isLarge={false}
          name="Morgan Lee"
          school="MIT"
          pathway="Software Engineering"
          skillsList={['c++', 'java', 'kotlin', 'docker']}
          pfpPicSrc="https://media.istockphoto.com/id/1144287292/photo/headshot-portrait-of-happy-mixed-race-african-girl-wearing-glasses.jpg?s=612x612&w=0&k=20&c=cdW-kkerUEhV80xLvE-Jg8Zpf4sR5YTR2YiH3K5IkNQ="
          aboutMe="Software Engineer with a strong background in C++, Java, and Kotlin. Passionate about developing scalable and efficient software solutions. Proficient with Docker and containerization."
        />

        <JobSeekerCardView
          isLarge={false}
          name="Jordan Smith"
          school="Harvard University"
          pathway="Cyber Security"
          skillsList={['networking', 'linux', 'python', 'penetration testing']}
          pfpPicSrc="https://media.istockphoto.com/id/1288538088/photo/portrait-young-confident-smart-asian-businessman-look-at-camera-and-smile.jpg?s=612x612&w=0&k=20&c=qkOwVHZFC-fbtbTnufVGaXFhnQBcfEjzbu5ThSXVLR0="
          aboutMe="Cyber Security specialist with a keen interest in network security, Linux systems, and penetration testing. Skilled in Python scripting for security automation. Committed to protecting data and systems."
        />

        <JobSeekerCardView
          isLarge={false}
          name="Shawn Brown"
          school="Carnegie Mellon University"
          pathway="Artificial Intelligence"
          skillsList={['tensorflow', 'pytorch', 'python', 'machine learning']}
          pfpPicSrc="https://t3.ftcdn.net/jpg/03/91/34/72/360_F_391347204_XaDg0S7PtbzJRoeow3yWO1vK4pnqBVQY.jpg"
          aboutMe="AI enthusiast focused on machine learning and deep learning. Proficient in TensorFlow, PyTorch, and Python. Passionate about developing innovative AI solutions to solve complex problems."
        />
      </div>
    </div>
)}