import { useState } from 'react'

const Button = (props) => {
  return(
  <button onClick={props.handleClick}>{props.text}</button>
  )
}
const StatisticLine = (props) => {
return(
  <>
  <table>
  <tr>
  <td>{props.text}</td>
  <td> {props.value}</td>
  </tr>
  </table>
  </>
)
}
const Statistics = (props) =>{
  if(props.good === 0 && props.neutral === 0 && props.bad === 0)
  {
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
return (
  <>
  <h1>statistics</h1>
  <StatisticLine text="good" value ={props.good} />
  <StatisticLine text="neutral" value ={props.neutral} />
  <StatisticLine text="bad" value ={props.bad} />
  <StatisticLine text="all" value ={props.all} />
  <StatisticLine text="average" value ={props.avg} />
  <StatisticLine text="positive" value ={props.positive} />
  
  </>
)
  
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  const all = good + neutral + bad
  const avg = (good*1 + neutral*0 + bad*-1)/(all)
  const positivePercentage = (good/(all)*100 + ' %')

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text = "good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text = "neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text = "bad"/>
     <Statistics good = {good} neutral = {neutral} bad= {bad} all = {all} avg = {avg} positive = {positivePercentage}/>
    </div>
  )
}


export default App