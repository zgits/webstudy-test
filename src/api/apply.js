import request from '@/utils/request'


export function queryAll(data) {
  return request({
    url:'/apply/queryByPageForAdmin',
    method:'get',
    params:data
  })
}


export function  changeStatus(data) {
  return request({
    url:'/apply/changeApply',
    method:'put',
    params:data
  })
}
