import { fetchUrl } from './fetch'

export const uploadImage = async (file, name) => {
  const myNewFile = new File([file], name, { type: file.type })
  const data = new FormData()
  data.append('image', myNewFile)

  const imageData = await fetchUrl('upload/image', {
    method: 'post',
    headers: {
      'Contetnt-Type': 'multipart/form-data',
    },
    body: data,
  })
  const dataCloudinary = await imageData.json()

  return dataCloudinary
}

export const uploadVideo = async (file) => {
  const data = new FormData()
  data.append('video', file)

  const videoData = await fetchUrl('upload/video', {
    method: 'post',
    headers: {
      'Contetnt-Type': 'multipart/form-data',
    },
    body: data,
  })

  const dataCloudinary = await videoData.json()

  return dataCloudinary
}

export const imageUrl = {
  avatar:
    'https://res.cloudinary.com/kevincloudname/image/upload/c_scale,q_auto,w_220/Social-media/',
}
