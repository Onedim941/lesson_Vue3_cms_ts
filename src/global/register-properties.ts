import { App } from 'vue'
import { formatUtcString, formatTimestamp } from '@/utils/date-format'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatUtcTime(value: string, format?: string) {
      return formatUtcString(value, format)
    },
    timestamp(value: string, format?: string) {
      return formatTimestamp(value, format)
    }
  }
}
