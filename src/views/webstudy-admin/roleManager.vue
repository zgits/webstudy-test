<template>


  <div class="app-container">


    <div class="filter-container">

      <el-input v-model="searchValue" placeholder="角色名称" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>

      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        @click="showAddDialog"
      >
        新增角色
      </el-button>
      <el-button class="filter-item" icon="el-icon-delete" type="danger" @click="deleteRoles">批量删除</el-button>


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
        :selectable="checkSelectable"
      />
      <el-table-column label="序号" type="index" width="150px" align="center"/>
      <el-table-column
        prop="roleName"
        label="角色"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="220px"
        sortable
        align="center"
      />
      <el-table-column
        prop="creater"
        label="创建者"
        width="150px"
        align="center"
      />
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
            :disabled="scope.row.id===1||scope.row.id===2||scope.row.id===3"
            @click="showEditDialog(scope.row)"
          >修改
          </el-link>

          <el-link
            type="danger"
            :underline="false"
            icon="el-icon-delete"
            size="medium"
            :disabled="scope.row.id===1||scope.row.id===2||scope.row.id===3"
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

    <el-dialog title="修改角色" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">

      <el-tabs type="border-card" :stretch="true">
        <el-tab-pane label="修改角色信息">
          <el-form ref="roleForm" :model="roleForm" label-width="70px">

            <el-form-item label="角色名">
              <el-input v-model="roleForm.roleName"/>
            </el-form-item>
            <el-form-item label="角色描述">
              <el-input v-model="roleForm.roleDesc"/>
            </el-form-item>

            <el-form-item>
              <el-button size="small" @click="editDialogVisible = false">取 消</el-button>
              <el-button size="small" type="primary" @click="editRoleInfo">确 定</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>
        <el-tab-pane label="修改角色权限">

          <el-form label-width="70px">
            <el-form-item label="权限">
              <el-tree
                ref="tree"
                :data="data"
                show-checkbox
                node-key="id"
                :default-expanded-keys="expandKeys"
                :default-checked-keys="checkKeys"
                :props="defaultProps"
              />
            </el-form-item>
            <el-form-item>
              <el-button size="small" @click="editDialogVisible = false">取 消</el-button>
              <el-button size="small" type="primary" @click="editRoleAuth">确 定</el-button>
            </el-form-item>
          </el-form>


        </el-tab-pane>

      </el-tabs>
      <span slot="footer" class="dialog-footer"/>
    </el-dialog>
    <el-dialog title="新增角色" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">

      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称">
          <el-input v-model="roleForm.roleName"/>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.roleDesc"/>
        </el-form-item>
        <el-form-item label="权限">

          <el-tree
            ref="addTree"
            :data="data"
            show-checkbox
            node-key="id"
            :props="defaultProps"
          />
        </el-form-item>

        <el-form-item>
          <el-button size="small" @click="addDialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="addRoleInfo('roleForm')">添 加</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>


  </div>


</template>

<script>

  import
  {
    queryAllRoles,
    queryAuth,
    addRole,
    updateRoleAuth,
    updateRole,
    deleteRoles,
    getRoleAuth
  }
    from "@/api/roleManager";

  export default {


    name: 'RoleManager',


    data() {
      return {
        loading:true,
        tableData: [],
        data: [],
        addData: [],
        defaultProps: {
          children: 'children',
          label: 'authDesc'
        },
        expandKeys: [],
        checkKeys: [],

        editDialogVisible: false, // 控制修改角色信息对话框是否显示
        addDialogVisible: false, // 控制增加角色信息对话框是否显示
        totalNum: 0,
        currPage: 1,
        pageSize: 10,
        roleForm: {
          roleName: '',
          roleDesc: '',
          id: 0,
        },
        rules: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
          ]
        },
        searchValue: '',
        ids: [],
        listLoading: true,
      }
    },
    methods: {

      checkSelectable(row){
        return !(row.id==1||row.id==2||row.id==3)
      },

      getAllRoles() {
        let page = {
          currPage: this.currPage,
          pageSize: this.pageSize
        }
        queryAllRoles(page).then(res => {
          var data = res.data
          this.currPage = data.pageNum
          this.pageSize = data.pageSize
          this.totalNum = data.total
          this.tableData = data.list
          this.loading=false
        })
      },
      getAllAuth() {
        queryAuth().then(res => {
          this.data = res.data
        })
      },

      deleteRoles() {

        this.$refs.multipleTable.selection.forEach(item => {
          this.ids.push(item.id)
        })
        deleteRoles(this.ids.join(',')).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        this.ids = []
        this.getAllRoles()
      },

      handleFilter() {

        console.log(this.searchValue)
        this.listLoading = true
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      },

      handleSizeChange(val) {
        this.pageSize = val
        this.getAllRoles()
      },
      handleCurrentChange(val) {
        this.currPage = val
        this.getAllRoles()
      },
      open: function (userId) {
        this.$confirm('是否删除该角色?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ids.push(userId)
          deleteRoles(this.ids.join(',')).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          this.ids = []
          this.getAllRoles()
        })
      },
      handleSelectionChange(val) {
        this.multipleTable = val
        console.log(multipleTable)
      },
      showEditDialog(roleInfo) {
        this.roleForm.id = roleInfo.id
        this.roleForm.roleName = roleInfo.roleName
        this.roleForm.roleDesc = roleInfo.roleDesc

        this.expandKeys = []
        this.checkKeys = []

        this.getAllAuth()
        getRoleAuth(roleInfo.id).then(res => {
          this.checkKeys = res.data.authIds
          this.expandKeys = res.data.authIds
          this.editDialogVisible = true
        })


      },
      showAddDialog() {
        this.reset()
        this.addDialogVisible = true
      },
      editDialogClosed() {
        this.expandKeys = []
        this.checkKeys = []
        this.editDialogVisible = false
      },
      editRoleInfo() {

        console.log(this.roleForm)

        updateRole(this.roleForm).then(res => {
          this.$message({
            message: '修改角色信息成功',
            type: 'success',
            offset: 150
          })
          this.getAllRoles()
        })
        // 关闭对话框

        this.editDialogVisible = false

      },
      editRoleAuth() {

        let data = {
          roleId: this.roleForm.id,
          authIds: this.$refs.tree.getCheckedKeys().join(',')
        }

        updateRoleAuth(data).then(res => {
          this.$message({
            message: '修改角色权限成功',
            type: 'success',
            offset: 150
          })
        })
        // 关闭对话框
        this.editDialogVisible = false
      },
      addRoleInfo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            let roleInfo = {
              roleName: this.roleForm.roleName,
              roleDesc: this.roleForm.roleDesc,
              authIds: this.$refs.addTree.getCheckedKeys().join(',')
            }
            addRole(roleInfo).then(res => {
              this.$message({
                message: '添加角色信息成功',
                type: 'success',
                offset: 150
              })
              this.getAllRoles()
            })
            // this.$refs.addTree.re
            this.$refs.addTree.setCheckedKeys([])
            // 关闭对话框
            this.addDialogVisible = false
          } else {
            return false
          }
        })
      },
      addDialogClosed() {
        this.addDialogVisible = false
      },
      reset() {
        this.roleForm.roleName = ''
        this.roleForm.roleDesc = ''
        this.roleForm.id = 0
        this.expandKeys = []
        this.checkKeys = []
        this.editDialogVisible = false
        this.addDialogVisible = false
      }

    },
    mounted() {
      this.getAllRoles()
      this.getAllAuth()
    }
  }
</script>

<style scoped>

</style>
