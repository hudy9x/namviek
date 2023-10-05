// import https from "https";
import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
// import {fromIni} from "@aws-sdk/credential-providers";
// import {HttpRequest} from "@smithy/protocol-http";
import { getSignedUrl, S3RequestPresigner } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'
// import {parseUrl} from "@smithy/url-parser";
// import {formatUrl} from "@aws-sdk/util-format-url";
// import {Hash} from "@smithy/hash-node";

const AWS_REGION = process.env.AWS_REGION
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET

console.log('AWS keys')
console.log(process.env.AWS_REGION)
console.log(process.env.AWS_S3_BUCKET)
console.log(process.env.AWS_ACCESS_KEY)
console.log(process.env.AWS_SECRET_ACCESS_KEY)

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

// const createPresignedUrlWithoutClient = async ({region, bucket, key}) => {
//   const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
//   const presigner = new S3RequestPresigner({
//     credentials: fromIni(),
//     region,
//     sha256: Hash.bind(null, "sha256"),
//   });
//
//   const signedUrlObject = await presigner.presign(
//     new HttpRequest({...url, method: "PUT"})
//   );
//   return formatUrl(signedUrlObject);
// };
//
export const randomObjectKeyName = (name: string) => {
  const splitName = name.split('.')
  const sliceName = splitName.slice(0, -1)

  sliceName.push(randomUUID())

  name = `${sliceName.join('-')}.${splitName[splitName.length - 1]}`
  return name
}

export const createPresignedUrlWithClient = (name: string, type: string) => {
  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: name,
    ContentType: type
  })
  return getSignedUrl(s3Client, command, { expiresIn: 3600 })
}

export const getObjectURL = (name: string) => {
  return `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${name}`
}

export const deleteObject = async (name: string) => {
  const command = new DeleteObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: name
  })

  try {
    const response = await s3Client.send(command)
    return response.DeleteMarker
  } catch (error) {
    console.log('delete oobject s3 error', error)
    return null
  }
}

export const getObject = async (name: string) => {
  const command = new GetObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: name
  })

  try {
    const response = await s3Client.send(command)
    const str = await response.Body.transformToString()
    return str
  } catch (error) {
    console.log(error)
    return null
  }
}

// function put(url, data) {
//   return new Promise((resolve, reject) => {
//     const req = https.request(
//       url,
//       {method: "PUT", headers: {"Content-Length": new Blob([data]).size}},
//       (res) => {
//         let responseBody = "";
//         res.on("data", (chunk) => {
//           responseBody += chunk;
//         });
//         res.on("end", () => {
//           resolve(responseBody);
//         });
//       }
//     );
//     req.on("error", (err) => {
//       reject(err);
//     });
//     req.write(data);
//     req.end();
//   });
// }

// export const main = async () => {
//   const REGION = "us-east-1";
//   const BUCKET = "example_bucket";
//   const KEY = "example_file.txt";
//
//   // There are two ways to generate a presigned URL.
//   // 1. Use createPresignedUrl without the S3 client.
//   // 2. Use getSignedUrl in conjunction with the S3 client and GetObjectCommand.
//   try {
//     const noClientUrl = await createPresignedUrlWithoutClient({
//       region: REGION,
//       bucket: BUCKET,
//       key: KEY,
//     });
//
//     const clientUrl = await createPresignedUrlWithClient({
//       region: REGION,
//       bucket: BUCKET,
//       key: KEY,
//     });
//
//     // After you get the presigned URL, you can provide your own file
//     // data. Refer to put() above.
//     console.log("Calling PUT using presigned URL without client");
//     await put(noClientUrl, "Hello World");
//
//     console.log("Calling PUT using presigned URL with client");
//     await put(clientUrl, "Hello World");
//
//     console.log("\nDone. Check your S3 console.");
//   } catch (err) {
//     console.error(err);
//   }
// };

export function beStorage(): string {
  return 'be-storage'
}
