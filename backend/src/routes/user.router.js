import {Router} from 'express'
import { userRegistration } from '../controllers/user.controllers.js'
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();



router.route("/signup").post(
    upload.fields([
        {
            name : "profilePic",
            maxCount:1

        },
        {
            name : "coverpic",
            maxCount : 2
        }

    ]),
    userRegistration)


export default router