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
         <div class="table-item" v-for="(item, index) in 20" :key="index">
          <div class="table-item-left">
            <div class="table-item-left-number">48957</div>
            <div class="table-item-left-transaction">Transactions: 1</div>
          </div>
          <div class="table-item-right">
            <div class="table-item-right-ago">> 12s ago</div>
            <div class="table-item-right-time">2022/01/11 10:21:07+UTC</div>
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
        <div class="table-item" v-for="(item, index) in 20" :key="index">
          <div class="table-item-left">
            <div class="table-item-left-number"> <span class="tx">TX#</span> 0eshaskhe89754kjhaksfh</div>
            <div class="table-item-left-transaction">Token</div>
          </div>
          <div class="table-item-right">
            <div class="table-item-right-ago">> 12s ago</div>
            <div class="table-item-right-time">Fee: 0.01 ZOS ZOS</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NavTab from '@/components/navTab'
import {
  Chart
} from 'highcharts-vue'
import {
  datePicker,
  button
} from 'element-plus'
import { login } from "@/api/home";
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
            // {
            //   name: 'Chrome',
            //   y: 12.8,
            //   sliced: true,
            //   selected: true
            // },
            ['text3', 26.8],
            ['text4', 8.5],
            ['text5', 6.2],
            ['text6', 0.7]
          ]
        }]
      },
    };
  },
  mounted() {
    this.fetchHomePieData()
  },
  methods: {
    //获取首页饼状图数据
    fetchHomePieData() {
      login().then(res=>{
        console.log(res)
        console.log(this.chartOptions.series[0].data)
        let dataArr = []
        res.map(item => {
          let arrItem = []
          arrItem[0] = item.name
          arrItem[1] = 20
          dataArr.push(arrItem)
        })
        console.log('dataArr', dataArr)
        this.chartOptions.series[0].data = dataArr
      }).catch(error => {
        console.log(error);
      })
    },
    clickTabsItem(currentTab) {
      this.currentTab = currentTab
    }
  }
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
