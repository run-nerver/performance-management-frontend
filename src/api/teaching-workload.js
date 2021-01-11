import request from '@/utils/request'

// 获取用户信息
export function fetchUserInfo(data) {
  return request({
    url: '/teaching_workload/fetchUserInfo',
    method: 'get',
    params: data
  })
}

// 批量导入教学工作量
export function UploadExcelTeachingWorkload(data, year) {
  return request({
    url: '/teaching_workload/UploadExcelTeachingWorkload',
    method: 'post',
    data,
    params: year
  })
}

// 计算教学工作量
export function fetchCalcWorkload(query) {
  return request({
    url: '/teaching_workload/CalcWorkload',
    method: 'post',
    params: query
  })
}

// 更新教学工作量
export function updateUserWorkload(data) {
  return request({
    url: '/teaching_workload/updateUserWorkload',
    method: 'post',
    data
  })
}

