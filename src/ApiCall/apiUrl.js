export const urls = {
  baseUrl:
    window.location.hostname === 'localhost'
      ? 'http://localhost:5000/'
      : 'https://socialize-server.vercel.app/',
  login: 'login',
  register: 'users',
}
