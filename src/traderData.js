/**
 * traderData.js
 * ---------------------------------------------------------------------------
 * The single data file for the whole dashboard. Every number, label, and
 * piece of copy on the site is read from TRADER_DATA below — nothing is
 * hardcoded in the templates. Edit this file to make the dashboard yours.
 *
 * LIVE DATA / BROKER API INTEGRATION
 * ---------------------------------------------------------------------------
 * fetchTraderData() at the bottom of this file is the single integration
 * point for real trading data. Right now it just resolves the local
 * TRADER_DATA object below, so the whole site works with zero backend.
 *
 * To go live, replace the body of fetchTraderData() — the renderer, the
 * animations, and the periodic live-refresh polling in main.js already
 * expect data in exactly this shape, so nothing else needs to change.
 *
 *   Option A — an admin panel writing a JSON file:
 *     const res = await fetch('/data/trader-data.json', { cache: 'no-store' });
 *     return res.json();
 *
 *   Option B — a broker or prop-firm API:
 *     const res = await fetch('https://your-broker-api.example/account/summary', {
 *       headers: { Authorization: `Bearer ${import.meta.env.VITE_BROKER_TOKEN}` },
 *     });
 *     const account = await res.json();
 *     return mapBrokerResponseToTraderData(account); // write this mapper
 *       // so its return value matches the TRADER_DATA shape below.
 * ---------------------------------------------------------------------------
 */

export const TRADER_DATA = {
  // Site-level configuration — not trading content, but drives behavior.
  meta: {
    // Used to build the QR code. Leave blank to fall back to the page's
    // own URL at runtime (window.location).
    siteUrl: '',
    // How often the dashboard polls fetchTraderData() for updates, in ms.
    refreshIntervalMs: 30000,
    // Point this at a real file (e.g. '/reports/monthly-report.pdf') once
    // one exists in your project's public/ folder, and the "Download
    // Report" button will link straight to it.
    reportUrl: '',
    // If reportUrl is empty, the button instead generates a real CSV
    // report from the live data below, on click. Set this to false to
    // hide the button entirely when no reportUrl is set, instead.
    autoGenerateReport: true,
  },

  nav: [
    { id: 'home', label: '~/home' },
    { id: 'profile', label: '~/profile' },
    { id: 'overview', label: '~/overview' },
    { id: 'portfolio', label: '~/portfolio' },
    { id: 'performance', label: '~/performance' },
    { id: 'activity', label: '~/activity' },
    { id: 'contact', label: '~/contact' },
  ],

  disclaimer:
    'Past performance is not a guarantee of future results. This is for informational purposes only, not financial advice.',

  trader: {
    name: 'Alexa Novak',
    title: 'Independent Trader — FX, Futures & Gold',
    location: 'Remote — GMT-5',
    email: 'contact@alexanovak.trade',
    monogram: 'AN',
    availability: 'Open to managed account inquiries & mentorship',
  },

  hero: {
    eyebrow: 'Verified Track Record · Live Account',
    title: 'Consistent returns, built on disciplined risk management.',
    subtitle:
      'A fully transparent, self-funded trading track record — every position sized, every trade logged, every result shown as-is.',
    primaryCta: { label: 'View Live Dashboard', href: '#overview' },
    secondaryCta: { label: 'Download Report', icon: 'download' },
  },

  profile: {
    eyebrow: '~/profile',
    title: 'Trader profile',
    paragraphs: [
      'I\u2019m Alexa — an independent trader focused on FX majors, index futures, and gold, with a rules-based approach built around risk-first position sizing.',
      'Every trade you see on this dashboard comes from one live account, tracked in full — wins, losses, and everything in between. Nothing here is cherry-picked, and I don\u2019t trade with money I can\u2019t afford to lose.',
      'When I\u2019m not at the desk, I\u2019m backtesting new setups, writing about risk management, or mentoring traders who are earlier in the process than I was.',
    ],
    facts: [
      { key: 'strategy', value: "'Trend-following + mean reversion'" },
      { key: 'markets', value: "'FX majors, Index futures, Gold'" },
      { key: 'trading since', value: "'2017'" },
      { key: 'risk per trade', value: "'Max 1.5% of capital'" },
    ],
  },

  overview: {
    eyebrow: '~/overview',
    title: 'Trading overview',
    intro: 'Live account metrics, updated automatically from the data feed below.',
    groups: [
      {
        name: 'Capital & Returns',
        items: [
          { key: 'capital', label: 'Total Capital', value: 128450, format: 'currency', signed: false },
          { key: 'grossProfit', label: 'Gross Profit', value: 42360, format: 'currency', signed: true },
          { key: 'grossLoss', label: 'Gross Loss', value: -24120, format: 'currency', signed: true },
          { key: 'netPnl', label: 'Net P&L', value: 18240, format: 'currency', signed: true },
          { key: 'roi', label: 'ROI', value: 14.2, format: 'percent', signed: true },
        ],
      },
      {
        name: 'Activity & Efficiency',
        items: [
          { key: 'winRate', label: 'Win Rate', value: 61.4, format: 'percent', signed: false, bar: true },
          { key: 'totalTrades', label: 'Total Trades', value: 386, format: 'number', signed: false },
          { key: 'turnover', label: 'Trading Turnover', value: 2415000, format: 'currency', signed: false },
        ],
      },
    ],
  },

  balance: {
    eyebrow: '~/portfolio',
    title: 'Portfolio composition & monthly results',
    intro: 'A snapshot of what the account holds, and how it has performed month by month.',
    assets: {
      tab: 'assets.json',
      items: [
        { key: 'cash', value: "'$42,300'" },
        { key: 'open positions', value: "'$68,900'" },
        { key: 'margin available', value: "'$17,250'" },
        { key: 'total assets', value: "'$128,450'", emphasis: true },
      ],
    },
    liabilities: {
      tab: 'liabilities.json',
      items: [
        { key: 'margin used', value: "'$31,400'" },
        { key: 'open exposure', value: "'$54,200'" },
        { key: 'pending withdrawals', value: "'$4,000'" },
        { key: 'total liabilities', value: "'$89,600'", emphasis: true },
      ],
    },
  },

  monthlyPnl: {
    title: 'Monthly P&L',
    intro: 'Net result by month, last 12 months. Figures are illustrative sample data.',
    months: [
      { month: 'Sep 2025', trades: 30, winRate: 60, pnl: 2450, roi: 2.1 },
      { month: 'Oct 2025', trades: 34, winRate: 56, pnl: 1180, roi: 1.0 },
      { month: 'Nov 2025', trades: 28, winRate: 64, pnl: 3120, roi: 2.6 },
      { month: 'Dec 2025', trades: 22, winRate: 50, pnl: -840, roi: -0.7 },
      { month: 'Jan 2026', trades: 31, winRate: 58, pnl: 1560, roi: 1.3 },
      { month: 'Feb 2026', trades: 29, winRate: 62, pnl: 2780, roi: 2.3 },
      { month: 'Mar 2026', trades: 35, winRate: 66, pnl: 4820, roi: 3.9 },
      { month: 'Apr 2026', trades: 27, winRate: 52, pnl: -1120, roi: -0.9 },
      { month: 'May 2026', trades: 33, winRate: 61, pnl: 2340, roi: 1.9 },
      { month: 'Jun 2026', trades: 30, winRate: 57, pnl: 980, roi: 0.8 },
      { month: 'Jul 2026', trades: 26, winRate: 55, pnl: -1380, roi: -1.1 },
      { month: 'Aug 2026', trades: 21, winRate: 62, pnl: 2350, roi: 1.9 },
    ],
  },

  performance: {
    eyebrow: '~/performance',
    title: 'Performance highlights',
    intro: 'The best and worst of the live account, plus two headline risk metrics.',
    items: [
      {
        featured: true,
        tab: 'best-trade.json',
        label: 'Best Trade',
        headline: '+$4,820',
        meta: 'XAU/USD · Long · Mar 12, 2026',
        tone: 'positive',
        tags: ['Gold', 'Trend', 'Swing'],
        stats: [
          { label: 'Entry', value: '2,032.40' },
          { label: 'Exit', value: '2,101.10' },
          { label: 'Duration', value: '4d 6h' },
          { label: 'R-Multiple', value: '+3.2R' },
        ],
      },
      {
        tab: 'worst-trade.json',
        label: 'Worst Trade',
        headline: '-$1,380',
        meta: 'NAS100 · Short · Jul 18, 2026',
        tone: 'negative',
        tags: ['Index', 'News Event'],
        stats: [
          { label: 'Entry', value: '19,840' },
          { label: 'Exit', value: '20,115' },
          { label: 'Duration', value: '2h 15m' },
          { label: 'R-Multiple', value: '-1.4R' },
        ],
      },
      {
        tab: 'win-streak.json',
        label: 'Longest Win Streak',
        headline: '11 trades',
        meta: 'Feb 18 – Mar 9, 2026',
        tone: 'positive',
        tags: ['Consistency', 'Trend-following'],
        stats: [
          { label: 'Net gain', value: '+$6,940' },
          { label: 'Avg R', value: '+1.8R' },
          { label: 'Instruments', value: 'Gold, EUR/USD' },
          { label: 'Win rate', value: '100%' },
        ],
      },
      {
        tab: 'max-drawdown.json',
        label: 'Max Drawdown',
        headline: '-8.4%',
        meta: 'Dec 3 – Dec 19, 2025',
        tone: 'negative',
        tags: ['Risk', 'Recovered in 6 weeks'],
        stats: [
          { label: 'Peak equity', value: '$121,600' },
          { label: 'Trough equity', value: '$111,400' },
          { label: 'Recovered', value: 'Jan 30, 2026' },
          { label: 'Trades in DD', value: '9' },
        ],
      },
    ],
  },

  activity: {
    eyebrow: '~/activity',
    title: 'Recent trades',
    intro: 'The last few closed positions on the live account, most recent first.',
    trades: [
      {
        type: 'win',
        date: 'Aug 27, 2026',
        symbol: 'EUR/USD',
        side: 'Long',
        pnl: 640,
        note: 'Breakout continuation after ECB comments; closed at target.',
      },
      {
        type: 'win',
        date: 'Aug 25, 2026',
        symbol: 'XAU/USD',
        side: 'Long',
        pnl: 1210,
        note: 'Trend-following entry off the 50 EMA pullback.',
      },
      {
        type: 'loss',
        date: 'Aug 22, 2026',
        symbol: 'GBP/USD',
        side: 'Short',
        pnl: -310,
        note: 'Stopped out on a false breakdown; managed risk as planned.',
      },
      {
        type: 'win',
        date: 'Aug 19, 2026',
        symbol: 'US30',
        side: 'Long',
        pnl: 480,
        note: 'Momentum trade into the close; scaled out in two parts.',
      },
      {
        type: 'loss',
        date: 'Aug 14, 2026',
        symbol: 'NAS100',
        side: 'Short',
        pnl: -275,
        note: 'Reduced size ahead of the CPI print; stop hit within range.',
      },
      {
        type: 'win',
        date: 'Aug 8, 2026',
        symbol: 'EUR/USD',
        side: 'Long',
        pnl: 390,
        note: 'Range reversal at key support with confirmation candle.',
      },
    ],
  },

  contact: {
    eyebrow: '~/contact',
    title: 'Get in touch',
    intro:
      'Questions about my strategy, track record, or working together? Reach out — I read everything myself.',
    socials: [
      { label: 'X / Twitter', href: '#', icon: 'twitter' },
      { label: 'Telegram', href: '#', icon: 'telegram' },
      { label: 'YouTube', href: '#', icon: 'youtube' },
      { label: 'Email', href: 'mailto:contact@alexanovak.trade', icon: 'mail' },
    ],
  },

  footer: {
    tagline: 'Live trading dashboard — figures refresh automatically from the data feed.',
    shortDisclaimer:
      'Trading involves risk. Results shown are historical and not indicative of future performance.',
  },
};

/**
 * Resolves the current trading data. Swap the implementation (not the
 * signature) to connect a real data source — see the file header above.
 * @returns {Promise<typeof TRADER_DATA>}
 */
export async function fetchTraderData() {
  return TRADER_DATA;
}

export default TRADER_DATA;
