import hello from 'hellojs';
import { config } from '../../config';

hello.init({
  github: config.local.github
}, {
  redirect_uri: config.local.redirect_uri
});

const github = hello('github');

export const login = () => {
  return github.login().then(() => {
    return github.api('/me')
  }).then((user) => {
    window.localStorage.setItem('userId', user.id)
    return user;
  }, (error) => {
    console.log('Signin error: ' + error.error.message)
  })
};
