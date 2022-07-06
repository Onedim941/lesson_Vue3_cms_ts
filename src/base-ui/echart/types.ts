export interface IInitOption {
  devicePixelRatio?: number
  renderer?: 'canvas' | 'svg'
  useDirtyRect?: boolean // 从 `5.0.0` 开始支持
  ssr?: boolean // 从 `5.3.0` 开始支持
  width?: number
  height?: number
  locale?: string // 从 `5.0.0` 开始支持
}
