<template>
  <div>
    <navHeader></navHeader>
    <NavBread>
      <span>GoodsList</span>
    </NavBread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a @click="sortGoods" href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short" :class="sortFlag ? 'sort-up':'sort-down'">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd @click="priceLeverCLick('all')"><a href="javascript:void(0)">All</a></dd>
              <dd @click="priceLeverCLick(0)">
                <a  href="javascript:void(0)">0 - 100</a>
              </dd>
              <dd  @click="priceLeverCLick(1)">
                <a href="javascript:void(0)">100 - 500</a>
              </dd>
              <dd  @click="priceLeverCLick(2)">
                <a href="javascript:void(0)">500 - 1000</a>
              </dd>
              <dd  @click="priceLeverCLick(3)">
                <a href="javascript:void(0)">1000 - 5000</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList">
                    <div class="pic">
                      <a href="#"><img :src="'static/' + item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">¥{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" @click="addCart(item.productId)" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                  <img v-show="loading" src="../assets/loading-spinning-bubbles.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--
      事件 :close 是触发不了的 点v-on:close 子组件$emit才能调用
    -->
    <Modal :mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请登陆
      </p>
      <div slot="btnGroup">
        <a class="btn--l" href="javascript:;" @click="closeModal">关闭</a>
      </div>
    </Modal>
    <Modal :mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物城成功!</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="closeModal">继续购物</a>
        <router-link class="btn btn--m" href="javascript:;" to="/CartList">查看购物车</router-link>
      </div>
    </Modal>
    <NavFooter></NavFooter>
  </div>
</template>
<script>
  import navHeader from './NavHeader';
  import NavBread from './NavBread';
  import NavFooter from './NavFooter';
  import Modal from './../components/Modal';
  import axios from 'axios';
  import './../assets/css/base.css';
  import './../assets/css/checkout.css';
  import './../assets/css/product.css';

  export default{
    data(){
      return {
        // 是否显示购物车
        mdShowCart: false,
        // 是否显示未登陆模态框
        mdShow: false,

        // 加载
        loading: true,
        // 商品列表
        goodsList: [],
        // true是升序 false是降序
        sortFlag: true,
        priceLever: 'all',
        page: 1,
        pageSize: 8,
        busy: true
      }
    },
    components: {
      Modal,
      navHeader,
      NavBread,
      NavFooter
    },
    mounted() {
      this.getGoodsList(false);
    },
    methods: {
      // 价格段筛选
      priceLeverCLick(val) {
        this.goodsList = [];
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.priceLever = val;
        this.getGoodsList(false);
      },

      // 获取商品接口
      getGoodsList(flag) {
        var parma = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag? 1: -1,
          priceLever: this.priceLever
        }
        this.loading = true;
        axios.get("/goods/list", {
          params: parma
        }).then((res) => {
          this.loading = false;
          if(flag) {
            this.goodsList = this.goodsList.concat(res.data.result.list);
            if(res.data.result.count == 0) {
              this.busy = true;
            }else {
              this.busy = false;
            }
          }else {
            this.goodsList = res.data.result.list;
            this.busy = false;
          }
        })
      },
      // 价格排序
      sortGoods() {
        this.goodsList = [];
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.getGoodsList(false);
      },

      // 加载更多
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
        }, 500);
      },

      //添加购物车
      addCart(productId) {
        axios.post("/goods/addCart", {
          productId: productId
        }).then((res) => {
          if(res.data.status == 0) {
            this.mdShowCart = true;
            this.$store.commit("updateCartCount", 1)
          }else {
            this.mdShow = true;
          }
        })
      },

      // 子组件函数
      closeModal() {
        this.mdShow = false;
        this.mdShowCart = false;
      }
    }
  }
</script>
<style>
  .accessory-list{
    overflow: hidden;
  }
  .sort-up {
    transform: rotate(-180deg);
    transition: .5s all;
  }
  .sort-down {
    transform: rotate(-360deg);
    transition: .5s all;
  }
</style>
