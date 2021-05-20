import React, { Fragment, useState, useEffect } from 'react';
import EditPost from './EditPost';
import CreatePosts from './CreatePost';

const MyPostsPage = () => {

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/myPosts', {
                method: "GET",
                headers:{"Auth-token": token},
            });

            const jsonData = await response.json();

            setPosts(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getPosts();
    },[]);

    const deletePost = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const deletePost = await fetch(`http://localhost:5000/posts/${id}`, {
                method: "DELETE",
                headers: {"Auth-token": token},
            });

            setPosts(posts.filter(post => post.post_id !== id));

        } catch (err) {
            console.log(err.message);
        }
    };

    const userProfile = () => {
        window.location = '/profilePage';
    };
    
    return (
        <Fragment>
            <CreatePosts />
            <button onClick={userProfile}>User Profile</button>
            <table>
                <thead>
                    <tr>
                        <th>Post</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.post_id}>
                            <td>{post.description}</td>
                            <td><EditPost post = {post}/></td>
                            <td><button onClick={() => deletePost(post.post_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default MyPostsPage;