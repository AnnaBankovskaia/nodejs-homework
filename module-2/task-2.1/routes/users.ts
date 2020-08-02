import * as express from 'express';
import * as createError from 'http-errors';
import { UserService } from '../services';
import { doesUserExist } from '../validators';

const userRouter = express.Router();
const userService = new UserService();

userRouter.route('/')
    .get((req, res) => {
        const { search, limit } = req.query;
        if ((search && typeof search !== 'string') || (limit && typeof limit !== 'string')) {
            return res.status(400).json(createError(400, 'Bad request parameters'));
        }

        const users = userService.getUsers(search as string, limit as string);
        res.status(200).json(users);
    })
    .post((req, res) => {
        const { login, password, age } = req.body;
        const user = userService.createUser({ login, password, age });

        res.status(200).json(user);
    });

userRouter.route('/:id')
    .get(doesUserExist, (req, res) => {
        const { id } = req.params;
        const user = userService.getUser(id);

        res.status(200).json(user);
    })
    .put(doesUserExist, (req, res) => {
        const { id } = req.params;
        const { login, password, age } = req.body;

        const updatedUser = userService.updateUser({ login, password, age, id });

        res.status(200).json(updatedUser);
    })
    .delete(doesUserExist, (req, res) => {
        const { id } = req.params;
        userService.deleteUser(id);

        res.json(200);
    })
;

export default userRouter;
