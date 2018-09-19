jest.mock('bcrypt', () => ({ hash: jest.fn().mockImplementation(() => Promise.resolve('testHashedPassword')) }));
jest.mock('uuid/v4', () => () => 'fakeUuid');
jest.mock('../../../infrastructure/database');
jest.mock('../send-mail');

const mockQueries = {
  doesUserExist: jest.fn(),
  createAppUser: jest.fn().mockReturnValue('fakeAppUserId'),
  createRegistrationToken: jest.fn(),
};
jest.mock('../queries', () => mockQueries);

const registerUser = require('../index');

beforeEach(() => {
  mockQueries.doesUserExist.mockClear();
  mockQueries.createAppUser.mockClear();
  mockQueries.createRegistrationToken.mockClear();
});

describe('register user endpoint;', () => {
  test('can register a new user', async () => {
    const req = {
      get: jest.fn().mockReturnValue('https://helloworld.com/'),
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
    expect(mockQueries.createRegistrationToken).toMatchSnapshot('creates registration token');
    expect(res.sendStatus).toMatchSnapshot('send status');
  });

  test('throws error if email address is already in use', async () => {
    mockQueries.doesUserExist.mockImplementation(() => Promise.resolve(true));

    const req = {
      body: {
        emailAddress: 'TestUsername',
        password: 'TestPassword',
      },
    };

    const res = {
      sendStatus: jest.fn(),
    };

    let thrownError = null;
    try {
      await registerUser(req, res);
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).not.toBeNull();
    expect(thrownError).toMatchSnapshot();
    expect(mockQueries.createAppUser).not.toBeCalled();
    expect(res.sendStatus).not.toBeCalled();
  });
});
