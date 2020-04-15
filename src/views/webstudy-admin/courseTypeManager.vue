<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="searchValue"
        placeholder="名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-select
        class="filter-item"
        v-model="typeValue"
        placeholder="全部"
        clearable
        @change="getAllByPage"
      >
        <el-option label="方向" :value="0"></el-option>
        <el-option label="类别" :value="1"></el-option>
      </el-select>

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
      <el-table-column type="selection" width="40px" />

      <el-table-column label="序号" type="index" width="80px" align="center" />
      <el-table-column prop="typeName" label="名称" width="150px" align="center" />
      <el-table-column prop="typeVo" label="类型" width="150px" align="center"></el-table-column>
      <el-table-column prop="parentName" label="所属方向" width="150px" align="center" />

      <el-table-column prop="creator" label="创建者" width="150px" align="center" />
      <el-table-column prop="createTime" label="创建时间" width="220px" align="center" sortable />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-edit"
            size="medium"
            @click="showEditDialog(scope.row)"
          >修改</el-link>

          <el-link
            type="danger"
            :underline="false"
            icon="el-icon-delete"
            size="medium"
            @click="open(scope.row.id)"
          >删除</el-link>
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
        <el-form-item label="名称">
          <el-input v-model="addTypeForm.typeName"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="addTypeForm.type" placeholder="请选择类型" @change="showType">
            <el-option label="方向" :value="0"></el-option>
            <el-option label="类别" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属方向" v-if="addTypeForm.type===1">
          <el-select v-model="addTypeForm.parentId">
            <el-option
              v-for="item in parent"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addTypeInfo()">创建</el-button>
          <el-button @click="addDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改类别" :visible.sync="editDialogVisible" @close="editDialogClosed" width="30%">
      <el-form ref="editTypeForm" :model="editTypeForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="editTypeForm.typeName"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="editTypeForm.type" placeholder="请选择类型" @change="editshowType">
            <el-option label="方向" :value="0"></el-option>
            <el-option label="类别" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属方向" v-if="editTypeForm.type===1">
          <el-select v-model="editTypeForm.parentId">
            <el-option
              v-for="item in parent"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editTypeInfo()">修改</el-button>
          <el-button @click="editDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  addType,
  deleteType,
  updateType,
  queryAllByPage,
  queryChild,
  queryDirect
} from "@/api/courseType";

export default {
  name: "CourseTypeManager",
  data() {
    return {
      tableData: [],
      editDialogVisible: false, // 控制修改角色信息对话框是否显示
      addDialogVisible: false, // 控制增加角色信息对话框是否显示
      totalNum: 0,
      currPage: 1,
      pageSize: 10,
      searchValue: "",
      ids: [],
      addTypeForm: {
        typeName: "",
        parentId: 0,
        type: 0
      },
      editTypeForm: {
        id: 0,
        typeName: "",
        parentId: "",
        type: 0
      },
      parent: [], //方向
      typeValue: ""
    };
  },
  methods: {
    getAllByPage() {
      let page = {
        currPage: this.currPage,
        pageSize: this.pageSize,
        type: this.typeValue
      };
      queryAllByPage(page).then(res => {
        var data = res.data;
        this.currPage = data.pageNum;
        this.pageSize = data.pageSize;
        this.totalNum = data.total;
        this.tableData = data.list;
      });
    },

    showType(value) {
      if (value == 1) {
        this.addTypeForm.parentId = this.parent[0].id;
      }
    },

    editshowType(value) {
      if (value == 1) {
        this.editTypeForm.parentId = this.parent[0].id;
      }
    },

    addDialogClosed() {
      this.$refs.addTypeForm.resetFields(); // 通过ref引用调用resetFields方法
    },
    editDialogClosed() {
      // 表单内容重置为空
      this.$refs.editTypeForm.resetFields(); // 通过ref引用调用resetFields方法
    },

    addTypeInfo() {
      this.$refs.addTypeForm.validate(valid => {
        if (valid) {
          if (this.addTypeForm.type == 0) {
            this.addTypeForm.parentId = 0;
          }
          addType(this.addTypeForm).then(res => {
            this.$message({
              message: "添加类型信息成功",
              type: "success",
              offset: 150
            });
            this.getAllByPage();
          });
          this.addDialogVisible = false;
        } else {
          return false;
        }
      });
    },

    editTypeInfo() {
      this.$refs.editTypeForm.validate(valid => {
        if (valid) {
          if (this.editTypeForm.type == 0) {
            this.editTypeForm.parentId = 0;
          }
          updateType(this.editTypeForm).then(res => {
            this.$message({
              message: "修改信息成功",
              type: "success",
              offset: 150
            });
            this.getAllByPage();
          });
          this.editDialogVisible = false;
        } else {
          return false;
        }
      });
    },

    handleFilter() {
      console.log(this.searchValue);
      this.listLoading = true;
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },

    deleteType() {
      this.$refs.multipleTable.selection.forEach(item => {
        this.ids.push(item.id);
      });

      deleteType(this.ids.join(",")).then(res => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
      this.getAllByPage();
      this.ids = [];
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAllByPage();
    },
    handleCurrentChange(val) {
      this.currPage = val;
      this.getAllByPage();
    },
    open: function(userId) {
      this.$confirm("是否删除该类别?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.ids.push(userId);
        deleteType(this.ids.join(",")).then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getAllByPage();
          this.ids = [];
        });
      });
    },

    handleSelectionChange(val) {
      this.multipleTable = val;
      console.log(multipleTable);
    },
    showEditDialog(courseType) {
      this.editDialogVisible = true;
      this.getParentList();
      this.editTypeForm.id = courseType.id;
      this.editTypeForm.typeName = courseType.typeName;
      this.editTypeForm.type = courseType.type;
      this.editTypeForm.parentId = courseType.parentId;
    },
    showAddDialog() {
      this.addDialogVisible = true;
      this.reset();
      this.getParentList();
    },

    getParentList() {
      queryDirect().then(res => {
        this.parent = res.data;
      });
    },
    reset() {
      this.addTypeForm.typeName = "";
      this.addTypeForm.type = 0;
      this.addTypeForm.parentId = 0;
    }
  },
  mounted() {
    this.getAllByPage();
  }
};
</script>

<style scoped>
</style>
