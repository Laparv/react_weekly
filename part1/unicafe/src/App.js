import { useState } from 'react'

const Statistics = (props) =>{
return (
  <>
   <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {props.avg} </p>
      <p>positive {props.positive}</p>
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
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad +1)}>bad</button>
     
     <Statistics good = {good} neutral = {neutral} bad= {bad} all = {all} avg = {avg} positive = {positivePercentage}/>
    </div>
  )
}


export default App