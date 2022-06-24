export const pageContentConfig = {
  title: '商品列表',
  propsList: [
    { sort: true, align: 'center', width: '100' },
    {
      prop: 'name',
      label: '商品名称',
      minWidth: '100',
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'oldPrice',
      label: '原价格',
      width: '80',
      align: 'center',
      slotName: 'oldPrice'
    },
    {
      prop: 'newPrice',
      label: '现价格',
      width: '80',
      align: 'center',
      slotName: 'newPrice'
    },
    {
      prop: 'imgUrl',
      label: '图片',
      width: '100',
      align: 'center',
      showOverflowTooltip: true,
      slotName: 'image'
    },
    {
      prop: 'status',
      label: '状态',
      width: '100',
      slotName: 'enable',
      align: 'center'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      width: '250',
      slotName: 'createTimeSlot',
      align: 'center'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      width: '250',
      slotName: 'updateTimeSlot',
      align: 'center'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler',
      align: 'center'
    }
  ],
  tableOption: {
    border: true
  }
}
