import request from '@/utils/request'

export function getSiteVisit() {
  return request({
    url: '/common/site/getVisit',
    method: 'get'
  })
}

export function getHotWord() {
  return request({
    url: '/common/redis/getHotWord',
    method: 'get'
  })
}
