import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

function SignInPage({ setLoginStatus }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  async function signInHandle() {
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      setLoginStatus(true);
    } catch (error) {
      console.log('error signing in', error);
      setErrMsg(error.message);
    }
  }

  return (
    <div>
      <p>Username</p>
      <input placeholder='username' onChange={(e) => setUsername(e.target.value)} />
      <p>Password</p>
      <input placeholder='password' type='password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signInHandle}>Sign In</button>
      <p>{errMsg}</p>
    </div>
  )
}

export function SignOutButton({ setLoginStatus }) {
  async function signOutHandle() {
    try {
        await Auth.signOut();
        setLoginStatus(false);
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  return(
    <div>
      <button onClick={signOutHandle}>Sign Out</button>
    </div>
  )
}

export default SignInPage;