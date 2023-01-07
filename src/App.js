import React, {useState} from 'react'



function App() {

    const [count, setCount] = useState(0)
    const [value, setValue] = useState('')

    function increment() {
        setCount(count + 1)
    }
    function decrement() {
        setCount(count - 1)
    }


  return (
    <div className="App">
        <h1>{count}</h1>
        <h1>{value}</h1>
        <input
            type="text"
            value={value}
            onChange={event => setValue(event.target.value)}
        />
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>

    </div>
  );
}

export default App;
