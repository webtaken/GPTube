export const extractYTVideoID = (youtubeURL: string) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = regExp.exec(youtubeURL)

  if (match && match[2].length == 11) return match[2]

  return undefined
}

export const paramValToString = (str: string | string[] | undefined): string => {
  if (typeof str === 'string') {
    return str
  }
  if (Array.isArray(str)) {
    return str.join(',')
  }

  return ''
}

export const getUniqueID = (): string => {
  return Math.random().toString(16).slice(2)
}
