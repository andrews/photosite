import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

function SignInPage({setUser, setLoginStatus}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function signInHandle() {
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      setLoginStatus(true);
      setUser(user);
    } catch (error) {
      console.log('error signing in', error)
    }
  }

  return (
    <div>
      <p>Username</p>
      <input placeholder='username' onChange={(e) => setUsername(e.target.value)} />
      <p>Password</p>
      <input placeholder='password' type='password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signInHandle}>Sign In</button>
    </div>
  )
}

async function signOut() {
  try {
      await Auth.signOut();
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

export default SignInPage;