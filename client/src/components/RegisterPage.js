import React, {Fragment, useState} from 'react';

const RegisterPage = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [firstNameInput, setFirstNameInput] =useState("");
    const [lastNameInput, setLastNameInput] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const username = usernameInput;
        const password = passwordInput;
        const email = emailInput;
        const first_name = firstNameInput;
        const last_name = lastNameInput;
        const registerUser = {username, email, first_name, last_name, password};
        register(registerUser);
    }

    const usernameTextHandler = (e) => {
      setUsernameInput(e.target.value);
    }

    const passwordTextHandler = (e) => {
      setPasswordInput(e.target.value);
    }
    
    const emailTextHandler = (e) => {
      setEmailInput(e.target.value);
    }

    const firstNameTextHandler = (e) => {
      setFirstNameInput(e.target.value);
    }

    const lastNameTextHandler = (e) => {
      setLastNameInput(e.target.value);
    }

    const register = async (registerUser) => {
        try {
          const data = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers:{"Content-type": "application/json"},
            body: JSON.stringify(registerUser)
          });

          const jsonData = await data.json();

          if(jsonData.token){
            localStorage.setItem('token', jsonData.token);
            window.location = 'profilePage';
          }else{
            console.log(jsonData.message);
            window.location = '/register';
          }
        } catch (err) {
          window.location = '/register';
          console.log('Registration error');
        }
      };

    return (
      <Fragment>
        <form>
          <div>
            <label>Username</label>
            <input value={usernameInput} onChange={usernameTextHandler} type="text"></input>
          </div>

          <div>
            <label>Password</label>
            <input value={passwordInput} onChange={passwordTextHandler} type="text"></input>
          </div>

          <div>
            <label>Email</label>
            <input value={emailInput} onChange={emailTextHandler} type="text"></input>
          </div>

          <div>
            <label>First Name</label>
            <input value={firstNameInput} onChange={firstNameTextHandler} type="text"></input>
          </div>

          <div>
            <label>Last Name</label>
            <input value={lastNameInput} onChange={lastNameTextHandler} type="text"></input>
          </div>
          

          
          
          
          <button onClick={onSubmitForm}>Submit</button>
        </form>
      </Fragment>
    );
};

export default RegisterPage;