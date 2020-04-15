<template>

  <div class="app-container">

    <div class="filter-container">

      <el-input  v-model="searchValue" placeholder="内容" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-select class="filter-item" v-model="statusValue" placeholder="全部" clearable @change="getValueByStatus">
        <el-option v-for="item in statusArray" :key="item.statusNum" :label="item.label" :value="item.statusNum"></el-option>

      </el-select>


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
          <el-table-column label="序号" type="index" width="50px" align="center" />
          <el-table-column
            prop="userName"
            label="申请者"
            width="100px"
            align="center"
          />
          <el-table-column
            prop="time"
            label="申请时间"
            width="190px"
            sortable
            align="center"
          />
          <el-table-column
            prop="dealTime"
            label="操作时间"
            width="190px"
            sortable
            align="center"
          />

          <el-table-column
            prop="objType"
            label="申请类型"
            align="center"
          />

          <el-table-column
            prop="detail"
            label="详情"
          >
            <template slot-scope="scope">


              <a :href="'http://localhost:3400/#/home'"
                 target="_blank"
                 v-if="scope.row.objTypeCode===1">用户地址</a>
              <a :href="'http://localhost:3400/#/home'"
                 target="_blank"
                 v-if="scope.row.objTypeCode===2">课程地址</a>

            </template>
          </el-table-column>

          <el-table-column
            prop="applyDesc"
            label="描述"
          />

          <el-table-column
            prop="result"
            label="结果及备注"
            :show-overflow-tooltip="true"
            width="100px"
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
                @click="doApply(scope.row.id,4)"
              >通过
              </el-link>

              <el-link
                v-if="scope.row.status===1"
                type="danger"
                :underline="false"
                icon="el-icon-close"
                size="medium"
                @click="doApply(scope.row.id,5)"
              >打回
              </el-link>

              <el-link
                v-if="scope.row.status===5||scope.row.status===4"
                type="primary"
                :underline="false"
                icon="el-icon-back"
                size="medium"
                @click="doApply(scope.row.id,1)"
              >撤销
              </el-link>

              <el-link
                v-if="scope.row.status===6"
                type="success"
                :underline="false"
                size="medium"
                disabled
              >该申请已删除</el-link>

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

  import {
    queryAll,changeStatus
  } from '@/api/apply';

export default {
  name: 'Apply',
  data() {
    return {
      loading:true,
      tableData:[],
      editDialogVisible: false, // 控制修改角色信息对话框是否显示
      addDialogVisible: false, // 控制增加角色信息对话框是否显示
      totalNum: 0,
      currPage: 1,
      pageSize: 10,

      ids:[],
      searchValue:'',

      statusValue:'',

      statusArray:[
        {
          statusNum:1,
          label:'未审核',
        },
        {
          statusNum:4,
          label:'审核通过'
        },
        {
          statusNum:5,
          label:'审核失败'
        },
      ],

      applying: 'primary',
      failbutton: '',
      passbutton: '',
      allbutton: '',
      failloading: false,
      passloading: false,
      allloading: false
    }
  },
  mounted() {
    this.queryAllApply()
  },
  methods: {

    queryAllApply(){
      let data={
        status:this.statusValue,
        currPage:this.currPage,
        pageSize:this.pageSize,
      }

      queryAll(data).then(res=>{
        var result=res.data
        this.currPage=result.pageNum
        this.totalNum=result.total
        this.pageSize=result.pageSize
        this.tableData=result.list
        this.loading=false
      })

    },


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


    getValueByStatus(){
      this.queryAllApply()
    },

    handleSizeChange(val) {
      this.pageSize=val
      this.queryAllApply()
    },
    handleCurrentChange(val) {
      this.currPage=val
      this.queryAllApply()
    },

    doApply(applyId, status) {
      this.$prompt('备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {

        let params={
          id:applyId,
          status:status,
          result:value
        }

        changeStatus(params).then(res=>{
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.queryAllApply()
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
    addDialogClosed() {
      // 表单内容重置为空
      this.$refs.roleForm.resetFields() // 通过ref引用调用resetFields方法
    },

  }
}
</script>

<style scoped>

</style>
