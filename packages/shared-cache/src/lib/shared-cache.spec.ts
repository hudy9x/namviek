import { sharedCache } from './shared-cache'

describe('sharedCache', () => {
  it('should work', () => {
    expect(sharedCache()).toEqual('shared-cache')
  })
})
