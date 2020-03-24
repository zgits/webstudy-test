import request from '@/utils/request'


/**
 * 添加新的分类/方向
 * @param data
 */
export function addType(data) {
  return request({
    url:'/courseType/addType',
    method:'post',
    params:data
  })
}

/**
 * 删除分类
 * @param ids
 */
export function deleteType(ids) {
  return request({
    url:'/courseType/deleteTypes',
    method:'delete',
    params:{
      ids:ids
    }
  })
}

/**
 * 更新分类
 * @param data
 */
export function updateType(data) {
  return request({
    url:'/courseType/update',
    method:'put',
    params:data
  })
}

/**
 * 分页查询方向信息
 * @param page
 */
export function queryAllByPage(page) {
  return request({
    url:'/courseType/queryByPage',
    method:'get',
    params:page
  })
}


/**
 * 查询分类
 * @param parentId
 */
export function queryChild(parentId) {
  return request({
    url:'/courseType/queryChild',
    method:'get',
    params:{
      parentId:parentId
    }
  })
}


/**
 * 查询全部方向
 */
export function queryDirect() {
  return request({
    url:'/courseType/queryDirect',
    method:'get'
  })
}


