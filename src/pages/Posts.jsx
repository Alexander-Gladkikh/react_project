import React, {useEffect, useState} from 'react'
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import Pagination from "../components/UI/pagination/Pagination";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import PostForm from "../components/UI/PostForm";

function Posts() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [visible, setVisible] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [fetchPost, isPostLoading, postsError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = (response.headers['x-total-count'])
        setTotalPages(getPageCount(totalCount, limit))
    })

    useEffect(() => {
        fetchPost(limit, page)
    }, [])


    const create = (newPost) => {
        setPosts([...posts, newPost])
        setVisible(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(el => el.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchPost(limit, page)
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
                ? <div style={{display: 'flex', marginTop: '20px', justifyContent: 'center'}}><Loader/></div>
                : <PostList removePost={removePost} post={sortedAndSearchedPosts} title={'Список постов'}/>}
            <Pagination
                page={page}
                totalPages={totalPages}
                changePage={changePage}
            />
        </div>
    );
}

export default Posts;
