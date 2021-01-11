import request from '@/utils/request'

// 批量导入其他工作量
export function UploadExcelOthersWorkload(data, year) {
  return request({
    url: '/others_workload/UploadExcelOtherWorkload',
    method: 'post',
    data,
    params: { year }
  })
}

// 获取用户信息
export function fetchUserInfo(data) {
  return request({
    url: '/others_workload/fetchUserInfo',
    method: 'get',
    params: data
  })
}

// 更新其他工作量
export function updateOthersWorkload(data) {
  return request({
    url: '/others_workload/updateOthersWorkload',
    method: 'post',
    data
  })
}
