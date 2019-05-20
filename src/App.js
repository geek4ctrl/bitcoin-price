import {hot} from "react-hot-loader";
import React, { Component} from "react";
import {Bar} from 'react-chartjs-2';
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

        <div className="period">
          <label>1 day</label>
          <label>5 days</label>
          <label>1 month</label>
          <label>3 months</label>
          <label>6 months</label>
        </div>

        <div className="chart-period">
        < Bar className="bar-chart"
          data={[5, 10, 15, 20, 25, 30]}
          width={100}
          height={500}
          options={{ maintainAspectRatio: false }}
        />
        </div>

      </div>
    );
  }
}

export default hot(module)(App);