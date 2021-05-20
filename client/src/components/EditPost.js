import React, {Fragment, useState} from 'react';

const EditPost = ({post}) => {

    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/posts/${post.post_id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json", "Auth-token": token},
                body: JSON.stringify(body),
            });
            window.location = '/myPosts';
        } catch (err) {
            console.log(err.message);
        }
    }

    const [description, setDescription] = useState(post.description);

    return (
        <Fragment>
            <button type="button" data-toggle="modal" data-target={`#id${post.post_id}`}>
            Edit
            </button>

            <div className="modal" id={`id${post.post_id}`} onClick={() => (setDescription(post.description))}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit post</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => (setDescription(post.description))}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <input type="text" value={description} onChange={ e => setDescription(e.target.value)}/>
                        </div>


                        <div className="modal-footer">
                            <button data-dismiss="modal" onClick={e => updateDescription(e)}>Edit</button>
                            <button data-dismiss="modal" onClick={() => (setDescription(post.description))}>Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditPost;