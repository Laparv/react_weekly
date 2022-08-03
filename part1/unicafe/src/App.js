import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodValue = 1;
  const neutralValue= 0;
  const badValue = -1;
  const avg = (good*goodValue + neutral*neutralValue + bad*badValue)/(good + neutral + bad)
  const positivePercentage = (good/(good + neutral + bad)*100 + ' %')

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad +1)}>bad</button>

      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {avg} </p>
      <p>positive {positivePercentage}</p>
    </div>
  )
}

export default App