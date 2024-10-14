<script setup lang="ts">
// import { ElInput } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { reactive, ref, unref } from 'vue'
import { Search } from '@/components/Search'
import { FormSchema } from '@/components/Form'
import { useSearch } from '@/hooks/web/useSearch'

defineOptions({
  name: 'GlobalSelect'
})

const { t } = useI18n()
const { searchRegister, searchMethods } = useSearch()
// const { setSchema, setProps, setValues, getFormData } = searchMethods
const { getFormData } = searchMethods
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
    field: 'testPreson',
    label: t('globalSelect.labelTestPreson'),
    component: 'Input'
  },
  {
    field: 'calibrationBusName',
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
    field: 'testResult',
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
          value: 0
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
    field: 'testDeviceType',
    label: t('globalSelect.labelTestDeviceType'),
    component: 'Input'
  },
  {
    field: 'testDeviceUID',
    label: t('globalSelect.labelTestDeviceUID'),
    component: 'Input'
  },
  {
    field: 'calibrationType',
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
  }
])

const isGrid = ref(false)

const layout = ref('inline')

const buttonPosition = ref('left')

const handleSearch = async (data: any) => {
  const formData = await getFormData()
  console.log(formData)
  console.log(data)
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
      @reset="handleSearch"
      @register="searchRegister"
    />
  </ContentWrap>
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>
