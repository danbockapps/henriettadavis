import firebase from 'firebase'
import 'firebase/firestore'
import React, { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    initializeFirestore()
    getDataAndUpload()
  }, [])

  return <div className='App'></div>
}

const initializeFirestore = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAEb22Q_yZG_761CsE1D4cJWutoj1xfTFs',
    authDomain: 'henrietta-davis.firebaseapp.com',
    databaseURL: 'https://henrietta-davis.firebaseio.com',
    projectId: 'henrietta-davis',
    storageBucket: 'henrietta-davis.appspot.com',
    messagingSenderId: '80855893724',
    appId: '1:80855893724:web:086efc93a24d212d9e9619',
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}

const getDataAndUpload = async () => {
  const ipInfo = await fetch('https://json.geoiplookup.io/').then(response =>
    response.json(),
  )

  const db = firebase.firestore()
  db.collection('pageviews').add({
    ...ipInfo,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    referrer: document.referrer,
    userAgent: navigator.userAgent,
  })
}

export default App
