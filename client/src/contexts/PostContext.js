import { createContext, useEffect, useReducer, useState } from "react";
import postReducer from "../reducers/postReducer";
import axios from "axios";
import { apiUrl, POSTS_LOADED_SUCCESS, POSTS_LOADED_FAILED, ADD_POSTS, DELETE_POSTS, UPDATE_POSTS, FIND_POSTS } from './constans'
export const PostContext = createContext()
//state
const PostContextProvider = ({ children }) => {
    const [postsState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true
    })
    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
    //get all post
    const getPosts = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/posts`)
            if (res && res.data && res.data.errCode === 0) {
                dispatch({
                    type: POSTS_LOADED_SUCCESS,
                    payload: res.data.posts
                })
            }
        } catch (error) {
            dispatch({
                type: POSTS_LOADED_FAILED,

            })
        }
    }

    const addPosts = async (newPosts) => {
        try {
            const res = await axios.post(`${apiUrl}/api/posts`, newPosts)
            if (res && res.data && res.data.errCode === 0) {
                dispatch({
                    type: ADD_POSTS,
                    payload: res.data.posts
                })
                return res.data
            }

        } catch (error) {
            return error.res.data ? error.res.data : { errCode: -1, errMessage: 'Server error!' }
        }
    }
    const deletePosts = async (id) => {
        try {
            const res = await axios.delete(`${apiUrl}/api/posts/${id}`)
            if (res && res.data && res.data.errCode === 0) {
                dispatch({
                    type: DELETE_POSTS,
                    payload: id
                })
                return res.data
            }

        } catch (error) {
            console.log(error)
        }
    }
    //find postt when user is updating post
    const findPosts = (postId) => {
        const post = postsState.posts.find(post => post._id === postId)
        dispatch({
            type: FIND_POSTS,
            payload: post
        })
    }
    const updatePosts = async (updatePosts) => {
        try {
            const res = await axios.put(`${apiUrl}/api/posts/${updatePosts._id}`, updatePosts)
            if (res && res.data && res.data.errCode === 0) {
                dispatch({
                    type: UPDATE_POSTS,
                    payload: res.data.posts
                })
                return res.data
            }

        } catch (error) {
            return error.res.data ? error.res.data : { errCode: -1, errMessage: 'Server error!' }

        }
    }
    const postContextData = { getPosts, postsState, showAddPostModal, setShowAddPostModal, addPosts, deletePosts, updatePosts, findPosts, setShowUpdatePostModal, showUpdatePostModal }
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;