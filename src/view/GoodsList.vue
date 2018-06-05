<template>
  <div>
       <nav-head></nav-head>
       <nav-bread></nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter">
                        <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a></dd>
                        <dd v-for="(item,index) in price" :key="index">
                            <a href="javascript:void(0)" @click="priceChecked=index" :class="{'cur':priceChecked==index}">{{item.startprice}} - {{item.endprice}}</a>
                        </dd>
                        
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="(item,index) in goodslist" :key="index">

                                    <div class="pic">
                                        <a href="#"><img :src="item.productImage" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.salePrice}}</div>
                                        <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav-footer></nav-footer>
        <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
          <p slot="message">
             请先登录,否则无法加入到购物车中!
          </p>
          <div slot="btnGroup">
              <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
          </div>
      </modal>
       <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>加入购物车成!</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
        </div>
      </modal>
  </div>
</template>

<script>
    import NavHead from '../components/Navhead'
    import NavFooter from '../components/Navfooter'
    import NavBread from '../components/Navbread'
    import Modal from '../components/Modal'
    import axios from 'axios'
export default {
    components:{
        NavHead,
        NavFooter,
        Modal
    },
    data(){
        return{
            goodslist:[],
            priceChecked:"all",
            price:[
                {startprice:'0',endprice:'100'},
                {startprice:'100',endprice:'500'},
                {startprice:'500',endprice:'1000'},
                {startprice:'1000',endprice:'5000'}
            ],
            mdShow:false,
            mdShowCart:false

        }
    },
    methods:{
        getGoodlist(){
            axios.get('http://127.0.0.1:3000/goods/list?page=1&pageSize=5&priceLevel=1&sort=1').then((result)=>{
                var res=result.data;
                this.goodslist=res.result.list;
                
            })
        },
        addCart(productId){
            axios.post('http://127.0.0.1:3000/goods/addcart',{productId:productId}).then((res)=>{
                 var res = res.data;
                 if(res.status==0){
                    this.mdShowCart=true;
                 }else{
                    this.mdShow=true;
                 }
            })
        },
         closeModal(){
          this.mdShow = false;
          this.mdShowCart = false;
        }
    },
    mounted(){
        this. getGoodlist();
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
