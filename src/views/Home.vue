<template>
<div class="home">
  <nav-tab @clickTabsItem="clickTabsItem"></nav-tab>
  <div v-show="currentTab === 0">
    <div class="spotlight module" @click="toDetailsTest()">
      <span>Block spotlight failed to load, refresh page to try again</span>
    </div>
    <div class="second module">
      <div class="second-left second-content">
        <div class="module-title">
          <div class="module-title-left">
            <div class="module-title-left-icon icon iconfont icon-my"></div>
            <div class="module-title-left-word">Top Validators</div>
          </div>
          <div class="module-title-viewall">
            View All
          </div>
        </div>
        <div class="chart">
          <highcharts :options="chartOptions" :plotOptions="plotOptions"></highcharts>
        </div>
        <div class="empty-data">
          No validators availabel
        </div>
      </div>
      <div class="second-right second-content">
        <div class="module-title">
          <div class="module-title-left">
            <div class="module-title-left-icon icon iconfont icon-listview"></div>
            <div class="module-title-left-word">Transaction History</div>
          </div>
          <div class="module-title-viewall">
            View All
          </div>
        </div>
        <div class="select-time">
          <div class="select-time-all">
            <el-date-picker v-model="value1" type="daterange" range-separator="" start-placeholder="From" end-placeholder="To" />
          </div>
          <div class="select-time-button">
            <el-button type="primary">Apply</el-button>
          </div>
        </div>
        <div class="empty-data">
          No transaction availabel
        </div>
      </div>
    </div>

    <div class="second module">
      <div class="second-left second-content" style="min-height: 60px;">
        <div class="module-title">
          <div class="module-title-left">
            <div class="module-title-left-icon icon iconfont icon-box"></div>
            <div class="module-title-left-word">Most Recent Blocks</div>
          </div>
          <div class="module-title-viewall">
            View All
          </div>
        </div>
        <!-- <div class="empty-data">
        No recent block availabel
      </div> -->
        <div class="table">
          <div class="table-item" v-for="(item, index) in blocks" :key="index">
            <div class="table-item-left">
              <div class="table-item-left-number">{{item.height}}</div>
              <div class="table-item-left-transaction">Transactions: {{item.transactions}}</div>
            </div>
            <div class="table-item-right">
              <div class="table-item-right-ago">> {{item.fromNow}}</div>
              <div class="table-item-right-time"> {{item.time}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="second-right second-content" style="min-height: 60px;">
        <div class="module-title">
          <div class="module-title-left">
            <div class="module-title-left-icon icon iconfont icon-ic24-transaction"></div>
            <div class="module-title-left-word">Most Recent Transactions</div>
          </div>
          <div class="module-title-viewall">
            View All
          </div>
        </div>
        <!-- <div class="empty-data">
        No recent transaction availabel
      </div> -->
        <div class="table">
          <div class="table-item" v-for="(item, index) in txs" :key="index">
            <div class="table-item-left">
              <div class="table-item-left-number"> <span class="tx">TX#</span> {{item.txid}}</div>
              <div class="table-item-left-transaction">Token: {{item.amount}} zos</div>
            </div>
            <div class="table-item-right">
              <div class="table-item-right-ago">> {{item.fromNow}}</div>
              <div class="table-item-right-time">Fee: {{item.fee}} zos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-show="currentTab !== 0">
    <div class="second-title">
      <second-title :itemList="secondItemList" />
    </div>
    <div class="module-table">
      <div class="module-table-title">
        {{ moduleTableTitle }}
      </div>
      <div class="table-content" v-show="currentTab === 1">
        <el-table :data="tableData" style="width: 100%" highlight-current-row>
          <el-table-column prop="name" label="Name">
          </el-table-column>
          <el-table-column prop="address" label="Address">
          </el-table-column>
          <el-table-column prop="tokens" label="Bonded Tokens">
          </el-table-column>
          <el-table-column prop="power" label="Voting Power">
          </el-table-column>
          <el-table-column prop="uptime" label="Uptime">
          </el-table-column>
        </el-table>
      </div>

      <div class="table-content" v-show="currentTab === 2">
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

      <div class="table-content" v-show="currentTab === 3">
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

      <div class="table-content" v-show="currentTab === 4">
        <el-table :data="tableData" style="width: 100%" highlight-current-row>
          <el-table-column prop="id" label="ID">
          </el-table-column>
          <el-table-column prop="title" label="Title">
          </el-table-column>
          <el-table-column prop="status" label="Status">
          </el-table-column>
          <el-table-column prop="depositPercentage" label="Deposit Percentage">
          </el-table-column>
          <el-table-column prop="submitTime" label="Submit Time">
          </el-table-column>
          <el-table-column prop="depositEndTime" label="Deposit End Time">
          </el-table-column>
          <el-table-column prop="votingEndTime" label="Voting End Time">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  <page-bottom></page-bottom>
</div>
</template>

<script>
import moment from 'moment'
import NavTab from '@/components/navTab'
import secondTitle from '@/components/secondTitle'
import pageBottom from '@/components/pageBottom'
import {
  Chart
} from 'highcharts-vue'
import {
  datePicker,
  button,
  table,
  tableColumn
} from 'element-plus'
import {
  listdelegate,
  newblock,
  newtx,
  fromNow
} from "@/api/home";
export default {
  components: {
    NavTab,
    datePicker,
    button,
    highcharts: Chart,
    secondTitle,
    table,
    tableColumn,
    pageBottom
  },
  data() {
    return {
      value1: '',
      value2: '',
      currentTab: 0,
      moduleTableTitle: 'Validators List',
      chartOptions: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        },
        title: {
          text: 'Top Validators'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }
        },
        series: [{
          type: 'pie',
          name: 'Proportion',
          data: [
            ['text1', 45.0],
            ['text2', 26.8],
            ['text3', 26.8],
            ['text4', 8.5],
            ['text5', 6.2],
            ['text6', 0.7]
          ]
        }]
      },
      blocks: [{
        "height": 1234,
        "transactions": 2,
        "fromNow": "15s ago",
        "time": "2021/01/11 10:21:07+UTC"
      }],
      txs: [{
        "txid": "aaaaaaaa",
        "fromNow": "15s ago",
        "fee": "0.01",
        "amount": "10"
      }],
      tableData: [{
          uptime: '2016-05-02',
          name: 'test name',
          address: 'test address',
          tokens: 'test token',
          power: 'test Power'
        }, {
          uptime: '2016-05-02',
          name: 'test name',
          address: 'test address',
          tokens: 'test token',
          power: 'test Power'
        },
        {
          uptime: '2016-05-02',
          name: 'test name',
          address: 'test address',
          tokens: 'test token',
          power: 'test Power'
        }
      ],
      secondItemList: ['Validators', '0 Total']
    };
  },
  mounted() {
    this.fetchHomePieData()
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.fetchHomePieData()
      }, 5000);
    }
  },

  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    //跳转详情按钮带参
    toDetailsTest() {
      console.log('click');
      this.$router.push({
        path: '/blockDetails',
        query: { testKey: 'testValue' }
      })
    },
    fetchHomePieData() {
      listdelegate().then(res => {
        let dataArr = []
        res.map(item => {
          let arrItem = []
          arrItem[0] = item.name
          arrItem[1] = parseFloat(item.votes)
          dataArr.push(arrItem)
        })
        console.log('dataArr', dataArr)
        this.chartOptions.series[0].data = dataArr
      }).catch(error => {
        console.log(error);
      });

      newblock().then(res => {
        let dataArr = []
        res.map(item => {
          let arrItem = {}
          arrItem.height = item.height
          arrItem.transactions = item.txs
          arrItem.fromNow = fromNow(item.transtime)
          arrItem.time = moment.unix(item.time).format('yyyy-MM-DD HH:mm:ss')
          dataArr.push(arrItem)
        })
        this.blocks = dataArr
      }).catch(error => {
        console.log(error);
      });

      newtx().then(res => {
        let dataArr = []
        res.map(item => {
          let arrItem = {}
          arrItem.txid = item.txid
          arrItem.fromNow = fromNow(item.transtime)
          arrItem.fee = item.fee
          arrItem.amount = item.amount
          dataArr.push(arrItem)
        })
        this.txs = dataArr
      }).catch(error => {
        console.log(error);
      });

    },
    clickTabsItem(currentTab) {
      this.currentTab = currentTab
      switch (currentTab) {
        case 1:
          this.moduleTableTitle = 'Validators List'
          this.secondItemList = ['Validators List', '0 Total'],
            this.tableData = [{
                uptime: '2016-05-02',
                name: 'test name',
                address: 'test address',
                tokens: 'test token',
                power: 'test Power'
              }, {
                uptime: '2016-05-02',
                name: 'test name',
                address: 'test address',
                tokens: 'test token',
                power: 'test Power'
              },
              {
                uptime: '2016-05-02',
                name: 'test name',
                address: 'test address',
                tokens: 'test token',
                power: 'test Power'
              }
            ]
          break;
        case 2:
          this.moduleTableTitle = 'Transactions List'
          this.secondItemList = ['Transactions List', '0 Total'],
            this.tableData = [{
              hash: 'Tx Hash',
              type: 'Tx Type',
              block: 'Block',
              fee: 'Fee',
              signer: 'Signer',
              status: 'Status',
              timestamp: 'Timestamp'
            }, {
              hash: 'Tx Hash',
              type: 'Tx Type',
              block: 'Block',
              fee: 'Fee',
              signer: 'Signer',
              status: 'Status',
              timestamp: 'Timestamp'
            }, {
              hash: 'Tx Hash',
              type: 'Tx Type',
              block: 'Block',
              fee: 'Fee',
              signer: 'Signer',
              status: 'Status',
              timestamp: 'Timestamp'
            }]
          break;
        case 3:
          this.moduleTableTitle = 'Assets List'
          this.secondItemList = ['All Assets'],
            this.tableData = [{
              name: 'Name',
              supply: 'supply',
              account: 'account',
              type: 'type',
              mintable: 'mintable',
              last: 'last tx',
              age: 'age'
            }, {
              name: 'Name',
              supply: 'supply',
              account: 'account',
              type: 'type',
              mintable: 'mintable',
              last: 'last tx',
              age: 'age'
            }, {
              name: 'Name',
              supply: 'supply',
              account: 'account',
              type: 'type',
              mintable: 'mintable',
              last: 'last tx',
              age: 'age'
            }]
          break;
        case 4:
          this.moduleTableTitle = 'Proposals List'
          this.secondItemList = ['All Proposals'],
            this.tableData = [{
              id: '234234',
              title: 'Title',
              status: 'Status',
              depositPercentage: 'Deposit Percentage',
              submitTime: 'Submit Time',
              depositEndTime: 'Deposit End Time',
              votingEndTime: 'test voting end time'
            }, {
              id: '234234',
              title: 'Title',
              status: 'Status',
              depositPercentage: 'Deposit Percentage',
              submitTime: 'Submit Time',
              depositEndTime: 'Deposit End Time',
              votingEndTime: 'test voting end time'
            }, {
              id: '234234',
              title: 'Title',
              status: 'Status',
              depositPercentage: 'Deposit Percentage',
              submitTime: 'Submit Time',
              depositEndTime: 'Deposit End Time',
              votingEndTime: 'test voting end time'
            }, ]
          break;
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  } //methods
}
</script>

<style lang="scss" scoped>
.home {
  background: #000;
  width: 100%;
  padding-bottom: 100px;
  min-height: 100vh;
}

.module-table-title {
  font-size: 16px;
}

.module {
  width: 76%;
  background: #fff;
  border-radius: 2px;
  padding: 10px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &-icon {
        font-size: 16px;
        color: #4b81eb;
      }

      &-word {
        text-indent: 8px;
      }
    }

    &-viewall {
      font-size: 16px;
      color: #4b81eb;
      cursor: pointer;
    }
  }
}

.second {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  &-content {
    width: 50%;
    padding: 10px;
    min-height: 136px;
  }

  &-left {
    border-right: 2px solid gray;
  }

}

.empty-data {
  margin-top: 20px;
}

.select-time {
  margin-top: 20px;
  display: flex;

  &-button {
    padding-left: 10px;
  }
}

.table {
  &-item {
    padding: 4px 0;
    border-bottom: 1px solid gainsboro;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;

    &-left {
      color: #333;
      flex: 1;

      &-number {
        color: #4b81eb;
      }

      &-transaction {}
    }

    &-right {
      text-align: right;

      &-ago {}

      &-time {}
    }
  }
}

.tx {
  color: #333;
}

.module-table {
  width: 76%;
  background: #fff;
  border-radius: 2px;
  padding: 20px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
