<template>
  <div class="app-container" style="width: 1200px">
    <div class="course-detail-header">
      <div class="header">
        <div class="header-content m-center">
          <h2 class="title">
            {{ course.className }}
          </h2>
          <div class="information">
            <div class="teacher">
              <img :src="course.teacher.avatar" class="avatar" alt="">
              <div class="teacher-introduce">
                <p class="name">
                  {{ course.teacher }}
                </p>
                <p class="job">
                  {{ course.teacher.job }}
                </p>
              </div>
              <dl>
                <dd>难度：{{ course.level }}</dd>
                <dd>时长：{{ course.duration }}</dd>
                <dd>学习人数：{{ course.studyNumber }}</dd>
                <dd>综合评分：{{ course.score }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="course-detail-content">
      <div class="detail-nav">
        <ul class="m-center">
          <li
            class="nav-item"
          >
            课程章节
          </li>
        </ul>
      </div>
      <!-- 内容部分 -->
      <div class="detail-information m-center">
        <div class="information-left">
          <div class="chapter">
            <div v-if="course.introduction" class="chapter-introduce">
              简介：{{ course.introduction }}
            </div>
            <div v-for="(chapter,index) in course.courseChapterVos" :key="index" class="chapter-item">
              <h2 class="chapter-title">
                {{ chapter.name }}
              </h2>
              <ul style="list-style-type:none">
                <li v-for="(child, index) in chapter.children" :key="index" class="term-item" @click="playVideo(child.id)">
                  <p>
                    <span class="iconfont play"><i class="el-icon-video-play" /></span>
                    <span>{{ child.name }}({{ child.videoLength }})</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryCourseById } from '@/api/course'

export default {
  name: 'CourseDetail',
  data() {
    return {
      course: ''
    }
  },
  mounted() {
    this.queryCourseDetail()
  },
  methods: {
    queryCourseDetail() {
      const id = this.$route.params.id
      queryCourseById(id).then(res => {
        this.course = res.data
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .course-detail-content
    .detail-nav
      position: relative;
      height: 68px;
      line-height: 68px;
      box-shadow: 0 4px 8px 0 rgba(7,17,27,0.15);
      .nav-item
        position: relative;
        display: inline-block;
        margin-right: 80px;
        font-size: 16px;
        color: #1c1f21;
        font-weight: 700;
        cursor: pointer;
        &.active
          color: #f20d0d;
          &::after {
            content: '';
            display: block;
            margin: -15px auto 0px;
            width: 16px;
            height: 3px;
            border-radius: 15px;
            background-color: #f20d0d;
          }
        .nav-number
          display: inline-block;
          position: absolute;
          top: 10px;
          right: -20px;
          font-size: 12px;
          line-height: 1;
          color: #9199a1;
    .detail-information
      margin-top: 36px;
      margin-bottom: 36px;
      display: flex;
      align-items: top;
      .information-left
        flex: 1;
      .information-right
        margin-left: 32px;
        flex: 0 0 320px;
        width: 320px;
        & > div
          margin-bottom: 36px;
  .chapter
    & > div
      margin-bottom: 16px;
      padding: 24px 32px 32px;
      background-color: #fff;
      box-shadow: 0 8px 16px rgba(7,17,27,0.1);
      border-radius: 12px;
      color: #1c1f21;
      font-size: 14px;
      &.chapter-introduce
        line-height: 28px;
      &.chapter-item
        .chapter-title
          font-size: 16px;
          line-height: 24px;
          font-weight: 700;
        .chapter-desc
          margin-top: 2px;
          margin-bottom: 16px;
          font-size: 12px;
          color: #545c63;
        .term-item
          width: 100%;
          padding-left: 12px;
          line-height: 48px;
          cursor: pointer;
          & > p
            display: flex;
            align-items: center;
            & > span
              &:nth-child(2)
                flex: 1;
          &:hover
            background-color: rgba(242,13,13,.05);
            border-radius: 4px;
            color: #f20d0d;
            .play
              color: #f20d0d;
            .right
              & > i
                color: #f20d0d!important;
          .play
            margin-right: 8px;
            font-size: 24px;
            color: #9199a1;
          .right
            margin-right:15px;
            font-size: 16px;
            color: #d9dde1;
            .complete, .doning
              color: #00b43c;
              font-size: 12px;
            .doning
              i
                margin-left: 10px;
                font-size: 12px;
    .complete-info
      margin-bottom: 16px;
      padding: 12px 0 12px 32px;
      font-size: 16px;
      color: #93999f;
      line-height: 24px;
      .iconfont
        display: inline-block;
        vertical-align: middle;
        margin-right: 12px;
        font-size: 24px;
  .course-detail-tips
    padding: 24px 32px 32px;
    background-color: #fff;
    box-shadow: 0 8px 16px 0 rgba(7,17,27,.1);
    border-radius: 12px;
    .learn-info
      padding-bottom: 12px;
      font-size: 12px;
      color: #545c63;
      & > p
        margin-bottom: 9px;
        line-height: 24px;
        &.latest
          margin-top: 24px;
          line-height: 1;
        .percent
          font-size: 14px;
          font-weight: 700;
        .duration
          float: right;
    .tips-btn
      padding: 11px 32px;
      border-radius: 24px;
      background-color: #f20d0d;
      text-align: center;
      line-height: 24px;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      &:hover
        background-color: #c20a0a;
    .tips-content
      dl
        margin-top: 24px;
        dt
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
        dd
          color: #545c63;
          font-size: 12px;
          line-height: 24px;

  .course-detail-header
    height: 200px;
    background-image: linear-gradient(90deg, #19172D, #645DB7);
    .header
      height: 100%;
      .header-content
        position: relative;
        height: 100%;
        color: #fff;
        .breadcrumb-box
          padding: 16px 0 24px 0;
          line-height: 24px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        .share-box
          position: absolute;
          right: 0;
          top: 16px;
          font-size: 12px;
          line-height: 24px;
          cursor: pointer;
          color: rgba(255,255,255,0.5);
          & > span
            margin: 0 12px;
            &:hover
              color: #fff;
          .iconfont
            font-size: 24px;
        .title
          margin-bottom: 8px;
          font-size: 32px;
          color: #fff;
          line-height: 48px;
        .information
          .teacher
            vertical-align: middle;
            display: flex;
            align-items: center;
            .avatar
              width: 48px;
              heighth: 48px;
              border-radius: 50%;
            .teacher-introduce
              margin-left: 8px;
              .name
                font-size: 14px;
                line-height: 24px;
                font-weight: 700;
              .job
                font-size: 12px;
            dl
              flex: 1;
              margin-left: 50px;
              dd
                display: inline-block;
                vertical-align: middle;
                margin: 0 10px;
                font-size: 12px;
                font-weight: 700;
                color: rgba(255,255,255,0.8);
</style>
