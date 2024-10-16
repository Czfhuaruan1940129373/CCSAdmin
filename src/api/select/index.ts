import request from '@/axios'
import type { CcsTestListType, CcsTestSearchType } from './types'

/**
 * 获取CCS测试列表的API
 *
 * @param params 请求参数，类型为CcsTestType
 * @returns 返回一个Promise对象，CcsTestListType
 */
export const getCcsTestListApi = (
  params: CcsTestSearchType
): Promise<IResponse<CcsTestListType>> => {
  return request.get({ url: '/mock/select/caliResultList', params })
}
