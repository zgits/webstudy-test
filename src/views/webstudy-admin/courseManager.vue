<template>

  <div class="el-table">

    <el-container class="el-container">
      <el-header align="left" style="background-color: white">
        <el-button>新增</el-button>
      </el-header>
      <el-main>
        <el-table
          ref="table"
          :data="tableData"
          stripe
          style="width: 100%"
          height="500"
          border
          show-pagination
          :search-method="handleSearch"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="50px"
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
            prop="type"
            label="方向"
          />

          <el-table-column
            prop="teacher"
            label="上传者"
          />

          <el-table-column
            prop="introduction"
            label="简介"
            :show-overflow-tooltip="true"
          />

          <el-table-column
            prop="level"
            label="难度"
          >
            <template slot-scope="scope">
              {{ formatLevel(scope.row.level) }}
            </template>
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

              <el-popconfirm
                icon="el-icon-question"
                icon-color="red"
                title="确定下线该课程吗？"
                @onConfirm="changeStatus(scope.row.id,3)"
              >

                <el-link
                  v-if="scope.row.status===2"
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
                  v-if="scope.row.status===3"
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
        <el-button-group>
          <el-button size="small" :type="online" :loading="onloading" @click="queryCourse(2)">已上线<i
            class="el-icon-arrow-right"
          /></el-button>
          <el-button size="small" :type="downline" :loading="downloading" @click="queryCourse(3)">下线<i
            class="el-icon-arrow-right"
          /></el-button>
          <el-button size="small" :type="all" :loading="allloading" @click="queryCourse()">全部</el-button>

        </el-button-group>

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
      </el-main>
    </el-container>

    <el-dialog title="修改课程信息" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">

      <el-form ref="editFormRef" :model="editForm" label-width="70px" align="left">

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

        <!--                <el-form-item label="邮箱" prop="email">-->
        <!--                    <el-input v-model="editForm.email"></el-input>-->
        <!--                </el-form-item>-->

      </el-form>

      <el-button size="small" @click="editDialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="editRoleInfo">确 定</el-button>

      <span slot="footer" class="dialog-footer" />
    </el-dialog>

    <el-dialog title="课程详情" :visible.sync="showDialogVisible" width="40%" @close="editDialogClosed">

      <div class="custom-tree-container">
        <div class="block">
          <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            :expand-on-click-node="true"
            :highlight-current="true"
          >

            <span slot-scope="{ node, data }" class="nodeTree">
              <el-link :underline="false" @click="alert('单出框')">
                <i class="el-icon-video-play" />
                <span style="padding-left: 4px;">{{ node.label }}</span>
              </el-link>
            </span>
          </el-tree>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" />
    </el-dialog>

  </div>

</template>

<script>

let id = 1000
export default {
  name: 'CourseManager',
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
          status: 3,
          level: 1,
          className: '数学xxxxxxxxxx',
          coverPath: 'https://img.mukewang.com/5e4fad3300014e7718720764.jpg',
          introduction: '多线程增加了我们的不确定性，破坏了可预测性——当然，' +
                            '这对于【艺高人胆大】的未来的你，都是小事，因为你会不断进步成长，' +
                            '只要你把握好现在的光阴。科学的美，在于它的模型可以不断的迭代和进步，' +
                            'Java是一种简化和进步，ThreadLocal也一种简化和进步，' +
                            '如同Java给编程带来了很多安全感，而ThreadLocal给多线程时代带了更多的安全感（可预测性、确定性，一致性……）' +
                            '。课程是一种爬坡训练，难度会一直上去直到你完全理解，可以自己动手实现。'
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
          status: 2
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

      data: [
        {
          id: 1,
          label: '第1章 Java初体验',
          children: [
            {
              id: 4,
              label: '1-1 Java简介（05:03）'
            },
            {
              id: 5,
              label: '1-2 Java开发环境搭建(17:18)'
            },
            {
              id: 158,
              label: '1-3 使用记事本编写Java程序 (15:45)'
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2',
            children: [{
              id: 11,
              label: '三级 3-2-1'
            }, {
              id: 12,
              label: '三级 3-2-2'
            }, {
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      showDialogVisible: false,
      editDialogVisible: false, // 控制修改角色信息对话框是否显示
      addDialogVisible: false, // 控制增加角色信息对话框是否显示
      totalNum: 20,
      currPage: 1,
      pageSize: 5,
      multipleTable: [],
      // 修改用户信息的表单数据
      editForm: {
        level: '',
        className: ''

        // mobile: ''
      },

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
      allloading: false

    }
  },
  mounted() {
  },
  methods: {
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
      // todo 请求
      console.log(courseId + status)
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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

    formatLevel(status) {
      const levelMap = {
        1: '入门级',
        2: '初级',
        3: '中级',
        4: '高级'
      }
      return levelMap[status]
    },

    doApply(applyId, status) {
      this.$prompt('备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
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
    showEditDialog(courseInfo) {
      // const { data: res } = await this.$http.get('users/' + id)
      this.editDialogVisible = true
      console.log(courseInfo)
      this.editForm = courseInfo
    },

    showDialog(courseInfo) {
      this.showDialogVisible = true
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
    },

    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },

    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button size='mini' type='text' on-click={ () => this.append(data) }>Append</el-button>
            <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }>Delete</el-button>
          </span>
        </span>)
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

    .el-tree-node__content:hover {
        background-color: red;
        color: #333333;
        background: rgba(196,238,160,1);
    }

    /*.nodeTree:hover{*/
    /*    background-color:red;*/
    /*}*/

    /*.el-tree-node:hover{*/
    /*    background-color: red;*/
    /*}*/

</style>
