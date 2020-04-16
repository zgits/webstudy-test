<template>

  <div class="app-container">


    <div class="filter-container">

      <el-input v-model="searchValue" placeholder="用户名/手机号" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getUserData"/>

      <el-button class="filter-item" icon="el-icon-circle-plus-outline" type="primary" @click="addDialogVisible=true">
        添加用户
      </el-button>

      <el-button class="filter-item" icon="el-icon-delete" type="danger" @click="deleteUsers">批量删除</el-button>

    </div>


    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      height="500"
      border
      show-pagination
      ref="multipleTable"
      v-loading="this.loading"
    >
      <el-table-column
        type="selection"
        :selectable="checkSelectable"
      />
      <el-table-column
        prop="username"
        label="用户名"
        width="120"
        align="center"
      />
      <el-table-column
        prop="phone"
        label="手机号"
        width="130"
        align="center"
      />
      <el-table-column
        prop="imagePath"
        label="头像"
        width="80px"
      >
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title=""
            trigger="hover"
          >
            <el-image
              slot="reference"
              :src="scope.row.imagePath"
              :alt="scope.row.imagePath"
              style="max-height: 70px;max-width: 70px"
              class="head_pic"
            />
            <el-image :src="scope.row.imagePath" style="max-height:300px;max-width: 300px"/>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        prop="registerTime"
        label="注册时间"
        width="190px"
        sortable
        align="center"
      />
      <el-table-column
        prop="roles"
        label="角色"
        width="120px"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="状态"
        width="220px"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enableComment"
            class="switchStyle"
            active-text="允许"
            inactive-text="禁止"
            :active-value=2
            :inactive-value=4
            :disabled="scope.row.id==12"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus($event,scope.row.id)"
          />
          评论
          <el-switch
            v-model="scope.row.enableLogin"
            class="switchStyle"
            active-text="允许"
            inactive-text="禁止"
            :active-value=1
            :inactive-value=3
            :disabled="scope.row.id==12"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus($event,scope.row.id)"
          />
          登录
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="bottom">

            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              :disabled="scope.row.id==12"
              circle
              @click="showEditDialog(scope.row)"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">

            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              circle
              :disabled="scope.row.id===12"
              @click="open(scope.row.id)"
            />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="重置密码" placement="bottom">
            <el-button
              type="warning"
              icon="el-icon-key"
              size="small"
              circle
              @click="resetPassword(scope.row.id)"
            />
          </el-tooltip>
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

    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">

      <el-tabs type="border-card">
        <el-tab-pane label="修改用户信息">
          <el-form ref="editFormRef" :model="editForm" label-width="70px">

            <el-form-item label="用户名">
              <el-input v-model="editForm.username"/>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="editForm.phone"/>
            </el-form-item>


            <el-form-item>
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>

        <el-tab-pane label="更改角色">

          <el-form label-width="70px">
            <el-form-item label="角色">
              <el-select
                v-model="roles"
                multiple
                placeholder="请选择"
                style="width: 270px"
              >
                <el-option
                  v-for="item in allRoles"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id">
                </el-option>
              </el-select>

            </el-form-item>
            <el-form-item>
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editUserRole">确 定</el-button>
            </el-form-item>
          </el-form>


        </el-tab-pane>
      </el-tabs>

    </el-dialog>
    <el-dialog title="新增用户" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">

      <el-tabs type="border-card">
        <el-tab-pane label="用户信息">
          <el-form ref="addForm" :model="addForm" label-width="70px">

            <el-form-item label="用户名">
              <el-input v-model="addForm.username"/>
            </el-form-item>
            <!--                <el-form-item label="邮箱" prop="email">-->
            <!--                    <el-input v-model="editForm.email"></el-input>-->
            <!--                </el-form-item>-->
            <el-form-item label="手机">
              <el-input v-model="addForm.phone"/>
            </el-form-item>

            <el-form-item label="密码" >
              <el-input v-model="addForm.password" show-password/>
            </el-form-item>

            <el-form-item>
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>

      </el-tabs>

    </el-dialog>

  </div>
  <!--    修改用户信息的对话框-->

</template>

<script>

  import {
    getAllUsers,
    changeUserStatus,
    resetPassword,
    deleteUsers,
    addUser,
    getAllRoles,
    getUserRole,
    updateUserRole,
    updateUserInfo
  }
    from "@/api/userManager";


  export default {
    name: 'UserManager',
    data() {
      return {
        loading: true,
        tableData: [],
        editDialogVisible: false, // 控制修改用户信息对话框是否显示
        addDialogVisible: false, // 控制新增用户信息对话框是否显示
        totalNum: 0,
        currPage: 1,
        pageSize: 10,
        listLoading: true,
        searchValue: '',
        ids: [],
        // 修改用户信息的表单数据
        editForm: {
          username: '',
          phone: '',
          id:''
        },
        addForm: {
          username: '',
          phone: '',
          password: '',
          // mobile: ''
        },
        roles: [],
        allRoles: [],
        userId:''
      }
    },
    mounted() {
      this.getUserData()
      this.getAllRoles()
    },
    methods: {

      getAllRoles(){
        getAllRoles().then(res=>{
          this.allRoles=res.data
        })
      },
      checkSelectable(row){
        return !(row.id==12)
      },

      getUserData() {

        let page={
          currPage:this.currPage,
          pageSize:this.pageSize,
          keyword:this.searchValue
        }
        this.loading=true
        getAllUsers(page).then(res => {
          var data = res.data

          this.currPage = data.pageNum
          this.pageSize = data.pageSize
          this.totalNum = data.total
          this.tableData = data.list
          this.tableData.forEach(item=>{
            item.roles=item.roles.join(',')
          })
          this.loading=false
        })
      },

      resetPassword(userId) {
        this.$prompt('请输入新密码', '重置密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'password'
        }).then(({value}) => {

          let data = {
            userId: userId,
            newPassword: value
          }
          resetPassword(data).then(res=>{
            this.$message({
              type: 'success',
              message: '重置成功'
            });
          })
        })
      },

      deleteUsers() {

        this.$refs.multipleTable.selection.forEach(item => {
          this.ids.push(item.id)
        })

        deleteUsers(this.ids.join(',')).then(res=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        this.ids = []
        this.getUserData()
      },


      editUserRole() {

        let data={
          userId:this.userId,
          roleIds: this.roles.join(',')
        }


        updateUserRole(data).then(res=>{
          this.$message({
            message: '修改用户信息成功',
            type: 'success',
            offset: 150
          })
        })
        this.getUserData()
        this.editDialogVisible = false
      },
      changeStatus: function (status, userId) {
        let data = {
          userId: userId,
          status: status
        }
        changeUserStatus(data)

      },
      handleSizeChange(val) {
        this.pageSize=val
        this.getUserData()
      },
      handleCurrentChange(val) {
        this.currPage=val
        this.getUserData()
      },
      open: function (userId) {
        this.$confirm('是否删除该用户?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ids.push(userId)
          deleteUsers(this.ids.join(',')).then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.ids=[]
            this.getUserData()
          })
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
      showEditDialog(userinfo) {
        this.editDialogVisible = true
        this.editForm.id=userinfo.id
        this.editForm.username=userinfo.username
        this.editForm.phone=userinfo.phone

        this.userId=userinfo.id
        let data={
          userId:this.userId
        }

        getUserRole(data).then(res=>{
          this.roles=res.data
        })
      },

      editDialogClosed() {
        // 表单内容重置为空
        this.$refs.editFormRef.resetFields() // 通过ref引用调用resetFields方法
      },
      addDialogClosed() {
        // 表单内容重置为空
        this.$refs.addForm.resetFields() // 通过ref引用调用resetFields方法
      },
      // 点击按钮 修改用户信息
      editUserInfo() {
        updateUserInfo(this.editForm).then(res=>{
          this.$message({
            message: '修改用户信息成功',
            type: 'success',
            offset: 150
          })
        })
        // 关闭对话框
        this.editDialogVisible = false
        this.getUserData()
      },
      addUser() {

        addUser(this.addForm).then(res=>{
          this.$message({
            message: '添加用户成功',
            type: 'success',
            offset: 150
          })
          this.getUserData()
        })
        this.addDialogVisible = false
      },
      handleFilter() {

        console.log(this.searchValue)
        this.listLoading = true
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      },

    }

  }
</script>

<style>

  .switchStyle .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
  }

  .switchStyle .el-switch__label--left {
    z-index: 9;
    left: 18px;
  }

  .switchStyle .el-switch__label--right {
    z-index: 9;
    left: -4px;
  }

  .switchStyle .el-switch__label.is-active {
    display: block;
  }

  .switchStyle.el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 50px !important;
  }
</style>
