import request from '@/utils/request'

// 批量导入辅导员工作量
export function UploadExcelCounselorsWorkload(data, year) {
  return request({
    url: '/counselors_workload/UploadExcelCounselorsWorkload',
    method: 'post',
    data,
    params: { year }
  })
}

// 获取用户信息
export function fetchUserInfo(data) {
  return request({
    url: '/counselors_workload/fetchUserInfo',
    method: 'get',
    params: data
  })
}

// 更新辅导员工作量
export function updateCounselorsWorkload(data) {
  return request({
    url: '/counselors_workload/updateCounselorsWorkload',
    method: 'post',
    data
  })
}
