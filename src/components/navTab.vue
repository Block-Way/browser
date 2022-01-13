<template>
<div class="container">
  <div class="content">
    <div class="content-left">
      <div class="content-left-logo"><img src="../assets/logo.svg" style="height:32px;" /><h3>zos scan</h3></div>
      <div class="content-left-tabs">
        <div class="content-left-tabs-item" @click="clickTabsItem(item, index)" :class="index === currentTab ? 'content-left-tabs-item-clicked' : ''" v-for="(item, index) in tabsItemList" :key="index">
          {{ item.title }}
        </div>
      </div>
    </div>
    <div class="content-right">
      <div class="content-right-search">
        <div class="content-right-search-button">
          <el-select v-model="value" placeholder="Please choose">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="content-right-search-input">
          <input type="text" placeholder="Enter Search Value">
        </div>
        <div class="content-right-search-icon icon iconfont icon-search1"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  select,option
} from 'element-plus'
export default {
  components: { select, option},
  data() {
    return {
      tabsItemList: [{
        title: 'Dashboard'
      }, {
        title: 'Staking'
      }, {
        title: 'Transactions'
      }, {
        title: 'Assets'
      }, {
        title: 'Gov'
      }],
      currentTab: 0,
      options: [{
          value: 'Block',
          label: 'Block'
        }, {
          value: 'Tx',
          label: 'Tx'
        }, {
          value: 'Address',
          label: 'Address'
        }],
        value: ''
    }
  },
  methods: {
    clickTabsItem(item, index) {
      this.currentTab = index
      this.emit('clickTabsItem', this.currentTab)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: sticky;
  top: 0;
  width: 100%;
  background: #424958;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  z-index: 999;

  .content {
    display: flex;
    width: 80%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;

    &-left {
      color: #fff;
      display: flex;
      align-items: center;

      &-logo {
        // width: 183px;

      }

      &-tabs {
        display: flex;
        margin-top: 10px;
        justify-content: flex-start;
        align-items: center;
        margin-left: 30px;

        &-item {
          margin-right: 30px;
          padding-bottom: 10px;
          cursor: pointer;
          font-weight: 400;
        }

        &-item-clicked {
          border-bottom: 4px solid #fff;
          font-weight: 700;
        }
      }

    }
    &-right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px;
      background: #4e5f72;
      border-radius: 2px;
      color: #fff;
      &-search {
        width: 100%;
        display: flex;
        border: 1px solid #5872a9;
        align-items: center;
        justify-content: space-around;
        &-button {
          padding-left: 10px;
          height: 40px;
          line-height: 40px;
      }
      &-input {
        width: 70%;
        input {
          background: #4e5f72;
          border: none;
          color: #fff;
          text-indent: 20px;
          width: 100%;
          outline: none;
        }
        input::placeholder {
              color: #fff;
            }
      }
      &-icon {
        padding-right: 10px;
      }
      }
    }
  }
}
.el-input {
  background: red;
}
</style>
