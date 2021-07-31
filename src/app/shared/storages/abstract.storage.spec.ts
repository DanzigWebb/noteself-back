import { AbstractStorage } from './abstract.storage';

describe('Abstract.Storage', () => {
  it('should create an instance', () => {
    expect(new AbstractStorage(localStorage)).toBeTruthy();
  });
});
