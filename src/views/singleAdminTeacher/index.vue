<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="listQuery.year"
        format="yyyy 年"
        value-format="yyyy"
        type="year"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t("table.search") }}
      </el-button>
    </div>
    <p>汇总</p>
    <el-table
      :key="totalWorkloadKey"
      v-loading="listLoading"
      max-height="450"
      :data="totalWorkload"
      border
      fit
      highlight-current-row
      style="width: 100%;"
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
        <template slot-scope="{ row }">
          <span>{{ row.jobCatecory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职称" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teacherTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教学" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teachingWorkloadTotalMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="科研" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.scientificWorkloadTotalMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="其他" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.othersWorkloadTotalMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="辅导员" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.counselorsWorkloadTotalMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总计" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.totalMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="110"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            v-if="row.confirmStatus === '未确认'"
            type="warning"
            size="mini"
            @click="confirm(row, $index)"
          >
            未确认
          </el-button>
          <el-button v-if="row.confirmStatus === '已确认'" size="mini" type="success">
            已确认
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <p>教学工作量</p>
    <el-table
      :key="teachingTableKey"
      v-loading="listLoading"
      height="150"
      :data="teachingList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
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
        <template slot-scope="{ row }">
          <span>{{ row.jobCatecory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职称" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teacherTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教学工作量" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teachingWorkload }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教学合格工作量" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teachingQualifiedWorkload }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教学考评优秀奖励" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teachingExcellentWorkload }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教学超工作量" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teachingBeyondWorkload }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职称系数" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teacherTitleNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教学超工作量（乘系数）" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teachingBeyondWorkloadNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教学超工作量金额" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teachingBeyondWorkloadMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职级系数" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teacherPostionNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理岗超工作量（金额）" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.manageBeyondWorkloadMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总超工作量金额" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.totalMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.notes }}</span>
        </template>
      </el-table-column>
    </el-table>
    <p>科研工作量</p>
    <el-table
      :key="scientificTableKey"
      v-loading="listLoading"
      max-height="450"
      :data="scientificList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
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
        <template slot-scope="{ row }">
          <span>{{ row.jobCatecory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职称" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teacherTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="310px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.scientificName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.scientificType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.scientificMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.notes }}</span>
        </template>
      </el-table-column>
    </el-table>
    <p>其他工作量</p>
    <el-table
      :key="othersTableKey"
      v-loading="listLoading"
      max-height="150"
      :data="othersList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
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
    </el-table>
    <p>辅导员工作量</p>
    <el-table
      :key="counselorsTableKey"
      v-loading="listLoading"
      max-height="450"
      :data="counselorsList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
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
        <template slot-scope="{ row }">
          <span>{{ row.jobCatecory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职称" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.teacherTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="带学生人数" width="310px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.totalPeople }}</span>
        </template>
      </el-table-column>
      <el-table-column label="超工作量人数" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.beyondWorkloadPeople }}</span>
        </template>
      </el-table-column>
      <el-table-column label="月份" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.months }}</span>
        </template>
      </el-table-column>
      <el-table-column label="超工作量" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.counselorsBeyondWorkload }}</span>
        </template>
      </el-table-column>
      <el-table-column label="超工作量分值" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.counselorsBeyondWorkloadScore }}</span>
        </template>
      </el-table-column>
      <el-table-column label="超工作量金额" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.counselorsBeyondWorkloadMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="带学生金额" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.studentsMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.totalMoney }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { confirmTeachingWorkload } from '@/api/teacher'
import { fetchSingleTeacherAdminAllInfo } from '@/api/admin'
import waves from '@/directive/waves' // waves directive
const calendarTypeOptions = []

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
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
  props: [
    'id'
  ],
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
        teachingWorkload: undefined,
        teachingQualifiedWorkload: undefined,
        teachingExcellentWorkload: 0,
        notes: ''
      },
      statusList: [{ 'key': 0, 'status': '未审核' }, { 'key': 1, 'status': '已审核' }],
      totalList: [], // 接收合计列表传入table
      attList: [], // 接收返回的附件列表
      fileList: [], // upload上传的文件列表
      teachingTableKey: 0,
      scientificTableKey: 1,
      othersTableKey: 2,
      totalWorkloadKey: 3,
      counselorsTableKey: 4,
      teachingList: null,
      othersList: null,
      scientificList: null,
      counselorsList: null,
      totalWorkload: [],
      total: 0,
      listLoading: true,
      listQuery: {
        id: this.id,
        page: 1,
        year: (new Date().getFullYear() - 1).toString()
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
    getList() {
      this.listLoading = false
      fetchSingleTeacherAdminAllInfo(this.listQuery).then(response => {
        this.teachingList = response.data.teachingWorkload
        this.scientificList = response.data.scientificWorkload
        this.othersList = response.data.othersWorkload
        this.totalWorkload = response.data.totalWorkload
        this.counselorsList = response.data.counselorsWorkload
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 教师确认
    confirm(row, index) {
      confirmTeachingWorkload(row.totalId).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.totalWorkload[index].confirmStatus = '已确认'
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
