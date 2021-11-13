export const urls = {
  baseUrl:
    window.location.hostname === 'localhost'
      ? 'http://localhost:5000/'
      : 'https://socialize-server-92n99kzu1-kevinsauvage.vercel.app/',
  login: 'login',
  register: 'users',
}

console.log(window.location.hostname === 'localhost')
