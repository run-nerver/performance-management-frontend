import request from '@/utils/request'

export function fileUpload(data) {
  return request({
    url: '/teacher/fileUpload',
    method: 'post',
    data
  })
}
