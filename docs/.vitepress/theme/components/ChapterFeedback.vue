<script setup>
import { computed, onMounted } from 'vue'
import { useData } from 'vitepress'
import { feedbackConfig } from '../../feedbackConfig.js'

const { page } = useData()

// 判斷是否為章節頁面（不干擾非文章頁）
const isChapterPage = computed(() => {
  const path = page.value.relativePath || ''
  return path.startsWith('chapters/') || path.includes('CORE_')
})

// 擷取章節代碼（如 CORE_01）
const chapterId = computed(() => {
  const path = page.value.relativePath || ''
  const match = path.match(/CORE_\d+/)
  return match ? match[0] : (path.replace(/\.md$/, '') || 'INDEX')
})

// 擷取章節標題
const chapterTitle = computed(() => {
  return page.value.title || '馬勒第八號交響曲讀本'
})

// 開啟回饋對話框（叫用 Tally 官方浮層彈窗，自動傳遞隱藏欄位）
function openFeedbackModal() {
  if (typeof window === 'undefined') return

  const hiddenData = {
    chapter_id: chapterId.value,
    chapter_title: chapterTitle.value,
    page_url: window.location.href
  }

  if (window.Tally) {
    window.Tally.openPopup(feedbackConfig.tallyFormId, {
      layout: 'modal',
      width: 620,
      autoClose: 2000,
      hiddenFields: hiddenData
    })
  } else {
    // 容錯備援：若腳本被廣告阻擋，以帶參數網址順暢開啟
    const params = new URLSearchParams(hiddenData)
    window.open(`https://tally.so/r/${feedbackConfig.tallyFormId}?${params.toString()}`, '_blank')
  }
}

// 閱讀過程背景預載入（Pre-warm），讓讀者點擊時瞬間打開彈窗，不卡頓
function prewarmTally() {
  if (typeof window === 'undefined' || !feedbackConfig.tallyFormId) return

  // 1. 動態加入 HTML Prefetch 標籤
  try {
    const prefetchLink = document.createElement('link')
    prefetchLink.rel = 'prefetch'
    prefetchLink.href = `https://tally.so/r/${feedbackConfig.tallyFormId}`
    document.head.appendChild(prefetchLink)
  } catch (e) {
    // 忽略
  }

  // 2. 利用瀏覽器閒置時間 (requestIdleCallback，帶 2.5 秒超時保證) 預載入 Tally 資源
  const executePrewarm = () => {
    try {
      if (window.Tally && window.Tally.loadEmbeds) {
        window.Tally.loadEmbeds()
      }
      const prewarmFrame = document.createElement('iframe')
      prewarmFrame.src = `https://tally.so/r/${feedbackConfig.tallyFormId}`
      prewarmFrame.style.display = 'none'
      prewarmFrame.style.width = '0'
      prewarmFrame.style.height = '0'
      prewarmFrame.setAttribute('aria-hidden', 'true')
      prewarmFrame.setAttribute('tabindex', '-1')
      document.body.appendChild(prewarmFrame)
    } catch (e) {
      // 忽略
    }
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(executePrewarm, { timeout: 2500 })
  } else {
    setTimeout(executePrewarm, 1500)
  }
}

onMounted(() => {
  prewarmTally()
})
</script>

<template>
  <div v-if="isChapterPage" class="chapter-feedback-wrapper">
    <!-- 極簡條狀回饋入口（不佔版面、不重複算星等） -->
    <aside class="feedback-compact-bar" aria-label="本章意見回饋入口">
      <div class="feedback-bar-content">
        <div class="feedback-text-group">
          <span class="feedback-icon" aria-hidden="true">💬</span>
          <span class="feedback-prompt">對本章內容有想法、想挑錯或給評分？</span>
        </div>
        <button
          type="button"
          class="feedback-action-btn"
          @click="openFeedbackModal"
          aria-label="留下本章意見與評分"
        >
          <span>留下意見與評分</span>
          <span class="arrow-symbol" aria-hidden="true">→</span>
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.chapter-feedback-wrapper {
  margin-top: 36px;
  margin-bottom: 20px;
}

/* 輕量緊湊的條狀卡片（高度僅約 50px，完全不突兀佔位） */
.feedback-compact-bar {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
  padding: 12px 18px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: border-color 0.2s ease;
}

.feedback-compact-bar:hover {
  border-color: var(--vp-c-brand-1);
}

.feedback-bar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.feedback-text-group {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.94rem;
  color: var(--vp-c-text-2);
}

.feedback-icon {
  font-size: 1.1rem;
}

.feedback-prompt {
  font-weight: 500;
  letter-spacing: 0.01em;
}

/* 操作按鈕：舒適且低調的膠囊外觀 */
.feedback-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 20px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-brand-1);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  min-height: 38px;
  touch-action: manipulation;
}

.feedback-action-btn:hover {
  background-color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.18);
}

.arrow-symbol {
  font-size: 0.95rem;
  transition: transform 0.2s ease;
}

.feedback-action-btn:hover .arrow-symbol {
  transform: translateX(2px);
}

/* =======================================================
   手機端適配（螢幕窄時優雅折為兩行）
   ======================================================= */
@media (max-width: 640px) {
  .feedback-bar-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .feedback-action-btn {
    width: 100%;
    justify-content: center;
    min-height: 42px;
  }
}
</style>
