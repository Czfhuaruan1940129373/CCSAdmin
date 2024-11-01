<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { reactive, ref, unref, h } from 'vue'
import { Search } from '@/components/Search'
import { FormSchema } from '@/components/Form'
import { useSearch } from '@/hooks/web/useSearch'
import { getCcsTestListApi } from '@/api/select'
import { ElMessage } from 'element-plus'
import { CcsTestSearchType } from '@/api/select/types'
import { BaseButton } from '@/components/Button'
import { Table, TableColumn } from '@/components/Table'
import { ElTag } from 'element-plus'
import { useTable } from '@/hooks/web/useTable'
import { useEventBus } from '@/hooks/event/useEventBus'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'GlobalSelect'
})

const { t } = useI18n()
const { searchRegister } = useSearch()

const shortcuts = [
  {
    text: t('globalSelect.testTimeSelectLast7Days'),
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 7)
      return [start, end]
    }
  },
  {
    text: t('globalSelect.testTimeSelectLast30Days'),
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    }
  },
  {
    text: t('globalSelect.testTimeSelectLast3Months'),
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 3)
      return [start, end]
    }
  }
]

//查询条件组件
const schema = reactive<FormSchema[]>([
  {
    field: 'testPerson',
    label: t('globalSelect.labelTestPreson'),
    component: 'Input'
  },
  {
    field: 'busName',
    label: t('globalSelect.labelCalibrationBusName'),
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'A2',
          value: 'A2'
        },
        {
          label: 'A3',
          value: 'A3'
        },
        {
          label: 'A4',
          value: 'A4'
        },
        {
          label: 'B2',
          value: 'B2'
        },
        {
          label: 'B3',
          value: 'B3'
        },
        {
          label: t('globalSelect.labelCalibrationDevBusName'),
          value: '技术部'
        }
      ],
      on: {
        change: (value: string) => {
          console.log(value)
        }
      }
    }
  },
  {
    field: 'testRes',
    label: t('globalSelect.labelTestResult'),
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: t('globalSelect.labelTestResultOption1'),
          value: 1
        },
        {
          label: t('globalSelect.labelTestResultOption2'),
          value: 2
        }
      ]
    }
  },
  {
    field: 'testTime',
    component: 'DatePicker',
    label: t('globalSelect.labelTestTime'),
    componentProps: {
      type: 'datetimerange',
      shortcuts: shortcuts
    }
  },
  {
    field: 'lampModelId',
    label: t('globalSelect.labelTestDeviceType'),
    component: 'Input'
  },
  {
    field: 'lampUid',
    label: t('globalSelect.labelTestDeviceUID'),
    component: 'Input'
  },
  {
    field: 'testType',
    label: t('globalSelect.labelCalibrationType'),
    component: 'Select',
    componentProps: {
      options: [
        {
          label: t('globalSelect.labelCalibrationTypeOption1'),
          value: 1
        },
        {
          label: t('globalSelect.labelCalibrationTypeOption2'),
          value: 2
        }
      ],
      on: {
        change: (value: string) => {
          console.log(value)
        }
      }
    }
  },
  {
    field: 'proId',
    label: t('globalSelect.labelProId'),
    component: 'Input'
  },
  {
    field: 'testId',
    label: t('globalSelect.labelTestId'),
    component: 'Input'
  }
])

const isGrid = ref(true)

const layout = ref('inline')

const buttonPosition = ref('left')

const searchData = reactive({}) as CcsTestSearchType

const handleSearch = async (data: any) => {
  searchLoading.value = true
  loading.value = true
  searchData.lampUid = data.lampUid ? data.lampUid : undefined
  searchData.lampModelId = data.lampModelId ? data.lampModelId : undefined
  searchData.busName = data.busName ? data.busName : undefined
  searchData.testPerson = data.testPerson ? data.testPerson : undefined
  searchData.testRes = data.testRes ? data.testRes : undefined
  searchData.testType = data.testType ? data.testType : undefined
  searchData.lessTestTime = data.testTime ? data.testTime[0] : undefined
  searchData.greaterTestTime = data.testTime ? data.testTime[1] : undefined
  searchData.proId = data.proId ? data.proId : undefined
  searchData.testId = data.testId ? data.testId : undefined
  searchData.pageNum = unref(currentPage)
  searchData.pageSize = unref(pageSize)

  console.log(searchData)
  //const res = await getCcsTestListApi(searchData)
  //console.log(res)
  await getList()
  searchLoading.value = false
  loading.value = false
}

const handleReset = () => {
  //setValues({})
  ElMessage.success(t('common.resetSuccess'))
  // resetLoading.value = true
}

const searchLoading = ref(false)

const resetLoading = ref(false)

const delLoading = ref(false)

const AddAction = () => {
  // push('/example/example-add')
  console.log('add')
}
const delData = (data: any) => {
  if (data) {
    console.log(data)
  }
  delLoading.value = true
}

// const ids = ref<string[]>([])

// const searchParams = ref({})
// const setSearchParams = (params: any) => {
//   searchParams.value = params
//   getList()
// }

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    // const res = await getTableListApi({
    //   pageIndex: unref(currentPage),
    //   pageSize: unref(pageSize),
    //   ...unref(searchParams)
    // })
    // const res = null as any
    searchData.pageNum = unref(currentPage)
    searchData.pageSize = unref(pageSize)
    const res = await getCcsTestListApi(searchData)

    return {
      list: res.data.list as any[],
      total: res.data.pageCount
    }
  },
  fetchDelApi: async () => {
    // const res = await delTableListApi(unref(ids))
    const res = null as any
    return !!res
  }
})

const { loading, dataList, total, currentPage, pageSize } = tableState
// const { getList, getElTableExpose, delList } = tableMethods
const { getList } = tableMethods

const align = ref('center')

const headerAlign = ref('center')

getList()

useEventBus({
  name: 'getList',
  callback: (type: string) => {
    if (type === 'add') {
      currentPage.value = 1
    }
    getList()
  }
})

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'selection',
    detail: {
      hidden: true
    },
    table: {
      type: 'selection'
    }
  },
  {
    field: 'testId',
    label: t('tableDemo.index'),
    type: 'index',
    detail: {
      hidden: true
    }
  },
  {
    field: 'lampModelId',
    label: t('globalSelect.tableLampModelId')
  },
  {
    field: 'lampUid',
    label: t('globalSelect.tableLampUid')
  },
  {
    field: 'testPerson',
    label: t('globalSelect.tableTestPreson')
  },
  {
    field: 'busName',
    label: t('globalSelect.tableBusName')
  },
  {
    field: 'testRes',
    label: t('globalSelect.tableTestResult'),
    default: (data: any) => {
      return (
        <ElTag type={data.testRes === 1 ? 'success' : 'danger'}>
          {data.testRes === 1 ? t('globalSelect.tableResOK') : t('globalSelect.tableResNO')}
        </ElTag>
      )
    },
    formatter: (_: Recordable, __: TableColumn, testRes: number) => {
      return h(
        ElTag,
        {
          type: testRes === 1 ? 'success' : 'danger'
        },
        () =>
          testRes === 1
            ? t('globalSelect.labelTestResultOption1')
            : t('globalSelect.labelTestResultOption2')
      )
    }
  },
  {
    field: 'testStartTime',
    label: t('globalSelect.tableTestStartTime')
  },
  {
    field: 'testEndTime',
    label: t('globalSelect.tableTestEndTime')
  },
  {
    field: 'proId',
    label: t('globalSelect.tableProId'),
    detail: {
      span: 24
    }
  },
  {
    field: 'testCount',
    label: t('globalSelect.tableTestCount')
  },
  {
    field: 'action',
    width: '100px',
    label: t('tableDemo.action'),
    detail: {
      hidden: true
    },
    table: {
      slots: {
        default: (data: any) => {
          return (
            <>
              <BaseButton type="primary" onClick={() => action(data.row, 'detail')}>
                {t('exampleDemo.detail')}
              </BaseButton>
            </>
          )
        }
      }
    }
  }
])

// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas)

// const { push } = useRouter()

type TableData = {
  id: string
  author: string
  title: string
  content: string
  importance: number
  display_time: string
  pageviews: number
}

const action = (row: TableData, type: string) => {
  // push(`/example/example-${type}?id=${row.id}`)
  console.log(row)
  console.log(type)
}
</script>

<template>
  <ContentWrap :title="t('globalSelect.selectTitle')" :message="t('globalSelect.message')">
    <Search
      :schema="schema"
      :is-col="isGrid"
      :layout="layout"
      :button-position="buttonPosition"
      :search-loading="searchLoading"
      :reset-loading="resetLoading"
      show-expand
      expand-field="testTime"
      @search="handleSearch"
      @reset="handleReset"
      @register="searchRegister"
    />

    <div class="mb-10px">
      <BaseButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</BaseButton>
      <BaseButton :loading="delLoading" type="danger" @click="delData(null)">
        {{ t('exampleDemo.del') }}
      </BaseButton>
    </div>

    <Table
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      :columns="allSchemas.tableColumns"
      :data="dataList"
      :loading="loading"
      :pagination="{
        total: total
      }"
      :align="align"
      :header-align="headerAlign"
      @register="tableRegister"
    />
  </ContentWrap>
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>
