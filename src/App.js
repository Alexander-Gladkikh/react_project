import React, {useState} from 'react'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";

function App() {
    const [post, setPost] = useState([
        {id: 1, title: 'JavaScript', body: 'Description'},
        {id: 2, title: 'JavaScript 2', body: 'Description'},
        {id: 3, title: 'JavaScript 3', body: 'Description'}
    ])

    return (
        <div className="App">
            <PostList post={post} title={'Список постов'}/>
        </div>
    );
}

export default App;
