import { defineConfig } from 'vitepress'
import { feedbackConfig } from './feedbackConfig.js'

const head = [
  ['link', { rel: 'icon', type: 'image/png', href: '/Mahler8/logo.png' }],
  ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover' }]
]

// 支援 Tally 官方彈窗腳本載入與連線預熱（極速開啟）
if (feedbackConfig.tallyFormId) {
  head.push(['link', { rel: 'preconnect', href: 'https://tally.so' }])
  head.push(['link', { rel: 'dns-prefetch', href: 'https://tally.so' }])
  head.push(['script', { async: '', src: 'https://tally.so/widgets/embed.js' }])
}

// 支援 Cloudflare Web Analytics Beacon 隱私流量分析（當配置 Token 時啟用）
if (feedbackConfig.cloudflareAnalyticsToken) {
  head.push([
    'script',
    {
      defer: '',
      src: 'https://static.cloudflareinsights.com/beacon.min.js',
      'data-cf-beacon': JSON.stringify({ token: feedbackConfig.cloudflareAnalyticsToken })
    }
  ])
}

export default defineConfig({
  title: '馬勒第八號交響曲讀本',
  description: '專為團員與愛樂者設計的深度導讀與思想背景探索',
  base: '/Mahler8/',
  head,
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首頁（序章）', link: '/' },
      { text: '開始閱讀', link: '/chapters/CORE_01_READER_DRAFT' },
      { text: '資料與製作', link: '/appendix/SOURCES_AND_PRODUCTION_NOTE' },
      { text: '🔖 v1.0.1 (2026-09-05)', link: '/appendix/SOURCES_AND_PRODUCTION_NOTE' }
    ],
    sidebar: [
      {
        text: '📖 導讀首頁',
        items: [
          {
            text: '<div class="sb-item"><strong class="sb-title">交響曲如何裝下整個宇宙？</strong><span class="sb-sub">從中世紀聖歌走到現代詩劇的兩千人大哉問</span></div>',
            link: '/'
          }
        ]
      },
      {
        text: '第一部：城市的交錯與思想背景',
        collapsed: false,
        items: [
          {
            text: '<div class="sb-item"><strong class="sb-title">走進維也納</strong><span class="sb-sub">一座城市，幾種互不相讓的未來</span></div>',
            link: '/chapters/CORE_01_READER_DRAFT'
          },
          {
            text: '<div class="sb-item"><strong class="sb-title">馬勒為什麼選《浮士德》？</strong><span class="sb-sub">一部尚未寫完就開始被唱的傳奇作品</span></div>',
            link: '/chapters/CORE_02_READER_DRAFT'
          }
        ]
      },
      {
        text: '第二部：歌德《浮士德》的核心謎題',
        collapsed: false,
        items: [
          {
            text: '<div class="sb-item"><strong class="sb-title">讀懂馬勒選中的浮士德</strong><span class="sb-sub">一個永遠不能停下來的人</span></div>',
            link: '/chapters/CORE_03_READER_DRAFT'
          },
          {
            text: '<div class="sb-item"><strong class="sb-title">浮士德做過那些事</strong><span class="sb-sub">天使為什麼還要救他？</span></div>',
            link: '/chapters/CORE_04_READER_DRAFT'
          },
          {
            text: '<div class="sb-item"><strong class="sb-title">「永恆女性」牽引的「我們」</strong><span class="sb-sub">終場到底包括了誰？</span></div>',
            link: '/chapters/CORE_05_READER_DRAFT'
          }
        ]
      },
      {
        text: '第三部：青年網絡與聖歌的降臨',
        collapsed: false,
        items: [
          {
            text: '<div class="sb-item"><strong class="sb-title">回到年輕的馬勒</strong><span class="sb-sub">一架鋼琴能證明朋友教會了他什麼嗎？</span></div>',
            link: '/chapters/CORE_06_READER_DRAFT'
          },
          {
            text: '<div class="sb-item"><strong class="sb-title">走進第一部聖歌</strong><span class="sb-sub">《來吧，創造者聖靈》究竟在祈求什麼？</span></div>',
            link: '/chapters/CORE_07_READER_DRAFT'
          }
        ]
      },
      {
        text: '第四部：音樂的跨部整合與歷史定位',
        collapsed: false,
        items: [
          {
            text: '<div class="sb-item"><strong class="sb-title">兩座世界的重疊</strong><span class="sb-sub">兩部《馬勒第八號》如何變成同一部作品？</span></div>',
            link: '/chapters/CORE_08_READER_DRAFT'
          },
          {
            text: '<div class="sb-item"><strong class="sb-title">當一口氣長成全體之聲</strong><span class="sb-sub">《馬勒第八號》的巨大尺度做了什麼？</span></div>',
            link: '/chapters/CORE_09_READER_DRAFT'
          },
          {
            text: '<div class="sb-item"><strong class="sb-title">交響曲、祈禱還是烏托邦？</strong><span class="sb-sub">六個名字如何改變我們聽見的作品</span></div>',
            link: '/chapters/CORE_10_READER_DRAFT'
          }
        ]
      },
      {
        text: '附錄',
        collapsed: false,
        items: [
          {
            text: '<div class="sb-item"><strong class="sb-title">資料來源與製作說明</strong><span class="sb-sub">證據界線、AI 協作與各章參考方向</span></div>',
            link: '/appendix/SOURCES_AND_PRODUCTION_NOTE'
          },
          {
            text: '<div class="sb-item"><strong class="sb-title">主要參考文獻</strong><span class="sb-sub">原始文本、馬勒、浮士德與文化史研究</span></div>',
            link: '/appendix/REFERENCES'
          }
        ]
      }
    ],
    docFooter: {
      prev: '← 上一章',
      next: '下一章 →'
    },
    outline: {
      label: '本章目錄',
      level: [2, 3]
    },
    lastUpdated: {
      text: '最後更新於',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },
    footer: {
      message: '馬勒第八號交響曲讀本 · 正式版 v1.0.1（發布日期：2026-09-05）',
      copyright: '作者｜鄒年城'
    }
  }
})
