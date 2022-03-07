import {
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiMaterialui,
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
    completed: "false",
  },
  {
    name: "Colors App",
    description: "Massive Color App Project",
    repositoryURL: "https://github.com/NimajF/Colors-App",
    skills: [
        <SiCss3 />,
        <SiReact />,
        <SiReactrouter/>,
        <SiMaterialui/>
      ],
    completed: "true",
  },
  {
    name: "React nickname generator",
    description: "A React version of my 1st JS/CSS project.",
    repositoryURL: "https://github.com/NimajF/react-nickgenerator",
    skills: [
        <SiCss3 />,
        <SiReact />,
      ],
    completed: "true",
  },
  {
    name: "Simple React Todo-List",
    description:
      "A simple TodoList w/ useReducer - LocalStorage - React.memo - Material UI",
    repositoryURL: "https://github.com/NimajF/Simple-React-TodoList",
    skills: [
        <SiCss3 />,
        <SiReact />,
        <SiMaterialui/>
      ],
    completed: "true",
  },
  {
    name: "DadJokesAPP ",
    description: "Pitiful Dad-Jokes APP w/ API",
    repositoryURL: "https://github.com/NimajF/DadJokesAPP",
    skills: [
        <SiCss3 />,
        <SiReact />,
      ],
    completed: "true",
  },
  {
    name: "NickGenerator",
    description: "A simple nick generator and my very first page!",
    repositoryURL: "https://github.com/NimajF/NickGenerator",
    skills: [
        <SiHtml5/>,
        <SiCss3 />,
        <SiJavascript />,
      ],
    completed: "true",
  },
];

export default projects;
