import postService from '../services/postService';

let newPost = async (req, res) => {
    try {
        let response = await postService.newPost(req.userId, req.body)
        return res.status(200).json(response)

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }

}
let newGet = async (req, res) => {
    try {
        let response = await postService.newGet(req.userId)
        return res.status(200).json(response)

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let newPut = async (req, res) => {
    try {
        let response = await postService.newPut(req.userId, req.params.id, req.body)
        return res.status(200).json(response)

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }

}
let deletePosts = async (req, res) => {
    try {
        let response = await postService.deletePosts(req.userId, req.params.id)
        return res.status(200).json(response)

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }

}

module.exports = {
    newPost,
    newGet,
    newPut,
    deletePosts
}