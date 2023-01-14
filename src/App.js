import React, {useMemo, useRef, useState} from 'react'
import PostList from "./components/PostList";
import PostForm from "./components/UI/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'AAAA'},
        {id: 2, title: 'React', body: 'SSSSS'},
        {id: 3, title: 'Redux', body: 'DDDD'}
    ])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [visible, setVisible] = useState(false)


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
        setVisible(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(el => el.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton
                style={{marginTop: '20px'}}
                 onClick={() => setVisible(true)}
            >Добавить пользователя</MyButton>
            <MyModal visible={visible} setVisible={setVisible}>
                <PostForm create={create}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <PostList removePost={removePost} post={sortedAndSearchedPosts} title={'Список постов'}/>


        </div>
    );
}

export default App;
