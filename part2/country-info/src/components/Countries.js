import Country from "./Country"

const Countries = ({countriesToShow, changeFilter}) => {

    if (countriesToShow.length > 10) {
        return (
            <>
                <p>Too many matches, specify another filter</p>
            </>
        )
        
    }
    else if (countriesToShow.length > 1){
    return(
      <>
        {countriesToShow.map(x => 
            <p key={x.name.common}>{x.name.official} <button onClick={() => changeFilter(x.name.official)}>show</button></p>)}
      </>
    )}
    else if (countriesToShow.length === 1){
    return(
        <>
            <Country oneCountry={countriesToShow}/>
        </>
    )}
  }

  

  export default Countries;