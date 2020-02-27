<template>


  <div class="app-container">


    <div class="filter-container">

      <el-input  v-model="searchValue" placeholder="名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />


      <el-button class="filter-item" icon="el-icon-plus" type="primary" @click="showAddDialog">新增</el-button>

      <el-button class="filter-item" icon="el-icon-delete" type="danger" @click="deleteType">批量删除</el-button>


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
            width="80px"
          />

          <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table
                  border
                  ref="multipleTable"
                  :data="scope.row.children">
                  <el-table-column
                    type="selection"
                    width="80px"
                  />
                  <el-table-column label="序号" type="index" width="150px" align="center" />

                  <el-table-column
                  label="名称" prop="typeName">

                  </el-table-column>
                  <el-table-column
                  label="类别">
                    类型
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
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
                        @click="open(scope.row.id)"
                      >删除
                      </el-link>
                    </template>
                  </el-table-column>

                </el-table>
              </template>
          </el-table-column>

          <el-table-column label="序号" type="index" width="150px" align="center" />
          <el-table-column
            prop="typeName"
            label="名称"
            width="150px"
            align="center"
          />
          <el-table-column
            label="类型"
            width="220px"
            sortable
            align="center"
          >
            方向
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
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
                @click="open(scope.row.id)"
              >删除
              </el-link>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :current-page="currPage"
          :page-sizes="[5, 10, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
          align="center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

      <el-dialog title="添加类别" :visible.sync="addDialogVisible" @close="addDialogClosed" width="30%">

        <el-form ref="addTypeForm" :model="addTypeForm" label-width="80px">
          <el-form-item label="名称" prop="typeName">
            <el-input v-model="addTypeForm.typeName"></el-input>
          </el-form-item>
          <el-form-item prop="isType" label="类型">
            <el-select  v-model="addTypeForm.isType" placeholder="请选择类型" @change="showType">
              <el-option label="方向" value="0"></el-option>
              <el-option label="类别" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="parentId" label="所属方向" v-if="addTypeForm.isType==='1'">
            <el-select v-model="addTypeForm.parentId" placeholder="" @change="">
              <el-option v-for="item in parent" :key="item.id" :label="item.typeName" :value="item.id"></el-option>

            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addTypeInfo('addTypeForm')">创建</el-button>
            <el-button @click="addDialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
      <el-dialog title="修改类别" :visible.sync="editDialogVisible" @close="editDialogClosed" width="30%">

        <el-form ref="editTypeForm" :model="editTypeForm" label-width="80px">
          <el-form-item label="名称" prop="typeName">
            <el-input v-model="editTypeForm.typeName"></el-input>
          </el-form-item>
          <el-form-item prop="isType" label="类型">
            <el-select  v-model="editTypeForm.isType" placeholder="请选择类型" @change="editshowType">
              <el-option label="方向" value="0"></el-option>
              <el-option label="类别" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="parentId" label="所属方向" v-if="editTypeForm.isType==='1'">
            <el-select v-model="editTypeForm.parentId" placeholder="" @change="">
              <el-option v-for="item in parent" :key="item.id" :label="item.typeName" :value="item.id"></el-option>

            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="editTypeInfo('editTypeForm')">修改</el-button>
            <el-button @click="editDialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>

  </div>

</template>

<script>
export default {
  name: 'CourseTypeManager',
  data() {
    return {
      tableData: [
        {
          id: '12',
          typeName: '前端',
          isType:'0',
          children:[
            {
              id:'123',
              typeName:'HTML',
              isType:'1',
              parentId:12,
            },
            {
              id:'4545',
              typeName:'CSS',
              isType:'1',
              parentId:12,
            }
          ]
        },
        {
          id: '122',
          roleName: '张家烨',
          createTime: '2019-12-11',
          creater: 'dev'
        },
        {
          id: '13',
          roleName: '张家烨',
          createTime: '2019-12-11',
          creater: 'dev'
        },
        {
          id: '123',
          roleName: '张家烨',
          createTime: '2019-12-11',
          creater: 'dev'
        },
        {
          id: '15',
          roleName: '张家烨',
          createTime: '2019-12-11',
          creater: 'dev'
        },
        {
          id: '16',
          roleName: '张家烨',
          createTime: '2019-12-11',
          creater: 'dev'
        },
        {
          id: '17',
          roleName: '张家烨',
          createTime: '2019-12-11',
          creater: 'dev'
        },
        {
          id: '18',
          roleName: '张家烨',
          createTime: '2019-12-11',
          creater: 'dev'
        }
      ],
      expandKeys: [18],
      checkKeys: ['2', '7'],

      editDialogVisible: false, // 控制修改角色信息对话框是否显示
      addDialogVisible: false, // 控制增加角色信息对话框是否显示
      totalNum: 20,
      currPage: 1,
      pageSize: 5,


      typeVisible:false,
      searchValue:'',
      ids:[],
      addTypeForm:{
        typeName:'',
        parentId:'',
        isType:'0',
      },
      editTypeForm:{
        typeName:'',
        parentId:'',
        isType:'0',
      },
      parent:[

      ],//方向
      parentId:'',
      // isType:'0',

    }
  },
  methods: {

    showType(value){
      console.log(value)
      if (value==1){
        this.addTypeForm.parentId=this.parent[0].id;
      }
    },

    editshowType(value){
      console.log(value)
      if (value==1){
        this.editTypeForm.parentId=this.parent[0].id;
      }
    },

    addDialogClosed() {
      // 表单内容重置为空
      this.$refs.addTypeForm.resetFields() // 通过ref引用调用resetFields方法
    },
    editDialogClosed() {
      // 表单内容重置为空
      this.$refs.editTypeForm.resetFields() // 通过ref引用调用resetFields方法
    },

    addTypeInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs[formName].resetFields()
          // todo 请求
          this.$message({
            message: '添加类型信息成功',
            type: 'success',
            offset: 150
          })
          // 关闭对话框
          this.addDialogVisible = false
        } else {
          return false
        }
      })
    },

    editTypeInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs[formName].resetFields()
          // todo 请求
          this.$message({
            message: '添加类型信息成功',
            type: 'success',
            offset: 150
          })
          // 关闭对话框
          this.editDialogVisible = false
        } else {
          return false
        }
      })
    },



    handleFilter() {

      console.log(this.searchValue)
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
    },

    deleteType(){
      this.$refs.multipleTable.selection.forEach(item =>{
        this.ids.push(item.id)
      })
      console.log(this.ids);
      this.ids=[]
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    open: function(userId) {
      this.$confirm('是否删除该类别?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(userId)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {

      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleTable = val
      console.log(multipleTable)
    },
    showEditDialog(courseType) {
      // const { data: res } = await this.$http.get('users/' + id)
      this.editDialogVisible = true

      this.parent=this.getParentList()
      console.log(courseType)
      this.editTypeForm = courseType
    },
    showAddDialog() {
      this.addDialogVisible = true
      this.parent=this.getParentList()

    },

    getParentList(){
      var parentList=[
        {
          id:12,
          typeName:'前端'
        },
        {
          id:21,
          typeName:'后端'
        },
        {
          id:31,
          typeName:'云计算'
        },
      ]
      return parentList
    },
    editRoleInfo() {
      // todo 请求
      this.$message({
        message: '修改角色信息成功',
        type: 'success',
        offset: 150
      })
      // 关闭对话框
      this.editDialogVisible = false
    },
    editRoleAuth() {
      // todo 请求
      console.log(this.$refs.tree.getCheckedKeys())

      this.$message({
        message: '修改角色权限成功',
        type: 'success',
        offset: 150
      })
      // 关闭对话框
      this.editDialogVisible = false
    },
    // 点击按钮 修改用户信息
    editUserInfo() {
      // console.log(valid)
      // if (!valid) return
      // 可以发起修改用户信息的网络请求
      // const { data: res } = await this.$http.put(
      //     'users/' + this.editForm.id,
      //     { email: this.editForm.email, mobile: this.editForm.mobile }
      // )
      // if (res.meta.status !== 200) {
      //     return this.$message.error('修改用户信息失败！')
      // }
      this.$message({
        message: '修改用户信息成功',
        type: 'success',
        offset: 150
      })
      // 关闭对话框
      this.editDialogVisible = false
      // 重新发起请求用户列表
      // this.getUserList()
    },
    addRoleInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs[formName].resetFields()
          this.$refs.tree.getCheckedKeys() // 获取的选择权限信息
          // todo 请求
          this.$message({
            message: '添加角色信息成功',
            type: 'success',
            offset: 150
          })
          // 关闭对话框
          this.addDialogVisible = false
        } else {
          return false
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>

<style scoped>

</style>
