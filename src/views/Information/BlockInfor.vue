<template>
<div class="staking">
  <div class="module">
    <el-date-picker
      v-model="value2"
      type="datetimerange"
      align="right"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00', '08:00:00']">
    </el-date-picker>
    <br /><br />
    <el-table :data="tableData" style="width: 100%" highlight-current-row>
      <el-table-column prop="height" label="高度">
      </el-table-column>
      <el-table-column prop="broadcaster" label="广播方">
      </el-table-column>
      <el-table-column prop="number" label="交易笔数">
      </el-table-column>
      <el-table-column prop="income" label="挖矿收益">
      </el-table-column>
      <el-table-column prop="time" label="出块时间">
      </el-table-column>
      <el-table-column prop="difficulty" label="难度">
      </el-table-column>
      <el-table-column prop="timeCost" label="大约用时">
      </el-table-column>
      <el-table-column prop="hash" label="块哈希">
      </el-table-column>
      <el-table-column prop="type" label="出块类型">
      </el-table-column>
    </el-table>
    <br /><br />
     <el-pagination
     style="display:flex; justify-content: center;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</div>
</template>

<script>
import {
  table,
  tableColumn,
  datePicker,
  pagination
} from 'element-plus'
export default {
  components: {
    table,
    tableColumn,datePicker,pagination
  },
  data() {
    return {
      tableData: [{
        height: "1089435",
        broadcaster: "BBCPool",
        number: "1",
        income: '100.0000',
        time: '2022-01-19 22:23:23',
        difficulty: '23',
        timeCost: '3分钟',
        hash: '20m0f7zkhbd840hk34zwfeazr8cwkkskxhcdqpz0jw6rx2a160bb38wth',
        type: 'pow'
      }],
      value1: '',
        value2: '',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
    };
  },
  mounted() {
    
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  }
};
</script>

<style lang="scss" scoped>
.staking {
  background: #000;
  width: 100%;
  padding-bottom: 100px;
  min-height: 100vh;
}
.module {
  width: 76%;
  background: #fff;
  border-radius: 2px;
  padding: 10px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
