export const pageContentConfig = {
  title: '角色列表',
  propsList: [
    { select: true, align: 'center', width: '100' },
    { sort: true, align: 'center', width: '100' },
    { prop: 'name', label: '角色名', width: '120', align: 'center' },
    { prop: 'intro', label: '权限介绍', width: '120', align: 'center' },
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
