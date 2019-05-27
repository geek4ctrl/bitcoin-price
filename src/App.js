import {hot} from "react-hot-loader";
import React, { Component} from "react";
import ChartComponent, {Bar, Line} from 'react-chartjs-2';
import "./App.css";
import axios from 'axios';
import cors from 'cors';

class ChartOne extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: this.props.items[0].labels,
        datasets: [
          {
            label: 'Bitcoin Price',
            data: this.props.items[0].datasets[0].data,
            backgroundColor: [
              'grey'
            ],
            fill: false
          }
        ],
        options: {
          legend: {
            'onClick': function (evt, item) {
              console.log ('legend onClick', evt, item);
            }
          }
        }
      }
    }
  }

  render(){

    // console.log("One one One");
    // console.log(this.state.chartData.labels);
    // console.log(this.state.chartData.datasets);

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
      labelClicked: null,
      data: null,
      realData: [],
      receivingData: [
        {
          labels: [],
          datasets: [
            {
              label: 'Bitcoin Data Received',
              data: [],
              backgroundColor: [
                'blue'
              ],
              fill: false
            }
          ]
        }
      ]
    }

    this.handleDays = this.handleDays.bind(this);
  }

  handleDays(e){
      e.preventDefault();

      let period;

      if (e.target.dataset.param == 1){
        period = "1days";
      }
      else if (e.target.dataset.param == 5)
      {
        period = "5days";
      }
      else if (e.target.dataset.param == 30)
      {
        period = "30days";
      }
      else if (e.target.dataset.param == 90)
      {
        period = "90days";
      }
      else if (e.target.dataset.param == 180)
      {
        period = "180days";
      }

      this.setState({
        labelClicked: e.target.dataset.param
      });

      // axios.get('https://cors-anywhere.herokuapp.com/' + 'https://blockchain.info/charts/market-price?timespan='+ period +'&format=json')
      // axios.get('https://cors-anywhere.herokuapp.com/' + 'https://api.sheety.co/95d5a869-510a-4cb2-a93d-3984aaf060f8')
      // .then((response) => {

        axios.get('https://cors-anywhere.herokuapp.com/' + 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-05-01&end=2019-05-26')
        .then((response) => {

          console.log(response.data.bpi);
          
          let o = response.data.bpi;

          this.state.receivingData[0].labels.length = 0;
          this.state.receivingData[0].datasets[0].data.length = 0;

          for (var prop in o){
            console.log(prop, o[prop]);

            this.state.receivingData[0].labels.push(prop);
            this.state.receivingData[0].datasets[0].data.push(o[prop]);

          }

      })
      .catch(function(error){
        // console.log(error);
      });
  }

  render(){

    //console.log(this.state.realData)

    return(
      <div className="App">

        Just clicked: {this.state.labelClicked}
      
        <div className="title"> <h1>Bit<span className="coin">coin</span> market</h1> </div>

        <div className="currencies">
          <select name="first-currency">
            <option value="bitcoin">BTC</option>
          </select>

          <select name="second-currency">
            <option value="united-states-dollar">USD</option>
          </select>
        </div>

        <div className="period">
          <label data-param="1" onClick={this.handleDays}>Search</label>
        </div>
        
        { this.state.labelClicked == 1 && <ChartOne items={this.state.receivingData}/> }

      </div>
    );
  }
}

export default hot(module)(App);