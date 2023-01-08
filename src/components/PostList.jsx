import React from 'react';
import PostItem from "./PostItem";

const PostList = ({post, title}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            {post.map(post => {
                return <PostItem post={post} key={post.id}/>})}
        </div>
    );
};

export default PostList;