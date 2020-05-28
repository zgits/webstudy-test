import request from '@/utils/request'

export function queryChapter(data) {
  return request({
    url: '/courseChapter/queryByCourseId',
    method: 'get',
    params: {
      courseId: data
    }
  })
}

export function queryAllCourse(data) {
  return request({
    url: '/course/queryAllByPageForAdmin',
    method: 'get',
    params: data
  })
}

export function deleteCourse(ids) {
  return request({
    url: '/course/delete',
    method: 'delete',
    params: {
      ids: ids
    }
  })
}

export function changeStatus(data) {
  return request({
    url: '/course/changeCourseStatus',
    method: 'put',
    params: data
  })
}

export function queryAllType() {
  return request({
    url: '/courseType/queryAll',
    method: 'get'
  })
}

export function queryCourseCount() {
  return request({
    url: '/course/queryCourseCount',
    method: 'get'
  })
}

export function queryCourseById(id) {
  return request({
    url: '/course/queryCourseByIdForAdmin',
    method: 'get',
    params: {
      courseId: id
    }
  })
}

export function updateCourse(params) {
  return request({
    url: '/course/update',
    method: 'post',
    params: params
  })
}
