import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
const skillList = [
  {
    skill: "HTML",
    level: "advanced",
    color: "lavender",
  },
  {
    skill: "React",
    level: "beginner",
    color: "skyblue",
  },
  {
    skill: "CSS",
    level: "advanced",
    color: "hotpink",
  },
  {
    skill: "Javascript",
    level: "intermediate",
    color: "yellow",
  },
  {
    skill: "Tailwind css",
    level: "advanced",
    color: "coral",
  },
];
function Avatar() {
  return <img src="./images.jpg" alt="levi" className="avatar"></img>;
}
function Intro() {
  return (
    <div className="data">
      <h1>Debjit Adhikari</h1>
      <p>
        I am Debjit a BCA student. Currently learning Full-stact web
        developement. Coding is my playground. Wanna get my dream job to
        fullfill my dream.
      </p>
    </div>
  );
}
function Skill({ skillObj }) {
  let emoji = "";
  if (skillObj.level === "beginner") emoji = "🦝";
  else if (skillObj.level === "advanced") emoji = "🤙";
  else emoji = "⚡";

  return (
    <h3 className="skill" style={{ backgroundColor: skillObj.color }}>
      {skillObj.skill}
      {emoji}
    </h3>
  );
}
function SkillList() {
  return (
    <div className="skill-list">
      {skillList.map((skill) => (
        <Skill skillObj={skill}></Skill>
      ))}
      {/* <Skill name="HTML🤙" bg="lavender"></Skill>
      <Skill name="Javascript🤟" bg="yellow"></Skill>
      <Skill name="Css " bg="skyblue"></Skill>
      <Skill name="React 👒" bg="coral"></Skill>
      <Skill name="Tailwind Css 🦝" bg="hotpink"></Skill> */}
    </div>
  );
}
function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
