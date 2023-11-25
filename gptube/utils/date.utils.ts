import type { ConfigType } from 'dayjs'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function formatDate(date: ConfigType, format: string) {
  return dayjs(date).format(format)
}

export function formatDateRelative(date: ConfigType) {
  return dayjs(date).fromNow()
}
