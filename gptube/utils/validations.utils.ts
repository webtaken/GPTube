import { YOUTUBE_URL_REGEX } from '@/constants/youtube.constants'

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i

export function isValidYoutubeUrl(url: string) {
  return url.match(YOUTUBE_URL_REGEX) !== null
}

export function isValidEmail(email: string) {
  return EMAIL_REGEX.exec(email) !== null
}
