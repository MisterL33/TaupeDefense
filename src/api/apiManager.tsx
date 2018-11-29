import React, { Component } from "react";

interface IApi {
    getAllUsers: any
    login: any
    email: any
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

    login: (mail: string, mdp: string) => {

        const user = { user: { "email": mail, "password": mdp } }
        console.log(user);
        fetch('http://localhost:8000/api/users/login', {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify({ email: mail, password: mdp })
        }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }

}


export default Api