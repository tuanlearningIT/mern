import { POSTS_LOADED_SUCCESS, POSTS_LOADED_FAILED, ADD_POSTS, DELETE_POSTS, UPDATE_POSTS, FIND_POSTS } from '../contexts/constans'

const postReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case POSTS_LOADED_SUCCESS:
            return {
                ...state,
                posts: payload,
                postsLoading: false
            }
        case POSTS_LOADED_FAILED:
            return {
                ...state,
                posts: [],
                postsLoading: false
            }
        case ADD_POSTS:
            return {
                ...state,
                posts: [...state.posts, payload],
                postsLoading: false
            }
        case FIND_POSTS:
            return {
                ...state,
                post: payload,

            }
        case DELETE_POSTS:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                postsLoading: false
            }
        case UPDATE_POSTS:
            const newPosts = state.posts.map(post => post._id === payload._id ? payload : post)
            return {
                ...state,
                posts: newPosts
            }

        default:
            return state
    }
}
export default postReducer;