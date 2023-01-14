import React, {useMemo, useRef, useState} from 'react'
import PostList from "./components/PostList";
import PostForm from "./components/UI/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'AAAA'},
        {id: 2, title: 'React', body: 'SSSSS'},
        {id: 3, title: 'Redux', body: 'DDDD'}
    ])

    const [filter, setFilter] = useState({sort: '' , query: ''})


    const sortedPost = useMemo(() => {
        console.log("Отрабатала")
        if (filter.sort) {
            return [...posts.sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))]
        } else return posts;
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPost.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPost])

    const create = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(el => el.id !== post.id))
    }

    return (
        <div className="App">
            <PostForm create={create}/>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {sortedAndSearchedPosts.length
                ? <PostList removePost={removePost} post={sortedAndSearchedPosts} title={'Список постов'}/>
                : <h1 style={{textAlign: 'center'}}>Посты не найдены</h1>
            }

        </div>
    );
}

export default App;
