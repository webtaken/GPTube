import type { ConfigType } from 'dayjs'

import dayjs from 'dayjs'

export function formatDate(date: ConfigType) {
  return dayjs(date).format('MMM/DD')
}
