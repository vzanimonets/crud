import http from 'http';
import * as dotenv from 'dotenv';
import { addUser, deleteUserById, getUserById, getUsersList, updateUserById } from './user.controller';

dotenv.config();


if (!process.env.PORT) {
  process.stdout.write('Error to get port!\n');
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 4000;

export const server = http.createServer(async (req: any, res: any) => {

    if (req.url === '/api/users' && req.method === 'GET') {
      getUsersList(req, res);
      return;
    }

    if (req.url.startsWith('/api/users/') && req.method === 'GET') {
      getUserById(req, res);
      return;
    }

    if (req.url == '/api/users' && req.method === 'POST') {
      addUser(req, res);
      return;
    }

    if (req.url.startsWith('/api/users/') && req.method === 'PUT') {
     updateUserById(req, res);
      return;
    }

    if (req.url.startsWith('/api/users/') && req.method === 'DELETE') {
      deleteUserById(req, res);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end('Route not found');
  },
);

server.listen(PORT, () => {
  process.stdout.write(`server started on port: ${PORT}\n`);
});

