import React, { Component } from "react";

interface IApi {
    getAllUsers(): Promise<object>
    login(mail: string, mdp: string): Promise<object>
    subscribe(mail: string, mdp: string): Promise<object>
    currentUser(token: string): Promise<object>
}

export const Api: IApi =
{
    async getAllUsers() {
        const res = await fetch('http://localhost:8000/api/users/all')
        return res.json()
    },

    async login(mail, mdp) {
        const user = { user: { "email": mail, "password": mdp } }
        const res = await fetch('http://localhost:8000/api/users/login', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(user)
        })
        return res.json()
    },

    async currentUser(token) {

        const res = await fetch('http://localhost:8000/api/users/current', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            })
        })
        return res.json()
    },

    async subscribe(mail, mdp) {
        const user = { user: { "email": mail, "password": mdp } }
        const res = await fetch('http://localhost:8000/api/users', {
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