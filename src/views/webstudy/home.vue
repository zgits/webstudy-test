<template>
  <div>
    <home-layout/>

    <div>
<!--    <div class="home-nav-container" style="float:left;margin-left: 40px">-->
<!--      <ul class="home-nav" @mouseleave="handleMouseLeave">-->
<!--        <li v-for="(item,index) in navList" :key="index" class="nav-item" @mouseenter="handleMouseEnter(item)">-->
<!--          <span class="nav-title">{{ item.title }}</span>-->
<!--          <span class="arr-right"/>-->
<!--        </li>-->
<!--      </ul>-->

<!--      <div @mouseenter="handleContentEnter" @mouseleave="handleContentLeave">-->
<!--        <nav-content v-show="showNavContent" :content="currentNav"/>-->
<!--      </div>-->

<!--    </div>-->

      <el-carousel :interval="4000"  height="300px">
        <el-carousel-item v-for="item in swiperList" :key="item.id">
          <img :src="item.img" width="100%" height="300px">
        </el-carousel-item>
      </el-carousel>

    </div>

    <el-divider></el-divider>

    <div style="margin-top: 32px;min-height: 750px;">
    <!--  实战导航 -->
    <course-list :course="practiceList" />

    <!-- 新上好课 -->
    <course-list :course="newList" />

    <!-- 新手入门 -->
    <course-list :course="guideList" />

    <!-- 技能提升 -->
    <course-list :course="improveList" />

    <!-- 前言技术 -->
    <course-list :course="technologyList" />

    </div>


    <div style="margin-left: 40px;margin-right: 40px">
    <el-row>
      <el-col :span="8" v-for="(o, index) in 6" :key="o" offset="1">
        <el-card :body-style="{ padding: '0px' }" style="width: 236px">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    </div>

  </div>
</template>

<script>
  export default {

    components: {
    },
    mounted () {
      this.getHomeNavList()
    },
    name: "home",
    data() {
      return {
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
        showNavContent: false,
        practiceList: {
          "title": "实／战／推／荐",
          "leftIcon": "center 0px",
          "rightIcon": "center -36px",
          "data": [
            {
              "name": "Vue2.5开发去哪儿网App 从零基础入门到实战项目",
              "process": 100,
              "tags": ["Vue.js"],
              "type": "实战",
              "rank": "中级",
              "number": 6062,
              "star": 5,
              "price": 266,
              "img": "https://img2.mukewang.com/szimg/5ac2dfe100014a9005400300.jpg"
            },
            {
              "name": "Java电商秒杀系统深度优化 从容应对亿级流量挑战",
              "process": 0,
              "tags": ["SpringBoot", "中间件"],
              "type": "实战",
              "rank": "高级",
              "number": 453,
              "star": 5,
              "price": 366,
              "img": "https://img1.mukewang.com/szimg/5cda946c0826e4c006000338.jpg"
            },
            {
              "name": "Flutter从入门到进阶 实战携程网App",
              "process": 0,
              "tags": ["Android","iOS"],
              "type": "实战",
              "rank": "中级",
              "number": 1333,
              "star": 5,
              "price": 348,
              "img": "https://img1.mukewang.com/szimg/5c7e6835087ef3d806000338.jpg"
            },
            {
              "name": "阿里新零售数据库设计与实战 ",
              "process": 0,
              "tags": ["Java","MySQL"],
              "type": "实战",
              "rank": "初级",
              "number": 433,
              "star": 5,
              "price": 245,
              "img": "https://img2.mukewang.com/szimg/5d08d0b308c9749706000338.jpg",
              "isDiscount": true,
              "oldPrice": 288
            },
            {
              "name": "全面系统python3入门+进阶课程 零基础学python 小白也能听懂 ",
              "process": 0,
              "tags": ["Python"],
              "type": "实战",
              "rank": "初级",
              "number": 8882,
              "star": 5,
              "price": 366,
              "img": "https://img3.mukewang.com/szimg/59b8a486000107fb05400300.jpg"
            }
          ]
        },
        newList: {
          "title": "新／上／好／课",
          "leftIcon": "center -72px",
          "rightIcon": "center -108px",
          "data": [
            {
              "name": "编程必备基础知识 计算机组成原理+操作系统+计算机网络",
              "process": 0,
              "script": "新课",
              "tags": ["算法与数据结构","数学"],
              "type": "实战",
              "rank": "中级",
              "number": 557,
              "star": 5,
              "price": "199",
              "img": "https://img2.mukewang.com/szimg/5d1032ab08719e0906000338.jpg",
              "isDiscount": true,
              "oldPrice": 236
            },
            {
              "name": "Angular8开发拼多多webapp 从基础到项目实战",
              "process": 0,
              "tags": ["Angular"],
              "type": "实战",
              "rank": "中级",
              "number": 247,
              "star": 5,
              "price": 177,
              "img": "https://img4.mukewang.com/szimg/5cf8c8ad087a447906000338.jpg",
              "isDiscount": true,
              "oldPrice": 199
            },
            {
              "name": "Python数据预处理（二）- 清洗文本数据",
              "process": 0,
              "script": "新课",
              "tags": ["Python","自然语言处理"],
              "type": "实战",
              "rank": "中级",
              "number": 579,
              "star": 5,
              "price": 99,
              "img": "https://img2.mukewang.com/5ce4b17908d9928706000338-240-135.jpg"
            },
            {
              "name": "前端下一代开发语言TypeScript  从基础到axios实战",
              "process": 58,
              "tags": ["JavaScript"],
              "type": "实战",
              "rank": "中级",
              "number": 1255,
              "star": 5,
              "price": 99,
              "img": "https://img1.mukewang.com/szimg/5cbf00c608f52a3b06000338.jpg"
            },
            {
              "name": "Google老师亲授 TensorFlow2.0 入门到进阶",
              "process": 0,
              "tags": ["Python","深度学习"],
              "type": "实战",
              "rank": "中级",
              "number": 408,
              "star": 5,
              "price": 399,
              "img": "https://img2.mukewang.com/szimg/5ce7e7970894f48706000338.jpg"
            },
            {
              "name": "强力Django + 杀手级xadmin开发在线教育网站",
              "process": 0,
              "script": "新课",
              "tags": ["Python","Django"],
              "type": "实战",
              "rank": "中级",
              "number": 22,
              "star": 5,
              "price": 369,
              "img": "https://img1.mukewang.com/szimg/5d1978e80875170506000338.jpg"
            },
            {
              "name": "极速入门SpringCloud之API网关与服务发现",
              "process": 0,
              "tags": ["Java","Spring Cloud"],
              "type": "实战",
              "rank": "初级",
              "number": 3386,
              "star": 5,
              "price": 99,
              "img": "https://img.mukewang.com/5d0771a608ce48cb02000114-240-135.jpg"
            },
            {
              "name": "SpringCloud  Finchley三版本(M2+RELEASE+SR2)微服务实战",
              "process": 0,
              "script": "升级",
              "tags": ["微服务","Spring Cloud"],
              "type": "实战",
              "rank": "高级",
              "number": 4162,
              "star": 5,
              "price": 366,
              "img": "https://img1.mukewang.com/szimg/5cb68a1408ed350506000338.jpg"
            },
            {
              "name": "Flink最锋利的武器---FlinkSQL入门和实战",
              "process": 0,
              "script": "新课",
              "tags": ["微服务","Spring Cloud"],
              "type": "实战",
              "rank": "初级",
              "number": 644,
              "star": 5,
              "price": 99,
              "img": "https://img3.mukewang.com/5d0aee3909399f1f06000338-240-135.jpg"
            },
            {
              "name": "Zookeeper源码分析",
              "process": 0,
              "script": "新课",
              "tags": ["算法与数据结构","数学"],
              "type": "实战",
              "rank": "中级",
              "number": 23,
              "star": 5,
              "price": 328,
              "img": "https://img3.mukewang.com/szimg/5d1ad17f08cd16e800000000.jpg",
              "isDiscount": true,
              "oldPrice": 388
            }
          ]
        },
        guideList: {
          "title": "新／手／入／门",
          "leftIcon": "center -144px",
          "rightIcon": "center -180px",
          "banner": [
            {
              "title": "站上微信小程序风口，实现职业华丽转身",
              "subtitle": "入门技能+项目开发，逐步深入学习微信小程序开发",
              "url": "https://img.mukewang.com/5cbd837c0001b18b05670108.jpg"
            },
            {
              "title": "慕课微课",
              "subtitle": "超值课程最低一元体验",
              "url": "https://img.mukewang.com/5bf224930001991905670108.jpg"
            }
          ],
          "data": [
            {
              "name": "Java 零基础入门",
              "tags": ["JAVA攻城狮培养计划"],
              "type": "就业班",
              "rank": "中级",
              "number": 1152,
              "star": 5,
              "price": 568,
              "img": "https://climg.mukewang.com/5c80971c0001b50306000338.jpg"
            },
            {
              "name": "Python零基础入门",
              "tags": ["Python攻城狮培养计划"],
              "type": "就业班",
              "rank": "中级",
              "number": 858,
              "star": 5,
              "price": 666,
              "img": "https://climg.mukewang.com/5c877f8d0001361006000338.jpg"
            },
            {
              "name": "Android 零基础入门",
              "tags": ["Android攻城狮培养计划"],
              "type": "就业班",
              "rank": "中级",
              "number": 387,
              "star": 5,
              "price": 699,
              "img": "https://climg.mukewang.com/5c809855000179c506000338.jpg"
            },
            {
              "name": "玩转MySQL8.0新特性",
              "tags": ["Java","MySQL"],
              "type": "就业班",
              "rank": "入门",
              "number": 11845,
              "star": 5,
              "price": "0",
              "img": "https://img2.mukewang.com/5c760767084b92ce06000338-240-135.jpg"
            },
            {
              "name": "微信小程序入门与实战 常用组件API开发技巧项目实战",
              "tags": ["Html5","小程序"],
              "type": "实战",
              "rank": "初级",
              "number": 18042,
              "star": 5,
              "price": 149,
              "img": "https://img3.mukewang.com/szimg/5c0493ce000126b106000338.jpg"
            },
            {
              "name": "前端零基础入门 ",
              "tags": ["Web前端攻城狮培养计划"],
              "type": "就业班",
              "rank": "初级",
              "number": 1647,
              "star": 5,
              "price": 699,
              "img": "https://climg.mukewang.com/5c7e2b5800013ea906000338.jpg"
            },
            {
              "name": "Flutter入门与案例实战",
              "tags": ["Android"],
              "type": "实战",
              "rank": "入门",
              "number": 16096,
              "star": 5,
              "price": "0",
              "img": "https://img.mukewang.com/5c18cf540001ac8206000338-240-135.jpg"
            },
            {
              "name": "PHP小白零基础入门",
              "tags": ["PHP攻城狮培养计划"],
              "type": "就业班",
              "rank": "初级",
              "number": 892,
              "star": 5,
              "price": "658",
              "img": "https://climg.mukewang.com/5993e8880001521206000338.jpg"
            },
            {
              "name": "深入浅出Java多线程",
              "tags": ["Java"],
              "type": "实战",
              "rank": "入门",
              "number": 170123,
              "star": 5,
              "price": "0",
              "img": "https://img4.mukewang.com/5704a9550001f74606000338-240-135.jpg"
            },
            {
              "name": "从0开始 独立完成企业级Java电商网站开发(服务端)",
              "tags": ["Linux","SSM"],
              "type": "实战",
              "rank": "中级",
              "number": 7541,
              "star": 5,
              "price": "348",
              "img": "https://img2.mukewang.com/szimg/58f57d200001461105400300.jpg"
            }
          ]
        },
        improveList: {
          "title": "技／能／提／升",
          "leftIcon": "center -216px",
          "rightIcon": "center -252px",
          "banner": [
            {
              "title": "Vue高级工程师实战之路",
              "subtitle": "从Vue基础语法入门最流行的SSR技术实现，完美学习路线打造快速晋升之路！",
              "url": "https://img.mukewang.com/5bf225290001b0f105670108.jpg"
            },
            {
              "title": "Python开发一站式学习",
              "subtitle": "从入门到开发，学习 好玩 好用 好未来的Python语言",
              "url": "https://img.mukewang.com/5b86024c0001e0a805670108.jpg"
            }
          ],
          "data": [
            {
              "name": "JavaScript版 数据结构与算法",
              "process": 25,
              "tags": ["JavaScript","算法与数据结构"],
              "type": "实战",
              "rank": "中级",
              "number": 1514,
              "star": 5,
              "price": 266,
              "img": "https://img4.mukewang.com/szimg/5c62a4dc0812e84106000338.jpg"
            },
            {
              "name": "Socket网络编程进阶与实战",
              "tags": ["Java","Android"],
              "type": "实战",
              "rank": "中级",
              "number": 1344,
              "star": 5,
              "price": 348,
              "img": "https://img2.mukewang.com/szimg/5bc3f1420001abf206000338.jpg"
            },
            {
              "name": "Spring Boot 2.0深度实践之系列总览",
              "tags": ["Java","SpringBoot"],
              "type": "实战",
              "rank": "高级",
              "number": 20499,
              "star": 5,
              "price": 0,
              "img": "https://img1.mukewang.com/5bbafd180001688d06000338-240-135.jpg"
            },
            {
              "name": "2019版 微服务时代Spring Boot企业微信点餐系统",
              "script": "升级",
              "tags": ["Java","SpringBoot"],
              "type": "实战",
              "rank": "高级",
              "number": 20499,
              "star": 5,
              "price": 0,
              "img": "https://img1.mukewang.com/5bbafd180001688d06000338-240-135.jpg"
            },
            {
              "name": "系统学习Docker 践行DevOps理念",
              "tags": ["Docker","Kubernetes"],
              "type": "实战",
              "rank": "中级",
              "number": 1611,
              "star": 5,
              "price": 299,
              "img": "https://img4.mukewang.com/szimg/5a9614850001bc3405400300.jpg"
            },
            {
              "name": "全面掌握Django ORM",
              "tags": ["Python","Django"],
              "type": "实战",
              "rank": "中级",
              "number": 1511,
              "star": 5,
              "price": 0,
              "img": "https://img3.mukewang.com/5c0f95640001d03c06000338-240-135.jpg"
            },
            {
              "name": "纯正商业级应用 Node.js Koa2开发微信小程序服务端",
              "script": "热门",
              "tags": ["Node.js","小程序"],
              "type": "实战",
              "rank": "中级",
              "number": 764,
              "star": 5,
              "price": 366,
              "img": "https://img1.mukewang.com/szimg/5ccec7ba08430b1d06000338.jpg"
            },

            {
              "name": "MyBatis-Plus入门",
              "tags": ["Python","Django"],
              "type": "实战",
              "rank": "中级",
              "number": 1511,
              "star": 5,
              "price": 0,
              "img": "https://img4.mukewang.com/5ce2698608207d4006000338-240-135.jpg"
            },
            {
              "name": "Vue.js源码全方位深入解析 ",
              "process": 38,
              "tags": ["Vue.js"],
              "type": "实战",
              "rank": "高级",
              "number": 2180,
              "star": 5,
              "price": 488,
              "img": "https://img3.mukewang.com/szimg/5b17bad10001535305400300.jpg"
            },
            {
              "name": "Grid布局基础",
              "tags": ["CSS","CSS3"],
              "type": "实战",
              "rank": "中级",
              "number": 7693,
              "star": 5,
              "price": 0,
              "img": "https://img.mukewang.com/5c98c090094329d806000338-240-135.jpg"
            }
          ]
        },
        technologyList: {
          "title": "前／沿／技／术",
          "leftIcon": "center -288px",
          "rightIcon": "center -324px",
          "banner": [
            {
              "title": "盘点最主流的前端框架有哪些？",
              "subtitle": "上万人的选择打消你对主流框架的疑惑",
              "url": "https://img.mukewang.com/5b8602900001bd8905670108.jpg"
            },
            {
              "title": "改变职场命运，修炼全栈工程师的必修课",
              "subtitle": "练就编程十八般武艺，快速转型全栈开发，做全能型工程师！",
              "url": "https://img.mukewang.com/5b70eebd0001bf7a05670108.jpg"
            }
          ],
          "data": [
            {
              "name": "Google老师亲授 TensorFlow2.0 入门到进阶",
              "tags": ["Python","算法与数据结构"],
              "type": "实战",
              "rank": "中级",
              "number": 409,
              "star": 5,
              "price": 399,
              "img": "https://img4.mukewang.com/szimg/5ce7e7970894f48706000338.jpg"
            },
            {
              "name": "深度学习之目标检测常用算法原理+实践精讲",
              "tags": ["深度学习","计算机视觉"],
              "type": "实战",
              "rank": "中级",
              "number": 409,
              "star": 5,
              "price": 499,
              "img": "https://img3.mukewang.com/szimg/5bfb523c0001290905400300.jpg"
            },
            {
              "name": "2018 AWS技术峰会  自动化运维、微服务及容器技术分论坛",
              "tags": ["云计算"],
              "type": "实战",
              "rank": "高级",
              "number": 2370,
              "star": 5,
              "price": 0,
              "img": "https://img.mukewang.com/5be8f5a40001482306000338-240-135.jpg"
            },
            {
              "name": "新一代大数据计算引擎  Flink从入门到实战",
              "tags": ["大数据", "Flink"],
              "type": "实战",
              "rank": "高级",
              "number": 311,
              "star": 5,
              "price": 388,
              "img": "https://img3.mukewang.com/szimg/5c87891f08dd162706000338.jpg"
            },
            {
              "name": "NLP实践TensorFlow打造聊天机器人",
              "tags": ["深度学习","自然语言处理"],
              "type": "实战",
              "rank": "中级",
              "number": 611,
              "star": 4,
              "price": 348,
              "img": "https://img4.mukewang.com/szimg/5b6910d30001adad05400300.jpg"
            },
            {
              "name": "私有区块链，我们一起GO",
              "tags": ["Go","区块链"],
              "type": "实战",
              "rank": "中级",
              "number": 14639,
              "star": 5,
              "price": 0,
              "img": "https://img.mukewang.com/5b4705c90001fc9506000338-240-135.jpg"
            },
            {
              "name": "Python3+TensorFlow打造人脸识别智能小程序",
              "tags": ["深度学习","计算机视觉"],
              "type": "实战",
              "rank": "中级",
              "number": 348,
              "star": 5,
              "price": 466,
              "img": "https://img3.mukewang.com/szimg/5c9a0db9088d218306000338.jpg"
            },
            {
              "name": "TensorFlow与Flask结合打造手写体数字识别",
              "tags": ["深度学习","计算机视觉"],
              "type": "实战",
              "rank": "中级",
              "number": 14639,
              "star": 4,
              "price": 0,
              "img": "https://img1.mukewang.com/5afe7ffa00018fff06000338-240-135.jpg"
            },
            {
              "name": "Hadoop基础与电商行为日志分析 新手入门大数据",
              "tags": ["大数据","Hadoop"],
              "type": "实战",
              "rank": "中级",
              "number": 348,
              "star": 2,
              "price": 288,
              "img": "https://img3.mukewang.com/szimg/5c203a4b0001dcf306000338.jpg"
            },
            {
              "name": "自然语言处理（NLP）入门与实践",
              "tags": ["机器学习","自然语言处理"],
              "type": "实战",
              "rank": "初级",
              "number": 7609,
              "star": 3,
              "price": 0,
              "img": "https://img4.mukewang.com/5bd8219400016e5e06000336-240-135.jpg"
            }
          ]
        }
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

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 230px;
    height :140px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

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
