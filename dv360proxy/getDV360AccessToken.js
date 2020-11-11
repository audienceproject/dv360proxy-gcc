const {
  GoogleAuth
} = require('google-auth-library');

module.exports = async function getDV360AccessToken() {
  const auth = new GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/doubleclickbidmanager',
      'https://www.googleapis.com/auth/display-video'
    ]
  });

  const accessToken = await auth.getAccessToken();
  return `Bearer ${accessToken}`;
};