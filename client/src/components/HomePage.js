import React, { Fragment } from 'react';

const HomePage = () => {

    const register = () => {
        window.location = '/register';
    };

    const login = () =>{
        window.location = '/login';
    };

    return (
        <Fragment>
            <h1>Home Page</h1>
            <button onClick={login}>Login</button>
            <button onClick={register}>Register</button>
        </Fragment>
    );
};

export default HomePage;