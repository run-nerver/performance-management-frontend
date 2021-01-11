import request from '@/utils/request'

// 获取单独教师所有工作量（教师首页）
export function fetchSingleTeacherAdminAllInfo(query) {
  return request({
    url: '/admin/singleTeacher',
    method: 'post',
    params: query
  })
}

export function fetchList(query) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: query
  })
}
