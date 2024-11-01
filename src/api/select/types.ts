// 测试数据类
export type CcsTestType = {
  id: number | undefined //自增id
  testId: string | undefined //测试id
  testName: string | undefined //测试名称
  lampUid: string | undefined //灯具id
  lampModelId: string | undefined //灯具型号
  busName: string | undefined //车间名称
  testPerson: string | undefined //测试人员
  testStartTime: Date | undefined //测试开始时间
  logTable: string | undefined //日志表名
  createTime: Date | undefined //创建时间
  updateTime: Date | undefined //更新时间
  testType: number | undefined //测试类型
  testEndTime: Date | undefined //测试结束时间
  testCout: number | undefined //测试次数
  testRes: number | undefined //测试结果(0:不合格，1:合格)
  proId: string | undefined //生产批号
  colorNum: number | undefined //颜色数量
  testErrorCount: number | undefined //测试错误次数
}

// 测试数据搜索条件类
export type CcsTestSearchType = {
  lampUid: string | undefined //灯具id
  lampModelId: string | undefined //灯具型号
  busName: string | undefined //车间名称
  testPerson: string | undefined //测试人员
  lessTestTime: Date | undefined //测试时间范围（小）
  testType: number | undefined //测试类型
  greaterTestTime: Date | undefined //测试时间范围（大）
  testRes: number | undefined //测试结果(0:不合格，1:合格)
  proId: string | undefined //生产批号
  testId: string | undefined //测试编号
  pageNum: number //当前页码
  pageSize: number //每页显示条数
}

// 测试数据列表返回类
export type CcsTestListType = {
  list: CcsTestType[] | undefined //测试数据列表
  pageNum: number | undefined //当前页码
  pageSize: number | undefined //每页显示条数
  pageCount: number | undefined //总条数
}
