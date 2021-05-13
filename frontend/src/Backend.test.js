describe('Testing Login', () => {
  it('Should return user not found', async () => {
    let err = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let error = await err.json();
    expect(error).toStrictEqual({ status: 401, message: 'User was not found' });
  });

  it('Should be valid user login', async () => {
    let login = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'jason_li2', password: '123456' }),
    });
    let res = await login.json();
    expect(res.status).toBe(200);
  });
});

describe('Testing Register', () => {
  it('Should return user exists', async () => {
    let register = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: 'Jason', lastName: 'Li', username: 'jason_li2', password: '123456' }),
    });
    let exist = await register.json();
    expect(exist.status).toBe(400);
  });
});
