import {
  storageCreatePresignedUrl,
  storagePutFile
} from '@/services/storage'
import { useState } from 'react'

export default function FileUpload() {
  const [url, setUrl] = useState('')
  const onUpload = async (files: FileList) => {
    const len = files.length

    const promises = []

    for (let i = 0; i < len; i++) {
      const file = files[i]

      promises.push(
        storageCreatePresignedUrl({
          name: file.name,
          type: file.type
        }).then(res => {
          const { data } = res.data
          const { url, presignedUrl } = data

          storagePutFile(presignedUrl, file)
            .then(res => {
              console.log('upload ok', url)
              setUrl(url)
            })
            .catch(err => {
              console.log(err)
            })
          return [file, data]
        })
      )
    }

    await Promise.all(promises).then(results => {
      console.log(results)
    })
  }
  return (
    <div>
      <input
        multiple
        type="file"
        onChange={ev => {
          console.log(ev.target.files)
          const files = ev.target.files
          files && onUpload(files)
        }}
      />
      {url ? <img src={url} /> : null}
    </div>
  )
}
