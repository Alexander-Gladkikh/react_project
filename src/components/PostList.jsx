import React from 'react';
import PostItem from "./PostItem";

const PostList = ({post, title, removePost}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            {post.map((post, index) => {
                return <PostItem removePost={removePost} number={index + 1} post={post} key={post.id}/>})}
        </div>
    );
};

export default PostList;