import React, { Component } from "react";
import ReactDOM from "react-dom";
import topics from "./topics.json";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "./styles.css";

class App extends Component {
  render() {
    console.log(topics);
    return (
      <Router>
        <div style={{ width: "100%", margin: "0 auto" }}>
          <ul>
            {topics.map(({ name, id }) => (
              <li key={id}>
                <Link to={`/topics/${id}`}>{name}</Link>
              </li>
            ))}
          </ul>
          <hr />

          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/topics/:topic_id" component={Topics} />
        </div>
      </Router>
    );
  }
}

function Home() {
  return <h1>Home</h1>;
}

function Resource({ match }) {
  const topic = topics
    .find(({ id }) => id === match.params.topic_id)
    .resources.find(({ id }) => id === match.params.sub_id);
  return (
    <div>
      <h1>{topic.name}</h1>
      <p>{topic.description}</p>
      <a href={topic.url}>More Info.</a>
    </div>
  );
}

function Topics({ match }) {
  const topic = topics.find(({ id }) => id === match.params.topic_id);
  return (
    <div>
      <h1>Topics</h1>
      <ul>
        {topic.resources.map(sub => (
          <li key={sub.id}>
            <Link to={`${match.url}/${sub.id}`}>{sub.name}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <Route path={`${match.path}/:sub_id`} component={Resource} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
