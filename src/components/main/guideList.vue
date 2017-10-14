<style scoped>
.breadcrumb {
    margin-bottom: 20px;
}

.banner-list {
    padding: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.table-list {
    overflow-y: scroll;
    flex: 1;
}

.banner-operation {
    margin-bottom: 20px;
}

.pages {
    text-align: right;
}
</style>


<template>
    <section class="banner-list">
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>指南列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="banner-operation">
            <el-button type="primary" @click="addGuide">新增指南</el-button>
            <el-button type="danger" @click="deleteGuide">删除</el-button>
        </div>
        <div class="table-list">
            <el-table ref="multipleTable" :data="bannerList" border stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelection">
                <el-table-column type="selection">
                </el-table-column>
                <el-table-column label="名称" prop="name">
                </el-table-column>
                <el-table-column prop="update_time" label="更新时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pages">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="eachPage" layout="total, prev, pager, next" :total="count">
            </el-pagination>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            //全选等待操作
            waittingData: [],

            //数据
            bannerList: [{
                id: 1,
                name: '指南一',
                update_time: '2017-10-11'
            }, {
                id: 2,
                name: '指南二',
                update_time: '2017-10-11'
            }],
            page: 1,
            eachPage: 100,
            count: 1000,
        }
    },

    methods: {

        /*
          新增
        */
        addGuide() {
            this.$router.push({ name: 'guideedit', params: { guide: null } })
        },

        deleteGuide() {
            if(!this.waittingData.length){
                this.$message({
                    type: 'warning',
                    message: '请先选择！',
                    showClose: true
                })
                return false
            }
            this.$confirm('此操作将删除选中的所有指南, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },

        /*
          多选
        */
        handleSelection(selection) {
            this.waittingData = selection
        },

        /*
          编辑
        */
        handleEdit(index, row) {
            this.$router.push({ name: 'guideedit', params: { guide: row } })
        },

        /*
          删除
        */
        handleDelete(index, row) {
            this.$confirm('此操作将删除该指南, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.bannerList.splice(index, 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },

        /*
          页数改变
        */
        handleCurrentChange() {

        },

        /*
          每页显示数量改变
        */
        handleSizeChange() {

        },
    }
}
</script>
