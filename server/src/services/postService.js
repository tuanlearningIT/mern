import Post from '../models/Post';

const newPost = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.title) {
                resolve({
                    errCode: 1,
                    errMessage: 'Title is required!'
                })
            } else {
                const newPost = new Post({
                    title: data.title,
                    description: data.description,
                    url: data.url.startsWith('https://') ? data.url : `https://${data.url}`,
                    status: data.status || 'TO LEARN',
                    userId: userId,
                })

                await newPost.save()
                resolve({
                    errCode: 0,
                    errMessage: 'Happy learning!',
                    posts: newPost
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const newGet = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const posts = await Post.find({ userId }).populate('userId', [
                'username'
            ]).exec()

            resolve({
                errCode: 0,
                posts
            })

        } catch (e) {
            reject(e)
        }
    })
}
const newPut = (userId, id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.title) {
                resolve({
                    errCode: 1,
                    errMessage: 'Title is required!'
                })
            } else {
                let updatePost = {
                    title: data.title,
                    description: data.description || '',
                    url: (data.url.startsWith('https://') ? data.url : `https://${data.url}`) || '',
                    status: data.status || 'TO LEARN',

                }
                const postUpdateCondition = { _id: id, userId: userId }
                updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new: true })
                // user not authorised to update post
                if (!updatePost) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Post not found or user not authorised!',

                    })
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: 'Excellent progress!',
                        posts: updatePost
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}
const deletePosts = (userId, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const postDeleteCondition = { _id: id, userId: userId }
            const deletePost = await Post.findOneAndDelete(postDeleteCondition)
            //user not authorised or post not found
            if (!deletePost) {
                resolve({
                    errCode: 1,
                    errMessage: 'Post not found or user not authorised!',

                })
            } else {
                resolve({
                    errCode: 0,
                    errMessage: 'Delete posts successfully!',
                    posts: deletePost
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    newPost,
    newGet,
    newPut,
    deletePosts,

}