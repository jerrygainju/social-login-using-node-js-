import './App.css';
import FacebookLogin from 'react-facebook-login'
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
    console.log('google login success', response);
  })
}


const responseFacebook = (response) => {
  console.log(response)
  axios({
    method: 'POST',
    url: 'http://localhost:8000/facebooklogin',
    data: { accessToken: response.accessToken, userID: response.userID }
  }).then(response => {
    console.log('facebook login success',response);
  })
}

function App() {
  return (
    <div className = "App">
      <div className = "col-md-6 offset-md-3 text-center">
        <h1>Gmail login</h1>
        <GoogleLogin
          clientId="797731517730-8p1f17ftljfiqsf7ttr3lluubaq1l2a0.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <FacebookLogin
          appId="530625534935226"
          autoLoad={false}
          fields="name,email"
          callback={responseFacebook} 
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
