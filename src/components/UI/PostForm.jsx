import React, {useState} from 'react';
import MyInput from "./input/MyInput";
import MyButton from "./button/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (event) => {
        event.preventDefault()
        const newPost = {id: Date.now(), ...post}
        create(newPost)
        setPost({title: '', body: ''})
    }
    return (
        <form action="">
            <MyInput value={post.title} onChange={(event) => setPost({...post, title: event.target.value})}
                     type="text"
                     placeholder={'Название поста'}></MyInput>
            <MyInput value={post.body} onChange={(event) => setPost({...post, body: event.target.value})}
                     type="text"
                     placeholder={'Описание поста'}></MyInput>
            <MyButton onClick={addNewPost}> Создать пост</MyButton>
        </form>
    );
};

export default PostForm;