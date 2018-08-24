// import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/account.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('test', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNTM0NzQzMjcyfQ.xyqh7zJdF_6LB07sNkreXcAc1FXlpn7-aHzOj3LkI9A'
    const result = await ctx.service.account.test(token);
    console.log(result);
  });
});
