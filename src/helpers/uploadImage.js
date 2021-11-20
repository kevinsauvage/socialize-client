const uploadImage = async (image, width) => {
  const data = new FormData()
  data.append('file', image)
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

export default uploadImage
