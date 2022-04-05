import User from '../models/User'
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const postNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.username || !data.password) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing username and/or password'
                })
            } else {
                const user = await User.findOne({
                    username: data.username
                })
                if (user) {
                    resolve({
                        errCode: 0,
                        errMessage: 'Username alreadly taken!'
                    })
                }
                //all good
                const hashedPassword = await argon2.hash(data.password)
                const newUser = new User({
                    username: data.username,
                    password: hashedPassword
                })
                await newUser.save()

                // return token 
                const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
                resolve({
                    errCode: 0,
                    errMessage: 'User created successfully!',
                    accessToken
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
// let checkRequiredFields = (inputData) => {
//     let arr = ['username', 'password']

//     let isValid = true;
//     let element = '';
//     for (let i = 0; i < arr.length; i++) {
//         if (!inputData[arr[i]]) {
//             isValid = false;
//             element = arr[i];
//             break;
//         }
//     }
//     return {
//         isValid: isValid,
//         element: element
//     }
// }
const loginUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let checkObj = checkRequiredFields(data);
            // if (checkObj.isValid === false) {

            //     resolve({
            //         errCode: 1,
            //         errMessage: `Missing parameter: ${checkObj.element}`
            //     })
            if (!data.username || !data.password) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing username and/or password'
                })
            } else {
                const user = await User.findOne({
                    username: data.username
                })
                if (!user) {
                    resolve({
                        errCode: 2,
                        errMessage: 'User or password is incorrect or does not exist!'
                    })
                }
                // check passwword
                const passwordVali = await argon2.verify(user.password, data.password)
                if (!passwordVali) {
                    resolve({
                        errCode: 3,
                        errMessage: 'User or password is incorrect or does not exist!'
                    })
                }

                // return token 
                const accessToken = jwt.sign(
                    { userId: user._id },
                    process.env.ACCESS_TOKEN_SECRET
                )
                resolve({
                    errCode: 0,
                    errMessage: 'Login user successfully!',
                    accessToken
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const checkUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findById({ _id: userId }).select('-password')
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                })
            }
            resolve({
                errCode: 0,
                errMessage: "success!",
                user
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postNewUser,
    loginUser,
    checkUserById
}