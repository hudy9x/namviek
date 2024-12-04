import multer, { StorageEngine } from 'multer'

// Configure multer to store files in memory as Buffer
const storage: StorageEngine = multer.memoryStorage()

export const upload = multer({ storage })
