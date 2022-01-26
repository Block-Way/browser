<template>
<div class="staking">
  <div class="module">
    <el-table :data="tableData" style="width: 100%" highlight-current-row>
      <el-table-column prop="rank" label="rank" min-width="15%">
      </el-table-column>
      <el-table-column prop="address" label="address" min-width="35%">
         <template #default="scope">
          <span @click="AddrDetails(scope.row.address)">{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="quantity" min-width="25%">
      </el-table-column>
      <el-table-column prop="rate" label="Occupancy percentage" min-width="25%">
        </el-table-column>
    </el-table>
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
    </el-pagination> -->
  </div>
</div>
</template>

<script>
import {
  table,
  tableColumn,
  pagination
} from 'element-plus';
import {
  rankstat
} from '@/api/rankstat';
export default {
  components: {
    table,
    tableColumn,pagination
  },
  data() {
    return {
      tableData: [{
        rank: '1',
        address: "20m0e5q8dmw4kzgf45mqak1s60fjwgswsddsmsyczvjtjxx2kvn0gz7dr",
        number: "452345.23",
        rate: '10.23%'
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
     rankstat().then(res => {
        let dataArr = []
        let index = 1
        res.map(item => {
          let obj = {"rank":index};
          index = index + 1;
          obj.address = item.address;
          obj.number = item.amount;
          obj.rate = item.percent;
          dataArr.push(obj)
        })
        this.tableData = dataArr
      }).catch(error => {
        console.log(error);
      });
  },
  methods: {
    AddrDetails(address) {
      this.$router.push({
        path: '/details/AddressDetails',
        query: { "addr": address }
      })
    },
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
