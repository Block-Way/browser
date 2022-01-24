<template>
<div class="container">
  <div class="content">
    <div class="module">
      <div class="module-title">
        Network Information
      </div>
      <div class="module-content">
        <div class="module-content-item module-content-left">
          <div class="content-item">
            <div class="item-title"> current height </div>
            <div class="item-word"> {{net_info.current_height}} </div>
          </div>
          <div class="content-item">
            <div class="item-title"> total circulation </div>
            <div class="item-word"> {{net_info.total_circulation}} </div>
          </div>
          <div class="content-item">
            <div class="item-title"> mortgage amount </div>
            <div class="item-word"> {{net_info.mortgage_amount}}</div>
          </div>

          <div class="content-item">
            <div class="item-title"> number of addresses </div>
            <div class="item-word"> {{net_info.number_addresses}} </div>
          </div>

          <div class="content-item">
            <div class="item-title"> creation time </div>
            <div class="item-word"> {{net_info.creation_time}} </div>
          </div>

          <div class="content-item">
            <div class="item-title"> number of pow blocks </div>
            <div class="item-word">  {{net_info.pow_blocks}} </div>
          </div>

          <div class="content-item">
            <div class="item-title"> number of dpos blocks </div>
            <div class="item-word"> {{net_info.dpos_blocks}} </div>
          </div>

        </div>
        <div class="module-content-item module-content-right">
          <div class="content-item">
            <div class="item-title"> pow amount </div>
            <div class="item-word"> {{net_info.pow_money}} </div>
          </div>

          <div class="content-item">
            <div class="item-title"> dpos amount </div>
            <div class="item-word"> {{net_info.dpos_money}} </div>
          </div>
          <div class="content-item">
            <div class="item-title"> running time </div>
            <div class="item-word"> {{net_info.running_time}} </div>
          </div>
          <div class="content-item">
            <div class="item-title"> total workload </div>
            <div class="item-word"> {{net_info.total_workload}}</div>
          </div>
          <div class="content-item">
            <div class="item-title"> total transactions </div>
            <div class="item-word"> {{net_info.total_transactions}} </div>
          </div>
          <div class="content-item">
            <div class="item-title"> attenuation period </div>
            <div class="item-word"> {{net_info.attenuation_period}}</div>
          </div>
          <div class="content-item">
            <div class="item-title"> next attenuation height </div>
            <div class="item-word"> {{net_info.next_attenuation_height}} </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <page-bottom></page-bottom>
</div>
</template>

<script>
import moment from 'moment'
import NavTab from '@/components/navTab'
import pageBottom from '@/components/pageBottom'
import pagination from 'element-plus'
import {
  blockchain
} from "@/api/blocks";
import {
  listdelegate
} from "@/api/staking";
export default {
  components: {
    NavTab,
    pageBottom,
    pagination
  },
  data() {
    return {
      net_info : {
        "current_height": 1,//当前高度
        "total_circulation": "?", // 流通量
        "mortgage_amount" :  "?", // 投票量
        "number_addresses": 1, //地址数量
        "creation_time": 0, //开始时间
        "pow_blocks": 0,// pow 出块数
        "dpos_blocks": 0,// dpos 出块数
        "pow_money": 0.00,// pow 奖励金额
        "dpos_money": 0.00,// dpos 奖励金额
        "running_time": 0.00,// 运行时间
        "total_workload": 0.00,// 总hash量
        "total_transactions": 0.00,// 交易数量
        "attenuation_period": "a year",// 衰减周期
        "next_attenuation_height": "?"// 衰减周期
      }
    }
  },
  methods: {
    clickTabsItem(currentTab) {
    }
  },
  mounted() {
    blockchain().then(res => {
      let current_height = 0;
      let creation_time = Infinity;
      let total_transactions = 0;
      res.map(item => {
        if (item.type == "primary-dpos") {
          this.net_info.dpos_blocks = item.c;
          this.net_info.dpos_money = item.reward_money;
        } else if (item.type == "primary-pow") {
          this.net_info.pow_blocks = item.c;
          this.net_info.pow_money = item.reward_money;
        }
        if (item.max_height > current_height) {
          current_height = item.max_height;
        }
        if (item.min_time < creation_time) {
          creation_time = item.min_time; 
        }
        total_transactions += item.txs;
      })
      this.net_info.current_height = current_height;
      this.net_info.creation_time = moment.unix(creation_time).format('yyyy-MM-DD HH:mm:ss');
      this.net_info.total_transactions = total_transactions;
      this.net_info.total_workload = this.net_info.pow_blocks * 256;
      this.net_info.running_time = moment.unix(creation_time).fromNow();
      
      // ??
      this.net_info.total_circulation = current_height * 50;
      this.net_info.next_attenuation_height = current_height + 50; 
    }).catch(error => {
      console.log(error);
    });

    listdelegate().then(res => {
      let mortgage_amount = 0;
      res.map(item => {
        mortgage_amount += parseFloat(item.votes);
      })
      this.net_info.mortgage_amount = mortgage_amount; 
    }).catch(error => {
      console.log(error);
    });
  }
}
</script>

<style lang="scss" scoped>
.container {
  .content {
    background: 100%;
    min-height: 90vh;
    background: #000;
    padding-top: 20px;

    .module {
      width: 76%;
      background: #fff;
      border-radius: 2px;
      padding: 10px;
      margin: 0 auto;

      &-title {
        border-left: 3px solid #424958;
        text-indent: 13px;
        color: #424958;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 20px;
      }

      &-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        &-item {
          width: 48%;
        }

        .content-item {
          @extend .module-content;
          padding: 10px 4px;
          border-bottom: 1px solid gainsboro;
          color: #333;
          
          .item-word {
            text-align: right;
            width: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.transaction-infor {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 40px;

  .coinbse {
    padding: 4px 20px;
    background: #424958;
    color: #fff;
    border-radius: 4px;
  }

  .number {
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.pagination {
  width: 80%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}
</style>
