import request from '@/utils/request'

/**
 * 更新用户基本信息
 * @param data
 */
export function updateUserInfo(data) {
  return request({
    url: '/user/updateUserById',
    method: 'put',
    params: data
  })
}

/**
 * 关键字查询
 * @param data
 */
export function search(data) {
  return request({
    url: '/user/'
  })
}

/**
 * 更新用户角色信息
 * @param data
 */
export function updateUserRole(data) {
  return request({
    url: '/user/changeUserRole',
    method: 'put',
    params: data
  })
}

/**
 * 获取用户的角色
 * @param data
 */
export function getUserRole(data) {
  return request({
    url: '/role/queryUserRoleIds',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有角色信息
 */
export function getAllRoles() {
  return request({
    url: '/role/queryAll',
    method: 'get'
  })
}

/**
 * 添加用户
 * @param data
 */
export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    params: data
  })
}

/**
 *  批量删除用户
 * @param ids
 */
export function deleteUsers(ids) {
  return request({
    url: '/user/deleteUsers',
    method: 'delete',
    params: {
      ids: ids
    }
  })
}

/**
 * 更改用户状态
 * @param data
 */
export function changeUserStatus(data) {
  return request({
    url: '/user/changeStatus',
    method: 'put',
    params: data
  })
}

/**
 * 重置密码
 * @param data
 */
export function resetPassword(data) {
  return request({
    url: '/user/resetPassword',
    method: 'put',
    params: data
  })
}

/**
 * 查询全部用户
 */
export function getAllUsers(page) {
  return request({
    url: '/user/queryAllUsers',
    method: 'get',
    params: page
  })
}

export function login(data) {
  return request({
    url: '/user/loginForAdmin',
    method: 'post',
    params: data
  })
}

/**
 * 统计用户数量
 * @returns {AxiosPromise}
 */
export function queryUserCount() {
  return request({
    url: '/user/queryUserCount',
    method: 'get'
  })
}
