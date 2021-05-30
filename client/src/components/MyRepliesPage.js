import React, {Fragment, useState, useEffect} from 'react';
import EditReply from './EditReply';

const MyRepliesPage = () => {
    const [replies, setReplies] = useState([]);

    const getReplies = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/myReplies', {
                method: "GET",
                headers:{"Auth-token": token},
            });

            const jsonData = await response.json();

            setReplies(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getReplies();
    },[]);

    const deleteReply = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const deleteReply = await fetch(`http://localhost:5000/posts/reply/${id}`, {
                method: "DELETE",
                headers: {"Auth-token": token},
            });

            setReplies(replies.filter(reply => reply.reply_id !== id));

        } catch (err) {
            console.log(err.message);
        }
    };

    const userProfile = () => {
        window.location = '/profilePage';
    };
    
    return (
        <Fragment>
            <button onClick={userProfile}>User Profile</button>
            <table>
                <thead>
                    <tr>
                        <th>Reply</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {replies.map(reply => (
                        <tr key={reply.reply_id}>
                            <td><a href={`/posts/${reply.post_id}`} >{reply.description}</a></td>
                            <td><EditReply reply = {reply}/></td>
                            <td><button onClick={() => deleteReply(reply.reply_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default MyRepliesPage;