import { MockMethod } from 'vite-plugin-mock'
import { SUCCESS_CODE, ERROR_CODE } from '@/constants'
import { CcsTestType, CcsTestListType, CcsTestSearchType } from '@/api/select/types'
import * as util from 'util' // 导入 Node.js 的 util 模块  

const timeout = 1000

export default [
  // 列表接口
  {
    url: '/mock/select/caliResultList',
    method: 'get',
    timeout,
    response: ({ query }) => {
      console.log('/mock/select/caliResultList->>整个请求体:', util.inspect(query, { depth: null, colors: true }));
      const paramType: CcsTestSearchType = query
      //如果请求中不包含pageNum和pageSize，则返回错误信息
      if(paramType.pageNum == undefined || paramType.pageSize == undefined)
          return { code: ERROR_CODE, message: '缺少分页参数' } 

      return {
        code: SUCCESS_CODE,
        message: '查询成功',
        data:{
          list:[
            { id: 1, testPerson: '测试数据1' },
            { id: 2, testPerson: '测试数据2' }
          ] as CcsTestType[],
          pageNum: paramType.pageNum,
          pageSize: paramType.pageSize,
          pageCount: 100 
        } as CcsTestListType
      } 
    }
  }
] as MockMethod[]