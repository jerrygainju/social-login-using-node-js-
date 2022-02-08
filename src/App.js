import './App.css';
// import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';
// import { GoogleLogout } from 'react-google-login';
import axios from 'axios';


const responseGoogle = (response) => {
  console.log(response);
  axios({
    method: 'POST',
    url: 'http://localhost:8000/gmaillogin',
    data: {tokenId: response.tokenId}
  }).then(response => {
    console.log(response);
  })
}


function App() {
  return (
    <div className = "App">
      <div className = "col-md-6 offset-md-3 text-center">
        <h1>Gmail login</h1>
        <GoogleLogin
          clientId="797731517730-b5rnb8ia0hfoif80ltfbvg0g1j89ml2v.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        {/* <GoogleLogout
          clientId="797731517730-9ec8i1m3q28pgmotlos9vbpj43baomg1.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        >
        </GoogleLogout> */}
      </div>
    </div>
  );
}

export default App;
