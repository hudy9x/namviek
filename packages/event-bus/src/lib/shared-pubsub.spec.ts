import { sharedPubsub } from './shared-pubsub'

describe('sharedPubsub', () => {
  it('should work', () => {
    expect(sharedPubsub()).toEqual('shared-pubsub')
  })
})
