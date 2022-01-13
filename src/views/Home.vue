<template>
<div class="home">
  <nav-tab @clickTabsItem="clickTabsItem"></nav-tab>
  <div class="spotlight module">
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
</template>

<script>
import moment from 'moment'
import NavTab from '@/components/navTab'
import {
  Chart
} from 'highcharts-vue'
import {
  datePicker,
  button
} from 'element-plus'
import { listdelegate,newblock,newtx,fromNow } from "@/api/home";
export default {
  components: {
    NavTab,
    datePicker,
    button,
    highcharts: Chart,
  },
  data() {
    return {
      value1: '',
      value2: '',
      currentTab: 0,
      
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
          name: '占比',
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
      blocks: [{"height":1234,"transactions":2,"fromNow":"15s ago","time": "2021/01/11 10:21:07+UTC"}],
      txs:[{"txid":"aaaaaaaa","fromNow":"15s ago","fee":"0.01","amount":"10"}]
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
    fetchHomePieData() {
      listdelegate().then(res=>{
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

      newblock().then(res=>{
        let dataArr = []
        res.map(item => {
          let arrItem = {}
          arrItem.height = item.height
          arrItem.transactions = item.txs
          arrItem.fromNow =  fromNow(item.transtime)
          arrItem.time = moment.unix(item.time).format('yyyy-MM-DD HH:mm:ss')
          dataArr.push(arrItem)
        })
        this.blocks = dataArr
      }).catch(error => {
        console.log(error);
      });

      newtx().then(res=>{
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
    }
  }//methods
}
</script>

<style lang="scss" scoped>
.home {
  background: #000;
  width: 100%;
  padding-bottom: 100px;
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
    align-items: center;font-size: 12px;
    &-left {
      color: #333;
      flex: 1;
      &-number {
        color: #4b81eb;
      }
      &-transaction {

      }
    }
    &-right {
      text-align: right;
      &-ago {

      }
      &-time {

      }
    }
  }
}
.tx {
  color: #333;
}
</style>
