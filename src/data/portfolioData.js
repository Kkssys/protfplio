import food from "../assets/food.jpg";
import ff from "../assets/ff.jpg";
import movie from "../assets/movie.jpg";



export const personalInfo = {
  name: "Dinesh G",
  title: "Computer Science Student",
  email: "dineshgovinadaraj212@gmail.com",
  location: "Thoothukudi, Tamil Nadu , India",
  github: "https://github.com/Kkssys",
  linkedin: "https://www.linkedin.com/in/dinesh-g-388174259/",
  bio: "I am a final-year Computer Science student with a proactive mindset and a strong passion for continuous learning. I am  skilled in adapting to new technologies, solving complex problems, and working effectively both independently and as part of a team."
};

export const experiences = [
  {
    id: 1,
    company: "SPIC Pvt Ltd",
    position: "SAP Consultangt Intern",
    duration: "March 2023 - April 2023",
    description: [
      "Experienced SAP Product Management professional with expertise in managing end-to-end SAP product lifecycle and gained kownlodge in MM (Material Management)."
    ],
    technologies: ["SAP" , "Networking"]
  },
//   {
//     id: 2,
//     company: "University Research Lab",
//     position: "Research Assistant",
//     duration: "September 2022 - Present",
//     description: [
//       "Conducted research on machine learning algorithms for natural language processing",
//       "Implemented data preprocessing pipelines for large-scale text datasets",
//       "Co-authored a paper accepted to the Undergraduate Research Symposium"
//     ],
//     technologies: ["Python", "TensorFlow", "Pandas", "scikit-learn"]
//   },
//   {
//     id: 3,
//     company: "Code for Good Nonprofit",
//     position: "Volunteer Developer",
//     duration: "January 2023 - May 2023",
//     description: [
//       "Built a volunteer management system for a local food bank",
//       "Worked in a team of 5 developers using Git for version control",
//       "Conducted user testing and incorporated feedback to improve UI/UX"
//     ],
//     technologies: ["React", "Firebase", "CSS", "JavaScript"]
//   }
];

export const projects = [
  {
    id: 1,
    title: "Digital Food Donation & Redistribution Platform",
    description: "Built a real-time web platform to reduce food waste by connecting donors, volunteers, and recipients using location-based matching, OTP verification, and live tracking .",
    technologies: ["React", "Node.js", "MongoDB", "Express.js"],
    // github:",
    // demo: "https://taskflow-demo.netlify.app",
    image: food
  },
  {
    id: 2,
    title: "Fake face detection",
    description: "Fake face detection using Machine Learning (ML) is the process of identifying whether a given image of areal (captured from an actual person) or fake (AI-generated).",
    technologies: ["Python", "HTML5", "CSS3", "API Integration"],
    // github: "https://github.com/alexjohnson/weather-dashboard",
    // demo: "https://weather-dashboard-demo.netlify.app",
    image: ff
  },
  {
    id: 3,
    title: "Movie Ticket Booking System",
    description: "Developed a web application that enables users to book movie tickets with real-time seat availability and scheduling features.",
    technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    // github: "https://github.com/alexjohnson/ecotrack",
    // demo: "https://ecotrack-demo.netlify.app",
    image: movie
  }
];