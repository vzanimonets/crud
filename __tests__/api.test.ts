import request from 'supertest';
import { server } from '../src';
import { IUser } from '../src/user.interface';

describe('GET /users', function() {

  it('should return an empty array', async () => {
    await request(server)
      .get('/api/users')
      .expect(200, []);
  });
});

let createdUser: IUser;

describe('POST /api/users', () => {
  it('should create new user and return return 201 with newly created record', async () => {

    const newUserData = { userName: 'John Snow', age: 11, hobbies: [] };
    const response = await request(server)
      .post('/api/users')
      .send(newUserData)
      .expect(201);

    createdUser = response.body;

    expect(createdUser).toEqual({
      id: expect.any(String),
      userName: newUserData.userName,
      age: newUserData.age,
      hobbies: newUserData.hobbies,
    });
  });
});

describe('PUT /api/users', () => {
  it('Update the created record response is expected containing an updated object with the same id', async () => {
    const newUserData = {
      id: 4532,
      userName: 'NewUserName',
      age: 23,
    };
    const response = await request(server)
      .put(`/api/users/${createdUser.id}`)
      .send(newUserData)
      .expect(200);

    const updatedUser = response.body;

    expect(updatedUser.id).toEqual(createdUser.id);

  });
});

afterEach(async () => {
  await server.close();
});
