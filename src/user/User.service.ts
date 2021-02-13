import { User } from "./User.entity";
import { getManager } from "typeorm";
import { hash } from "bcrypt";
import validator from "validator";

export interface UserServiceError {
  message: string;
  httpCode: number;
}

export async function getUsers() {
  const manager = getManager();
  const users = await manager.find(User);
  return users;
}

export async function createUser(username: string, password: string) {
  const manager = getManager();

  if (
    !username ||
    !validator.isAlphanumeric(username) ||
    !validator.isLength(username, {
      min: 4,
      max: 10,
    })
  ) {
    const error: UserServiceError = {
      message: "Invalid username",
      httpCode: 400,
    };
    throw error;
  }

  if (!password || !validator.isStrongPassword(password)) {
    const error: UserServiceError = {
      message: "Invalid/weak password",
      httpCode: 400,
    };
    throw error;
  }

  const users = await manager.find(User, { username: username });
  if (users.length > 0) {
    const error: UserServiceError = {
      message: "User already exists",
      httpCode: 400,
    };
    throw error;
  }

  const user = new User();
  user.username = username;

  const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
  const passwordHash = await hash(password, saltRounds);

  user.passwordHash = passwordHash;
  const savedUser = await manager.save(user);

  return savedUser;
}
