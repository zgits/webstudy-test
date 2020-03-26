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
        <span v-if="data.children">
          <el-button
            type="text"
            size="mini"
            icon="el-icon-plus"
            @click="() => append(data)">
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


            <el-form label-width="50px" v-if="this.data.length>0">
              <el-form-item label="标题">
                <el-input @input="changeValue" v-model="input" placeholder='请输入内容'></el-input>

              </el-form-item>

              <el-form-item label="视频资源">
                <el-upload
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传视频文件在这里</div>
                </el-upload>

              </el-form-item>
            </el-form>


          </div>
        </el-card>
      </el-col>
      <!--      <el-col :span="8">-->
      <!--        <el-card class="box-card">-->
      <!--          <div slot="header" class="clearfix">-->
      <!--            <span>Share</span>-->
      <!--          </div>-->
      <!--          <div class="component-item" style="height:420px;">-->
      <!--          </div>-->
      <!--        </el-card>-->
      <!--      </el-col>-->
    </el-row>


    <el-button style="margin-top: 12px;" @click="next" v-if="this.step===1">下一步</el-button>
    <el-button style="margin-top: 12px;" @click="" v-if="this.step===2">完成</el-button>


  </div>
</template>

<script>

  import {addCourse, queryAll} from "@/api/addCourse";

  import { getToken } from '@/utils/auth'


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
          learn:'',
          baseKnowledge:'',
        },
        data: [],
        input: '',
        inputData: '',
        suffix: '',
        step: 1,
        courseId: '',
        types: [],//所有类别
        typeIds:[],//选中类别
      };
    },
    mounted() {
      queryAll().then(res => {
        this.types = res.data
      })
    },

    methods: {

      setHeader(){
        return {
          'token':getToken()
        }
      },

      convert(){
        this.addForm.typeId=this.typeIds.join(',')
        return this.addForm
      },


      next() {
        if (this.active++ > 1) this.active = 0;
        this.step = 2;
        this.$refs.upload.submit()
      },

      fileSuccess(res, file){

        if(res.code==0){
          this.courseId=res.data
        }else{
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      },

      add() {

        id++;
        this.data.push({
          id: id,
          label: '第' + (id) + '章:标题',
          children: [],
        });
      },

      append(data) {
        count++;
        const newChild = {id: count, label: data.id + '-' + (data.children.length + 1) + ':子标题'};
        data.children.push(newChild);
      },

      remove(node, data) {
        id--;
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);

        this.data.forEach(item => {

          if (item.id > data.id) {


            var tempId = --item.id;
            item.id = tempId;
            item.label = '第' + (tempId) + '章:' + item.label.split(":")[1];

            item.children.forEach(child => {
              child.label = tempId + "-" + child.label.split("-")[1];
            })

          }


        })

      },

      clickTree(data) {
        this.suffix = data.label.split(":")[0];
        this.input = data.label.split(":")[1];
        this.inputData = data.id;
        console.log(data);
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
