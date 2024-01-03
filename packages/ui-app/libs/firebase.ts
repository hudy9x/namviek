import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  GoogleAuthProvider,
  User,
  getAuth,
  signInWithPopup
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAl5oGvtt1UU44otEOeO5YaZYCvq_vHlPY',
  authDomain: 'namviek-e8a35.firebaseapp.com',
  projectId: 'namviek-e8a35',
  storageBucket: 'namviek-e8a35.appspot.com',
  messagingSenderId: '1083705340797',
  appId: '1:1083705340797:web:69ba2faa1245fc85305214',
  measurementId: 'G-NNV8C2K4DK'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const googleProvider = new GoogleAuthProvider()

export const signinWithGoogle = async (): Promise<{
  accessToken: string
  user: User
}> => {
  const auth = getAuth()
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result)

        resolve({
          accessToken: credential?.accessToken || '',
          user: result.user
        })
      })
      .catch(err => {
        const errorCode = err.code
        const errorMessage = err.message
        console.log(errorCode, errorMessage)
        reject({ errorCode, errorMessage })
      })
  })
}
