import React, {useEffect, useMemo, useRef, useState} from 'react'
import PostList from "./components/PostList";
import PostForm from "./components/UI/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";

function App() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [visible, setVisible] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [isPostLoading, setIsPostLoading] = useState(false)

    useEffect(() => {
        fetchPost()
    },[])


    async function fetchPost() {
        setIsPostLoading(true)
        const posts = await PostService.getAll()
        setPosts(posts)
        setIsPostLoading(false)
    }

    const create = (newPost) => {
        setPosts([...posts, newPost])
        setVisible(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(el => el.id !== post.id))
    }

    return (
        <div className="App">
            <button onClick={fetchPost}>Получить данные</button>
            <MyButton
                style={{marginTop: '20px'}}
                 onClick={() => setVisible(true)}
            >Добавить пользователя</MyButton>
            <MyModal visible={visible} setVisible={setVisible}>
                <PostForm create={create}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {isPostLoading
            ? <h1>Идет загрузка....</h1>
            : <PostList removePost={removePost} post={sortedAndSearchedPosts} title={'Список постов'}/>}



        </div>
    );
}

export default App;
