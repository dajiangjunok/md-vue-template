import { uploadImage } from '@/service/hanshu/service_hanshu_tupian'
import { Post as uploadFile } from '@/service/hanshu/service_hanshu_wenjiancc'
import { selectOneOrMoreFiles } from '@mediinfo-ued/medi-ui'
//文本编辑器图片上传
export function imageUpload(blobInfo, success, failure) {
  let file = blobInfo.blob()
  let formData = new FormData()
  formData.append('file', file)
  uploadImage(formData)
    .then(re => {
      if (re && re[0]) {
        // 上传成功需要返回图片地址
        console.log(re[0].xiangDuiLJ)
        success(re[0].xiangDuiLJ)
      } else {
        failure('未知错误')
      }
    })
    .catch(e => {
      failure(e.response)
    })
}

//文本编辑器附件上传
export function fileUpload(file) {
  //let file = blobInfo.blob()
  const formData = new FormData()
  formData.append('file', file)
  return uploadFile(formData).then(re => {
    if (re && re[0]) {
      console.log(re)
      return re[0].xiangDuiLJ
    } else {
      return Promise.reject(new Error('未知错误'))
    }
  })
}

export async function file_picker_callback(cb, value, meta) {
  const filetype = meta.filetype
  try {
    const file = await selectOneOrMoreFiles({
      accept: filetype === 'file' ? '*' : 'image/*'
    })

    const url = await fileUpload(file)
    if (meta.filetype == 'file') {
      cb(url, { title: file.name })
    } else if (meta.filetype == 'image') {
      cb(url, { title: file.name })
    }
  } catch (err) {
    console.log(err)
  }
}
