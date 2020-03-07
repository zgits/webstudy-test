<template>
    <div class="components-container">
      <el-steps :active="active" process-status="finish" finish-status="success">
        <el-step title="课程信息"></el-step>
        <el-step title="详细信息"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>




        <el-form v-if="active===0" ref="editFormRef" :model="editForm" label-width="70px" align="left" >

          <el-form-item label="课程名称">
            <el-input v-model="editForm.className" style="width: 300px" />
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
            <el-input v-model="editForm.introdu" type="textarea" />
          </el-form-item>
          <el-form-item label="封面">
            <el-upload
              limit="1"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                >
                <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in" />
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download" />
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete" />
                </span>
              </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>


      <el-row v-if="active===1" :gutter="20" style="margin-top:50px;">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Share</span>
            </div>
            <div class="component-item" style="height:420px;">
              <dropdown-menu :items="articleList" style="margin:0 auto;" title="系列文章" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Share</span>
            </div>
            <div class="component-item" style="height:420px;">
              <dropdown-menu :items="articleList" style="margin:0 auto;" title="系列文章" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Share</span>
            </div>
            <div class="component-item" style="height:420px;">
              <dropdown-menu :items="articleList" style="margin:0 auto;" title="系列文章" />
            </div>
          </el-card>
        </el-col>
      </el-row>


      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>


    </div>
</template>

<script>
    export default {
        name: "addCourse",
      data() {
        return {
          active: 0,

          editForm: {
            level: '',
            className: ''

            // mobile: ''
          },
        };
      },

      methods: {
        next() {
          if (this.active++ > 2) this.active = 0;
        }
      }
    }
</script>

<style scoped>

</style>
