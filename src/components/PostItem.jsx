import React from 'react';
import '../App.css'

const PostItem = (props) => {
    return (
        <div className='post'>
            <div className='postContent'>
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>{props.post.body}</div>
            </div>
            <div className='postButton'>
                <button>Удалить</button>
            </div>
        </div>
    );
};

export default PostItem;