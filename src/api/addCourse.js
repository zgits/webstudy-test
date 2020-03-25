import request from '@/utils/request'


/**
 * 添加课程
 * @param data
 */
export function addCourse(data) {
  return request({
    url:'/course/add',
    method:'post',
    params:data
  })
}


export function queryAll() {
  return request({
    url:'/courseType/queryAllChild',
    method:'get'
  })

}
