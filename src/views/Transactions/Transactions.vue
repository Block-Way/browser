<template>
<div class="staking">
  <div class="module">
    <div class="second-title">
      <second-title :itemList="secondItemList" />
    </div>
    <el-table :data="tableData" style="width: 100%" highlight-current-row>
      <el-table-column prop="hash" label="Tx Hash">
      </el-table-column>
      <el-table-column prop="type" label="Tx Type">
      </el-table-column>
      <el-table-column prop="block" label="Block">
      </el-table-column>
      <el-table-column prop="fee" label="Fee">
      </el-table-column>
      <el-table-column prop="signer" label="Signer">
      </el-table-column>
      <el-table-column prop="status" label="Status">
      </el-table-column>
      <el-table-column prop="timestamp" label="Timestamp">
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
        hash: 'Tx Hash',
        type: 'Tx Type',
        block: 'Block',
        fee: 'Fee',
        signer: 'Signer',
        status: 'Status',
        timestamp: 'Timestamp'
      }],
      secondItemList: ['Transactions List', '1 Total'],
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
