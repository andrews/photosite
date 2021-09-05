import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

async function signInHandle(userCredentials, setUser) {
  try {
    const { username, password } = userCredentials;
    const user = await Auth.signIn(username, password)
    setUser(user)
  } catch (error) {
    console.log('error signing in', error)
  }
}
/*
function signInStatus() {
  const [user, setUser] = useState('')

  return(
    <div>
      {user}
    </div>
  )
}
*/
function SignInPage() {
  return (
    <div>
      <a>Username</a>
      <input placeholder='username'/>
      <a>Password</a>
      <input placeholder='password' type='password'/>
    </div>
  )
}

export default SignInPage;