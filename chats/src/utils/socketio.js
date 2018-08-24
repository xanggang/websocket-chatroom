import io from '../../static/weapp.socket.io.js'

const url = 'http://127.0.0.1:7001/'
const socket = function (query) {
  const _io = io(url, {
    query: query,
    transports: ['websocket'],
  });

  _io.on('connect', function(){
    console.log('链接成功');
  });

  _io.on('disconnect', function(){
    console.log('断开连级');
  });
  return _io
}


export default socket
