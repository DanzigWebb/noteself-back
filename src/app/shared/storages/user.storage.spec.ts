import { UserStorage } from './user.storage';

describe('User.Storage', () => {
  it('should create an instance', () => {
    expect(new UserStorage(localStorage)).toBeTruthy();
  });
});
