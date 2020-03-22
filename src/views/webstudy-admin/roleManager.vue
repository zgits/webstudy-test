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
    >
      <el-table-column
        type="selection"
        width="50px"
      />
      <el-table-column label="序号" type="index" width="150px" align="center"/>
      <el-table-column
        prop="roleName"
        label="角色"
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

    <el-dialog title="修改角色" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">

      <el-tabs type="border-card" stretch="true">
        <el-tab-pane label="修改角色信息">
          <el-form ref="editFormRef" :model="editForm" label-width="70px">

            <el-form-item label="角色名">
              <el-input v-model="editForm.roleName"/>
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
        <el-form-item label="权限">

          <el-tree

            ref="tree"
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
    addRole
  }
  from "@/api/roleManager";

  export default {


    name: 'RoleManager',


    data() {
      return {
        tableData: [],
        data: [
          {
            'id': 1,
            'auth': 'userManager',
            'parentId': 0,
            'authDesc': '用户管理',
            'hasChild': true,
            'children': [
              {
                'id': 2,
                'auth': 'userManager:delete',
                'parentId': 1,
                'authDesc': '删除用户',
                'hasChild': false,
                'children': []
              },
              {
                'id': 7,
                'auth': 'userManager:update',
                'parentId': 1,
                'authDesc': '更新用户',
                'hasChild': false,
                'children': []
              },
              {
                'id': 8,
                'auth': 'userManager:query',
                'parentId': 1,
                'authDesc': '查看用户信息',
                'hasChild': false,
                'children': []
              },
              {
                'id': 9,
                'auth': 'userManager:changeRole',
                'parentId': 1,
                'authDesc': '更改用户角色',
                'hasChild': false,
                'children': []
              }
            ]
          },
          {
            'id': 3,
            'auth': 'courseManager',
            'parentId': 0,
            'authDesc': '课程管理',
            'hasChild': true,
            'children': [
              {
                'id': 4,
                'auth': 'courseManager:delete',
                'parentId': 3,
                'authDesc': '课程删除',
                'hasChild': false,
                'children': []
              },
              {
                'id': 20,
                'auth': 'courseManager:add',
                'parentId': 3,
                'authDesc': '增加课程',
                'hasChild': false,
                'children': []
              },
              {
                'id': 21,
                'auth': 'courseManager:update',
                'parentId': 3,
                'authDesc': '更新课程',
                'hasChild': false,
                'children': []
              },
              {
                'id': 22,
                'auth': 'courseManager:query',
                'parentId': 3,
                'authDesc': '查询课程',
                'hasChild': false,
                'children': []
              }
            ]
          },
          {
            'id': 5,
            'auth': 'apply',
            'parentId': 0,
            'authDesc': '审核',
            'hasChild': true,
            'children': [
              {
                'id': 6,
                'auth': 'apply:query',
                'parentId': 5,
                'authDesc': '查看审核信息',
                'hasChild': false,
                'children': []
              },
              {
                'id': 10,
                'auth': 'apply:update',
                'parentId': 5,
                'authDesc': '更改审核',
                'hasChild': false,
                'children': []
              },
              {
                'id': 11,
                'auth': 'apply:delete',
                'parentId': 5,
                'authDesc': '删除审核记录',
                'hasChild': false,
                'children': []
              }
            ]
          },
          {
            'id': 12,
            'auth': 'role',
            'parentId': 0,
            'authDesc': '角色',
            'hasChild': true,
            'children': [
              {
                'id': 13,
                'auth': 'role:add',
                'parentId': 12,
                'authDesc': '添加角色',
                'hasChild': false,
                'children': []
              },
              {
                'id': 14,
                'auth': 'role:delete',
                'parentId': 12,
                'authDesc': '删除角色',
                'hasChild': false,
                'children': []
              },
              {
                'id': 15,
                'auth': 'role:update',
                'parentId': 12,
                'authDesc': '更新角色',
                'hasChild': false,
                'children': []
              },
              {
                'id': 16,
                'auth': 'role:query',
                'parentId': 12,
                'authDesc': '查询角色',
                'hasChild': false,
                'children': []
              },
              {
                'id': 17,
                'auth': 'role:changeAuth',
                'parentId': 12,
                'authDesc': '分配权限',
                'hasChild': false,
                'children': []
              }
            ]
          },
          {
            'id': 18,
            'auth': 'auth',
            'parentId': 0,
            'authDesc': '权限详情',
            'hasChild': true,
            'children': [
              {
                'id': 19,
                'auth': 'auth:query',
                'parentId': 18,
                'authDesc': '查看权限',
                'hasChild': false,
                'children': []
              }
            ]
          }
        ],

        defaultProps: {
          children: 'children',
          label: 'authDesc'
        },
        expandKeys: [18],
        checkKeys: ['2', '7'],

        editDialogVisible: false, // 控制修改角色信息对话框是否显示
        addDialogVisible: false, // 控制增加角色信息对话框是否显示
        totalNum: 0,
        currPage: 1,
        pageSize: 10,
        // 修改用户信息的表单数据
        editForm: {
          userName: '',
          phone: ''
          // mobile: ''
        },
        roleForm: {
          roleName: ''
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
        })
      },

      deleteRoles() {

        this.$refs.multipleTable.selection.forEach(item => {
          this.ids.push(item.id)
        })
        console.log(this.ids);
        this.ids = []
      },

      handleFilter() {

        console.log(this.searchValue)
        this.listLoading = true
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      },

      handleSizeChange(val) {
        this.pageSize=val
        this.getAllRoles()
      },
      handleCurrentChange(val) {
        this.currPage=val
        this.getAllRoles()
      },
      open: function (userId) {
        this.$confirm('是否删除该角色?', '警告', {
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
      showEditDialog(userinfo) {
        // const { data: res } = await this.$http.get('users/' + id)
        this.editDialogVisible = true
        console.log(userinfo)
        this.editForm = userinfo
      },
      showAddDialog() {
        this.addDialogVisible = true
        queryAuth().then(res=>{
          this.data=res.data
        })
      },
      editDialogClosed() {
        // 表单内容重置为空
        this.$refs.editFormRef.resetFields() // 通过ref引用调用resetFields方法
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

            let roleInfo={
              roleName:this.roleForm.roleName,
              authIds:this.$refs.tree.getCheckedKeys().join(',')
            }
            addRole(roleInfo)
            this.$message({
              message: '添加角色信息成功',
              type: 'success',
              offset: 150
            })
            this.getAllRoles()
            // 关闭对话框
            this.addDialogVisible = false
          } else {
            return false
          }
        })
      },
      addDialogClosed() {
        // 表单内容重置为空
        this.$refs.roleForm.resetFields() // 通过ref引用调用resetFields方法
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

    },
    mounted() {
      this.getAllRoles()
    }
  }
</script>

<style scoped>

</style>
