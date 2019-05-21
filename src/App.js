import {hot} from "react-hot-loader";
import React, { Component} from "react";
import ChartComponent, {Bar} from 'react-chartjs-2';
import "./App.css";

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Price',
            data: [
              5,
              10,
              15,
              20,
              25,
              30
            ],
            backgroundColor: [
              'red',
              'yellow',
              'blue',
              'brown',
              'pink',
              'grey'
            ]
          }
        ]
      }
    }
  }

  render(){
    return (
      <div className="chart">
          <Bar className="bar-chart"
            data={this.state.chartData}
            width={100}
            height={500}
            options={{ maintainAspectRatio: false }}
          />
      </div>
    )
  }
}

class App extends Component{
  render(){
    return(
      <div className="App">

        <div className="title"> <h1>Bit<span className="coin">coin</span> price</h1> </div>

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

        <Chart/>

      </div>
    );
  }
}

export default hot(module)(App);