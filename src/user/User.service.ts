import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

import { User } from "./User.entity";
import { getManager } from "typeorm";
import validator from "validator";

export interface UserServiceError {
  message: string;
  httpCode: number;
}

export interface UserServicePayload {
  id: string;
  username: string;
}

export async function getUsers() {
  const manager = getManager();
  const users = await manager.find(User);
  return users;
}

export async function loginUser(username: string, password: string) {
  const manager = getManager();

  const user = await manager.findOne(User, { username: username });

  if (!user) {
    const error: UserServiceError = {
      message: "Invalid credentials",
      httpCode: 401,
    };
    throw error;
  }

  const pwComparison = await compare(password, user.passwordHash as string);

  if (!pwComparison) {
    const error: UserServiceError = {
      message: "Invalid credentials",
      httpCode: 401,
    };
    throw error;
  }

  return user;
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

export async function createHash(id: string, username: string) {
  return sign(
    {
      id: id,
      username: username,
    } as UserServicePayload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: "31d",
    }
  );
}

export async function getUserByHash(hash: string) {
  var decoded: UserServicePayload;

  try {
    decoded = verify(hash, process.env.JWT_SECRET as string) as UserServicePayload;
  } catch (_) {
    const error: UserServiceError = {
      message: "Invalid hash",
      httpCode: 401,
    };
    throw error;
  }

  if (!decoded.username) {
    const error: UserServiceError = {
      message: "Invalid hash",
      httpCode: 401,
    };
    throw error;
  }

  const manager = getManager();

  const user = await manager.findOne(User, { username: decoded.username });

  if (!user) {
    const error: UserServiceError = {
      message: "Invalid hash",
      httpCode: 401,
    };
    throw error;
  }

  return user;
}
