export type UserLoginType = {
  userName: string
  password: string
}

// 用户类
export type UserType = {
  userName: string // 用户名
  password: string // 密码
  roleName: string // 角色
  roleId: string // 角色id
  permissions: string | string[] // 权限
  createTime: Date // 创建时间
  updateTime: Date // 更新时间
}
