export const pageContentConfig = {
  title: '商品列表',
  propsList: [
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: '150',
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'type',
      label: '级别',
      width: '80',
      align: 'center'
    },
    {
      prop: 'url',
      label: '菜单url',
      width: '140',
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'icon',
      label: '菜单icon',
      width: '100',
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'permission',
      label: '按钮权限',
      width: '100',
      align: 'center'
    },
    {
      prop: 'sort',
      label: '排序',
      width: '100',
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
    border: true,
    rowKey: 'id',
    treeProps: { children: 'children' }
  },
  showFooter: false
}
