
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    try {
        const userHeader = req.header('Authorization')
        const token = userHeader && userHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({
                errCode: 1,
                errMessage: 'Access token not found!'
            })
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({
            errCode: 2,
            errMessage: 'Invalid token!'
        })
    }
}

module.exports = {
    verifyToken
}