import cluster from 'node:cluster';
import { cpus } from 'node:os';
import http from 'http';
import * as dotenv from 'dotenv';
import { addUser, deleteUserById, getUserById, getUsersList, updateUserById } from './user.controller';

dotenv.config();


if (!process.env.PORT) {
  process.stdout.write('Error to get port!');
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 4000;
const ENDPOINTS = [
  { url: '/api/users', method: 'POST', fn: (req: any, res: any) => addUser(req, res) },
  { url: '/api/users', method: 'GET', fn: (req: any, res: any) => getUsersList(req, res) },
  { url: '/api/users/', method: 'GET', fn: (req: any, res: any) => getUserById(req, res) },
  { url: '/api/users/', method: 'PUT', fn: (req: any, res: any) => updateUserById(req, res) },
  { url: '/api/users/', method: 'DELETE', fn: (req: any, res: any) => deleteUserById(req, res) },
];

const getAction = (req: any) => {
  const id = req.url.split('/')[3];
  return ENDPOINTS.find(item => {
    return item.method === req.method && ((req.url === item.url) || req.url.startsWith(item.url) && id?.length);
  })?.fn;
};

const pid = process.pid;
let port: number = PORT;
if (cluster.isMaster) {
  const count = cpus().length > ENDPOINTS.length ? ENDPOINTS.length : ENDPOINTS.length;
  process.stdout.write(`Master pid: ${pid} on port ${PORT}`);

  for (let i = 0; i < count; i++) {
    ++port;
    const worker = cluster.fork({ port: port });

    worker.send({ port: port, pid: worker.process.pid });

    worker.on('exit', () => {
      const _worker = cluster.fork({ port });
      _worker.send({ port: port, pid: _worker.process.pid });
    });
  }
} else {
  let _pid: number;
  let _port: number = PORT;

  process.on('message', ({ port, pid }) => {
    _port = port;
    _pid = pid;
  });

  const server = http.createServer((req: any, res: any) => {
      const fn = getAction(req);
      if (typeof fn == 'function') {
        fn(req, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end('Route not found');
      }
    },
  );
  server.listen(_port, () =>  process.stdout.write(`pid: ${_pid} on port from master is ${_port}`));
}

