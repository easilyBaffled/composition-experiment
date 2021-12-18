import React from "react";
import "./styles.css";

const DefaultName = ({ name, children, isDone }) => (
  console.log(name, children), (<h3 className="name">{children ?? name}</h3>)
);

const AltName = ({ name, children, isDone }) => (
  <p className="name">{children ?? name}</p>
);

const DefaultValue = ({ value, children }) => (
  <code className="value">{children ?? value}</code>
);

const AltValue = ({ value, children }) => (
  <h1 className="value">{children ?? value}</h1>
);

const Task = ({ children, ...task }) => {
  let elArr = React.Children.toArray(children);

  if (!elArr.length) {
    elArr = [DefaultName, DefaultValue];
  } else if (elArr.length === 1) elArr.unshift(DefaultName); // assume that I am going to use a custom Value more often than a custom name
  console.log(elArr);
  return (
    <div className="task">
      {elArr.map((elOrCmp) => {
        console.log(React.isValidElement(elOrCmp));
        return React.isValidElement(elOrCmp)
          ? React.cloneElement(elOrCmp, { ...task, key: task.id })
          : React.createElement(elOrCmp, { ...task, key: task.id });
      })}
    </div>
  );
};

/**
 * name and value are undefined -> use default name and value
 * only name is defined -> use default name, and use value
 * both are defined, use name and value
 */
const task = {
  name: "name",
  value: 1
};
export default function App() {
  return (
    <div className="App">
      <Task {...task} name="default everything" />
      <hr />
      <Task {...task} name="default name, altvalue with custom value">
        <AltValue>value</AltValue>
      </Task>
      <hr />
      <Task {...task} name="default name, alt value with passed in value">
        <AltValue />
      </Task>
      <hr />
      <Task {...task} name="alt name and value, passed in values">
        <AltName />
        <AltValue />
      </Task>
      <hr />
      <Task
        {...task}
        name="alt name and value, passed in values, extra component"
      >
        <span role="img" aria-label="smile">
          😁
        </span>
        <AltName />
        <AltValue />
      </Task>
    </div>
  );
}
