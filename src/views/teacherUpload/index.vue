<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('table.title')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.type"
        :placeholder="$t('table.type')"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.index"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.status"
        placeholder="状态"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in statusList"
          :key="item.index"
          :label="item.status"
          :value="item.key"
        />
      </el-select>
      <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.index" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t("table.search") }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t("table.add") }}
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t("table.export") }}
      </el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey = tableKey + 1"
      >
        {{ $t("table.reviewer") }}
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      show-summary
      :summary-method="getSummaries"
      @sort-change="sortChange"
    >
      <el-table-column
        :label="$t('table.id')"
        prop="id"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作量" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.score }}</span>
          <!-- <span>0</span> -->
        </template>
      </el-table-column>
      <el-table-column label="类型" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加日期" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.timestamp | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
          <!-- <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="附件" width="110px" align="center">
        <template slot-scope="{ row, $index }">

          <!-- <span>{{ row.type }}</span> -->
          <a href="#" style="color:#03A9F4;" @click="attDownload(row, $index)">
            <span>{{ row.filesUrl }}</span>
          </a>

        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            v-if="row.status === 0"
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
          >
            {{ $t("table.edit") }}
          </el-button>
          <el-button
            v-if="row.status != 1"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            {{ $t("table.delete") }}
          </el-button>
          <el-button v-if="row.status === 0" size="mini" type="warning">
            待审核
          </el-button>
          <el-button v-if="row.status === 1" size="mini" type="success">
            已审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="类型" prop="type">
          <el-select
            v-model="temp.type"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.index"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>

        <el-form-item label="支撑材料" prop="upload">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=""
            :http-request="handleFile"
            multiple
            :limit="1"
            :auto-upload="false"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t("table.cancel") }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          {{ $t("table.confirm") }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{
          $t("table.confirm")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import fileDownload from 'js-file-download'
import { fetchWorkLoadOptions } from '@/api/config'
import {
  fetchTeacherWorkloadList,
  fetchTeacherCreateInfo,
  updateWorkload,
  deleteWorkload
} from '@/api/teacher'
import { fetchPv } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = []

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      statusList: [{ 'key': 0, 'status': '未审核' }, { 'key': 1, 'status': '已审核' }],
      totalList: [], // 接收合计列表传入table
      attList: [], // 接收返回的附件列表
      fileList: [], // upload上传的文件列表
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions: [],
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        title: '',
        type: '',
        Id: 0
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ],
        upload: [

        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    this.getWorkLoadOptions()
  },

  methods: {
    // el-upload的httprequest函数
    handleFile(param) {
      this.fileList.push(param.file)
    },
    // 获取工作量的类型
    getWorkLoadOptions() {
      const that = this
      // 获取工作量类型参数，加入教师上传页面添加类型中
      fetchWorkLoadOptions().then(response => {
        const arr = response.data
        arr.forEach(function(val, index) {
          that.calendarTypeOptions.push({
            key: val.key,
            display_name: val.display_name
          })
        })
        // 去重添加工作量类型参数
        // const key = 'key'
        // that.calendarTypeOptions((all, next) => all.some((atom) => atom[key] === next[key] ? all : [...all, next], []))
      })
    },
    getList() {
      this.listLoading = false
      fetchTeacherWorkloadList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.totalList.push('合计', response.data.totalNumber, response.data.totalScore)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getSummaries() {
      return this.totalList
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        title: '',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const that = this
          const upData = new FormData()
          this.$refs.upload.submit()
          this.fileList.forEach(function(file) {
            upData.append('file', file, file.name)
          })
          Object.keys(that.fileList).forEach(function(key) {
            upData.append(key, that.fileList[key])
          })
          upData.append('body', JSON.stringify(this.temp))
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          fetchTeacherCreateInfo(upData).then(response => {
            this.list.unshift(response.data.items)
            // 多文件考虑下面代码
            // this.attList.unshift(response.data.items.filesUrl)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.fileList = []
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateWorkload(tempData).then((response) => {
            console.log(response)
            const index = this.list.findIndex(v => v.id === this.temp.id)
            // this.list.splice(index, 1, this.temp)
            this.list.splice(index, 1, response.data.items)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      const tmpId = this.list[index]
      deleteWorkload(tmpId.id).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    // todo 优化为vue-element-admin自带的
    attDownload(row, index) {
      const url = 'http://127.0.0.1:5000/v1/teacher/download'
      var path = url + '?filename=' + row.filesUrl
      axios.post(path, {}, { responseType: 'arraybuffer' }).then((res) => {
        fileDownload(res.data, row.filesUrl)
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '名称', '提交日期', '类型', '状态']
        const filterVal = [
          'id',
          'username',
          'timestamp',
          'type',
          'status'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
