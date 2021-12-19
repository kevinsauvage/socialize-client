export const getDataFromTimestamp = (timestamp) => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  return new Date(timestamp).toLocaleDateString('en-US', options)
}
