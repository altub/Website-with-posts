import React, {Fragment, useState, useEffect} from 'react';

const PostsPage = () => {
    const [posts, setAllPosts] = useState([]);

    const sortAscDate = () => {
        setAllPosts([...posts].sort((a,b) => {return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()}));
    };

    const sortDescDate = () => {
        setAllPosts([...posts].sort((a,b) => {return new Date(a.datetime) - new Date(b.datetime)}).reverse());
    };

    const getAllPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/posts', {
                method: "GET",
            });

            const jsonData = await response.json();

            setAllPosts(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getAllPosts();
    },[]);

    return(
        <Fragment>
            <button onClick={sortAscDate}>Sort posts by old</button>
            <button onClick={sortDescDate}>Sort posts by new</button>
            <table>
                <thead>
                    <tr>
                        <th>Post</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.post_id}>
                            <td><a href={`/posts/${post.post_id}`} >{post.description}</a></td>
                            <td>{post.datetime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default PostsPage;