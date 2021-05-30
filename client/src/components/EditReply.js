import React, {Fragment, useState} from 'react';

const EditReply = ({reply}) => {

    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/posts/reply/${reply.reply_id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json", "Auth-token": token},
                body: JSON.stringify(body),
            });
            window.location = '/myReplies';
        } catch (err) {
            console.log(err.message);
        }
    }

    const [description, setDescription] = useState(reply.description);

    return (
        <Fragment>
            <button type="button" data-toggle="modal" data-target={`#id${reply.reply_id}`}>
            Edit
            </button>

            <div className="modal" id={`id${reply.reply_id}`} onClick={() => (setDescription(reply.description))}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit reply</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => (setDescription(reply.description))}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <input type="text" value={description} onChange={ e => setDescription(e.target.value)}/>
                        </div>


                        <div className="modal-footer">
                            <button data-dismiss="modal" onClick={e => updateDescription(e)}>Edit</button>
                            <button data-dismiss="modal" onClick={() => (setDescription(reply.description))}>Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditReply;