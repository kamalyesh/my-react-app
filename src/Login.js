import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

export default function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [otp, setOtp] = useState("")

    const onSessionFound = (isFound) => {
        if (isFound) navigate('/dashboard')
    }

    const login = () => {
        fetch("http://localhost:3030/login", {
            method: "POST",
            body: JSON.stringify({
                data: { username, password, otp }
            }),
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(async (response) => {
            if (response.status == 200) {
                const { token } = await response.json()
                localStorage.setItem('token', token)
                navigate('/dashboard')
            } else {
                let { message } = await response.json()
                alert(message)
            }
        }).catch(err => {
            console.error(err)
            alert(err.message)
        })

    }

    return (
        <>
            <Header statusChanged={onSessionFound} />
            <h1>Login</h1>
            <div className='login-form'>
                <div>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter username" />
                </div>
                <div>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password" />
                </div>
                <div>
                    <input type="text" onChange={(e) => setOtp(e.target.value)} value={otp} placeholder="Enter otp" />
                </div>
                <button onClick={login}>Login</button>
            </div>
        </>
    )
}