import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import CreateUserService from '../services/CreateUser.service';
import UpdateUserAvatarService from '../services/UpdateUserAvatar.service';
import User from '../models/User';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('file'), async (req, res) => {
  const updateUserAvatarService = new UpdateUserAvatarService();

  const user = await updateUserAvatarService.execute({
    user_id: req.user.id,
    avatarFileName: req.file.filename,
  });

  delete user.password;

  return res.json(user);
});

export default usersRouter;
