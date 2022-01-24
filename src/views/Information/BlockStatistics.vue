<template>
<div class="staking">
  <div class="module">
    <!--
    <el-date-picker
      v-model="value2"
      type="datetimerange"
      align="right"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00', '08:00:00']">
    </el-date-picker>-->
    
    <el-table :data="tableData" style="width: 100%" highlight-current-row>
      <el-table-column prop="time" label="日期">
      </el-table-column>
      <el-table-column prop="number" label="出块数量">
      </el-table-column>
      <el-table-column prop="pow" label="PoW出块">
      </el-table-column>
      <el-table-column prop="dpos" label="DPoS出块">
      </el-table-column>
      <el-table-column prop="reward_money" label="奖励数量">
      </el-table-column>
    </el-table>
    <br /><br />
    <!--
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
    -->
  </div>
</div>
</template>

<script>
import {
  table,
  tableColumn,
  datePicker,
  pagination
} from 'element-plus';
import {
  blockStatistics
} from "@/api/blocks";
export default {
  components: {
    table,
    tableColumn,datePicker,pagination
  },
  data() {
    return {
      tableData: [{
        time: "2022-01-19",
        number: "233",
        pow: "234",
        dpos: '2323',
        bbc: '2343'
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
    
     blockStatistics().then(res => {
        let dataArr = []
        res.map(item => {
          let obj = item;
          obj.number = item.pow + item.dpos
          dataArr.push(obj)
        })
        this.tableData = dataArr
      }).catch(error => {
        console.log(error);
      });

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
