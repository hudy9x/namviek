import { mdUserFindEmailsByUids } from "../../lib"
import { mdMemberGetAllByProjectId, mdMemberGetProject } from "../../repos"
import { mdMemberGetAllByProjectId as mdMemberGetAllByProjectId2 } from "../../lib";
import { mdUserAdd, mdUserFindEmail, mdUserFindFirst, mdUserUpdate } from "../../repos/user.reposioty"
import { UserStatus, userModel } from "../../schema"
import { connectDB } from "../../schema/connect"

export const runTest = async () => {
  console.log('run test')
  await connectDB()

  // const result = await mdMemberGetAllByProjectId('664225004b4f250ca2404749')
  // console.log(result)

  // const res2 = await mdMemberGetAllByProjectId2('664225004b4f250ca2404749')
  //
  // console.log(res2)

  const member = await mdMemberGetProject('66407ace0f3e9590dd4e969a')

  console.log('==============> ')
  console.dir(member)

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
