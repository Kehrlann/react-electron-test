import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
    this.initElectron();
  }

  initElectron() {
    try {
      console.log("one");
      console.log(process.env);
      const chokidar = window.require("chokidar");

      /* eslint-disable no-undef */
      console.log("chokidar", chokidar);
      const watcher = chokidar.watch("build");
      /* eslint-enable no-undef */
      watcher.on("add", path => {
        console.log("add", path);
        this.setState({
          files: [...this.state.files, path]
        });
      });
    } catch (error) {
      console.log(error);
      console.log(
        "This renderer does not support Nodejs. It is probably not an Electron app. Skipping trying to watch a directory on the filesystem."
      );
    }
  }

  render() {
    const files = this.state.files.map(f => <li key="f">{f}</li>);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <ul>{files}</ul>
      </div>
    );
  }
}

export default App;
