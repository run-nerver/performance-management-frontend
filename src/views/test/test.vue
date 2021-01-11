<template>
  <div id="app">
    <el-table
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      :data="list"
      style="width: 100%"
    >
      <el-table-column label="工号" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.workNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110px" align="center" fixed>
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="岗位类别" width="110px" align="center">
        <editable-cell
          v-model="row.jobCatecory"
          slot-scope="{row}"
          :can-edit="editModeEnabled"
          close-event="change"
          editable-component="el-select"
        >
          <el-tag
            slot="content"
          >
            {{ row.jobCatecory }}
          </el-tag>

          <template slot="edit-component-slot">
            <el-option
              v-for="item in jobCatecoryList"
              :key="item.key"
              :label="item.jobCatecory"
              :value="item.jobCatecory"
            />
          </template>
          <!-- <span slot="content">{{ row.jobCatecory }}</span> -->
        </editable-cell>
      </el-table-column>
      <el-table-column
        min-wwidth="150"
        label="Gender"
      >

        <editable-cell
          v-model="row.gender"
          slot-scope="{row}"
          editable-component="el-select"
          :can-edit="editModeEnabled"
          close-event="change"
        >

          <el-tag
            slot="content"
            size="medium"
            :type="row.gender === 'M' ? 'primary' : 'danger'"
          >
            {{ row.gender === 'M' ? 'Male': 'Female' }}
          </el-tag>

          <template slot="edit-component-slot">
            <el-option
              v-for="item in jobCatecoryList"
              :key="item.key"
              :label="item.jobCatecory"
              :value="item.jobCatecory"
            />
          </template>
        </editable-cell>

      </el-table-column>
      <el-table-column
        label="Birth Date"
        min-width="250"
      >
        <editable-cell
          v-model="row.date"
          slot-scope="{row}"
          :can-edit="editModeEnabled"
          editable-component="el-date-picker"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
          <span slot="content">{{ row.date }}</span>
        </editable-cell>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import EditableCell from '@/components/EditableCell/EditableCell.vue'
import {
  fetchUserInfo
} from '@/api/others-workload'
export default {
  name: 'App',
  components: {
    EditableCell
  },
  data() {
    return {
      jobCatecoryList: [{ 'key': 0, 'jobCatecory': '管理岗' }, { 'key': 1, 'jobCatecory': '教学岗' }, { 'key': 2, 'jobCatecory': '教学辅助岗' }, { 'key': 3, 'jobCatecory': '辅导员管理岗' }],
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        scientificName: undefined,
        scientificType: undefined,
        year: (new Date().getFullYear() - 1).toString(),
        uploadExcelYear: (new Date().getFullYear() - 1).toString()
      },
      list: null,
      editModeEnabled: false,
      gridData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          gender: 'M'
        },
        {
          date: '2016-05-02',
          name: 'Lisa',
          gender: 'F'
        },
        {
          date: '2016-05-04',
          name: 'Jon',
          gender: 'M'
        },
        {
          date: '2016-05-01',
          name: 'Mary',
          gender: 'F'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = false
      fetchUserInfo(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // this.totalList.push('合计', response.data.totalNumber, response.data.totalScore)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>

<style>
.edit-cell {
  min-height: 35px;
  cursor: pointer;
}
</style>
