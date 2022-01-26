<template>
<div class="container">
  <div class="content">
    <div class="module">
      <div class="module-title">
        Address information
      </div>
      <div class="address-top">
        <div class="address-title">address</div>
        <div class="address-word">{{user.address}}</div>
      </div>
      <div class="module-content">
        <div class="module-content-item module-content-left">
          <div class="content-item" >
            <div class="item-title">balance</div>
            <div class="item-word">{{user.avail}}</div>
          </div>
          <div class="content-item" >
            <div class="item-title">nonce</div>
            <div class="item-word">{{user.nonce}}</div>
          </div>
          </div>
        <div class="module-content-item module-content-right">
          <div class="content-item">
            <div class="item-title">Locked amount</div>
            <div class="item-word">{{user.locked}}</div>
          </div>
          <div class="content-item">
            <div class="item-title">Unrecognized contract transactions recorded</div>
            <div class="item-word">{{user.unconfirmedin}}</div>
          </div>
        </div>
      </div>

       <div class="table">
        <div class="table-item" v-for="(item, index) in txs" :key="index">
            <div class="module-title" style="margin-top: 20px;" @click="TransDetails(item.txid)">
              Transaction 
            </div>
            <div class="transaction-infor">
              <div class="coinbse" v-if="item.from=='000000000000000000000000000000000000000000000000000000000'"> 
                coinbse
              </div>
              <div class="coinbse" v-else @click="AddrDetails(item.from)"> 
                {{item.from}}
              </div>
              
            <div class="number">{{item.fee}}</div>
            <div class="right icon iconfont icon-arrow-right1"></div>
            <div class="address" @click="AddrDetails(item.to)" >{{item.to}}</div>
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
  get_address,get_address_tx
} from "@/api/universal";

export default {
  components: {
    NavTab,
    pageBottom,
    pagination
  },
  data() {
    return {
      user: {
        address: "??",
        avail: 0,
        nonce: 0,
        locked :0,
        unconfirmedin:0,
        unconfirmedout:0,
      },
      txs :[]
    }
  },
  mounted() {
    get_address(this.$route.query.addr).then(res => {
      this.user = res[0];
    }).catch(error => {
      console.log(error);
    });
    get_address_tx(this.$route.query.addr).then(res => {
      this.txs = res;
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
    BlockDetails(hash) {
      this.$router.push({
        path: '/details/blockDetails',
        query: { "hash": hash }
      })
    },
    TransDetails(txid) {
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
.address-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  // width: 90%;
  margin: 0 auto;
  text-indent: 4px;
  color: #333;
}
</style>
