const Persons = (props) => {
    return(
      <>
      <ul>{props.namesToShow.map(x => 
        <li key={x.name}>{x.name} {x.number}</li>)}
      </ul>
      </>
    )
  }
  export default Persons;