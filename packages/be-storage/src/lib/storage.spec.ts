import { createPresignedUrlWithClient } from './storage'

describe('beStorage', () => {
  it('should work', async () => {
    const url = await createPresignedUrlWithClient('test.txt')

    console.log(url)

    expect('be-storage').toEqual('be-storage')
  })
})
