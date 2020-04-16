<template>

  <div class="app-container">


    <div class="filter-container">

      <el-input v-model="searchValue" placeholder="课程名称" style="width: 200px;" class="filter-item"
                @keyup.enter.native="queryAll"/>

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
      v-loading="this.loading"
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

    <el-dialog title="修改课程信息" :visible.sync="editDialogVisible" width="70%" @close="editDialogClosed">

      <el-form v-if='active===0' ref="editFormRef" :model="editForm" label-width="70px" align="left">

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
            :file-list="files"
          >
            <el-image :src="editForm.coverPath" v-if="editForm.coverPath!=''">

            </el-image>
            <i slot="default" class="el-icon-plus"v-if="editForm.coverPath==''"/>

            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="editDialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="finishBaseInfo">完成</el-button>
          <el-button size="small" type="primary" @click="updateCourse">下一步</el-button>
        </el-form-item>
      </el-form>


      <el-row v-if="active===1" :gutter="20">
        <el-col :span="8">
          <el-card class="box-card" style="overflow: auto;width: 300px">
            <div slot="header" class="clearfix">
              <span>新建章节</span>
            </div>
            <div class="component-item" style="height:420px;">
              <el-button style="width: 100%;" size="medium" type="primary" @click="add">新增章节</el-button>


              <div class="custom-tree-container">
                <div class="block">
                  <el-tree
                    :data="data"
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false"
                    @node-click="clickTree">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            v-if="data.children"
            type="text"
            size="mini"
            icon="el-icon-plus"
            @click="() => append(node,data)">
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
                  </el-tree>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" style="width: 460px">
            <div slot="header" class="clearfix">
              <span>编辑章节</span>
            </div>
            <div class="component-item" style="height:420px;">


              <el-form label-width="50px" v-if="(!this.showChild)&&(this.data.length>0)">
                <el-form-item label="标题">
                  <el-input @change="updateChapter" v-model="input" placeholder='请输入内容'></el-input>

                </el-form-item>

              </el-form>
              <el-form label-width="50px" v-if="this.showChild">
                <el-form-item label="子标题">
                  <el-input @change="changeValue" v-model="input" placeholder='请输入内容'></el-input>

                </el-form-item>

                <el-form-item label="视频资源">
                  <el-upload
                    drag
                    action="/courseDetail/upload"
                    ref="uploadCourse"
                    name="video"
                    :on-success="handleVideoSuccess"
                    :on-progress="uploadVideoProcess"
                    :before-upload="beforeUploadVideo"
                    :show-file-list="false"
                    :data='courseConvert()'
                    :headers="setHeader()"
                  >
                    <video v-if="videoForm.showVideoPath !='' && !videoFlag"
                           :src="videoForm.showVideoPath"
                           controls="controls"
                           class="el-upload-dragger"
                           >
                      您的浏览器不支持视频播放
                    </video>
                    <i v-else-if="videoForm.showVideoPath =='' && !videoFlag"
                       class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <el-progress v-if="videoFlag == true"
                                 type="circle"
                                 :percentage="videoUploadPercent"
                    ></el-progress>
                    <div class="el-upload__tip" slot="tip">只能上传视频文件在这里</div>
                  </el-upload>

                </el-form-item>
              </el-form>


            </div>
          </el-card>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer" v-if="active===1">
        <el-button @click="finish">完成</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>

  import
  {
    queryAllCourse,
    deleteCourse,
    changeStatus,
    queryAllType,
    queryChapter,
  } from '@/api/course';

  import
  {
    addCourse,
    queryAll,
    addCourseChapter,
    deleteCourseChapter,
    updateCourseChapter,
    addCourseDetail,
    deleteCourseDetail,
    updateCourseDetail
  }

    from "@/api/addCourse";

  import store from '@/store';

  import {getToken} from '@/utils/auth'

  let id = 0;
  let count = 1000;
  export default {
    name: 'CourseManager',
    data() {
      return {

        loading: true,
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
          coverPath:'',
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
            status: 4,
            label: '审核通过'
          },
          {
            status: 5,
            label: '审核失败'
          }
        ],
        statusValue: '',


        typeArray: [], //全部类型，包括方向
        typeValue: '', //选中的方向值

        typeIds: [], //已选中的类型值
        types: [], //全部子类型

        active: 0,
        data: [],//树形结构数据
        input: '',//输入的值
        inputData: '',
        suffix: '',
        courseId: '',//课程id
        chapterId: '',//章节id
        detailId: '',//小节id
        showChild: false,//显示小节修改
        videoFlag: false,//是否显示进度条
        videoUploadPercent: "",//进度条的进度，
        isShowUploadVideo: false,//显示上传按钮
        videoForm: {
          showVideoPath: ''
        },
        files:[]


      }
    },
    mounted() {
      this.queryAllType()
      this.queryAll()
      this.queryAllChildType()
    },
    methods: {

      finish() {
        this.editDialogVisible = false
        this.active = 0
        this.queryAll()
      },

      add() {

        id++;
        let data = {
          courseId: this.courseId,
          chapterName: '标题',
          sequence: id
        }
        addCourseChapter(data).then(res => {
          console.log(res.data)
          this.chapterId = res.data
          this.data.push({
            id: id,
            label: '第' + (this.data.length + 1) + '章:标题',
            children: [],
            chapterId: res.data
          });
        })

      },

      append(node, data) {
        count++;

        let param = {
          chapterId: data.chapterId,
          name: '子标题',
          sequence: count
        }

        addCourseDetail(param).then(res => {
          var prefix = ''
          for (let i = 0; i < this.data.length; i++) {
            if (data.id == this.data[i].id) {
              prefix = i+1
              break
            }
          }
          const newChild = {
            id: count,
            label: prefix + '-' + (data.children.length + 1) + ':子标题',
            detailId: res.data,
            chapterId: data.chapterId
          };
          data.children.push(newChild);
        })

      },

      remove(node, data) {

        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);


        if (data.id < 1000) {
          deleteCourseChapter(data.chapterId).then(res => {

            var index = 0

            this.data.forEach(item => {

              index++

              if (item.id > data.id) {

                var tempId = index;
                item.label = '第' + (tempId) + '章:' + item.label.split(":")[1];

                item.children.forEach(child => {
                  child.label = tempId + "-" + (child.label.split("-")[1]);
                })
              }

            })
          })
        } else {
          deleteCourseDetail(data.detailId).then(res => {


            children.forEach(child => {

              var index = child.label.split(':')

              var detailLabel = index[0].split('-')
              var detailIndex = detailLabel[1] - 1

              if (child.id > data.id) {
                child.label = detailLabel[0] + "-" + detailIndex + ':' + (child.label.split(":")[1]);
              }
            })

          })
        }


      },

      clickTree(data, node) {
        this.suffix = data.label.split(":")[0];
        this.input = data.label.split(":")[1];
        this.inputData = data.id;

        if (data.id < 1000) {
          this.chapterId = data.chapterId
          this.showChild = false
        } else {
          this.detailId = data.detailId
          this.videoForm.showVideoPath=data.videoPath

          if (this.videoForm.showVideoPath==null){
            this.videoForm.showVideoPath=''
          }
          this.showChild = true
        }
      },

      updateChapter() {

        console.log('inputData值' + this.inputData)

        if (this.inputData > 1000) {
          this.data.forEach(item => {
            item.children.forEach(child => {
              if (child.id == this.inputData) {
                child.label = this.suffix + ':' + this.input;
              }
            });
          });
        } else {
          this.data[this.inputData - 1].label = this.suffix + ':' + this.input;
        }

        let data = {
          id: this.chapterId,
          chapterName: this.input
        }
        updateCourseChapter(data)

      },

      changeValue() {

        if (this.inputData > 1000) {
          this.data.forEach(item => {
            item.children.forEach(child => {
              if (child.id == this.inputData) {
                child.label = this.suffix + ':' + this.input;
              }
            });
          });
        } else {
          this.data[this.inputData - 1].label = this.suffix + ':' + this.input;
        }

        let data = {
          id: this.detailId,
          name: this.input
        }

        updateCourseDetail(data)
      },

      //上传前回调
      beforeUploadVideo(file) {
        var fileSize = file.size / 1024 / 1024 < 100;
        if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov', 'video/mkv'].indexOf(file.type) == -1) {
          this.$message({
            type: 'error',
            message: '请上传正确的视频格式'
          })
          return false;
        }
        if (!fileSize) {
          this.$message({
            type: 'error',
            message: '视频大小不能超过100MB'
          })
          return false;
        }
        this.isShowUploadVideo = false;
      },
      //进度条
      uploadVideoProcess(event, file, fileList) {
        this.videoFlag = true;
        this.videoUploadPercent = file.percentage.toFixed(0) * 1;
      },
      //上传成功回调
      handleVideoSuccess(res, file) {
        this.isShowUploadVideo = true;
        this.videoFlag = false;
        this.videoUploadPercent = 0;

        //后台上传地址
        if (res.code == 0) {
          this.videoForm.showVideoPath = res.data;
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      },

      courseConvert() {
        return {
          detailId: this.detailId
        }
      },


      updateCourse() {
        this.$refs.upload.submit()
        this.queryAll()
      },

      finishBaseInfo() {

        console.log('文件信息：'+this.files)

        console.log('函数'+this.$refs.upload.submit())
        this.editDialogVisible=false
        this.active=0
        this.queryAll()
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

      max(first, second) {
        return first > second ? first : second
      },


      //修改课程基本信息成功后的函数
      fileSuccess(res, file) {

        console.log('更新消息')

        if (res.code == 0) {

          queryChapter(this.courseId).then(res => {
            this.data = res.data
            this.data.forEach(chapter => {
              id = this.max(id, chapter.sequence)
              chapter.id = chapter.sequence;
              chapter.children.forEach(detail => {
                detail.id = detail.sequence
                count = this.max(count, detail.sequence)
              })
            })
          })
          this.active = 1
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
          typeId: this.typeValue,
          keyword: this.searchValue
        }
        this.loading=true
        queryAllCourse(data).then(res => {
          var result = res.data
          this.currPage = result.pageNum
          this.pageSize = result.pageSize
          this.totalNum = result.total
          this.tableData = result.list
          this.loading=false
        })
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


        this.active=0

        this.editForm.level = courseInfo.levelCode
        this.editForm.className = courseInfo.className
        this.editForm.introduction = courseInfo.introduction
        this.typeIds = []
        this.typeIds = courseInfo.typeIds.split(',').map(Number)
        this.editForm.baseKnowledge = courseInfo.baseKnowledge
        this.editForm.learn = courseInfo.learn
        this.editForm.id = courseInfo.id
        this.editForm.coverPath = courseInfo.coverPath
        this.courseId = courseInfo.id
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
