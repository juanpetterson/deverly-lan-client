import io from 'socket.io-client';

export default io(`http://10.0.3.2:5000`, {
  query: { user: 'logged user' },
});
