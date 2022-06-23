export const pageContentConfig = {
  title: '用户列表',
  propsList: [
    { select: true, align: 'center', width: '100' },
    { sort: true, align: 'center', width: '100' },
    { prop: 'name', label: '昵称', minWidth: '180', align: 'center' },
    { prop: 'realname', label: '真实名字', width: '180', align: 'center' },
    { prop: 'cellphone', label: '电话号码', width: '180', align: 'center' },
    {
      prop: 'enable',
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
