import React, {useRef, useState} from 'react'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/UI/PostForm";

function App() {
    const [posts, setPosts] = useState([{id: 1, title: 'JavaScript', body: 'Description'}, {
        id: 2,
        title: 'JavaScript 2',
        body: 'Description'
    }, {id: 3, title: 'JavaScript 3', body: 'Description'}])

    const create = (newPost) => {
        setPosts([...posts, newPost])
    }


    return (<div className="App">
            <PostForm create={create}/>
            <PostList post={posts} title={'Список постов'}/>
        </div>);
}

export default App;
