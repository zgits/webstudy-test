<template>

  <div class="app-container">

    <div class="filter-container">

      <el-input  v-model="searchValue" placeholder="内容" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-select class="filter-item" v-model="statusValue" placeholder="全部" clearable @change="getValueByStatus">
        <el-option v-for="item in statusArray" :key="item.statusNum" :label="item.label" :value="item.statusNum"></el-option>

      </el-select>


      <el-button class="filter-item" icon="el-icon-delete" type="danger" @click="deleteApply">批量删除</el-button>


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
          <el-table-column label="序号" type="index" width="50px" align="center" />
          <el-table-column
            prop="userName"
            label="申请者"
            width="150px"
            align="center"
          />
          <el-table-column
            prop="time"
            label="申请时间"
            width="220px"
            sortable
            align="center"
          />

          <el-table-column
            prop="type"
            label="申请类型"
          />

          <el-table-column
            prop="detail"
            label="详情"
          />

          <el-table-column
            prop="desc"
            label="描述"
          />

          <el-table-column
            prop="reason"
            label="备注 对未通过及通过"
          />

          <el-table-column
            label="操作"
            align="center"
            width="200px"
          >
            <template slot-scope="scope">

              <el-link
                v-if="scope.row.status===1"
                type="success"
                :underline="false"
                icon="el-icon-check"
                size="medium"
                @click="doApply(scope.row.id,2)"
              >通过
              </el-link>

              <el-link
                v-if="scope.row.status===1"
                type="danger"
                :underline="false"
                icon="el-icon-close"
                size="medium"
                @click="doApply(scope.row.id,3)"
              >打回
              </el-link>

              <el-link
                v-if="scope.row.status===3"
                type="primary"
                :underline="false"
                icon="el-icon-back"
                size="medium"
                @click="doApply(scope.row.id,1)"
              >撤销
              </el-link>

              <el-link
                v-if="scope.row.status===2"
                type="primary"
                :underline="false"
                icon="el-icon-back"
                size="medium"
                @click="doApply(scope.row.id,1)"
              >撤销
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

  </div>
</template>

<script>
export default {
  name: 'Apply',
  data() {
    return {
      tableData: [
        {
          id: '12',
          userName: '张孟超',
          time: '2019-12-11 12:45:32',
          creater: 'dev',
          detail: '详情',
          reason: 'xxxx',
          status: 3
        },
        {
          id: '122',
          roleName: '张家烨',
          createTime: '2019-12-11',
          creater: 'dev',
          reason: 'xxxx',
          status: 2
        },
        {
          id: '13',
          roleName: '张家烨',
          createTime: '2019-12-11',
          creater: 'dev',
          reason: 'xxxx',
          status: 1
        },
        {
          id: '123',
          roleName: '张家烨',
          createTime: '2019-12-11',
          creater: 'dev',
          reason: 'xxxx',
          status: 3
        }
      ],

      editDialogVisible: false, // 控制修改角色信息对话框是否显示
      addDialogVisible: false, // 控制增加角色信息对话框是否显示
      totalNum: 20,
      currPage: 1,
      pageSize: 5,
      // 修改用户信息的表单数据
      editForm: {
        userName: '',
        phone: ''
        // mobile: ''
      },

      ids:[],
      searchValue:'',

      statusValue:[],

      statusArray:[
        {
          statusNum:1,
          label:'未审核',
        },
        {
          statusNum:2,
          label:'审核通过'
        },
        {
          statusNum:3,
          label:'审核失败'
        },
      ],

      applying: 'primary',
      failbutton: '',
      passbutton: '',
      allbutton: '',
      loading: false,
      failloading: false,
      passloading: false,
      allloading: false
    }
  },
  mounted() {
  },
  methods: {

    handleFilter() {

      console.log(this.searchValue)
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
    },
    getIds(){
      this.$refs.multipleTable.selection.forEach(item =>{
        this.ids.push(item.id)
      })
      console.log(this.ids);
    },

    deleteApply(){


      this.getIds()
      console.log(this.ids)
      this.ids=[];
    },

    getValueByStatus(status){
      console.log(status)
    },


    queryApply(status) {
      // this.loading=true;
      // this.loading=false;

      if (status == 1) {
        this.loading = true
        this.applying = 'primary'
        this.failbutton = ''
        this.passbutton = ''
        this.allbutton = ''
        this.failloading = false
        this.passloading = false
        this.allloading = false

        // todo 请求

        this.loading = false
      } else if (status == 2) {
        this.applying = ''
        this.failbutton = ''
        this.passbutton = 'primary'
        this.allbutton = ''
        this.loading = false
        this.failloading = false
        this.passloading = true
        this.allloading = false

        // todo 请求

        this.passloading = false
      } else if (status == 3) {
        this.applying = ''
        this.failbutton = 'primary'
        this.passbutton = ''
        this.allbutton = ''
        this.loading = false
        this.failloading = true
        this.passloading = false
        this.allloading = false

        // todo 请求

        this.failloading = false
      } else {
        this.applying = ''
        this.failbutton = ''
        this.passbutton = ''
        this.allbutton = 'primary'
        this.loading = false
        this.failloading = false
        this.passloading = false
        this.allloading = true
        status = null

        console.log(status)

        this.allloading = false
      }
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },

    doApply(applyIds, status) {
      this.$prompt('备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        // todo 请求

        this.$message({
          type: 'success',
          message: '填写备注' + value + applyIds + status
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
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
      // const { data: res } = await this.$http.get('users/' + id)
      this.editDialogVisible = true
      console.log(userinfo)
      this.editForm = userinfo
    },
    showAddDialog() {
      this.addDialogVisible = true
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

  }
}
</script>

<style scoped>

</style>
