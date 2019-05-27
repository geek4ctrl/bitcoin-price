import {hot} from "react-hot-loader";
import React, { Component} from "react";
import ChartComponent, {Bar, Line} from 'react-chartjs-2';
import "./App.css";
import axios from 'axios';
import cors from 'cors';
import moment from 'moment';

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
      firstDate: undefined,
      secondDate: undefined,
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
    this.onChangeFirstDate = this.onChangeFirstDate.bind(this);
    this.onChangeSecondDate = this.onChangeSecondDate.bind(this);

  }

  onChangeFirstDate(event){
    this.setState({
      firstDate: event.target.value
    });
  }

  onChangeSecondDate(event){
    this.setState({
      secondDate: event.target.value
    });
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

        axios.get('https://cors-anywhere.herokuapp.com/' + 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + this.state.firstDate +  '&end=' + this.state.secondDate + '')
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

    console.log('First date: ' + this.state.firstDate);
    console.log('Second date: ' + this.state.secondDate);

    return(
      <div className="App">

        Just clicked: {this.state.labelClicked}
      
        <div className="title"> <h1>Bit<span className="coin">coin</span> market</h1> </div>

        <div className="currencies">
            <input type="date" id="first-date" onChange={this.onChangeFirstDate} value={this.state.firstDate}/>

            <input type="date" id="second-date" onChange={this.onChangeSecondDate} value={this.state.secondDate}/>
        </div>

        { (this.state.firstDate && this.state.secondDate) && 
        <div className="period">
          <label data-param="1" onClick={this.handleDays}>Search</label>
        </div>}
        
        { this.state.labelClicked == 1 && <ChartOne items={this.state.receivingData}/> }

      </div>
    );
  }
}

export default hot(module)(App);