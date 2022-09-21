const Course = (props) => {
    return(
      <>
      <ul>{props.course.map(x => 
        <li key={x.id}>
          <Header course = {x.name}/>
          <Content parts = {x.parts}/>
          <Total parts = {x.parts}/>
        </li>)}
      </ul>
      </>
    )
  }
  const Header = (props) => {
  
    return(<>
      <h1>{props.course}</h1>
    </>
  )}
  
  const Content = (props) => {
    return ( 
    <>
      <ul>{props.parts.map(x =>
      <li key={x.id}><Part part = {x.name} exercises = {x.exercises}/></li> 
      )}
      </ul>
    </>)
  }
  
  const Total = (props) => {
    return (
      <>
        <p>
        Total number of exercises {props.parts.reduce((sum, amount) => {
        return sum + amount.exercises}, 0)}
        </p>
      </>
  
    )
  }
  const Part = (props) =>{
    return(
      <>
        <p>
          {props.part} {props.exercises}
        </p>
      </>
    )
  }

  export default Course;