import { useState, useEffect } from "react"
import axios from "axios";

const Country = ({oneCountry}) => {

    const [temperature, setTemperature] = useState('')
    const [icon, setIcon] = useState('')
    const [wind, setWind] = useState('')


    const country = oneCountry.map(x => x)[0];
    let latitude = country.capitalInfo.latlng[0]
    let longitude =  country.capitalInfo.latlng[1]
    const apikey = process.env.REACT_APP_API_KEY
    const iconSource = (`http://openweathermap.org/img/wn/${icon}@2x.png`)

    

    useEffect(() => {
        
        console.log('weather effect')
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`)
        .then(response => {
            console.log('weather promise fulfilled')
            console.log(response.data)
            setTemperature(response.data.main.temp)
            setIcon(response.data.weather[0].icon)
            setWind(response.data.wind.speed)
        })
        .catch(error =>{
            console.log(error)
        })

    },[latitude, longitude]);


    return (
        <>
            <h1>{country.name.official}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <p>area: {country.area}</p>
            <h2>languages:</h2>
            <Languages country= {oneCountry} />
            <img src={country.flags.png}/>
            <h2>Weather in {country.capital}</h2>
            <p>temperature: {temperature} °C</p>
            <img src={iconSource}></img>
            <p>wind: {wind} m/s</p>

            
        </>
    )
}


const Languages = ({country}) =>{

    return(
        <>
        <ul>
            {country.map(x => Object.values(x.languages).map((x, i) => 
            <li key={i}>{x}</li>
            ))}
        </ul>
        </>
    )
}


export default Country