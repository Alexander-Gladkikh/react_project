import React from 'react';
import '../App.css'
import MyButton from "./UI/button/MyButton";
import { useNavigate } from "react-router-dom";

const PostItem = (props) => {


    const router = useNavigate()

    return (
        <div className='post'>
            <div className='postContent'>
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>{props.post.body}</div>
            </div>
            <div className='post__button'>
                <MyButton
                    onClick={() => router(`/posts/${props.post.id}`)}>
                    Открыть
                </MyButton>
                <MyButton
                    onClick={() => props.removePost(props.post)}>
                    Удалить
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;