<template>
  <div class="components-container">
    <el-steps :active="active" process-status="finish" finish-status="success">
      <el-step title="课程信息"></el-step>
      <el-step title="详细信息"></el-step>
    </el-steps>


    <el-form v-if="active===0" ref="addForm" :model="addForm" label-width="70px" align="left">

      <el-form-item label="课程名称">
        <el-input v-model="addForm.className" style="width: 300px"/>
      </el-form-item>
      <el-form-item label="难度">
        <el-radio-group v-model="addForm.level">
          <el-radio :label="1">入门级</el-radio>
          <el-radio :label="2">初级</el-radio>
          <el-radio :label="3">中级</el-radio>
          <el-radio :label="4">高级</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="简介">
        <el-input v-model="addForm.introduction" type="textarea"/>
      </el-form-item>
      <el-form-item label="基本知识">
        <el-input v-model="addForm.baseKnowledge" type="textarea"/>
      </el-form-item>
      <el-form-item label="能学什么">
        <el-input v-model="addForm.learn" type="textarea"/>
      </el-form-item>
      <el-form-item label="类别">
        <el-select
          v-model="typeIds"
          multiple
          placeholder="请选择"
          style="width: 270px"
          filterable
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
          action="/course/add"
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
      </el-form-item>
    </el-form>


    <el-row v-if="active===1" :gutter="20" style="margin-top:50px;">
      <el-col :span="8">
        <el-card class="box-card" style="overflow: auto">
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
            <el-form label-width="50px" v-if="showChild">
              <el-form-item label="标题">
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
                         class="el-upload-dragger"
                         controls="controls">
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


    <el-button style="margin-top: 12px;" @click="next" v-if="this.step===1">下一步</el-button>
    <el-button style="margin-top: 12px;" @click="showMessage" v-if="this.step===2">完成</el-button>


  </div>
</template>

<script>

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

  import {getToken} from '@/utils/auth'
  import store from '@/store'


  let id = 0;
  let count = 1000;
  export default {
    name: "addCourse",
    data() {
      return {
        active: 0,
        editForm: {
          level: '',
          className: ''
        },
        addForm: {
          className: '',
          introduction: '',
          typeId: '',
          level: '',
          learn: '',
          baseKnowledge: '',
        },
        data: [],
        input: '',//输入的值
        inputData: '',
        suffix: '',
        step: 1,
        courseId: '',//课程id
        chapterId: '',//章节id
        detailId: '',//小节id
        types: [],//所有类别
        typeIds: [],//选中类别
        showChild: false,//显示小节修改
        videoFlag: false,//是否显示进度条
        videoUploadPercent: "",//进度条的进度，
        isShowUploadVideo: false,//显示上传按钮
        videoForm: {
          showVideoPath: ''
        }
      };
    },
    mounted() {
      queryAll().then(res => {
        this.types = res.data
      })
    },

    methods: {

      setHeader() {
        return {
          'token': getToken()
        }
      },

      convert() {
        this.addForm.typeId = this.typeIds.join(',')
        return this.addForm
      },

      courseConvert(){
        return {
          detailId:this.detailId
        }
      },

      showMessage(){
        this.$message({
          type:'success',
          message:'完成添加'
        })
        this.$router.replace({
          path:'/course/courseManager'
        })
      },


      next() {
        if (this.active++ > 1) this.active = 0;
        this.step = 2;
        this.$refs.upload.submit()
      },

      //上传前回调
      beforeUploadVideo(file) {
        var fileSize = file.size / 1024 / 1024 < 100;
        if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
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

      fileSuccess(res, file) {

        if (res.code == 0) {
          this.courseId = res.data
        }else if (res.code==12) {
          this.$message({
            type: 'error',
            message: res.msg
          })
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      },

      add() {

        id++;
        let data = {
          courseId: this.courseId,
          chapterName: '标题',
          sequence: id
        }
        addCourseChapter(data).then(res => {
          this.chapterId = res.data
          this.data.push({
            id: id,
            label: '第' + (this.data.length+1) + '章:标题',
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

            var index=0

            this.data.forEach(item => {
              index++
              if (item.id > data.id) {

                var tempId = index;
                item.label = '第' + (tempId) + '章:' + item.label.split(":")[1];

                item.children.forEach(child => {
                  child.label = tempId + "-" + child.label.split("-")[1];
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
          this.showChild = true
        }
      },


      updateChapter() {
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
      }
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

  .board-item {
    cursor: pointer;
    width: 100%;
    height: 64px;
    margin: 5px 0;
    background-color: #fff;
    text-align: left;
    line-height: 54px;
    padding: 5px 10px;
    box-sizing: border-box;
    box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
  }

</style>
