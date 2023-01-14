import React, {useRef, useState} from 'react'
import PostList from "./components/PostList";
import PostForm from "./components/UI/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'AAAA'},
        {id: 2, title: 'React', body: 'SSSSS'},
        {id: 3, title: 'Redux', body: 'DDDD'}
    ])

    const [selectedSort, setSelectedSort] = useState()

    const create = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(el => el.id !== post.id))
    }

    const sortPost = (sort) => {
        console.log(sort)
        setSelectedSort(sort)
        setPosts([...posts.sort((a,b) => a[sort].localeCompare(b[sort]))])
    }

    return (
        <div className="App">
        <PostForm create={create}/>
        <hr style={{margin: '15px 0'}}/>
        <MySelect
            value={selectedSort}
            onChange={sortPost}
            defaultValue={'Сортировка'} options={[
            {value: 'title', name: 'по названию'},
            {value: 'body', name: 'по описанию'}
        ]}/>
            {posts.length
                ? <PostList removePost={removePost} post={posts} title={'Список постов'}/>
                : <h1 style={{textAlign: 'center'}}>Посты не найдены</h1>
            }

    </div>
);
}

export default App;
