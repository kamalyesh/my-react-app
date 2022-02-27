import React from "react"
import { useNavigate } from "react-router-dom"

export default function Logout() {
    const navigate = useNavigate()

    const logout = () => {
        let token = localStorage.getItem('token')
        fetch("http://localhost:3030/logout?token=" + (token || ""), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(async (response) => {
            if (response.status == 200) {
                localStorage.clear()
                navigate('/')
            } else {
                let { message } = await response.json()
                alert(message)
            }
        }).catch(err => {
            console.error(err)
            alert(err.message)
        })
    }

    return <button onClick={logout} >Log out</button>
}