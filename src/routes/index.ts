// src/routes/index.ts
// src/routes/index.ts
import { Router } from 'express';
import usersRouter from './users.routes';

const routes = Router();
routes.use('/users', usersRouter);

routes.get('/', (req, res) => {
  return res.send('hello  world');
});

export default routes;
