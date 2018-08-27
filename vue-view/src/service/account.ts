import ajax from '../utils/ajax'

interface registerRule {
  userName: string,
  nick: string,
  passWord: string,
  // gender: string
}
export function register(data: registerRule) {
  return ajax({
    url: './api/register',
    method: 'post',
    data: data
  })
}

export function login(data: { userName: string, passWord: string}) {
  return ajax({
    url: './api/login',
    method: 'post',
    data: data
  }).then(res => {
    window.localStorage.setItem('token', res)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export function checkUserName(data: string): Promise<boolean> {
  return ajax({
    url: './api/checkUserName',
    method: 'post',
    data: {userName: data}
  })
}

export function test() {
  return ajax({
    url: './api/test',
    method: 'post',
  })
}