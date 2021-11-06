export const converImgToBase64 = (img, callback) => {
  var result
  var reader = new FileReader()
  reader.onloadend = async () => {
    result.push(reader.result)
  }
  reader.readAsDataURL(img)
  return result
}
