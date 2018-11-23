import React, { Component } from "react";

interface IApi {
    getAllUsers: any
}

const Api: IApi =
{
    getAllUsers: () => {
        return fetch('http://localhost:8000/api/users/all')
            .then(response => response.json())
            .then((data) => {
                return data
            })
    }
}

export default Api