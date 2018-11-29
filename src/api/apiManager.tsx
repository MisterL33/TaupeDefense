import React, { Component } from "react";

interface IApi {
    getAllUsers: any
    login: any
}

const Api: IApi =
{
    getAllUsers: () => {
        return fetch('http://localhost:8000/api/users/all')
            .then(response => response.json())
            .then((data) => {
                return data
            })
    },

    async login(mail: string, mdp: string) {
        const user = { user: { "email": mail, "password": mdp } }
        const res = await fetch('http://localhost:8000/api/users/login', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(user)
        })
        return res.json()
    }
}


export default Api