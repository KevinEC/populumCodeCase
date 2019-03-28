import React, {Component} from "react";
import styles from './Chart.module.scss';

import {Line} from "react-chartjs-2";

class Chart extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {};

	  this.createDataSet = this.createDataSet.bind(this);
	  this.createPlotDataProperties = this.createPlotDataProperties.bind(this);

	}

	componentDidMount(){
		this.createDataSet();
	}

	createDataSet(){
		let dataSet = Array(100);
		let dataSetColors = Array(100);

		dataSetColors.fill("transparent");

		dataSet.fill(0);
		let max = 0;

		this.props.data.forEach( function(entry, index) {
			if(entry.index != null) {			
				let i = entry.index;
				dataSet[i] = dataSet[i] + 1;
				if(dataSet[i] > max) {
					max = dataSet[i];
				}

				// display 
				let redIndex;
				if(entry.name == "Company") {
					console.log("red plox");
					redIndex = i;
					dataSetColors[i] = "#99d1ff";
				}
			}
		});

		/*
		//Lowpass filter
		let tempSet = Array(102);
		tempSet.fill(0);
		for (let i = 0; i < 100; i++) {
			tempSet[i] = dataSet[i+1];
		}
		for (let i = 0; i < 100; i++) {
			dataSet[i] = (0.5*tempSet[i-1] + tempSet[i] + 0.5tempSet[i+1])/2;
		}
		*/
		this.createPlotDataProperties(dataSet, max, dataSetColors);
	}

	createPlotDataProperties(dataSet, max, dataSetColors){

		let labelArray = new Array(100);
		let yMax = max + 1;
		labelArray.fill(" ");
		const data = {
			labels: labelArray,

			datasets: [
				{
					data: dataSet,
					fill: true, 
					borderColor: 'rgba(200,200,200,0.4)', 
					backgroundColor: 'rgba(200,200,200,0.4)',



					lineTension: 0.3,
					pointRadius: 5,
					pointHoverRadius: 5,
					pointBackgroundColor: dataSetColors,
					pointBorderColor: "transparent",
					pointHoverBackgroundColor: "rgba(200,200,200,1)",
					borderCapStyle: 'round',


					borderWidth: 0
				}
			]
	    }

	    const options = {
	    	scales: {
		        xAxes: [{
		            gridLines: {
		                display: false,
		                lineWidth: 0
		            }
		        }],
		        yAxes: [{
		            gridLines: {
		                display: false,
		                lineWidth: 0
		            },
		            ticks: {
		            	beginAtZero: true,
		            	max: yMax,
		            	display: false
		            }   
		        }]
		    },
		    legend: {
	            display: false
	         },
	        tooltips: {
	        	enabled: false
	        	/*backgroundColor: "transparent",
	        	titleFontColor: "transparent"*/
	        }
	    }

	    this.setState({
	    	plotData: data,
	    	plotOptions: options
	    });
	}


	render() {

		return(
			<Line data={this.state.plotData} style={ {width: "100%"} } height={40} options={this.state.plotOptions} />
		)
	}
}

export default Chart;