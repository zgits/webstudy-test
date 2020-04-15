import request from '@/utils/request'


export function queryLog(data){
    return request({
        url: '/es/queryLog',
        method: 'get',
        params:data
    })
}