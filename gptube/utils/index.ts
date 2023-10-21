export const youtubeURLRegex = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/g

export const extractYTVideoID = (youtubeURL: string) => {
  const match = youtubeURLRegex.exec(youtubeURL)
  if (match && match[2].length == 11)
    return match[2]
  return undefined;
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
