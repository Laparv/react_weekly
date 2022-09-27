const Country = ({oneCountry}) => {
    return (
        <>
            <Countryname country= {oneCountry} />
            <Capital country= {oneCountry} />
            <Population country= {oneCountry} />
            <Area country= {oneCountry} />
            <h2>languages:</h2>
            <Languages country= {oneCountry} />
            <Flag country= {oneCountry} />

        </>
    )
}

const Countryname = ({country}) =>{
    return(
        <>
            {country.map(x => 
            <h1 key={x.name}>{x.name.official}</h1>)}
        </>
    )
}

const Capital = ({country}) =>{
    return(
        <>
            {country.map(x => 
            <p key={x.name}> capital: {x.capital}</p>)}
        </>
    )
}


const Population = ({country}) =>{
    return(
        <>
            {country.map(x => 
            <p key={x.name}> population: {x.population}</p>)}
        </>
    )
}

const Area = ({country}) =>{
    return(
        <>
            {country.map(x => 
            <p key={x.name}> area: {x.area}</p>)}
        </>
    )
}

const Languages = ({country}) =>{

    return(
        <>
        <ul>
            {country.map(x => Object.values(x.languages).map(x => 
            <li key={x.key}>{x}</li>
            ))}
        </ul>
        </>
    )
}

const Flag = ({country}) => {

    const flagSource = country.map(x => x.flags.png);

    return(
        <>
            <img src={flagSource} />
        </>
    )
}

export default Country