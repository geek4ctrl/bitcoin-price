import {hot} from "react-hot-loader";
import React, { Component} from "react";
import ChartComponent, {Bar, Line} from 'react-chartjs-2';
import "./App.css";
import axios from 'axios';
import cors from 'cors';
import moment from 'moment';

import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Chart from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const chartConfigs = {
  type: 'column2d',
  width: '700',
  height: '400',
  dataFormat: 'json',
  dataSource: {
      // Chart configuration
      "chart": {
          "caption": "Bitcoin market",
          "subCaption": "Have a look at the price over time",
          "xAxisName": "Dates",
          "yAxisName": "Prices (American dollar)",
          // "numberSuffix": "K",
          "theme": "fusion",
          // "decimalSeparator": ",",
          "thousandSeparator": ".",
          // "numberSuffix": "/day",
          // "numberPrefix": "$",
          "numberScaleValue": "1000000,1000000000",
          "numberScaleUnit": "M,B"
      },
      // Chart data
      "data": []
  },
};

class ChartBar extends Component {
  constructor(props) {
      super(props);

      this.state = {
        message: '',
        enabled: false
      }

      this.trackPlotClick = this.trackPlotClick.bind(this);
      this.resetChart = this.resetChart.bind(this);
      this.dataPlotClick = this.dataPlotClick.bind(this);
  }

  // Handler for 'Track Data Plot Clicks' button.
  // 1. Adds an eventlistener for data plot cick on the chart
  // 2. Sets the default message when data plot click tracking is enabled
  trackPlotClick() {
      FusionCharts.addEventListener('dataplotClick', this.dataPlotClick);
      this.setState({
          message: defaultMessage,
          enabled: true
      });
    }

  // Event listener for dataplotclick event on chart. Update message with data plot values.
  dataPlotClick(eventObj, dataObj) {

        function isPrime(num) {
          var prime = num != 1;
          for(var i=2; i<num; i++) {
              if(num % i == 0) {
                  prime = false;
                  break;
              }
          }
          return prime;
        }

      const number = dataObj.displayValue.substring(0, dataObj.displayValue.length);
      const stringNumber = number.toString();
      const newNumber = stringNumber.replace('.', '') + "0";
      const parsedNumber = parseInt(newNumber);
      console.log("The number is : " + newNumber);
      console.log("Is the number prime? " + isPrime(newNumber));

      this.setState({
          message: [
              'You have clicked on plot ',
              <strong>{dataObj.categoryLabel}</strong>,
              ' whose value is ',
              <strong>{dataObj.displayValue}</strong>
          ]
      });
  }

  // Handler for 'Reset' button.
  // Resets the chart to default message and removed the event listener.
  resetChart() {
  FusionCharts.removeEventListener('dataplotClick', this.dataPlotClick);
      this.setState({
          message: '',
          enabled: false
      });
    }

    render () {

      console.log("**************************");
      console.log(chartConfigs.dataSource.data.length = 0);
      console.log("**************************");

      // **************************************************

      // create a constructor for our Obj
      function Obj(x, y) {
        this.label = x;
        this.value = y;
      }

      // How to fill array with those objects
      // create an array
      var objs = [];

      // fill the array with our Objs
      for (var i = 0; i < this.props.items[0].labels.length; i++) {
        objs.push(new Obj(this.props.items[0].labels[i], this.props.items[0].datasets[0].data[i]));
      }

      // and show the result
      // var msg = "";
      // for (var i = 0; i < objs.length; i++) {
      // msg += objs[i].x + ":" + objs[i].y + '\n';
      // }

      console.log("Display message");
      console.log(objs);
      console.log("Message displayed");

      console.log("Old data message");
      console.log(chartConfigs.dataSource.data = objs);
      console.log("Old message displayed");

      // this.state.receivingData[0].labels.push(prop);
      // this.state.receivingData[0].datasets[0].data.push(o[prop]);

      console.log("++++++++++++++++++++++++++++++++");
      console.log(this.props.items[0].labels);
      console.log(this.props.items[0].datasets[0].data);
      console.log("++++++++++++++++++++++++++++++++");

      return (
        <div>

          <ReactFC {...chartConfigs} />

          <div style={{ padding: '5px' }} id="message">
            { this.state.message || 'Click the below buttons to add an event dynamically to a charts' }
          </div>

          <button
            className='btn btn-outline-secondary btn-sm'
            disabled={this.state.enabled}
            onClick={this.trackPlotClick}
          >
            Add/ listen to data plot click event
          </button>

          <button
            className='btn btn-outline-secondary btn-sm'
            disabled={!this.state.enabled}
            onClick={this.resetChart}
          >
            Remove data plot click event
          </button>

        </div>
      )
    }
}

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
        ]
      }
    }

    this.handleEvent = this.handleEvent.bind(this);

  }

  handleEvent(event){
    console.log("Hey!");
  }

  render(){
    return (
      <div className="chart">
          <Line className="bar-chart"
            data={this.state.chartData}
            width={100}
            height={500}
            onClick={this.handleEvent}
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

    this.handleEvent = this.handleEvent.bind(this);

  }

  handleEvent(event){
    console.log("Hey!");
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
      
        <div className="title"> <h1>Bit<span className="coin">coin</span> market</h1> </div>

        <div className="currencies">
            <input type="date" id="first-date" onChange={this.onChangeFirstDate} value={this.state.firstDate}/>

            <input type="date" id="second-date" id="datePickerId" onChange={this.onChangeSecondDate} value={this.state.secondDate}/>
        </div>

        { (this.state.firstDate && this.state.secondDate) && 
        <div className="period">
          <label data-param="1" onClick={this.handleDays}>Search</label>
        </div>}
        
        { this.state.labelClicked == 1 && <ChartOne onClick={this.handleEvent} items={this.state.receivingData}/> }

        { this.state.labelClicked == 1 && <ChartBar items={this.state.receivingData} />}

      </div>
    );
  }
}

export default hot(module)(App);