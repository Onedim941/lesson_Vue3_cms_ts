import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format = DEFAULT_DATE_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}

export function formatTimestamp(
  timestamp: string,
  format = DEFAULT_DATE_FORMAT
) {
  return dayjs(timestamp).format(format)
}
