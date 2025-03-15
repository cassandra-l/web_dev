// index.html and logo.png in public is loaded first
// followed by index.js in src which will import App
// then followed by style.css since we imported it here
// css file is in the src folder because the code will be included into the application
import "./style.css";
import { useState } from "react";

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015
  }
];

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span style={{ fontSize: "40px" }}>{count}</span>
      <button className="btn btn-large" onClick={() => setCount((c) => c + 1)}>
        {" "}
        +1
      </button>
    </div>
  );
}
// start function name with uppercase so React knows it is a component
function App() {
  // use state return two things: the current state and the function to update the state
  // 1. Define state variable
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState(initialFacts);

  // whatever return will be shown in the user interface
  // can only run one component in one return
  return (
    // but we are returning two components here <header> and <CategoryFilter>, hence we need <>
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {/* if true, form is visible */}
      {/* 2. Use state variable */}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilter />
        <FactList facts={facts} />
      </main>
    </>
  );
}

// {setShowForm} is destructing
// In React, all props are passed as an object.
function Header({ showForm, setShowForm }) {
  const apptitle = "Today I Learned";

  return (
    <header className="header">
      <div className="logo">
        {/* when a file is specified, React will look into the public folder 
        so file that will be served on the webpage should be in public folder */}
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>{apptitle}</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        // convert from initialstate(false) to true, and back
        // need a () after onClick cuz it is a function
        // 3. Update state variable
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" }
];

function isValidHttpurl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  function handleSubmit(e) {
    // Prevent browser reload
    e.preventDefault();
    console.log(text, source, category);

    // Check if data is valid. If so, create a new fact
    if (text && isValidHttpurl(source) && category && textLength <= 200) {
      const newFact = {
        // Create a new fact object
        id: Math.round(Math.random() * 1000000),
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear()
      };

      // Add the new fact to the UI; add the fact to state
      setFacts((facts) => [newFact, ...facts]);
      // Reset input fields
      setText("");
      setSource("");
      setCategory("");
      // Close the form
      // setShowForm(false)
    }
  }
  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => {
          // console.log(e)
          setText(e.target.value);
        }}
      />
      <span>{200 - text.length}</span>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy source..."
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li class="category">
          <button className="btn btn-all-categories">All</button>
        </li>

        {CATEGORIES.map((cat) => (
          <li className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts }) {
  return (
    <section>
      <ul className="facts-list">
        {/* This creates multiple <Fact /> components, each receiving a different fact object. */}
        {/* Whenever you want to insert JavaScript inside JSX, you wrap it in {}. */}
        {/* {fact} tells React: "Pass the value of fact (not a string) as a prop to Fact. */}
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the databse. Add your own!</p>
    </section>
  );
}

// same as function Fact(props) {
//   const fact = props.fact; // Manually extracting fact from props
// }
function Fact({ fact }) {
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}
// index.js is the very first js file that will get loaded first
// index.js is importing App from App.js, so in order for the input to work, we have to export here
export default App;
