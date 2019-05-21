import {hot} from "react-hot-loader";
import React, { Component} from "react";
import ChartComponent, {Bar, Line} from 'react-chartjs-2';
import "./App.css";

class ChartOne extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: ['May'],
        datasets: [
          {
            label: 'Bitcoin Price',
            data: [
                  10
            ],
            backgroundColor: [
              'grey'
            ],
            fill: false
          }
        ]
      }
    }
  }

  render(){
    return (
      <div className="chart">
          <Line className="bar-chart"
            data={this.state.chartData}
            width={100}
            height={500}
            options={{ maintainAspectRatio: false }}
          />
      </div>
    )
  }
}

class ChartFive extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: ['May'],
        datasets: [
          {
            label: 'Bitcoin Price',
            data: [
                  5
            ],
            backgroundColor: [
              'grey'
            ],
            fill: false
          }
        ]
      }
    }
  }

  render(){
    return (
      <div className="chart">
          <Line className="bar-chart"
            data={this.state.chartData}
            width={100}
            height={500}
            options={{ maintainAspectRatio: false }}
          />
      </div>
    )
  }
}

class ChartThirty extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: ['June'],
        datasets: [
          {
            label: 'Bitcoin Price',
            data: [
                  10
            ],
            backgroundColor: [
              'grey'
            ],
            fill: false
          }
        ]
      }
    }
  }

  render(){
    return (
      <div className="chart">
          <Line className="bar-chart"
            data={this.state.chartData}
            width={100}
            height={500}
            options={{ maintainAspectRatio: false }}
          />
      </div>
    )
  }
}

class ChartNinety extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: ['April','May', 'June'],
        datasets: [
          {
            label: 'Bitcoin Price',
            data: [
                  25,
                  35,
                  10
            ],
            backgroundColor: [
              'grey'
            ],
            fill: false
          }
        ]
      }
    }
  }

  render(){
    return (
      <div className="chart">
          <Line className="bar-chart"
            data={this.state.chartData}
            width={100}
            height={500}
            options={{ maintainAspectRatio: false }}
          />
      </div>
    )
  }
}

class ChartOneEighty extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: ['January','February','March','April','May', 'June'],
        datasets: [
          {
            label: 'Bitcoin Price',
            data: [
                  60,
                  20,
                  30,
                  10,
                  25,
                  60
            ],
            backgroundColor: [
              'grey'
            ],
            fill: false
          }
        ]
      }
    }
  }

  render(){
    return (
      <div className="chart">
          <Line className="bar-chart"
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

  constructor(props){
    super(props);

    this.state = {
      labelClicked: null
    }

    this.handleDays = this.handleDays.bind(this);
  }

  handleDays(e){
      e.preventDefault();
      console.log('It has been clicked.');
      console.log(e.target.dataset);
      console.log(e.target.dataset.param);

      this.setState({
        labelClicked: e.target.dataset.param
      });
  }

  render(){
    return(
      <div className="App">

        Just clicked: {this.state.labelClicked}
      
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
          <label data-param="1" onClick={this.handleDays}>1 day</label>
          <label data-param="5" onClick={this.handleDays}>5 days</label>
          <label data-param="30" onClick={this.handleDays}>1 month</label>
          <label data-param="90" onClick={this.handleDays}>3 months</label>
          <label data-param="180" onClick={this.handleDays}>6 months</label>
        </div>

        {/* Display  chart based on days */}
        
        { this.state.labelClicked == 1 && <ChartOne/> }
        { this.state.labelClicked == 5 && <ChartFive/> }
        { this.state.labelClicked == 30 && <ChartThirty/> }
        { this.state.labelClicked == 90 && <ChartNinety/> }
        { this.state.labelClicked == 180 && <ChartOneEighty/> }

      </div>
    );
  }
}

export default hot(module)(App);