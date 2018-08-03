import React from 'react'

const Form = (props) => {
    return (
        <form onSubmit={props.getWeather} style={{padding: 10, width: 1100, textAlign: 'center'}}>
             <input type="text" name="city" placeholder="City...." onChange={ props.handleCityChange } />
            <input type="text" name="zipcode" placeholder="zipcode...." onChange={props.handleZipcodeChange} />
            <input type="text" name="country" placeholder="Country...." onChange={props.handleCountryChange} />             
            <button type="submit">Get Weather</button>
            <button onClick={((e) => props.getFiveDayForecast(e))}>Get Forecast</button>
        </form>
    );
}

export default Form;
