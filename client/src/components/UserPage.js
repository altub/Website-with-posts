import React, { Fragment, useEffect, useState } from 'react';

const UserPage = () => {

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        getUserData();
    },[]);

    const getUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/profilePage', {
                method: "GET",
                headers:{"Auth-token": token},
            });
            const jsonData = await response.json();

            setUserData(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const logOut = () => {
        localStorage.removeItem('token');
        window.location = '/login';
    };

    const myPosts = () => {
        window.location = '/myPosts';
    };

    return (
        <Fragment>
            <h1>Hello</h1>
            {userData.map(userDat => (
                <div key={userDat.username}>
                    <h1>Welcome User {userDat.username}</h1>
                    <ul>
                        <li>Email {userDat.email}</li>
                        <li>First Name {userDat.first_name}</li>
                        <li>Last Name {userDat.last_name}</li>
                    </ul>
                    <button onClick={myPosts}>My Posts</button>
                    <button onClick={logOut}>Logout</button>
                </div>
            ))}
        </Fragment>
    );
};

export default UserPage;