<template>
<div class="staking">
  <div class="module">
    <el-table :data="tableData" style="width: 100%" highlight-current-row>
      <el-table-column prop="rank" label="节点排名">
      </el-table-column>
      <el-table-column prop="name" label="节点名称">
      </el-table-column>
      <el-table-column prop="address" label="节点地址">
      </el-table-column>
      <el-table-column prop="votes" label="获得票数">
      </el-table-column>
      <el-table-column prop="expenditure" label="参与支持">
      </el-table-column>
       <el-table-column prop="proportion" label="票数占比">
      </el-table-column>
      <el-table-column prop="rate" label="节点费率">
      </el-table-column>
      <el-table-column prop="today" label="今日实时均收益率">
      </el-table-column>
      <el-table-column prop="threeDays" label="前三天日均收益率">
      </el-table-column>
      <el-table-column prop="todayOut" label="进入出块">
      </el-table-column>
       <el-table-column prop="yesterdayOut" label="昨日出块">
      </el-table-column>
      <el-table-column prop="allOut" label="累计出块">
      </el-table-column>
      <el-table-column prop="details" label="投票详情">
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
  pagination
} from 'element-plus'
export default {
  components: {
    table,
    tableColumn,pagination
  },
  data() {
    return {
      tableData: [{
        rank: '1',
        name: "Singapore",
        address: "20m0e5q8dmw4kzgf45mqak1s60fjwgswsddsmsyczvjtjxx2kvn0gz7dr",
        votes: "452345.23",
        expenditure: '2323',
        proportion: '10.23%',
        rate: '10.23%',
        today: "0.23%",
        threeDays: "0.23%",
        todayOut: "234",
        yesterdayOut: '223',
        allOut: '2343',
        details: '详情查看'
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
  width: 90%;
  background: #fff;
  border-radius: 2px;
  padding: 10px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
