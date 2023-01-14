import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    return useMemo(() => {
        if (sort) {
            return [...posts.sort((a, b) => a[sort].localeCompare(b[sort]))]
        } else return posts;
    }, [sort, posts])
}

export const usePosts = (posts, sort, query) => {
    const sortedPost = useSortedPosts(posts, sort)
    return useMemo(() => {
        return sortedPost.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPost])

}
