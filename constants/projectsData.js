import {
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiMaterialui,
  SiFramer,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiReact,
  SiReactrouter,
  SiNextdotjs,
  SiNodedotjs,
} from "react-icons/si";

const projects = [
  {
    name: "Cake Shop",
    description: "A REAL PROJECT. Cakes and breakfasts Shop",
    repositoryURL: "https://github.com/NimajF/Cake-Shop",
    skills: [
      <SiHtml5 />,
      <SiCss3 />,
      <SiJavascript />,
      <SiMongodb />,
      <SiNextdotjs />,
    ],
    completed: false,
    screenshot: "/cake.jpg",
  },
  {
    name: "Umarket",
    description: "Umarket, my first Full-Stack project!",
    repositoryURL: "https://github.com/NimajF/Umarket",
    skills: [
      <SiHtml5 />,
      <SiCss3 />,
      <SiBootstrap />,
      <SiJavascript />,
      <SiExpress />,
      <SiMongodb />,
      <SiNodedotjs />,
    ],
    completed: false,
    screenshot: "/Homepage.png",
  },
  {
    name: "Colors App",
    description: "Massive Color App Project.",
    repositoryURL: "https://github.com/NimajF/Colors-App",
    site: "https://nimajf.github.io/Colors-App/",
    skills: [<SiCss3 />, <SiReact />, <SiReactrouter />, <SiMaterialui />],
    completed: true,
    screenshot: "/ColorsApp.png",
  },
  {
    name: "YelpCamp",
    description: "Final Project of The Web Developer Bootcamp 2022.",
    repositoryURL: "https://github.com/NimajF/YelpCamp",
    site: "http://aqueous-atoll-10078.herokuapp.com",
    skills: [
      <SiJavascript />,
      <SiBootstrap />,
      <SiExpress />,
      <SiMongodb />,
      <SiNodedotjs />,
    ],
    completed: true,
    screenshot: "/YelpCamp.PNG",
  },
  {
    name: "Portfolio",
    description: "Personal Webpage.",
    repositoryURL: "https://github.com/NimajF/portfolio",
    site: null,
    skills: [<SiCss3 />, <SiFramer />, <SiReact />, <SiNextdotjs />],
    completed: false,
    screenshot: "/portfolio.PNG",
  },
  {
    name: "React NickGenerator",
    description: "A React version of my 1st JS/CSS project.",
    repositoryURL: "https://github.com/NimajF/react-nickgenerator",
    site: "https://nimajf.github.io/react-nickgenerator/",
    skills: [<SiCss3 />, <SiReact />],
    completed: true,
    screenshot: "/ReactNickGen.png",
  },
  {
    name: "DadJokesAPP ",
    description: "Pitiful Dad-Jokes APP w/ API.",
    repositoryURL: "https://github.com/NimajF/DadJokesAPP",
    site: "https://nimajf.github.io/DadJokesAPP/",
    skills: [<SiCss3 />, <SiReact />],
    completed: true,
    screenshot: "/DadJokes.png",
  },
  {
    name: "Simple React Todo-List",
    description:
      "A simple TodoList w/ useReducer - LocalStorage - React.memo - Material UI.",
    repositoryURL: "https://github.com/NimajF/Simple-React-TodoList",
    site: "https://nimajf.github.io/Simple-React-TodoList/",
    skills: [<SiCss3 />, <SiReact />, <SiMaterialui />],
    completed: true,
    screenshot: "/ReactTodoList.png",
  },

  {
    name: "NickGenerator",
    description: "A simple nick generator and my very first page!",
    repositoryURL: "https://github.com/NimajF/NickGenerator",
    site: "https://nimajf.github.io/NickGenerator/",
    skills: [<SiHtml5 />, <SiCss3 />, <SiJavascript />],
    completed: true,
    screenshot: "/NickGen.PNG",
  },
];

export default projects;
