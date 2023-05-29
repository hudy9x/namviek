import { sharedLibs } from './shared-libs';

describe('sharedLibs', () => {
  it('should work', () => {
    expect(sharedLibs()).toEqual('shared-libs');
  });
});
