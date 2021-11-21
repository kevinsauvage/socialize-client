export const uploadImage = async (image) => {
  const data = new FormData()
  data.append('file', image)
  data.append('resource_type', 'auto')
  data.append('upload_preset', 'SOCIAL')

  return await fetch(
    `https://api.cloudinary.com/v1_1/kevincloudname/image/upload/`,
    {
      method: 'post',
      body: data,
    },
  )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)

      return data
    })
    .catch((err) => console.log(err))
}

export const uploadVideo = async (video) => {
  const data = new FormData()
  data.append('file', video)
  data.append('upload_preset', 'SOCIAL')

  return await fetch(
    `https://api.cloudinary.com/v1_1/kevincloudname/video/upload/`,
    {
      method: 'post',
      body: data,
    },
  )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)

      return data
    })
    .catch((err) => console.log(err))
}
