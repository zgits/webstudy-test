import request from '@/utils/request'


/**
 * 添加课程章节
 * @param data
 */
export function addCourseChapter(data) {
  return request({
    url: '/courseChapter/add',
    method: 'post',
    params: data
  })
}


/**
 * 删除课程章节
 * @param ids
 */
export function deleteCourseChapter(ids) {
  return request({
    url: '/courseChapter/delete',
    method: 'delete',
    params: {
      ids: ids
    }
  })
}

/**
 * 更新课程章节
 * @param data
 */
export function updateCourseChapter(data) {
  return request({
    url: '/courseChapter/update',
    method: 'put',
    params: data
  })
}


/**
 * 添加小节详情
 * @param data
 */
export function addCourseDetail(data) {
  return request({
    url: '/courseDetail/add',
    method: 'post',
    params: data
  })
}


/**
 * 删除小节
 * @param ids
 */
export function deleteCourseDetail(ids) {
  return request({
    url:'/courseDetail/deleteByIds',
    method:'delete',
    params:{
      ids:ids
    }
  })
}

/**
 * 更新小节
 * @param data
 */
export function updateCourseDetail(data) {
  return request({
    url:'/courseDetail/update',
    method:'put',
    params:data
  })
}


/**
 * 添加课程
 * @param data
 */
export function addCourse(data) {
  return request({
    url: '/course/add',
    method: 'post',
    params: data
  })
}


export function queryAll() {
  return request({
    url: '/courseType/queryAllChild',
    method: 'get'
  })

}
