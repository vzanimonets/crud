import { IUser } from './user.interface';

export const users: IUser[] = [];

export const getAllusers = async (): Promise<IUser[]> => {
  return users;
};

export const getUser = async (id: string): Promise<IUser | undefined> => {
  return users.find(user => user.id === id);
};

export const createUser = async (user: IUser): Promise<void> => {
  users.push(user);
};

export const updateUser = async (idx: number, newData: { username: string, age: number, hobbies: string[] }): Promise<IUser | undefined> => {
  const { username, age, hobbies } = newData;
  if (username) users[idx].username = username;
  if (age) users[idx].age = age;
  if (Array.isArray(hobbies)) users[idx].hobbies = hobbies;
  return users[idx];
};
export const deleteUser = async (idx: number): Promise<void> => {
  users.splice(idx, 1);
};