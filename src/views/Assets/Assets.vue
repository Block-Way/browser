<template>
<div class="staking">
  <div class="module">
    <div class="second-title">
      <second-title :itemList="secondItemList" />
    </div>
    <el-table :data="tableData" style="width: 100%" highlight-current-row>
      <el-table-column prop="name" label="Name">
      </el-table-column>
      <el-table-column prop="supply" label="Total Supply">
      </el-table-column>
      <el-table-column prop="account" label="Holding Account">
      </el-table-column>
      <el-table-column prop="type" label="Marker Type">
      </el-table-column>
      <el-table-column prop="mintable" label="Mintable">
      </el-table-column>
      <el-table-column prop="last" label="Last Tx">
      </el-table-column>
      <el-table-column prop="age" label="Age">
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
        name: 'Name',
        supply: 'supply',
        account: 'account',
        type: 'type',
        mintable: 'mintable',
        last: 'last tx',
        age: 'age'
      }],
      secondItemList: ['All Assets'],
    };
  },
  mounted() {
    // this.fetchHomePieData()
  },
  methods: {
    fetchHomePieData() {
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
        this.listdelegate = dataArr
      }).catch(error => {
        console.log(error);
      });
    },

    clickTabsItem(currentTab) {
      this.currentTab = currentTab;
    },
  }, //methods
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
