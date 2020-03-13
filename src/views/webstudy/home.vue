<template>
  <div>
    <home-layout/>

    <div class="home-nav-container">
      <ul class="home-nav" @mouseleave="handleMouseLeave">
        <li v-for="(item,index) in navList" :key="index" class="nav-item" @mouseenter="handleMouseEnter(item)">
          <span class="nav-title">{{ item.title }}</span>
          <span class="arr-right"/>
        </li>
      </ul>
      <div @mouseenter="handleContentEnter" @mouseleave="handleContentLeave">
        <nav-content v-show="showNavContent" :content="currentNav"/>
      </div>

    </div>

    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

  </div>
</template>

<script>
  import NavContent from './home-nav-content.vue'
  export default {

    components: {
      NavContent
    },
    mounted () {
      this.getHomeNavList()
    },
    name: "home",
    data() {
      return {
        value1: 0,
        value2: 50,
        value3: 36,
        value4: 48,
        value5: 42,
        swiperList: [
          {
            "id": 1,
            "img": "https://img.mukewang.com/5d1e0a1800013ca916000540.jpg"
          },
          {
            "id": 2,
            "img": "https://img.mukewang.com/5d1c5aec00011c1016000540.jpg"
          },
          {
            "id": 3,
            "img": "https://img.mukewang.com/5d108b1500010bfe18720632.jpg"
          },
          {
            "id": 4,
            "img": "https://img.mukewang.com/5d1466c5000172a516000540.jpg"
          },
          {
            "id": 5,
            "img": "https://img.mukewang.com/5cb833cf0001efb716000540.jpg"
          },
          {
            "id": 6,
            "img": "https://img.mukewang.com/5c0fd2630001ef2118720632.jpg"
          }
        ],
        navList: [],
        currentNav: {},
        showNavContent: false
      }
    },
    methods: {
      formatTooltip(val) {
        return val / 100;
      },
      // 导航鼠标移入
      handleMouseEnter(item) {
        this.showNavContent = true
        this.currentNav = item.data
      },
      // 导航鼠标移除
      handleMouseLeave() {
        this.timer = setTimeout(() => {
          this.showNavContent = false
        }, 150)
      },
      // 导航内容鼠标移入
      handleContentEnter() {
        clearTimeout(this.timer)
      },
      // 导航内容鼠标移除
      handleContentLeave() {
        this.showNavContent = false
        this.currentNav = {}
      },
      // 获取首页导航信息
      getHomeNavList() {
        var data=
          [
          {
            "title": "前沿 / 区块链 / 人工智能",
            "type": "A",
            "data": {
              "tags": [
                {
                  "subtitle": "前沿技术",
                  "list": ["微服务","区块链","以太坊","人工智能","机器学习","深度学习","计算机视觉","自然语言处理","数据分析&挖掘"]
                }
              ],
              "course": [
                { "title": "OpenCV+TensorFlow入门人工智能图像处理", "img": "https://img2.mukewang.com/szimg/5a9f4c2e00010ce205400300.jpg", "money": "299", "rank": "中级", "number": "670" },
                { "title": "区块链技术核心概念与原理讲解", "img": "https://img4.mukewang.com/5ae3e5b80001818c06000338-240-135.jpg", "money": "-1", "rank": "入门", "number": "43111" },
                { "title": "深度学习之目标检测常用算法原理+实践精讲", "img": "https://img2.mukewang.com/szimg/5bfb523c0001290905400300.jpg", "money": "499", "rank": "高级", "number": "320" },
                { "title": "Python人工智能常用库Numpy使用入门", "img": "https://img.mukewang.com/5a7048580001670506000338-240-135.jpg", "money": "-1", "rank": "初级", "number": "29017" }
              ]
            }
          },
          {
            "title": "前端 / 小程序 / JS",
            "type": "B",
            "data": {
              "tags": [
                {
                  "subtitle": "前端开发",
                  "list": ["HTML/CSS","JavaScript","Vue.js","React.JS","Angular","Node.js","jQuery","Bootstrap","Sass/Less","WebApp", "小程序", "前端工具", "CSS", "Html5", "CSS3"]
                }
              ],
              "course": [
                { "title": "前端零基础入门 ", "img": "https://climg.mukewang.com/5c7e2b5800013ea906000338.jpg", "money": "699", "rank": "初级", "number": "1644" },
                { "title": "微信小程序入门与实战 常用组件API开发技巧项目实战", "img": "https://img1.mukewang.com/szimg/5c0493ce000126b106000338.jpg", "money": "149", "rank": "初级", "number": "18041" },
                { "title": "Vue核心技术Vue+Vue-Router+Vuex+SSR实战精讲", "img": "https://img2.mukewang.com/szimg/5aab7f270001909810800600.jpg", "money": "366", "rank": "高级", "number": "1980" },
                { "title": "Vue2.5开发去哪儿网App 从零基础入门到实战项目", "img": "https://img2.mukewang.com/szimg/5ac2dfe100014a9005400300.jpg", "money": "266", "rank": "中级", "number": "6057" }
              ]
            }
          },
          {
            "title": "后端 / JAVA / Python",
            "type": "C",
            "data": {
              "tags": [
                {
                  "subtitle": "后端开发",
                  "list": ["Java","SpringBoot","Spring Cloud","Python","爬虫","Django","Tornado","Go","PHP","C", "C++", "C#", "Ruby"]
                }
              ],
              "course": [
                { "title": "Java 零基础入门 ", "img": "https://climg.mukewang.com/5c80971c0001b50306000338.jpg", "money": "568", "rank": "初级", "number": "1148" },
                { "title": "Spring Boot2.0深度实践之核心技术篇", "img": "https://img2.mukewang.com/szimg/5b4c817f0001945605400300.jpg", "money": "366", "rank": "高级", "number": "1752" },
                { "title": "Socket网络编程进阶与实战", "img": "https://img4.mukewang.com/szimg/5bc3f1420001abf206000338.jpg", "money": "348", "rank": "中级", "number": "1343" },
                { "title": "Java设计模式精讲  Debug方式+内存分析", "img": "https://img2.mukewang.com/szimg/5b723de80001ec9b05400300.jpg", "money": "299", "rank": "中级", "number": "1753" }
              ]
            }
          },
          {
            "title": "移动 / Android / iOS",
            "type": "D",
            "data": {
              "tags": [
                {
                  "subtitle": "移动开发",
                  "list": ["Android","iOS","React native","WEEX"]
                }
              ],
              "course": [
                { "title": "Android 零基础入门 ", "img": "https://climg.mukewang.com/5c809855000179c506000338.jpg", "money": "699", "rank": "初级", "number": "385" },
                { "title": "新版React Native+Redux打造高质量上线App", "img": "https://img1.mukewang.com/szimg/5c106a8f0001d0ea06000338.jpg", "money": "348", "rank": "初级", "number": "18041" },
                { "title": "Flutter从入门到进阶 实战携程网App", "img": "https://img4.mukewang.com/szimg/5c7e6835087ef3d806000338.jpg", "money": "366", "rank": "高级", "number": "1980" },
                { "title": "Top团队大牛带你玩转Android性能分析与优化", "img": "https://img1.mukewang.com/szimg/5c26f19508ce8c8100000000.jpg", "money": "266", "rank": "中级", "number": "6057" }
              ]
            }
          },
          {
            "title": "云计算 / 大数据 / 容器",
            "type": "E",
            "data": {
              "tags": [
                {
                  "subtitle": "算法&数学",
                  "list": ["算法与数据结构","数学","算法"]
                },
                {
                  "subtitle": "云计算&大数据",
                  "list": ["大数据","Hadoop","Spark","Hbase","Storm","云计算","AWS","Docker","Kubernetes"]
                }
              ],
              "course": [
                { "title": "BAT大牛亲授 个性化推荐算法实战 ", "img": "https://img4.mukewang.com/szimg/5bf53d9b0001124b06000338.jpg", "money": "699", "rank": "初级", "number": "1644" },
                { "title": "轻松愉快之玩转SpringData", "img": "https://img2.mukewang.com/58e6081c00012ec206000338-240-135.jpg", "money": "149", "rank": "初级", "number": "18041" },
                { "title": "高等数学-学习算法/人工智能/大数据的第一步", "img": "https://img1.mukewang.com/szimg/5be176260001720e06000338.jpg", "money": "366", "rank": "高级", "number": "1980" },
                { "title": "HBase入门", "img": "https://img3.mukewang.com/598986ae0001f07706000338-240-135.jpg", "money": "266", "rank": "中级", "number": "6057" }
              ]
            }
          },
          {
            "title": "运维 / 测试 / 数据库",
            "type": "F",
            "data": {
              "tags": [
                {
                  "subtitle": "运维&测试",
                  "list": ["运维","自动化运维","运维工具","中间件","测试","功能测试","性能测试","自动化测试","接口测试","安全测试"]
                },
                {
                  "subtitle": "数据库",
                  "list": ["MySQL","Redis","MongoDB","Oracle","SQL Server","NoSql"]
                }
              ],
              "course": [
                { "title": "一站式学习Redis  从入门到高可用分布式实践 ", "img": "https://img2.mukewang.com/szimg/5b46c4460001ae0805400300.jpg", "money": "699", "rank": "初级", "number": "1644" },
                { "title": "使用java构建和维护接口自动化测试框架", "img": "https://img3.mukewang.com/593a3b0f0001383606000338-240-135.jpg", "money": "149", "rank": "初级", "number": "18041" }
              ]
            }
          },
          {
            "title": "UI设计 / 3D动画 / 游戏",
            "type": "G",
            "data": {
              "tags": [
                {
                  "subtitle": "UI设计&多媒体",
                  "list": ["模型制作","动效动画","设计基础","设计工具","APPUI设计","产品交互"]
                },
                {
                  "subtitle": "游戏",
                  "list": ["Unity 3D","Cocos2d-x"]
                }
              ],
              "course": [
                { "title": "移动端App UI设计入门与实战", "img": "https://img2.mukewang.com/szimg/5a123d7e00011fa705400300.jpg", "money": "699", "rank": "初级", "number": "1644" },
                { "title": "高薪设计师必修课 AE移动UI动效设计从入门到实战", "img": "https://img3.mukewang.com/szimg/5aa9d2c1000104d510800600.jpg", "money": "149", "rank": "初级", "number": "18041" },
                { "title": "Axure入门初体验", "img": "https://img4.mukewang.com/587db7af00016b7e06000338-240-135.jpg", "money": "366", "rank": "高级", "number": "1980" },
                { "title": "前端工程师必备的PS技能——切图篇", "img": "https://img2.mukewang.com/578741d3000151e806000338-240-135.jpg", "money": "266", "rank": "中级", "number": "6057" }
              ]
            }
          }
        ]

        this.navList = data
        this.currentNav = data[0].data
      }
    }
  }
</script>






<style lang="stylus" scoped>

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .home-nav-container
    position: relative;
    width: 216px;
    height: 444px;
    background-color: #2b333b;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 0 12px 24px 0 rgba(7, 17, 27, 0.1);

    .home-nav
      position: absolute;
      left: 0;
      right: 0;
      top: 10px;

      .nav-item
        position: relative;
        margin-left: 12px;
        padding-left: 16px;
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        .nav-title
          margin-left: -8px;
        .arr-right
          position: absolute;
          top: 50%;
          right: 10px;
          margin-top: -4px;
          display: inline-block;
          width: 0;
          height: 0;
          border: 4px solid rgba(255, 255, 255, 0.5);
          border-color: transparent transparent transparent rgba(255, 255, 255, 0.5);
        &:hover
          background-color: #6a7075;
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
          color: #fff;

</style>
