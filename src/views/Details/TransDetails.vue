<template>
<div class="container">
  <!-- <nav-tab @clickTabsItem="clickTabsItem"></nav-tab> -->
  <div class="content">
    <div class="module">
      <div class="module-title">
        Transaction Information
      </div>
      <div class="module-content">
        <div class="module-content-item module-content-left">
          <div class="content-item">
            <div class="item-title"> height </div>
            <div class="item-word"> {{tx.height}} </div>
          </div>
          <div class="content-item">
            <div class="item-title"> block_hash </div>
            <div class="item-word" @click="BlockDetails(tx.block_hash)"> {{tx.block_hash}} </div>
          </div>
          <div class="content-item">
            <div class="item-title"> from </div>
            <div class="item-word"> {{tx.from}} </div>
          </div>

          <div class="content-item">
            <div class="item-title"> amount </div>
            <div class="item-word"> {{tx.amount}} </div>
          </div>

          <div class="content-item">
            <div class="item-title"> type </div>
            <div class="item-word"> {{tx.type}} </div>
          </div>

          <div class="content-item">
            <div class="item-title"> dpos_in </div>
            <div class="item-word"> {{tx.dpos_in}} </div>
          </div>

          <div class="content-item">
            <div class="item-title"> client_in </div>
            <div class="item-word"> {{tx.client_in}} </div>
          </div>

        </div>
        <div class="module-content-item module-content-right">
          <div class="content-item">
            <div class="item-title"> data_id </div>
            <div class="item-word"> {{tx.id}} </div>
          </div>

          <div class="content-item">
            <div class="item-title"> tx_hash </div>
            <div class="item-word"> {{tx.txid}} </div>
          </div>
          <div class="content-item">
            <div class="item-title"> to </div>
            <div class="item-word"> {{tx.to}} </div>
          </div>
          <div class="content-item">
            <div class="item-title"> fee </div>
            <div class="item-word"> {{tx.fee}} </div>
          </div>
          <div class="content-item">
            <div class="item-title"> transtime </div>
            <div class="item-word"> {{tx.transtime}} </div>
          </div>
          <div class="content-item">
            <div class="item-title"> dpos_out </div>
            <div class="item-word"> {{tx.dpos_out}} </div>
          </div>
          <div class="content-item">
            <div class="item-title"> client_out </div>
            <div class="item-word"> {{tx.client_out}} </div>
          </div>
        </div>
      </div>
      <div class="module-title" style="margin-top: 20px;">
      Transaction data: <p style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{tx.data}}</p>
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
  gettx
} from "@/api/universal";
export default {
  components: {
    NavTab,
    pageBottom,
    pagination
  },
  data() {
    return {
      tx : {}
    }
  },
  methods: {
    clickTabsItem(currentTab) {
    },
    BlockDetails(hash) {
      console.log('click');
      this.$router.push({
        path: '/blockDetails',
        query: { "hash": hash }
      })
    },
    TransDetails(txid) {
      console.log('click');
      this.$router.push({
        path: '/TransDetails',
        query: { "txid": txid }
      })
    }
  },
  mounted() {
    
    gettx(this.$route.query.txid).then(res => {
      this.tx = res[0];
      this.tx.transtime = moment.unix(this.tx.transtime).format('yyyy-MM-DD HH:mm:ss');
      if (this.tx.dpos_in == null) {
        this.tx.dpos_in = '-';
      }
      if (this.tx.client_in == null) {
        this.tx.client_in = '-';
      }
      if (this.tx.dpos_out == null) {
        this.tx.dpos_out = '-';
      }
      if (this.tx.client_out == null) {
        this.tx.client_out = '-';
      }
      if (this.tx.from == "000000000000000000000000000000000000000000000000000000000") {
        this.tx.from = "Coinbase";
      }
      console.log(this.tx)
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
