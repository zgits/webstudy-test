<template>
  <div class="app-container">
    <el-table
      ref="multipleTable"
      :data="tableData"
      stripe
      style="width: 100%"
      height="500"
      show-pagination
      v-loading="loading"
    >
      <el-table-column prop="params" label="请求参数" width="150px" align="center" :show-overflow-tooltip="true"/>
      <el-table-column prop="type" label="请求类型" width="150px" align="center"></el-table-column>
      <el-table-column prop="time" label="请求时间" width="160px" :formatter="formatDate" align="center"/>
      <el-table-column prop="status" label="请求状态" width="100px" align="center"/>
      <el-table-column prop="requestUrl" label="请求地址" width="150px" align="center" :show-overflow-tooltip="true"/>
      <el-table-column prop="result" label="结果" width="230px" align="center" :show-overflow-tooltip="true"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-edit"
            size="medium"
            @click="showEditDialog(scope.row)"
          >详情
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


    <el-dialog :visible.sync="DialogVisible" width="80%" append-to-body>
      <div slot="title">
        <span style="padding-right: 10px;">Log</span>
      </div>
      <el-table :data="errorLogs" border>
        <el-table-column label="Message">
          <template slot-scope="{row}">
            <div>
              <span class="message-title">请求参数:</span>
              <el-tag type="success">
                {{ row.params }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title">请求类型:</span>
              <el-tag type="success">
                {{ row.type }}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 10px;">请求状态: </span>
              <el-tag type="success">
                {{row.status}}
              </el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 16px;">Url: </span>
              <el-tag type="success">
                {{ row.requestUrl }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template slot-scope="scope">
            {{ scope.row.result }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  import {queryLog} from "@/api/log.js";
  import moment from 'moment'

  export default {
    name: "log",
    data() {
      return {
        tableData: [],
        errorLogs: [],
        totalNum: 0,
        currPage: 1,
        pageSize: 10,
        DialogVisible: false,
        loading: true,
      };
    },
    methods: {
      queryAll() {
        let page = {
          currPage: this.currPage,
          pageSize: this.pageSize,
          type: this.typeValue
        };
        this.loading = true
        queryLog(page).then(res => {
          var data = res.data;
          this.currPage = data.number + 1;
          this.pageSize = data.size;
          this.totalNum = data.totalElements;
          this.tableData = data.content;
          this.loading = false
        });
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.queryAll();
      },
      handleCurrentChange(val) {
        this.currPage = val;
        this.queryAll();
      },
      showEditDialog(log) {
        this.DialogVisible = true;
        this.errorLogs = []
        this.errorLogs.push({
          params: log.params,
          type: log.type,
          result: log.result,
          time: log.time,
          requestUrl: log.requestUrl,
          status: log.status,
        })
      },
      formatDate: function (row, column) {
        var date = row[column.property];

        console.log(date);
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    mounted() {
      this.queryAll()
    },

  };
</script>

<style scoped>
</style>
