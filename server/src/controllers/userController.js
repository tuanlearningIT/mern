import userService from '../services/userService'

let postNewUser = async (req, res) => {
    try {
        let response = await userService.postNewUser(req.body)
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
let loginUser = async (req, res) => {
    try {
        let response = await userService.loginUser(req.body)
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
let checkUserById = async (req, res) => {
    try {
        let response = await userService.checkUserById(req.userId)
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
    postNewUser,
    loginUser,
    checkUserById

}