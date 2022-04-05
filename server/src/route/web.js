import express from "express";
import userController from '../controllers/userController';
import postController from '../controllers/postController';
import userValidation from '../middlewares/userValidation'
let router = express.Router()

let initWebRoutes = (app) => {
    //user
    router.post('/api/register', userController.postNewUser);
    router.post('/api/login', userController.loginUser);
    router.get('/get-api', userValidation.verifyToken, userController.checkUserById);
    // post 
    router.post('/api/posts', userValidation.verifyToken, postController.newPost);
    router.get('/api/posts', userValidation.verifyToken, postController.newGet);
    router.put('/api/posts/:id', userValidation.verifyToken, postController.newPut);
    router.delete('/api/posts/:id', userValidation.verifyToken, postController.deletePosts);

    return app.use('/', router)
}

module.exports = initWebRoutes;