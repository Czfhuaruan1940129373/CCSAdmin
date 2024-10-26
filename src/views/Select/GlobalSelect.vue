<script setup lang="ts">
// import { ElInput } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { reactive, ref } from 'vue'
import { Search } from '@/components/Search'
import { FormSchema } from '@/components/Form'
import { useSearch } from '@/hooks/web/useSearch'
import { getCcsTestListApi } from '@/api/select'
import { ElMessage } from 'element-plus'
import { CcsTestSearchType } from '@/api/select/types'

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

const pageNum = ref(1)

const pageSize = ref(10)

const searchData = reactive({}) as CcsTestSearchType

const handleSearch = async (data: any) => {
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
  searchData.pageNum = pageNum.value
  searchData.pageSize = pageSize.value

  console.log(searchData)
  const res = await getCcsTestListApi(searchData)
  console.log(res)
}

const handleReset = () => {
  //setValues({})
  ElMessage.success(t('common.resetSuccess'))
  // resetLoading.value = true
}

const searchLoading = ref(false)

const resetLoading = ref(false)
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
  </ContentWrap>
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>
