export interface TeamMember {
  name: string;
  institution: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  profileUrl?: string;
  profileLabel?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Dr. Peter HU Dongpin",
    institution: "The Education University of Hong Kong",
    role: "Educational researcher · Application developer",
    bio: "His work spans technology-enhanced learning, learning analytics, artificial intelligence in education, network analysis, and content and language integrated learning.",
    image: "/team/peter-hu-dongpin.png",
    imageAlt: "Portrait of Dr. Peter HU Dongpin",
    imagePosition: "center 24%",
    profileUrl: "https://repository.eduhk.hk/en/persons/dongpin-hu/",
    profileLabel: "EdUHK profile",
  },
  {
    name: "Prof. Eric Hamilton",
    institution: "Pepperdine University",
    role: "Jan and Robert Davidson Endowed Professor of Education and Technology",
    bio: "A learning scientist and technologist whose work connects technology innovation, global collaboration, and quantitative ethnography.",
    image: "/team/eric-hamilton.png",
    imageAlt: "Portrait of Prof. Eric Hamilton",
    imagePosition: "center 24%",
    profileUrl: "https://gsep.pepperdine.edu/about/our-people/faculty/eric-hamilton/",
    profileLabel: "Pepperdine profile",
  },
  {
    name: "Prof. Sandy TU Yun-Fang",
    institution: "Soochow University, Taiwan",
    role: "Data science · Learning analytics",
    bio: "Her research spans generative AI in education, digital learning, educational data mining, learner-behavior analysis, and visual and social network analysis.",
    image: "/team/sandy-tu-yun-fang.jpg",
    imageAlt: "Portrait of Prof. Sandy TU Yun-Fang",
    imagePosition: "center 22%",
    profileUrl: "https://www-en.scu.edu.tw/news/2093",
    profileLabel: "Soochow University",
  },
  {
    name: "Ms. Shirleen XU Qiaolin",
    institution: "Meredith College",
    role: "Open ENA team",
    bio: "A member of the Open ENA team affiliated with Meredith College.",
    image: "/team/shirleen-xu-qiaolin.png",
    imageAlt: "Portrait of Ms. Shirleen XU Qiaolin",
    imagePosition: "center 26%",
  },
];
