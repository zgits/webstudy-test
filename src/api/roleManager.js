import request from '@/utils/request'



export function getRoleAuth(roleId) {
  return request({
    url:'/role/queryRoleAuth',
    method:'get',
    params:{
      roleId:roleId
    }
  })
}

/**
 * 更新角色权限
 * @param data
 */
export function updateRoleAuth(data) {
  return request({
    url:'/role/changeRoleAuth',
    method:'put',
    params:data
  })
}


/**
 * 更新角色信息
 * @param data
 */
export function updateRole(data) {
  return request({
    url:'/role/update',
    method:'put',
    params:data
  })
}


/**
 * 删除角色
 * @param ids
 */
export function deleteRoles(ids) {
  return request({
    url:'/role/delete',
    method:'delete',
    params:{
      ids:ids
    }
  })
}


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


/**
 * 添加角色
 * @param role
 */
export function addRole(role) {
  return request({
    url:'/role/add',
    method:'post',
    params:role
  })
}
