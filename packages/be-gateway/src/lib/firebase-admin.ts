import { cert, initializeApp, getApps } from 'firebase-admin/app'

try {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount)
    })
  }
} catch (error) {
  console.warn('Firebase admin missing configuration')
}
