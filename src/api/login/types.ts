export type UserLoginType = {
  username: string
  password: string
}

// 用户类
export type UserType = {
  username: string // 用户名
  password: string // 密码
  role: string // 角色
  roleId: string // 角色id
  permissions: string | string[] // 权限
}
