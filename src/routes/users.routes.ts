import { Router } from 'express';
import { getRepository } from 'typeorm';
// import multer from 'multer';

import CreateUserService from '../services/CreateUser.service';
import User from '../models/User';
// import uploadConfig from '../config/upload';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

// usersRouter.use(ensureAuthenticated);

usersRouter.get('/', async (req, res) => {
  const userRepository = getRepository(User);

  const users = await userRepository.find();

  return res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const user = await new CreateUserService().execute({
    name,
    password,
    email,
  });

  return res.json(user);
});

export default usersRouter;
