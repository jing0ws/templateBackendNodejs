// import { startOfHour } from 'date-fns';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import User from '../models/User';
// import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const isEmailUsed = await userRepository.findOne({
      where: { email },
    });
    if (isEmailUsed) {
      throw new AppError('Email Addres Alread used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    delete user.password;
    return user;
  }
}

export default CreateUserService;
