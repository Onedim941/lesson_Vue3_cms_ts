// 导入中国城市经纬度匹配
import { coordinateData } from './coordinate-data'

// 这个函数作用 返回地图展示所需要的数据
export const convertData = function (data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        // 将城市的经纬度和 数据value拼接到一起返回 value:[经纬度, 值]
        // 如匹配到海门 接口返回的数据值为 25, 则最后的值为[121.15, 31.89, 25]
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
