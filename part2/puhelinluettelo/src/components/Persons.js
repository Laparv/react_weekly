const Persons = ({namesToShow, getDeleteIdAndName}) => {

    return(
      <>
      {namesToShow.map(x => 
        <p key={x.name}>{x.name} {x.number} <button onClick={() => getDeleteIdAndName(x._id, x.name) }>delete</button>
        
        </p>)}
      
      </>
    )
  }


  export default Persons;