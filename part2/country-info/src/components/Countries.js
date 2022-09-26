import Filter from "./Filter"
import App from "../App"

const Countries = (props) => {

    if (props.countriesToShow.length > 10) {
        return (
            <>
                <p>Too many matches, specify another filter</p>
            </>
        )
        
    }
    else if (props.countriesToShow.length > 1){
    return(
      <>
        {props.countriesToShow.map(x => 
            <p key={x.name.common}>{x.name.official} <ShowButton  text="show" /></p>)}
      </>
    )}
    else if (props.countriesToShow.length === 1){
    return(
        <>
            <ShowOneCountry oneCountry={props.countriesToShow}/>
        </>
    )}
  }


const ShowOneCountry = (props) => {
    return (
        <>
            <Countryname country= {props.oneCountry} />
            <Capital country= {props.oneCountry} />
            <Population country= {props.oneCountry} />
            <Area country= {props.oneCountry} />
            <h2>languages:</h2>
            <Languages country= {props.oneCountry} />
            <Flag country= {props.oneCountry} />

        </>
    )
}
const ShowButton = (props) =>{
    return (
      <button onClick= {props.handleClick}> {props.text}</button>
    )
  }
const Countryname = (props) =>{
    return(
        <>
            {props.country.map(x => 
            <h1 key={x.name}>{x.name.official}</h1>)}
        </>
    )
}

const Capital = (props) =>{
    return(
        <>
            {props.country.map(x => 
            <p key={x.name}> capital: {x.capital}</p>)}
        </>
    )
}


const Population = (props) =>{
    return(
        <>
            {props.country.map(x => 
            <p key={x.name}> population: {x.population}</p>)}
        </>
    )
}

const Area = (props) =>{
    return(
        <>
            {props.country.map(x => 
            <p key={x.name}> area: {x.area}</p>)}
        </>
    )
}

const Languages = (props) =>{

    return(
        <>
        <ul>
            {props.country.map(x => Object.values(x.languages).map(x => 
            <li key={x.key}>{x}</li>
            ))}
        </ul>
        </>
    )
}

const Flag = (props) => {

    const flagSource = props.country.map(x => x.flags.png);

    return(
        <>
            <img src={flagSource} />
        </>
    )
}

  export default Countries;