import { useState } from "react";
import "./styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() {
  const [curOpen, setOpen] = useState(null);
  return (
    <div className="accordion">
      {faqs.map((data, i) => (
        <AccordionItem
          num={i}
          title={data.title}
          text={data.text}
          curOpen={curOpen}
          setOpen={setOpen}
          key={i}
        />
      ))}
    </div>
  );
}
function AccordionItem({ num, title, text, curOpen, setOpen }) {
  const isOpen = curOpen === num;
  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => setOpen(isOpen ? console.log("opened") : num)}
    >
      <p className="number">{num < 10 ? `0${num + 1}` : num + 1}</p>
      <p className="title ">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen ? <div className="content-box">{text}</div> : ""}
    </div>
  );
}
