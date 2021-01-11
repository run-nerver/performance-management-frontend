import request from '@/utils/request'

// 获取教师工作量
export function fetchTeacherWorkloadList(query) {
  return request({
    url: '/teacher/workload',
    method: 'get',
    params: query
  })
}

// 教师上传支撑材料
export function fetchTeacherCreateInfo(data) {
  return request({
    url: '/teacher/createInfo',
    method: 'post',
    data
  })
}

// 更新教师工作量
export function updateWorkload(data) {
  return request({
    url: '/teacher/workloadUpdate',
    method: 'post',
    data
  })
}

// 删除教师工作量
export function deleteWorkload(id) {
  return request({
    url: '/teacher/deleteWorkload',
    method: 'post',
    params: { id }
  })
}

// 下载附件
export function teacherAttDownload(filename) {
  return request({
    url: '/teacher/download',
    method: 'get',
    params: { filename },
    responseType: 'arraybuffer'
  })
}

// 管理员获取单独教师工作量
export function fetchTeacherSingleWorkloadList(query) {
  return request({
    url: '/admin/singleTeacher',
    method: 'post',
    params: query
  })
}

// 修改教师工作量审核状态
export function modifyStatus(uid, id) {
  return request({
    url: `/admin/modifyStatus/${id}`,
    method: 'post',
    params: { uid }
  })
}

// 批量审核
export function batchCheck(idList, id) {
  return request({
    url: `/admin/batchCheck/${id}`,
    method: 'post',
    params: idList
  })
}

// 获取单独教师工作量（教师查看）
export function fetchSingleUserInfo(query) {
  return request({
    url: '/teacher/singleUserInfo',
    method: 'post',
    params: query
  })
}

// 教师确认教学工作量
export function confirmTeachingWorkload(id) {
  return request({
    url: '/teacher/confirmTeachingWorkload',
    method: 'post',
    params: { id }
  })
}

// 获取单独教师所有工作量（教师首页）
export function fetchSingleUserAllInfo(query) {
  return request({
    url: '/teacher/singleUserAllInfo',
    method: 'post',
    params: query
  })
}
