import React, {Fragment, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const SingularPostPage = () => {
    const { postID } = useParams();

    const [replies, setAllReplies] = useState([]);

    const sortAscDate = () => {
        setAllReplies([...replies].sort((a,b) => {return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()}));
    };

    const sortDescDate = () => {
        setAllReplies([...replies].sort((a,b) => {return new Date(a.datetime) - new Date(b.datetime)}).reverse());
    };

    const getAllReplies = async () => {
        try {
            const response = await fetch(`http://localhost:5000/posts/${postID}`, {
                method: "GET",
            });

            const jsonData = await response.json();

            setAllReplies(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getAllReplies();
    },[]);

    return(
        <Fragment>
            <button onClick={sortAscDate}>Sort replies by old</button>
            <button onClick={sortDescDate}>Sort replies by new</button>
            <table>
                <thead>
                    <tr>
                        <th>Replies</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {replies.map(reply => (
                        <tr key={reply.reply_id}>
                            <td>{reply.description}</td>
                            <td>{reply.datetime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default SingularPostPage;