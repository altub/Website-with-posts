import React, {Fragment, useState} from 'react';

const ReplyTo = ({id}) =>{
    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const body = {description};
            const response = await fetch(`http://localhost:5000/posts/reply/${id}`, {
                method: "POST",
                headers: {"Content-type": "application/json", "Auth-token": token},
                body: JSON.stringify(body),
            });
            setDescription("");
            window.location = `/posts/${id}`;
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <Fragment>
            <h1 >Reply to post</h1>
            <form  onSubmit={onSubmitForm}>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                <button>Reply</button>
            </form>
        </Fragment>
    );
};

export default ReplyTo;