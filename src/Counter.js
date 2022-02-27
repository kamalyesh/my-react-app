import React, { useState } from "react"

export default function Counter() {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count => count + 1)
    }
    const decrement = () => {
        setCount(count => {
            if (count > 0) return count - 1;
            else return 0
        })
    }
    return (<>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }} >
            <button onClick={decrement}>-</button>
            <div>{count}</div>
            <button onClick={increment}>+</button>
        </div>
    </>)
}