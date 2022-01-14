<template>
<div class="container">
  <nav-tab @clickTabsItem="clickTabsItem"></nav-tab>
  <div class="content">
    <div class="module">
      <div class="module-title">
        Block basic information
      </div>
      <div class="module-content">
        <div class="module-content-item module-content-left">
          <div class="content-item" v-for="(item, index) in leftList" :key="index">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-word">{{ item.content }}</div>
          </div>
          <!-- <div class="module-content-item-title">Block height</div>
          <div class="module-content-item-word">61e0e8073987d010d256eeb93fedeead89966adcf296d5aba121200e2061337c</div> -->
        </div>
        <div class="module-content-item module-content-right">
          <div class="content-item" v-for="(item, index) in rightList" :key="index">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-word" :style="index === 0 ? 'color: skyblue;' : ''">{{ item.content }}</div>
          </div>
        </div>
      </div>
      <div class="module-title" style="margin-top: 20px;">
        Transaction 1
      </div>
      <div class="transaction-infor">
        <div class="coinbse">
          Coinbase
        </div>
        <div class="number">100.0000</div>
        <div class="right icon iconfont icon-arrow-right1"></div>
        <div class="address">61e0e8073987d010d256eeb93fedeead89966adcf296d5aba121200e2061337c</div>
        <div class="number">100.0000</div>
      </div>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
  <page-bottom></page-bottom>
</div>
</template>

<script>
import NavTab from '@/components/navTab'
import pageBottom from '@/components/pageBottom'
import pagination from 'element-plus'
export default {
  components: {
    NavTab,
    pageBottom,
    pagination
  },
  data() {
    return {
      leftList: [{
        title: 'Block',
        content: '1085524'
      }, {
        title: 'Difficulty',
        content: '25'
      }, {
        title: 'Transactions',
        content: '1'
      }],
      rightList: [{
        title: 'Block Hash',
        content: '61e0e8073987d010d256eeb93fedeead89966adcf296d5aba121200e2061337c'
      }, {
        title: 'Block Time',
        content: '2022-01-14 11:18:14'
      }, {
        title: 'Confirmation',
        content: '2'
      }],
      currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
    }
  },
  mounted() {
    let testValue = this.$route.query.hash
    console.log('测试参数', testValue);
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      clickTabsItem(currentTab) {
    console.log(currentTab);
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
