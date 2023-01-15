import React from 'react';
import '../App.css'
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {
    return (
        <div className='post'>
            <div className='postContent'>
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>{props.post.body}</div>
            </div>
            <div className='postButton'>
                <MyButton onClick={() => props.removePost(props.post)}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItem;