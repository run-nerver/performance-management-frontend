import request from '@/utils/request'

// 批量导入科研工作量
export function UploadExcelScientificWorkload(data, year) {
  return request({
    url: '/scientific_workload/UploadExcelScientificWorkload',
    method: 'post',
    data,
    params: { year }
  })
}

// 获取用户信息
export function fetchUserInfo(data) {
  return request({
    url: '/scientific_workload/fetchUserInfo',
    method: 'get',
    params: data
  })
}
