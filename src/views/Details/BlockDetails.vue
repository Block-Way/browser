<template>
<div class="container">
  <div class="content">
    <div class="module">
      <div class="module-title">
        Block basic information
      </div>
      <div class="module-content">
        <div class="module-content-item module-content-left">
          <div class="content-item" >
            <div class="item-title">height</div>
            <div class="item-word">{{block.height}}</div>
          </div>
          <div class="content-item" >
            <div class="item-title">type</div>
            <div class="item-word">{{block.type}}</div>
          </div>

          <div class="content-item" >
            <div class="item-title">reward_money</div>
            <div class="item-word">{{block.reward_money}}</div>
          </div>

          <div class="content-item" >
            <div class="item-title">Transactions</div>
            <div class="item-word">{{block.txs}}</div>
          </div>

          </div>
        <div class="module-content-item module-content-right">
          <div class="content-item">
            <div class="item-title">Hash</div>
            <div class="item-word" :style="index === 0 ? 'color: skyblue;' : ''">{{block.hash}}</div>
          </div>

          <div class="content-item">
            <div class="item-title">Time</div>
            <div class="item-word" :style="index === 0 ? 'color: skyblue;' : ''">{{block.time}}</div>
          </div>

          <div class="content-item">
            <div class="item-title">reward_address</div>
            <div class="item-word" :style="index === 0 ? 'color: skyblue;' : ''">{{block.reward_address}}</div>
          </div>
          <div class="content-item">
            <div class="item-title">prev_hash</div>
            <div class="item-word" :style="index === 0 ? 'color: skyblue;' : ''" @click="BlockDetails(block.prev_hash)">{{block.prev_hash}}</div>
          </div>
        </div>
      </div>

       <div class="table">
        <div class="table-item" v-for="(item, index) in blocktx" :key="index">
            <div class="module-title" style="margin-top: 20px;" @click="TransDetails(item.txid)">
              Transaction {{index+1}} {{item.txid}}
            </div>
            <div class="transaction-infor">
              <div class="coinbse" v-if="item.from==='000000000000000000000000000000000000000000000000000000000'" >
                Coinbse
              </div>
              <div v-else>
                {{item.from}}
              </div>
            <div class="number">{{item.fee}}</div>
            <div class="right icon iconfont icon-arrow-right1"></div>
            <div class="address">{{item.to}}</div>
            <div class="number">{{item.amount}}</div>
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
import pageBottom from '@/components/pageBottom'
import pagination from 'element-plus'
import {
  getblock,getblocktx
} from "@/api/universal";

export default {
  components: {
    NavTab,
    pageBottom,
    pagination
  },
  data() {
    return {
      block: {
        prev_hash: 5,
        time: 5,
        height: 4,
        reward_address:1,
        reward_money:1,
        type:"primary-dpos",
        txs:3
      },
      blocktx :[]
    }
  },
  mounted() {
     getblock(this.$route.query.hash).then(res => {
        this.block = res[0];
        this.block.time = moment.unix(this.block.time).format('yyyy-MM-DD HH:mm:ss')
      }).catch(error => {
        console.log(error);
      });
    getblocktx(this.$route.query.hash).then(res => {
        this.blocktx = res;
      }).catch(error => {
        console.log(error);
      });
  },
  methods: {
    BlockDetails(hash) {
      console.log('click');
      this.$router.push({
        path: '/details/blockDetails',
        query: { "hash": hash }
      })
    },
    TransDetails(txid) {
      console.log('click');
      this.$router.push({
        path: '/details/TransDetails',
        query: { "txid": txid }
      })
    }
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
        align-items: center;

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
            width: 60%;
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
