jest.mock('bcrypt', () => ({ hash: jest.fn().mockImplementation(() => Promise.resolve('testHashedPassword')) }));

const mockQueries = {
  doesUserExist: jest.fn(),
  createAppUser: jest.fn(),
};
jest.mock('./queries', () => mockQueries);

const registerUser = require('./index');

describe('register user endpoint;', () => {
  test('can register a new user', async () => {
    const req = {
      body: {
        emailAddress: 'TestUsername',
        password: 'TestPassword',
      },
    };

    const res = {
      sendStatus: jest.fn(),
    };

    await registerUser(req, res);

    expect(mockQueries.createAppUser).toMatchSnapshot('create app user');
    expect(res.sendStatus).toMatchSnapshot('send status');
  });
});
