import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logout from './Logout';

export default function Header({ statusChanged }) {
    const navigate = useNavigate()
    const location = useLocation();
    const [isLoggedIn, updateStatus] = useState(false)
    const [currentUser, setCurrentUser] = useState(false)

    useEffect(() => {
        statusChanged(isLoggedIn)
    }, [isLoggedIn])

    const getCurrentUser = (token) => {
        if (token) {
            fetch("http://localhost:3030/getCurrentUser?token=" + token, {
                method: "GET",
            }).then(async (response) => {
                if (response.status == 200) {
                    let { token, user } = await response.json()
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))
                    setCurrentUser(user)
                    updateStatus(true)
                } else {
                    if (location.pathname != "/login") alert("Session not found. please login again.")
                    localStorage.clear()
                    if (location.pathname != "/") navigate("/")
                    updateStatus(false)
                }
            }).catch(err => {
                console.error(err)
                if (location.pathname != "/login") alert("Session not found. please login again.")
                localStorage.clear()
                if (location.pathname != "/") navigate("/")
                updateStatus(false)
            })
        } else {
            // if (location.pathname != "/login") alert("Session not found. please login again.")
            localStorage.clear()
            if (location.pathname != "/") navigate("/")
            updateStatus(false)
        }
    }

    useEffect(() => {
        let token = localStorage.getItem('token')
        getCurrentUser(token)
    }, [location.pathname])
    return <>
        {isLoggedIn ? <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'baseline', paddingTop: '60px' }}>
            <div style={{ textTransform: 'capitalize', marginRight: '10px' }}>Hello {currentUser?.name}</div>
            <div><Logout /></div>
        </div>
            : null}
    </>
}