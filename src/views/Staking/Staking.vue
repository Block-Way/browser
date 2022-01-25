<template>
<div class="staking">
  <div class="module">
    <div class="second-title">
      <second-title :itemList="secondItemList" />
    </div>
    <el-table :data="tableData" style="width: 100%" highlight-current-row>
      <el-table-column label="Address">
        <template #default="scope">
          <span @click="AddrDetails(scope.row.address)">{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="votes" label="Votes">
      </el-table-column>
      <el-table-column prop="name" label="Name">
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import {
  table,
  tableColumn
} from 'element-plus'
import {
  listdelegate
} from "@/api/staking";
import SecondTitle from '@/components/secondTitle'
export default {
  components: {
    table,
    tableColumn,
    SecondTitle
  },
  data() {
    return {
      tableData: [{
        address: "20m0f7zkhbd840hk34zwfeazr8cwkkskxhcdqpz0jw6rx2a160bb38wth",
        votes: "22041482.0492500000",
        name: "node0",
      }],
      secondItemList: ['Validators List', 'Total']
    };
  },
  mounted() {
    this.fetchStakingData()
  },
    
  methods: {
    AddrDetails(address) {
      this.$router.push({
        path: '/details/AddressDetails',
        query: { "addr": address }
      })
    },
    fetchStakingData() {
      listdelegate().then(res => {
        let dataArr = []
        res.map(item => {
          let obj = {}
          obj.address = item.address
          obj.votes = item.votes
          obj.name = item.name
          dataArr.push(obj)
        })
        console.log('dataArr', dataArr)
        this.tableData = dataArr
        this.secondItemList[1] = this.tableData.length + ' Total'
      }).catch(error => {
        console.log(error);
      });
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
