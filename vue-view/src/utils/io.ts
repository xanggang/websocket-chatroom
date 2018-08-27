import io from 'socket.io-client';
const uri = '/'
const socket = function (token: string):any {
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
    _io.close()
  })
  return _io
}


export default socket
