import React, {useState} from 'react'
import PostItem from "./components/PostItem";

function App() {
    const [post]

    return (
        <div className="App">
            <PostItem post={{id: 1, title: 'JavaScript', body: 'Description'}}/>
            <PostItem post={{id: 2, title: 'JavaScript', body: 'Description'}}/>
            <PostItem post={{id: 3, title: 'JavaScript', body: 'Description'}}/>
        </div>
    );
}

export default App;
