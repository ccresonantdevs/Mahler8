<script setup>
import DefaultTheme from 'vitepress/theme'
import ChapterFeedback from './components/ChapterFeedback.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- 在章節正文結尾、上一章/下一章按鈕正上方插入章節評分與意見組件 -->
    <template #doc-footer-before>
      <ChapterFeedback />
    </template>
  </Layout>
</template>
