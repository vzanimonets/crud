import * as usersCRUD from './user.service';
import { users } from './user.service';
import { IUser } from './user.interface';
import { v4 as uuid } from 'uuid';

function checkIfValidUUID(str: string) {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(str);
}

const isStringsArray = (arr: string[]) => Array.isArray(arr) && arr.every(i => typeof i === 'string');

const getUsersList = async (req: any, res: any) => {
  const users = await usersCRUD.getAllusers();
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' })
      .end('Internal server error.');
  }
};

const getUserById = async (req: any, res: any) => {
  try {
    const id = req.url.split('/')[3];
    if (!checkIfValidUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end('userId is invalid (not uuid)!');
      return;
    }

    const user: IUser | undefined = await usersCRUD.getUser(id);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end('User not found!');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end('Internal server error.');
  }
};

const addUser = (req: any, res: any) => {
  const chunks: Array<Uint8Array> = [];
  req.on('data', (chunk: Uint8Array) => {
    chunks.push(chunk);
  });
  req.on('end', async () => {
    const data = Buffer.concat(chunks);
    try {
      const { username, age, hobbies } = JSON.parse(data.toString());
      if ((!username || typeof username !== 'string') ||
        (!age || typeof age !== 'number') ||
        (!isStringsArray(hobbies))) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end('New user: incorrect data or it does not contain required fields!');
        return;
      }

      const user: IUser = {
        id: uuid(),
        username,
        age,
        hobbies,
      };
      await usersCRUD.createUser(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));

    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' })
        .end('Internal server error.');
    }
  });
};

const updateUserById = async (req: any, res: any) => {
  const chunks: Array<Uint8Array> = [];
  req.on('data', (chunk: Uint8Array) => {
    chunks.push(chunk);
  });
  req.on('end', async () => {
    const data = Buffer.concat(chunks);
    try {
      const id = req.url.split('/')[3];
      if (!checkIfValidUUID(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end('userId is invalid (not uuid)!');
        return;
      }

      const idx = users.findIndex(user => user.id === id);
      if (idx === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(`User with id:${id} not found!`);
        return;
      }

      const { username, age, hobbies } = JSON.parse(data.toString());
      if ((username && typeof username !== 'string') ||
        (age && typeof age !== 'number')
        || (hobbies && !isStringsArray(hobbies))) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end('New user: incorrect data or it does not contain required fields!');
        return;
      }

      const updatedUser = await usersCRUD.updateUser(idx, JSON.parse(data.toString()));
      if (!updatedUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' }).end(`User not found!`);
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(updatedUser));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end('Internal server error.');
    }
  });
};

const deleteUserById = async (req: any, res: any) => {
  try {
    const id = req.url.split('/')[3];
    if (!checkIfValidUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end('userId is invalid (not uuid)!');
      return;
    }

    const idx = users.findIndex(item => item.id === id);
    if (idx === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(`User with id:${id} not found!`);
      return;
    }

    await usersCRUD.deleteUser(idx);
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end(`User with id:${id} was delete`);
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end('Internal server error.');
  }
};
export {
  getUsersList,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
};