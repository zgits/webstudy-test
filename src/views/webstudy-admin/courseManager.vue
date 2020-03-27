<template>

  <div class="app-container">


    <div class="filter-container">

      <el-input v-model="searchValue" placeholder="课程名称" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>

      <el-select class="filter-item" v-model="levelValue" placeholder="难度" clearable @change="queryAll">
        <el-option v-for="item in level" :key="item.levelnum" :label="item.label" :value="item.levelnum"></el-option>

      </el-select>

      <el-select class="filter-item" v-model="statusValue" placeholder="状态" clearable @change="queryAll">
        <el-option v-for="item in statusArray" :key="item.status" :label="item.label" :value="item.status"></el-option>

      </el-select>


      <el-select class="filter-item" v-model="typeValue" placeholder="类别" clearable @change="queryAll">
        <el-option v-for="item in typeArray" :key="item.id" :label="item.typeName" :value="item.id"></el-option>

      </el-select>

      <el-button class="filter-item" icon="el-icon-delete" type="danger" @click="deleteCourse">批量删除</el-button>


    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      stripe
      style="width: 100%"
      height="500"
      border
      show-pagination
    >
      <el-table-column
        type="selection"
        width="50px"
        fixed
      />

      <el-table-column
        prop="className"
        label="课程名称"
        width="100px"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="score"
        label="评分"
        width="80px"
        sortable
        align="center"
      />
      <el-table-column
        prop="studyNumber"
        label="学习人数"
        sortable
        width="110px"
        align="center"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="160px"
        sortable
        align="center"
      />
      <el-table-column
        prop="type"
        label="类型"
        width="100px"
        :show-overflow-tooltip="true"
      />

      <el-table-column
        prop="teacher"
        label="上传者"
        align="center"
      />

      <el-table-column
        prop="introduction"
        label="简介"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="baseKnowledge"
        label="基本知识"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="learn"
        label="能学什么"
        :show-overflow-tooltip="true"
      />

      <el-table-column
        prop="level"
        label="难度"
      >
      </el-table-column>

      <el-table-column
        prop="coverPath"
        label="封面"
        width="100px"
      >
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title=""
            trigger="hover"
          >
            <el-image
              slot="reference"
              :src="scope.row.coverPath"
              :alt="scope.row.coverPath"
              style="max-height: 70px;max-width: 70px"
              class="head_pic"
            />
            <el-image
              :src="scope.row.coverPath"
              style="max-height:500px;max-width: 500px"
            />
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="详情"
      >
        <template slot-scope="scope">

          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-edit"
            size="medium"
            @click="showDialog(scope.row)"
          >详情
          </el-link>

        </template>
      </el-table-column>

      <el-table-column
        label="状态"
      >

        <template scope="scope">

          <span>{{ formatStatus(scope.row.status) }}</span>
        </template>

      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="150px"
        fixed="right"
      >
        <template slot-scope="scope">

          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-edit"
            size="medium"
            @click="showEditDialog(scope.row)"
          >修改
          </el-link>

          <el-link
            type="danger"
            :underline="false"
            icon="el-icon-delete"
            size="medium"
            @click="deleteOne(scope.row.id)"
          >删除
          </el-link>

          <el-popconfirm
            icon="el-icon-question"
            icon-color="red"
            title="确定下线该课程吗？"
            @onConfirm="changeStatus(scope.row.id,3)"
          >

            <el-link
              v-if="scope.row.status===2||scope.row.status===4"
              slot="reference"
              type="warning"
              :underline="false"
              icon="el-icon-download"
              size="medium"
            >下线
            </el-link>

          </el-popconfirm>

          <el-popconfirm
            icon="el-icon-question"
            icon-color="green"
            title="确定上线该课程吗？"
            @onConfirm="changeStatus(scope.row.id,2)"
          >

            <el-link
              v-if="scope.row.status===3||scope.row.status===4"
              slot="reference"
              type="primary"
              :underline="false"
              icon="el-icon-upload2"
              size="medium"
            >上线
            </el-link>
          </el-popconfirm>


        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="currPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog title="修改课程信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">

      <el-form ref="editFormRef" :model="editForm" label-width="70px" align="left">

        <el-form-item label="课程名称">
          <el-input v-model="editForm.className" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="难度">
          <el-radio-group v-model="editForm.level">
            <el-radio :label="1">入门级</el-radio>
            <el-radio :label="2">初级</el-radio>
            <el-radio :label="3">中级</el-radio>
            <el-radio :label="4">高级</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="简介">
          <el-input v-model="editForm.introduction" type="textarea"/>
        </el-form-item>
        <el-form-item label="基本知识">
          <el-input v-model="editForm.baseKnowledge" type="textarea"/>
        </el-form-item>
        <el-form-item label="能学什么">
          <el-input v-model="editForm.learn" type="textarea"/>
        </el-form-item>
        <el-form-item label="类别">
          <el-select
            v-model="typeIds"
            multiple
            clearable
            placeholder="请选择"
            style="width: 270px"
          >
            <el-option
              v-for="item in types"
              :key="item.id"
              :label="item.typeName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封面">
          <el-upload
            :limit="1"
            action="/course/update"
            list-type="picture-card"
            :auto-upload="false"
            ref="upload"
            name="coverImage"
            :on-success="fileSuccess"
            :data='convert()'
            :headers="setHeader()"
          >
            <i slot="default" class="el-icon-plus"/>

            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="editDialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="updateCourse">确 定</el-button>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer"/>
    </el-dialog>

  </div>

</template>

<script>

  import
  {
    queryAllCourse,
    deleteCourse,
    changeStatus,
    queryAllType
  } from '@/api/course';

  import {queryAll} from "@/api/addCourse";

  import {getToken} from '@/utils/auth'

  let id = 1000
  export default {
    name: 'CourseManager',
    data() {
      return {

        tableData: [],

        showDialogVisible: false,
        editDialogVisible: false, // 控制修改角色信息对话框是否显示
        totalNum: 20,
        currPage: 1,
        pageSize: 10,
        // 修改用户信息的表单数据
        editForm: {
          level: '',
          className: '',
          introduction: '',
          typeId: '',
          baseKnowledge: '',
          learn: '',
          id: '',
        },
        ids: [],
        searchValue: '',

        // 文件上传
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,

        // 底部按钮
        online: 'primary',
        downline: '',
        all: '',
        onloading: false,
        downloading: false,
        allloading: false,

        level: [
          {
            levelnum: 1,
            label: '入门级'
          },
          {
            levelnum: 2,
            label: '初级'
          },
          {
            levelnum: 3,
            label: '中级'
          },
          {
            levelnum: 4,
            label: '高级'
          },
        ],
        levelValue: '',

        statusArray: [
          {
            status: 1,
            label: '审核中'
          },
          {
            status: 2,
            label: '已上线'
          },
          {
            status: 3,
            label: '已下线'
          },
          {
            status:4,
            label:'审核通过'
          },
          {
            status:5,
            label:'审核失败'
          }
        ],
        statusValue: '',


        typeArray: [], //全部类型，包括方向
        typeValue: '', //选中的方向值

        typeIds: [], //已选中的类型值
        types: [], //全部子类型


      }
    },
    mounted() {
      this.queryAllType()
      this.queryAll()
      this.queryAllChildType()
    },
    methods: {

      // this.$refs.multipleTable.clearSelection() 清除所选

      updateCourse(){
        this.$refs.upload.submit()
          this.queryAll()
          this.editDialogVisible=false
      },

      setHeader() {
        return {
          'token': getToken()
        }
      },

      convert() {
        this.editForm.typeId = this.typeIds.join(',')
        return this.editForm
      },


      fileSuccess(res, file) {

        if (res.code == 0) {

          this.$message({
            type: 'success',
            message: '修改课程信息成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      },

      editDialogClosed() {
        this.editDialogVisible = false
      },
      queryAllType() {
        queryAllType().then(res => {
          this.typeArray = res.data
        })
      },

      queryAllChildType() {
        queryAll().then(res => {
          this.types = res.data
        })
      },


      queryAll() {
        let data = {
          currPage: this.currPage,
          pageSize: this.pageSize,
          status: this.statusValue,
          level: this.levelValue,
          typeId: this.typeValue
        }
        queryAllCourse(data).then(res => {
          var result = res.data
          this.currPage = result.pageNum
          this.pageSize = result.pageSize
          this.totalNum = result.total
          this.tableData = result.list
        })
      },


      handleFilter() {

        console.log(this.searchValue)
        this.listLoading = true
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      },

      deleteCourse() {
        this.$refs.multipleTable.selection.forEach(item => {
          this.ids.push(item.id)
        })

        deleteCourse(this.ids.join(',')).then(res => {
          this.$message({
            type: 'success',
            message: '删除课程成功'
          })
          this.queryAll()
        })

        this.ids = []
      },

      deleteOne(courseId) {
        this.$confirm('是否删除该课程?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ids.push(courseId)
          deleteCourse(this.ids.join(',')).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.queryAll()
          })
          this.ids = []
        })
      },


      queryCourse(status) {
        // this.loading=true;
        // this.loading=false;

        if (status == 2) {
          this.onloading = true
          this.online = 'primary'
          this.downline = ''
          this.downloading = false
          this.all = ''
          this.allloading = false

          // todo 请求

          this.onloading = false
        } else if (status == 3) {
          this.onloading = false
          this.online = ''
          this.downline = 'primary'
          this.downloading = true
          this.all = ''
          this.allloading = false

          // todo 请求

          this.downloading = false
        } else {
          this.onloading = false
          this.online = ''
          this.downline = ''
          this.downloading = false
          this.all = 'primary'
          this.allloading = true

          status = null

          console.log(status)

          this.allloading = false
        }
      },

      changeStatus(courseId, status) {
        let data = {
          courseId: courseId,
          status: status
        }
        changeStatus(data).then(res => {
          this.$message({
            type: 'success',
            message: '修改课程成功'
          })
          this.queryAll()
        })
      },

      handleSizeChange(val) {
        this.pageSize = val
        this.queryAll()
      },
      handleCurrentChange(val) {
        this.currPage = val
        this.queryAll()
      },

      formatStatus(status) {
        const statusMap = {
          1: '审核中',
          2: '已上线',
          3: '已下线',
          4: '审核通过',
          5: '审核失败'
        }
        return statusMap[status]
      },

      doApply(applyId, status) {
        this.$prompt('备注', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          // todo 请求

          this.$message({
            type: 'success',
            message: '填写备注' + value + applyId + status
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      showEditDialog(courseInfo) {
        this.editDialogVisible = true

        console.log(courseInfo)

        this.editForm.level = courseInfo.levelCode
        this.editForm.className = courseInfo.className
        this.editForm.introduction = courseInfo.introduction
        this.typeIds = courseInfo.typeIds.split(',').map(Number)
        this.editForm.baseKnowledge = courseInfo.baseKnowledge
        this.editForm.learn = courseInfo.learn
        this.editForm.id = courseInfo.id
      },

      showDialog(courseInfo) {
        this.showDialogVisible = true
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },


    }
  }
</script>

<style scoped>

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .el-tree-node__content:hover {
    background-color: red;
    color: #333333;
    background: rgba(196, 238, 160, 1);
  }

  /*.nodeTree:hover{*/
  /*    background-color:red;*/
  /*}*/

  /*.el-tree-node:hover{*/
  /*    background-color: red;*/
  /*}*/

</style>
