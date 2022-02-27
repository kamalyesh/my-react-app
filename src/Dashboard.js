import React, { useState } from 'react'
import Counter from './Counter'
import Header from './Header'

export default function Dashboard() {
    const [currentUser, setCurrentUser] = useState({})

    const onSessionFound = (isFound) => {
        console.log(JSON.stringify({ isFound }))
        if (isFound) {
            setCurrentUser(JSON.parse(localStorage.getItem('user')))
        }
    }

    return (
        <>
            <Header statusChanged={onSessionFound} />
            <h2>This is <span style={{ textTransform: 'capitalize' }}>{currentUser?.role}</span> Dashboard</h2>
            {
                currentUser?.role == 'guest' ? null
                    : <>
                        <div style={{ width: "150px" }}>
                            <Counter />
                        </div>
                    </>
            }
        </>
    )
}