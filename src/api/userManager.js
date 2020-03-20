import request from '@/utils/request'

const urlSuffix='127.0.0.1:8081';


/**
 * 添加用户
 * @param data
 */
export function addUser(data) {
  return request({
    url:'/user/addUser',
    method:'post',
    data
  })
}


/**
 *  批量删除用户
 * @param ids
 */
export function deleteUsers(ids) {
  return request({
    url:'/user/deleteUsers',
    method:'delete',
    ids
  })
}

export function changeStatus(data) {
  return request({
    url:'/user/changeStatus',
    method:'put',
    data
  })
}


export function getAllUsers() {
  return request({
    url:'/user/queryAllUsers',
    method:'get',
    baseURL:'127.0.0.1:8081',
  })
}


export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
