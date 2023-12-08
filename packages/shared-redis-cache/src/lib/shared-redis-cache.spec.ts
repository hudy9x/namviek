import { sharedRedisCache } from './shared-redis-cache'

describe('sharedRedisCache', () => {
  it('should work', () => {
    expect(sharedRedisCache()).toEqual('shared-redis-cache')
  })
})
