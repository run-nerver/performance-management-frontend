import request from '@/utils/request'

// 添加工作量类别
export function fetchConfigCreateWorkload(data) {
  return request({
    url: '/config/createWorkload',
    method: 'post',
    data
  })
}

// 获取工作量类别
export function fetchWorkLoadOptions() {
  return request({
    url: '/config/workLoadOptions',
    method: 'get'
  })
}

// 获取工作量类别（分页）
export function fetchWorkLoadOptionsPaginate(query) {
  return request({
    url: '/config/workLoadOptionsPaginate',
    methods: 'get',
    params: query
  })
}

// 删除工作量类别
export function deleteWorkloadOptions(id) {
  return request({
    url: '/config/deleteWorkloadOptions',
    method: 'post',
    params: { id }
  })
}

// 更新工作量类别
export function updateWorkloadOptions(data) {
  return request({
    url: '/config/updateWorkloadOptions',
    method: 'post',
    data
  })
}

// 获取用户信息
export function fetchUserInfo(data) {
  return request({
    url: '/config/fetchUserInfo',
    method: 'get',
    params: data
  })
}

export function addUser(data) {
  return request({
    url: '/config/addUser',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: '/config/deleteUser',
    method: 'post',
    params: { id }
  })
}

// 更新用户
export function updateUser(data) {
  return request({
    url: '/config/updateUser',
    method: 'post',
    data
  })
}

// 批量添加用户信息
export function UploadExcelCreateUser(data) {
  return request({
    url: '/config/UploadExcelCreateUser',
    method: 'post',
    data
  })
}

// 获取用户类别、职称系数表
export function fetchCoefficientPaginate(data) {
  return request({
    url: '/config/coefficientPaginate',
    method: 'get',
    params: data
  })
}

// 添加用户类别、职称系数
export function createCoefficient(data) {
  return request({
    url: '/config/createCoefficient',
    method: 'post',
    data
  })
}

// 更新用户类别、职称系数
export function updateCoefficient(data) {
  return request({
    url: '/config/updateCoefficient',
    method: 'post',
    data
  })
}

// 删除系数
export function deleteCoefficient(id) {
  return request({
    url: '/config/deleteCoefficient',
    method: 'post',
    params: { id }
  })
}

// 确认教师教学工作量
export function confirmModifyStatus(id) {
  return request({
    url: '/config/confirmModifyStatus',
    method: 'post',
    params: { id }
  })
}
