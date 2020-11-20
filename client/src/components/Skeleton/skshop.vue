<template>
  <div class="skshop">
    <div class="top">
      <div class="top-content">
        <nav>
          <span></span>
        </nav>
        <div class="shop-avatar"></div>
        <div class="shop-info">
          <div class="title">
            <h3></h3>
            <p></p>
          </div>
          <div class="activity"></div>
          <div class="notice"></div>
        </div>
      </div>
    </div>
    <div class="tab">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="content">
      <div class="left">
        <span><i></i></span>
        <div v-for="item in 5" :key="item"></div>
      </div>
      <div class="right">
        <div class="head">
          <span></span>
        </div>
        <div class="item" v-for="item in 5" :key="item">
          <div class="il"></div>
          <div class="ir">
            <div class="irt">
               <h3></h3>
              <h4></h4>
              <p></p>
            </div>
            <div class="irb">
              <span></span>
              <van-icon size="24" name="add" color="#eee"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>
<style lang="less" scoped>
.skshop{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  .top{
    height: 210px;
    .top-content{
      padding-top: 100px;
      position: relative;
      nav{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100px;
        left: 0;
        display: flex;
        align-items: center;
        overflow: hidden;
        background-color: #ddd;
        span{
          position: absolute;
          top: 10px;
          left: 10px;
          width: 26px;
          height: 26px;
          background-color: #f3f3f3;
        }
      }
      .shop-avatar{
        position: absolute;
        width: 70px;
        height: 70px;
        display: flex;
        top: 45px;
        margin-left: -35px;
        left: 50%;
        border-radius: 2px;
        overflow: hidden;
        background-color: #f3f3f3;
      }
      .shop-info{
        padding-top: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title{
          width: 70%;
          text-align: center;
          h3{
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #eee;
            height: 22px;
            margin-top: 2px;
          }
          p{
            margin-top: 8px;
            height: 12px;
            background-color: #eee;
          }
        }
        .activity{
          margin-top: 8px;
          width: 80%;
          background-color: #eee;
          height: 14px;
        }
        .notice{
          margin-top: 8px;
          width: 80%;
          background-color: #eee;
          height: 14px;
        }
      }
    }
  }
  .tab{
    margin-top: 5px;
    height: 44px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #f3f3f3;
    span{
      display: inline-block;
      width: 70px;
      height: 40px;
      background-color: #eee;
    }
  }
  .content{
    flex: 1;
    display: flex;
    .left{
      width: 80px;
      height: 100%;
      background-color: #eee;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      span{
        display: block;
        height: 44px;
        background-color: #fff;
        i{
          display: block;
          height: 16px;
          width: 60px;
          margin: 12px 10px;
          background-color: #ddd;
        }
      }
      div{
        display: block;
        height: 18px;
        width: 60px;
        margin: 14px 10px;
        background-color: #ddd;
      }
    }
    .right{
      overflow: hidden;
      flex: 1;
      .head{
        height: 38px;
        display: block;
        overflow: hidden;
        span{
          display: block;
          width: 30px;
          height: 16px;
          margin: 11px 5px;
          background-color: #eee;
        }
      }
      .item{
        display: flex;
        justify-content: space-between;
        padding: 5px;
        .il{
          height: 95px;
          width: 95px;
          background-color: #eee;
        }
        .ir{
          margin-left: 15px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h3{
            width: 100%;
            height: 16px;
            margin-top: 3px;
            background-color: #eee;
          }
          h4{
            margin-top: 5px;
            height: 10px;
            background-color: #eee;
          }
          p{
            margin-top: 5px;
            height: 10px;
            width: 50%;
            background-color: #eee;
          }
          .irb{
            display: flex;
            justify-content: space-between;
            span{
              height: 16px;
              width: 30px;
              background-color: #eee;
            }
          }
        }
      }
    }
  }
  .footer{
    height: 50px;
    width: 100%;
    background-color: #ddd;
  }
}
</style>