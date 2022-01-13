<template>
  <div class="staking">
    <nav-tab @clickTabsItem="clickTabsItem"></nav-tab>
    <div class="module">
      <div class="table">
        <div
          class="table-item"
          v-for="(item, index) in listdelegate"
          :key="index"
        >
          <div class="table-item">
            <span>地址: {{ item.address }}</span>
            <span>投票金额: {{ item.votes }}</span>
            <span>节点名称: {{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTab from "@/components/navTab";
import { listdelegate } from "@/api/staking";
export default {
  components: {
    NavTab,
  },
  data() {
    return {
      listdelegate: [
        {
          address: "20m0f7zkhbd840hk34zwfeazr8cwkkskxhcdqpz0jw6rx2a160bb38wth",
          votes: "22041482.0492500000",
          name: "node0",
        }
      ],
    };
  },
  mounted() {
    this.fetchHomePieData()
  },
  methods: {
    fetchHomePieData() {
      listdelegate().then(res=>{
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
    }
    &-right {
      text-align: right;
    }
  }
}
</style>