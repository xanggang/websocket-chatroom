import io from 'socket.io-client';
const uri = 'http://127.0.0.1:7001/'
const socket = function (token: string):any {
  console.log('start');
  const _io = io(uri, {
    query: {
      token
    }
  });
  _io.on('connect', function(){
    const id = _io.id;
    _io.on(id, (msg: any) => {
      console.log('#receive,', msg);
    });
  });
  _io.on('disconnect', function(){
    console.log('断开连级');
  });
  _io.on('connect_error', function (e: any) {
    console.log(e, 'reconnect_error');
  })
  return _io
}


export default socket
