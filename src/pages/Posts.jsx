import React, {useEffect, useRef, useState} from 'react'
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
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [visible, setVisible] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const lastElement = useRef()

    const [fetchPost, isPostLoading, postsError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = (response.headers['x-total-count'])
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPost(limit, page)
    }, [page, limit])


    const create = (newPost) => {
        setPosts([...posts, newPost])
        setVisible(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(el => el.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
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
            <PostFilter
                filter={filter}
                setFilter={setFilter}/>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Количество элементов на странице'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: 25},
                    {value: -1, name: 'Показать все'},
                ]}
            />
            {postsError &&
                <h1>Произшла ошибка ${postsError}</h1>}
            <PostList removePost={removePost} post={sortedAndSearchedPosts} title={'Список постов'}/>
            <div ref={lastElement} style={{height: '20px', backgroundColor: 'red'}}></div>
            {isPostLoading &&
                <div style={{display: 'flex', marginTop: '20px', justifyContent: 'center'}}><Loader/></div>
            }

            <Pagination
                page={page}
                totalPages={totalPages}
                changePage={changePage}
            />
        </div>
    );
}

export default Posts;
