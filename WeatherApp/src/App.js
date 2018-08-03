import React, { Component } from 'react';
import './App.css';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import Chart from 'chart.js';

const API_KEY = "8aee90ad37c1088bfacad3666898608c";
let cityToCheck = "";
let countryToCheck = "";
let zipcodeToCheck = "";


class App extends Component {
    // constructor(props) has been deprecated
    state = {
        temperature:    undefined,
        city:           undefined,
        country:        undefined,
        humidity:       undefined,
        description:    undefined,
        list:           undefined,
        showChart:      false,
        error:          undefined,
        temp1:           undefined,
        temp2:           undefined,
        temp3:           undefined,
        temp4:           undefined,
        temp5:           undefined,
        temp6:           undefined,
        temp7:           undefined,
        time1:           undefined,
        time2:           undefined,
        time3:           undefined,
        time4:           undefined,
        time5:           undefined,
        time6:           undefined,
        time7:           undefined,
    }

    handleCityChange(e){
        cityToCheck = e.target.value;
        console.log(cityToCheck);
    }

    handleCountryChange(e){
        countryToCheck = e.target.value;
        console.log(countryToCheck);
    }

    handleZipcodeChange(e){
        zipcodeToCheck = e.target.value;
        console.log(zipcodeToCheck);
    }

    //#region getWeather
    getWeather = async (e) => {
        // stop page refresh
        e.preventDefault();

        // get form values
        const city = e.target.elements.city.value;
        const zipcode = e.target.elements.zipcode.value;
        const country = e.target.elements.country.value;

        // similar to HTTP request get
        let api_call = Response;

        if (zipcode) {
            api_call = await fetch('https://api.openweathermap.org/data/2.5/weather?zip=' +
            zipcode + ',' + country + '&units=imperial&appid=' + API_KEY);
        }
        else {
            api_call = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
            city + ',' + country + '&units=imperial&appid=' + API_KEY);
        }

        console.log(api_call);
        // similar to json.parse
        const data = await api_call.json();
        console.log(data);
        if (country) {

            // never directly manipulate state data
            this.setState({
                temperature:    data.main.temp,
                city:           data.name,
                country:        data.sys.country,
                humidity:       data.main.humidity,
                description:    data.weather[0].description,
                error:          ""
            });
        }
        else {
            this.setState({
                temperature:    undefined,
                city:           undefined,
                country:        undefined,
                humidity:       undefined,
                description:    undefined,
                error:          "Please enter valid location."
            });
        }
    }
    //#endregion

    //#region getFiveDayForecast
    getFiveDayForecast = async (e) => {
        // stop page refresh
        e.preventDefault();
        console.log('here');

        // get form values
        const city = cityToCheck;
        const zipcode = zipcodeToCheck;
        const country = countryToCheck;
        let api_call = Response;
        // similar to HTTP request get

        if (zipcode) {
            api_call = await fetch('https://api.openweathermap.org/data/2.5/forecast?zip=' +
            zipcode + ',' + country + '&units=imperial&appid=' + API_KEY);
        }
        else {
            api_call = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' +
            city + ',' + country + '&units=imperial&appid=' + API_KEY);
        }

        console.log(api_call);
        // similar to json.parse
        const data = await api_call.json();
        console.log(data);
        console.log("=====Getting it ===========");
        console.log(data.list[0].main.temp);
        console.log(data.dx);
        console.log("=====Getting it ==========");
        if (country) {
          this.setState({
            showChart:      true
          });
            // never directly manipulate state data
            this.setState({
                city:           data.city.name,
                country:        data.city.country,
                list:           data.list,
                error:          "",
                temp1:           data.list[1].main.temp,
                temp2:           data.list[2].main.temp,
                temp3:           data.list[3].main.temp,
                temp4:           data.list[4].main.temp,
                temp5:           data.list[5].main.temp,
                temp6:           data.list[6].main.temp,
                temp7:           data.list[7].main.temp,
                time1:           data.list[1].dt_txt,
                time2:           data.list[2].dt_txt,
                time3:           data.list[3].dt_txt,
                time4:           data.list[4].dt_txt,
                time5:           data.list[5].dt_txt,
                time6:           data.list[6].dt_txt,
                time7:           data.list[7].dt_txt
            });

            console.log(this.state.list);
        }
        else {
            this.setState({
                temperature:    undefined,
                city:           undefined,
                country:        undefined,
                humidity:       undefined,
                description:    undefined,
                error:          "Please enter valid location.",
                showChart:      undefined,
                temp1:           undefined,
                temp2:           undefined,
                temp3:           undefined,
                temp4:           undefined,
                temp5:           undefined,
                temp6:           undefined,
                temp7:           undefined,
                time1:           undefined,
                time2:           undefined,
                time3:           undefined,
                time4:           undefined,
                time5:           undefined,
                time6:           undefined,
                time7:           undefined
            });
        }
    }
    //#endregion

    //#region getForecastData
    getForcastData = async (e) => {
        //= async (e) =>
        //const city = cityToCheck;
        //const country = countryToCheck;

        // similar to HTTP request get
        //const api_call = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' +
        //'irvine' + ',' + 'us' + '&units=imperial&appid=' + API_KEY);

        //----console.log(api_call);
        // similar to json.parse
        //const datas = await api_call.json();
        //console.log("CHECK");
        //gobalChartdatashit = datas;
        //console.log(datas);
        //num1 = datas.list[0].main.temp;
        //console.log(num1);
        //return gobalChartdatashit.promise;
        //return datas;
        //gobalChartdatashit.list[0].main.temp
    }
    //#endregion

    //#region render
    render() {
        // Build class names with dynamic data
        var weatherClass = 'wi wi-owm-' + this.state.weather;
        var bgColorClass = 'weather-widget '; // very-warm, warm, normal, cold, very-cold
        var LineChart = require("react-chartjs").Line;

        // Set the background colour based on the temperature
        if (this.state.temp >= 30) {
            bgColorClass += 'very-warm';
        }
        else if (this.state.temp > 20 && this.state.temp < 30) {
            bgColorClass += 'warm';
        }
        else if (this.state.temp > 10 && this.state.temp < 20) {
            bgColorClass += 'normal';
        }
        else if (this.state.temp > 0 && this.state.temp < 10) {
            bgColorClass += 'cold';
        }
        else if (this.state.temp <= 0) {
            bgColorClass += 'very-cold';
        }
        var data = {
            labels: [this.state.time1, this.state.time2, this.state.time3, this.state.time4, this.state.time5, this.state.time6, this.state.time7],
            datasets: [
              {
                label: "Temperature",
                fillColor: "rgba(220,220,220,1)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [this.state.temp1, this.state.temp2, this.state.temp3, this.state.temp4, this.state.temp5, this.state.temp6, this.state.temp7]
              }
            ]};

        return (
            <div>
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div >
                                <Titles />
                            </div >
                            <center>
                            <div className="col-xs-2 form-container" style={{borderColor: '#2a4560', borderStyle: 'solid'}}>
                                <Form getWeather={this.getWeather} getFiveDayForecast={this.getFiveDayForecast}
                                        handleCityChange={this.handleCityChange} handleCountryChange={this.handleCountryChange}
                                        handleZipcodeChange={this.handleZipcodeChange} />
                                <center>
                                <Weather
                                    temperature={this.state.temperature}
                                    city={this.state.city}
                                    country={this.state.country}
                                    humidity={this.state.humidity}
                                    description={this.state.description}
                                    list={this.state.list}
                                    error={this.state.error}
                                />
                                </center>
                                <center>
                                <div id="chartContainer" class="chart" style={this.state.showChart ? { zIndex: '1', position: 'relative', marginTop: 50, width: 650 } : { zIndex: '-5', position: 'absolute', marginTop: -100, width: 1 }} >
                                    <div><h2 style={{color: 'black'}}>3 Hour Forecast: </h2></div>
                                    <LineChart data={data} width="600" height="250"/>
                                </div>
                                </center>
                            </div >
                          </center>
                        </div >
                    </div >
                </div>

            </div>
        </div>
        );
    }
    //#endregion
}



export default App;
