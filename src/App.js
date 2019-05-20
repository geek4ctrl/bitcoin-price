import {hot} from "react-hot-loader";
import React, { Component} from "react";
import "./App.css";

class App extends Component{
  render(){
    return(
      <div className="App">
        <div className="title"> <h1>Bit<span class="coin">coin</span> price</h1> </div>

        <div className="currencies">
          <select name="first-currency">
            <option value="bitcoin">BTC</option>
          </select>

          <select name="second-currency">
            <option value="united-states-dollar">USD</option>
          </select>
        </div>

      </div>
    );
  }
}

export default hot(module)(App);