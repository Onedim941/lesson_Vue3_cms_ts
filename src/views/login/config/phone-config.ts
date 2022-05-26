export const rules = {
  number: [
    { required: true, message: '手机号', trigger: 'blur' },
    {
      pattern: /^[0-9]{13}$/,
      message: '手机号为13个者数字',
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, message: '验证码必填', trigger: 'blur' },
    {
      pattern: /^[0-9]{6}$/,
      message: '验证码为6位数字',
      trigger: 'blur'
    }
  ]
}
