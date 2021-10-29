export const getDataFromTimestamp = (timestamp) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  return new Date(timestamp).toLocaleDateString('en-US', options)
}
