import {hot} from "react-hot-loader";
import React, { Component} from "react";
import "./App.css";

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1>Bitcoin price</h1>
      </div>
    );
  }
}

export default hot(module)(App);