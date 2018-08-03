import React from 'react'
import coldGuy from '../img/coldday.png';
import happySun from '../img/happysun.png';
import rainRain from '../img/rainrain.png';
import cloudyMeatballs from '../img/cloudymeatballs.png';

const Weather = (props) => {

    var currentDate = new Date();
    var previousDate = new Date('2018-5-5');
    //var boxShadow =  "10px 5px 5px black";
    return (
        <div style={{margin: 10}}>
                {
                    props.city && props.country &&
                    <p className="weather__key">Location:
                    <span  className="weather__value"> {props.city}, {props.country}</span>
                    </p>
                }
                {
                    props.temperature &&
                    <div><h2 className="weather__heading" style={{color: 'white'}}>Current Weather: </h2>
                    </div>
                }
                {
                    props.temperature && <p className="weather__key">Temperature:
                    <span className="weather__value"> {props.temperature}°F</span>
                    </p>
                }
                {
                    props.humidity && <p className="weather__key">Humidity:
                    <span className="weather__value"> {props.humidity}</span>
                    </p>
                }
                {
                    props.description && <p className="weather__key">Conditions:
                    <span className="weather__value"> {props.description}</span>
                    </p>
                }
                {
                    props.list &&
                    <div style={{color:'white', display: 'table'}}>
                    <h2 className="weather__heading">Forecast: </h2>
                    <ul style={{listStyleType: 'none'}}>
                        {props.list.map(function(item, index){
                            currentDate = new Date(item.dt_txt);
                            console.log(item.dt_txt + "  -  " + currentDate);
                            console.log('current:'  + currentDate.getDate() + "-" + currentDate.getMonth());
                            console.log('previous:'  + previousDate.getDate() + "-" + previousDate.getMonth());

                            let weatherImg = coldGuy;
                            let backgroundColorCss = '#addaff';
                            let borderColorCss = '#527796';
                            if (item.weather[0].description.includes("clear")) {
                                weatherImg = happySun;
                                backgroundColorCss = '#ffff99';
                                borderColorCss = '#b2b26b';
                            }
                            else if (item.weather[0].description.includes("rain")) {
                                weatherImg = rainRain;
                                backgroundColorCss = '#b6e8f7';
                                borderColorCss = '#7caab8';
                            }
                            else if (item.weather[0].description.includes("cloud")) {
                                weatherImg = cloudyMeatballs;
                                backgroundColorCss = '#bfc2c5';
                                borderColorCss = '#7d8081';
                            }

                            console.log(happySun);

                            if (currentDate.getDate() !== previousDate.getDate()) {
                                previousDate = new Date(currentDate);
                                return (
                                    <li style={{color:'black', backgroundColor: backgroundColorCss, fontWeight: 800, width: 160,
                                            height: 270, margin: 3, textAlign: 'center', float: 'left', border: 'solid',
                                            borderColor: borderColorCss }}>
                                        {currentDate.getMonth() + 1}-{currentDate.getDate()}-{currentDate.getFullYear()}
                                        <p></p>
                                        <img src={weatherImg} height='50' />
                                        <h2> {item.main.temp}°F</h2>
                                        <p>{item.weather[0].description}</p>
                                        <p>Humidity: {item.main.humidity}</p>
                                        <p>Wind Speed: {item.wind.speed}</p>
                                    </li>
                                )
                            }
                            console.log('3');
                            console.log('previous again:'  + previousDate.getDate());
                        })
                        }
                    </ul>
                    </div>
                }
                {
                    props.error && <p className="weather__key">
                    <span className="weather__value">{props.error}</span>
                    </p>
                }
            </div>
    );
}

export default Weather;
