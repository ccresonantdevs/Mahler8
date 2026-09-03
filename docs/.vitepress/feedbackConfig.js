/**
 * Mahler VIII 讀本回饋與流量分析設定
 */
export const feedbackConfig = {
  // 1. Tally Form ID（已正式綁定）
  tallyFormId: '7RkOvP',

  // 2. 整合模式：'tally-popup'（直接叫用 Tally 官方的精緻彈窗，自動傳遞章節資訊）
  mode: 'tally-popup',

  // 3. 自訂接收端點（可選）
  customEndpointUrl: '',

  // 4. Cloudflare Web Analytics Token（選填，留空則不載入分析）
  cloudflareAnalyticsToken: ''
}
