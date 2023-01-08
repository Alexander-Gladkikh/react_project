import React, {useState} from 'react'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {
    const [post, setPost] = useState([
        {id: 1, title: 'JavaScript', body: 'Description'},
        {id: 2, title: 'JavaScript 2', body: 'Description'},
        {id: 3, title: 'JavaScript 3', body: 'Description'}
    ])

    return (
        <div className="App">
            <form action="">
                <MyInput type="text" placeholder={'Название поста'}></MyInput>
                <MyInput type="text" placeholder={'Описание поста'}></MyInput>
                <MyButton > Создать пост</MyButton>
            </form>
            <PostList post={post} title={'Список постов'}/>
        </div>
    );
}

export default App;
