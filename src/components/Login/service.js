import hello from 'hellojs';
import { config } from '../../config';

hello.init({
  github: config.local.github
}, {
  redirect_uri: config.local.redirect_uri
});

const network = 'github';
const github = hello(network);

export const login = () => {
  return github.login().then(() => {
    return github.api('/me')
  }).then((user) => {
    return user;
  }, (error) => {
    console.log('Signin error: ' + error.error.message)
  })
};

const validAccess = (session) => {
  const currentTime = (new Date()).getTime() / 1000;
  return session && session.access_token && session.expires > currentTime;
};

export const getUserDataByAccessToken = () => {
  const session = github.getAuthResponse();
  if (validAccess(session)) {
    const accessToken = JSON.parse(localStorage.getItem('hello'))[network].access_token;
    return fetch(`https://api.github.com/user?access_token=${accessToken}`)
      .then((response) => {
        if (response.status !== 200) {
          return;
        }
        return response.json().then((data) => data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return;
};
