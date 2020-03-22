import request from '@/utils/request'


/**
 * 查询角色
 * @param page
 */
export function queryAllRoles(page) {
  return request({
    url:'/role/queryRolesByPage',
    method:'get',
    params:page
  })
}


/**
 * 查询权限
 */
export function queryAuth() {
  return request({
    url:'/auth/getAllAuth',
    method:'get'
  })
}

export function addRole(role) {
  return request({
    url:'/role/add',
    method:'post',
    params:role
  })
}
