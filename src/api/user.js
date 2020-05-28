import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/loginForAdmin',
    method: 'post',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/loginOut',
    method: 'get'
  })
}
