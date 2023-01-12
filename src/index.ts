import http from 'http';
import * as dotenv from 'dotenv';
import { addUser, deleteUserById, getUserById, getUsersList, updateUserById } from './user.controller';

dotenv.config();

if (!process.env.PORT) {
  console.log('Error to get port!');
}

const PORT: number = parseInt(process.env.PORT as string, 10);

export const server = http.createServer(async (req: any, res: any) => {

    if (req.url === '/api/users' && req.method === 'GET') {
      await getUsersList(req, res);
      return;
    }

    if (req.url.match(/\/api\/users\/([a-z0-9-\w]+)/) && req.method === 'GET') {
      await getUserById(req, res);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end('Route not found');
  },
);

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});