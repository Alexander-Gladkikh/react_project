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
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";


function App() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [visible, setVisible] = useState(false)
    const [totalCount, setTotalCount] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [fetchPost, isPostLoading, postsError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        console.log(response.headers['x-total-count'])
        setTotalCount(response.headers['x-total-count'])
    })

    useEffect(() => {
        fetchPost()
    },[])


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
            {postsError &&
            <h1>Произшла ошибка ${postsError}</h1>}
            {isPostLoading
            ? <div style={{display:'flex', marginTop: '20px', justifyContent: 'center'}}><Loader/></div>
            : <PostList removePost={removePost} post={sortedAndSearchedPosts} title={'Список постов'}/>}



        </div>
    );
}

export default App;
