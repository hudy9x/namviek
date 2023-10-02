import { S3 } from '@aws-sdk/client-s3'

const s3 = new S3({})

// import AWS from 'aws-sdk'
//
//
// AWS.config.update({ region: process.env.AWS_REGION })
// const s3 = new AWS.S3()
// const URL_EXPIRATION_SECONDS = 300
//
// // Main Lambda entry point
// exports.handler = async event => {
//   return await getUploadURL(event)
// }
//
// const getUploadURL = async function (event) {
//   const randNum = Math.random() * 10000000
//   const randomID = parseInt(randNum as unknown as string, 10)
//   const Key = `${randomID}.jpg`
//
//   // Get signed URL from S3
//   const s3Params = {
//     Bucket: process.env.UploadBucket,
//     Key,
//     Expires: URL_EXPIRATION_SECONDS,
//     ContentType: 'image/jpeg'
//   }
//   const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)
//   return JSON.stringify({
//     uploadURL: uploadURL,
//     Key
//   })
// }
