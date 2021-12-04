export const getElapsedTime = (timestamp) => {
  const startTime = new Date(timestamp)
  const endTime = Date.now()
  const totalSeconds = (endTime - startTime) / 1000

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor((totalSeconds % 3600) % 60)

  if (hours) {
    return `${hours} hours ${minutes} minute and ${seconds} seconde`
  }
  if (minutes) {
    return `${minutes} minute and ${seconds} seconde`
  } else {
    return `${seconds} seconde`
  }
}
