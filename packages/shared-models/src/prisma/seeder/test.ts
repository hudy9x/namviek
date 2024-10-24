import { mdUserFindEmailsByUids } from "../../lib"
import { mdUserAdd, mdUserFindEmail, mdUserFindFirst, mdUserUpdate } from "../../repos/user.reposioty"
import { UserStatus, userModel } from "../../schema"
import { connectDB } from "../../schema/connect"

export const runTest = async () => {
  console.log('run test')
  await connectDB()

  // const first = await mdUserFindFirst({ id: '664588192f5b6db5010db970' })
  // console.log('first', first)

  // const result = await mdUserAdd({
  //   email: 'test@gmail.com',
  //   name: 'Nguyen Test A',
  //   password: '123908129038',
  //   status: UserStatus.ACTIVE,
  //   country: 'United State',
  //   bio: 'owiejrowiejr',
  //   photo: '01231ij2o3ioij',
  // })
  // console.log(result)


  // const emails = await mdUserFindEmailsByUids(['671a10cd722050a3904728d1'])
  // console.log(emails)

  // const updateData = await mdUserUpdate('671a10cd722050a3904728d1', {
  //   name: 'Nguyen Tuyet A'
  // })
  // console.log(updateData)


  process.exit()
}
