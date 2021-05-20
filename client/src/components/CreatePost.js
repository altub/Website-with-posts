import React, { Fragment, useState } from 'react';

const CreatePosts = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const body = {description};
            const response = await fetch("http://localhost:5000/posts", {
                method: "POST",
                headers: {"Content-type": "application/json", "Auth-token": token},
                body: JSON.stringify(body),
            });
            setDescription("");
            window.location = '/myPosts';
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <Fragment>
            <h1 >Create A Post</h1>
            <form  onSubmit={onSubmitForm}>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                <button>Post</button>
            </form>
        </Fragment>
    );
};

export default CreatePosts;