<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="姓名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.jobCatecory"
        placeholder="岗位类别"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in jobCatecoryList"
          :key="item.index"
          :label="item.jobCatecory"
          :value="item.jobCatecory"
        />
      </el-select>
      <el-select
        v-model="listQuery.teacherTitle"
        placeholder="职称"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in teacherTitleList"
          :key="item.index"
          :label="item.teacherTitle"
          :value="item.teacherTitle"
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
      <!-- <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button> -->
      <!-- <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="calcWorkload()"
      >计算</el-button> -->
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t("table.export") }}
      </el-button> -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleExcel()"
      >批量导入</el-button>
      <el-date-picker
        v-model="listQuery.year"
        format="yyyy 年"
        value-format="yyyy"
        type="year"
      />
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      height="550"
      :row-class-name="tableRowClassName"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :summary-method="getSummaries"
      @sort-change="sortChange"
    >
      <!-- <el-table-column
        :label="$t('table.id')"
        prop="id"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> -->
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
        <template slot-scope="{ row }">
          <span>{{ row.jobCatecory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职称" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teacherTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="考勤" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.attendances }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工会活动" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.unionActivities }}</span>
        </template>
      </el-table-column>
      <el-table-column label="思想政治" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.ideological }}</span>
        </template>
      </el-table-column>
      <el-table-column label="新闻稿" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.news }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专项活动" align="center">
        <el-table-column label="辅导员专项" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.counselors }}</span>
          </template>
        </el-table-column>
        <el-table-column label="特色活动" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.characteristicsActivities }}</span>
          </template>
        </el-table-column>
        <el-table-column label="微专业申办" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.miniProfessional }}</span>
          </template>
        </el-table-column>
        <el-table-column label="信息安全申报" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.information }}</span>
          </template>
        </el-table-column>
        <el-table-column label="本科建设" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.undergraduatecolleges }}</span>
          </template>
        </el-table-column>
        <el-table-column label="毕业设计管理" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.graduationDesignManage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="优质课程" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.courseQuality }}</span>
          </template>
        </el-table-column>
        <el-table-column label="教学组织申报" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.organization }}</span>
          </template>
        </el-table-column>
        <el-table-column label="毕业设计个人" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.graduationDesignPersonal }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专业导学" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.professionalTab }}</span>
          </template>
        </el-table-column>
        <el-table-column label="导师制" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.mentor }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学科竞赛" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.disciplineCompetition }}</span>
          </template>
        </el-table-column>
        <el-table-column label="观摩课" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.teachingWatch }}</span>
          </template>
        </el-table-column>
        <el-table-column label="竞赛评委" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.competitionJudges }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工会组织工作" width="110px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.unionWork }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="额外加分" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.extraScore }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合计分数" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.totalScore }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总金额" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.totalMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.notes }}</span>
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
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
          >
            {{ $t("table.edit") }}
          </el-button>
          <el-button v-if="row.confirmStatus === '未确认'" size="mini" type="warning" @click="confirm(row, $index)">
            未确认
          </el-button>
          <el-button v-if="row.confirmStatus === '已确认'" size="mini" type="success" @click="confirm(row, $index)">
            已确认
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

    <el-dialog title="导入EXCEL" :visible.sync="dialogFormExcel">
      <el-form
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="选择EXCEL" prop="upload">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=""
            :http-request="handleFile"
            multiple
            :limit="1"
            :auto-upload="false"
            :file-list="fileList"
            accept=".xls,.xlsx"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="选择年度">
          <el-date-picker
            v-model="listQuery.uploadExcelYear"
            format="yyyy 年"
            value-format="yyyy"
            type="year"
          />
        </el-form-item>
        <a href="#" style="color:#03A9F4;" @click="attDownload()">
          <span>其他工作量模板文件下载</span>
        </a>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormExcel = false">
          {{ $t("table.cancel") }}
        </el-button>
        <el-button
          type="primary"
          @click="uploadExcel()"
        >
          {{ $t("table.confirm") }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="姓名">
          <el-input v-model="temp.name" :rows="1" :disabled="true" />
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model.number="temp.workNumber" :rows="1" :disabled="true" />
        </el-form-item>
        <el-form-item label="总金额">
          <el-input v-model.number="temp.totalMoney" :rows="1" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model.number="temp.notes" :rows="1" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData()">确定</el-button>
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

<style>
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
import axios from 'axios'
import fileDownload from 'js-file-download'
import {
  addUser,
  deleteUser,
  confirmModifyStatus
} from '@/api/config'
import {
  UploadExcelOthersWorkload,
  fetchUserInfo,
  updateOthersWorkload
} from '@/api/others-workload'
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
      // 岗位类别列表
      jobCatecoryList: [{ 'key': 0, 'jobCatecory': '管理岗' }, { 'key': 1, 'jobCatecory': '教学岗' }, { 'key': 2, 'jobCatecory': '教学辅助岗' }, { 'key': 3, 'jobCatecory': '辅导员管理岗' }],
      teacherTitleList: [{ 'key': 0, 'teacherTitle': '正高' }, { 'key': 1, 'teacherTitle': '副高' }, { 'key': 2, 'teacherTitle': '中级' }, { 'key': 3, 'teacherTitle': '初级' }],
      teacherPostionList: [{ 'key': 0, 'teacherPostion': '正处级' }, { 'key': 1, 'teacherPostion': '副处级' }, { 'key': 2, 'teacherPostion': '正科级' }, { 'key': 3, 'teacherPostion': '副科级' }, { 'key': 4, 'teacherPostion': '员级' }, { 'key': 5, 'teacherPostion': '无' }],
      input: '',
      temp: {
        name: '',
        workNumber: undefined,
        totalMoney: undefined,
        notes: ''
      },
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
        limit: 10,
        name: undefined,
        scientificName: undefined,
        scientificType: undefined,
        year: (new Date().getFullYear() - 1).toString(),
        uploadExcelYear: (new Date().getFullYear() - 1).toString()
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions: [],
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogFormExcel: false, // 弹出批量导入
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
  },

  methods: {
    // todo 优化为vue-element-admin自带的
    attDownload() {
      const url = 'http://127.0.0.1:5000/v1/config/templateDownload'
      var path = url + '?filename=' + '调节性绩效导入模板.xls'
      axios.post(path, {}, { responseType: 'arraybuffer' }).then((res) => {
        fileDownload(res.data, '调节性绩效导入模板.xls')
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.confirmStatus === '已确认') {
        return 'success-row'
      } else {
        return ''
      }
    },
    getList() {
      this.listLoading = false
      fetchUserInfo(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.totalList.push('合计', response.data.totalNumber, response.data.totalScore)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 管理员确认教师工作量
    confirm(row, index) {
      confirmModifyStatus(row.tId).then(() => { // this.id代表用户id，用于查找更改后台工作量
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
        if (this.list[index].confirmStatus === '已确认') {
          this.list[index].confirmStatus = '未确认'
        } else {
          this.list[index].confirmStatus = '已确认'
        }
      })
    },
    // 计算工作量
    calcWorkload() {
      fetchCalcWorkload(this.listQuery.year).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.list = response.data.items
      })
    },
    getSummaries() {
      return this.totalList
    },
    handleFile(param) {
      this.fileList.push(param.file)
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
        name: '',
        username: '',
        department: ''
      }
    },
    handleExcel() {
      this.dialogFormExcel = true
    },
    uploadExcel() {
      const that = this
      const upData = new FormData()
      this.$refs.upload.submit()
      this.fileList.forEach(function(file) {
        upData.append('file', file, file.name)
      })
      Object.keys(that.fileList).forEach(function(key) {
        upData.append(key, that.fileList[key])
      })
      UploadExcelOthersWorkload(upData, this.listQuery.uploadExcelYear).then(response => {
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
        this.list = response.data.items
        this.fileList = []
      })

      this.dialogFormExcel = false
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.temp = {
        name: '',
        username: '',
        department: ''
      }
      this.dialogFormVisible = true
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          addUser(this.temp).then((response) => {
            this.list.unshift(response.data)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
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
          updateOthersWorkload(tempData).then((response) => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            // this.list.splice(index, 1, this.temp)
            this.list.splice(index, 1, response.data)
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
      deleteUser(tmpId.id).then(() => {
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名', '工号', '岗位类别', '职称', '教学工作量', '教学合格工作量', '教学考评优秀奖励', '教学超工作量', '职称系数', '教学超工作量(乘系数)', '教学超工作量金额', '职级系数', '管理岗超工作量(金额)', '总超工作量金额', '备注']
        const filterVal = [
          'name',
          'workNumber',
          'jobCatecory',
          'teacherTitle',
          'teachingWorkload',
          'teachingQualifiedWorkload',
          'teachingExcellentWorkload',
          'teachingBeyondWorkload',
          'teacherTitleNum',
          'teachingBeyondWorkloadNum',
          'teachingBeyondWorkloadMoney',
          'teacherPostionNum',
          'manageBeyondWorkloadMoney',
          'totalMoney',
          'teaching_workload_user'
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
