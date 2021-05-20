import React, {Fragment, useState} from 'react';

const LoginPage = () => {

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const username = usernameInput;
        const password = passwordInput;
        const userLogin = {username, password};
        login(userLogin);
    }

    const usernameTextHandler = (e) => {
      setUsernameInput(e.target.value);
    }

    const passwordTextHandler = (e) => {
      setPasswordInput(e.target.value);
    }

    const login = async (userLogin) => {
        try {
          const data = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers:{"Content-type": "application/json"},
            body: JSON.stringify(userLogin)
          });

          const jsonData = await data.json();

          if(jsonData.token){
            localStorage.setItem('token', jsonData.token);
            window.location = 'profilePage';
          }else{
            console.log(jsonData.message);
            window.location = '/login';
          }
        } catch (err) {
          window.location = '/login';
          console.log('login error');
        }
      };

    return (
      <Fragment>
        <form>
          <input value={usernameInput} onChange={usernameTextHandler} type="text"></input>
          <input value={passwordInput} onChange={passwordTextHandler} type="text"></input>
          <button onClick={onSubmitForm}>Submit</button>
        </form>
      </Fragment>
    );
};

export default LoginPage;