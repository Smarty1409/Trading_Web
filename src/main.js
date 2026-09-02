

import './style.css';
import { TRADER_DATA, fetchTraderData } from './traderData.js';

document.getElementById("app").innerHTML= "<h1 style='color:white'> Website Working</h1>"

const ICONS = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 19h14"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0115.3-6.4L21 8M21 4v4h-4"/><path d="M21 12a9 9 0 01-15.3 6.4L3 16M3 20v-4h4"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 3H21.7l-6.1 7 7.2 9.5h-5.6l-4.4-5.8-5 5.8H4.9l6.5-7.5L4.5 3h5.7l4 5.3L18.9 3zm-1 15h1.6L8.1 5H6.4l11.5 13z"/></svg>',
  telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3L2.7 11.8c-1.3.5-1.3 1.2-.2 1.6l4.9 1.5 1.9 5.8c.2.6.4.9.9.9.4 0 .6-.2.9-.5l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14c.3-1.3-.5-1.9-1.6-1.3zM8.7 14.8l-1.3-4 9.6-6-7.9 7.2-.4 2.8z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-2-.2-3.4-.5-4.3-.3-.7-.9-1.3-1.6-1.5C18.6 5.8 12 5.8 12 5.8s-6.6 0-7.9.4c-.7.2-1.3.8-1.6 1.5C2.2 8.6 2 10 2 12s.2 3.4.5 4.3c.3.7.9 1.3 1.6 1.5 1.3.4 7.9.4 7.9.4s6.6 0 7.9-.4c.7-.2 1.3-.8 1.6-1.5.3-.9.5-2.3.5-4.3zM10 15V9l5.2 3-5.2 3z"/></svg>',
};

const icon = (name, cls = '') =>
  `<span class="icon ${cls}" aria-hidden="true">${ICONS[name] || ''}</span>`;


function formatValue(value, format, signed) {
  const negative = value < 0;
  const sign = negative ? '-' : signed && value > 0 ? '+' : '';
  const abs = Math.abs(value);

  switch (format) {
    case 'currency':
      return `${sign}$${abs.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    case 'percent':
      return `${sign}${abs.toFixed(1)}%`;
    case 'number':
      return `${sign}${Math.round(abs).toLocaleString('en-US')}`;
    default:
      return String(value);
  }
}

const formatCurrency = (n) => formatValue(n, 'currency', false);
const formatSignedCurrency = (n) => formatValue(n, 'currency', true);
const formatPercent = (n) => formatValue(n, 'percent', false);
const formatSignedPercent = (n) => formatValue(n, 'percent', true);


function toneForItem(item) {
  if (['capital', 'totalTrades', 'turnover'].includes(item.key)) return 'neutral';
  if (item.key === 'winRate') return item.value >= 50 ? 'positive' : 'negative';
  if (item.value > 0) return 'positive';
  if (item.value < 0) return 'negative';
  return 'neutral';
}

const toneForNumber = (n) => (n > 0 ? 'positive' : n < 0 ? 'negative' : 'neutral');


const revealClass = (animate) => (animate ? 'reveal' : '');
const revealStyle = (animate, delayMs) => (animate ? `style="--d:${delayMs}ms"` : '');



function renderNav(data) {
  const links = data.nav
    .map(
      (item) =>
        `<li><a class="nav__link" data-nav-link href="#${item.id}">${item.label}</a></li>`
    )
    .join('');

  return `
    <header class="nav" id="nav">
      <div class="nav__inner container">
        <a class="nav__logo" href="#home">
          <span class="nav__logo-mark">${data.trader.monogram}</span>
          <span class="nav__logo-text">${data.trader.name}</span>
        </a>
        <nav class="nav__menu" id="nav-menu" aria-label="Primary">
          <ul class="nav__links">${links}</ul>
        </nav>
        <a class="btn btn--ghost btn--sm nav__cta" href="#contact">Get in touch</a>
        <button
          class="nav__toggle"
          id="nav-toggle"
          aria-expanded="false"
          aria-controls="nav-menu"
          aria-label="Toggle navigation menu"
        >
          ${icon('menu', 'nav__toggle-open')}
          ${icon('close', 'nav__toggle-close')}
        </button>
      </div>
    </header>
  `;
}

function buildPortfolioSnapshotLines(overview) {
  const capitalReturns = overview.groups[0].items;
  const activity = overview.groups[1].items;
  const find = (list, key) => list.find((i) => i.key === key);

  const capital = find(capitalReturns, 'capital');
  const netPnl = find(capitalReturns, 'netPnl');
  const roi = find(capitalReturns, 'roi');
  const winRate = find(activity, 'winRate');

  return [
    [{ t: 'const ', c: 'kw' }, { t: 'portfolio', c: 'var' }, { t: ' = {', c: 'punct' }],
    [{ t: '  capital: ', c: 'key' }, { t: `'${formatCurrency(capital.value)}'`, c: 'str' }, { t: ',', c: 'punct' }],
    [{ t: '  netPnL: ', c: 'key' }, { t: `'${formatSignedCurrency(netPnl.value)}'`, c: 'str' }, { t: ',', c: 'punct' }],
    [{ t: '  roi: ', c: 'key' }, { t: `'${formatSignedPercent(roi.value)}'`, c: 'str' }, { t: ',', c: 'punct' }],
    [{ t: '  winRate: ', c: 'key' }, { t: `'${formatPercent(winRate.value)}'`, c: 'str' }, { t: ',', c: 'punct' }],
    [{ t: '  status: ', c: 'key' }, { t: "'LIVE'", c: 'bool' }],
    [{ t: '};', c: 'punct' }],
  ];
}

function renderHero(data) {
  const h = data.hero;
  return `
    <section class="hero" id="home" aria-label="Introduction">
      <div class="hero__backdrop" aria-hidden="true">
        <svg class="hero__traces" viewBox="0 0 600 600" fill="none">
          <path d="M0 120h180l40-40h140l30 30h210" stroke="url(#traceGrad)" stroke-width="1.5"/>
          <path d="M0 320h120l30-30h160l50 50h240" stroke="url(#traceGrad)" stroke-width="1.5"/>
          <path d="M0 460h260l30-30h100l40 40h170" stroke="url(#traceGrad)" stroke-width="1.5"/>
          <circle cx="220" cy="80" r="4" fill="var(--accent)"/>
          <circle cx="410" cy="350" r="4" fill="var(--accent-2)"/>
          <circle cx="290" cy="470" r="4" fill="var(--accent)"/>
          <defs>
            <linearGradient id="traceGrad" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="var(--accent)" stop-opacity="0"/>
              <stop offset="0.5" stop-color="var(--accent)" stop-opacity="0.5"/>
              <stop offset="1" stop-color="var(--accent-2)" stop-opacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="container hero__grid">
        <div class="hero__content">
          <p class="hero__eyebrow">${h.eyebrow}</p>
          <h1 class="hero__title">${h.title}</h1>
          <p class="hero__subtitle">${h.subtitle}</p>
          <div class="hero__actions">
            <a class="btn btn--primary" href="${h.primaryCta.href}">
              ${h.primaryCta.label} ${icon('arrowRight')}
            </a>
            <a class="btn btn--ghost" href="#" id="download-report-btn">
              ${icon('download')} ${h.secondaryCta.label}
            </a>
          </div>
        </div>

        <div class="hero__panel">
          <div class="editor" id="editor">
            <div class="editor__bar">
              <span class="editor__dot editor__dot--r"></span>
              <span class="editor__dot editor__dot--y"></span>
              <span class="editor__dot editor__dot--g"></span>
              <span class="editor__tab">portfolio.json</span>
            </div>
            <div class="editor__body" id="editor-body" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      <a class="hero__scroll-cue" href="#profile" aria-label="Scroll to trader profile">
        <span></span>
      </a>
    </section>
  `;
}

function renderDisclaimerBar(text) {
  return `
    <div class="disclaimer-bar">
      <div class="container disclaimer-bar__inner">
        ${icon('alert', 'disclaimer-bar__icon')}
        <p class="disclaimer-bar__text">${text}</p>
      </div>
    </div>
  `;
}

function renderProfile(data) {
  const p = data.profile;
  const paragraphs = p.paragraphs.map((t) => `<p class="profile__p reveal">${t}</p>`).join('');
  const facts = p.facts
    .map(
      (f, i) => `
      <div class="fact-row reveal" style="--d:${i * 60}ms">
        <span class="fact-row__key">${f.key}</span>
        <span class="fact-row__colon">:</span>
        <span class="fact-row__value">${f.value}</span>
      </div>`
    )
    .join('');

  return `
    <section class="section profile" id="profile" aria-labelledby="profile-title">
      <div class="container">
        <p class="section__eyebrow reveal">${p.eyebrow}</p>
        <h2 class="section__title reveal" id="profile-title">${p.title}</h2>

        <div class="profile__grid">
          <div class="profile__copy">${paragraphs}</div>
          <div class="profile__facts reveal">
            <div class="fact-card">
              <div class="fact-card__head">
                <span class="editor__dot editor__dot--r"></span>
                <span class="editor__dot editor__dot--y"></span>
                <span class="editor__dot editor__dot--g"></span>
                <span class="editor__tab">trader.json</span>
              </div>
              <div class="fact-card__body">
                <div class="fact-row fact-row--brace">{</div>
                ${facts}
                <div class="fact-row fact-row--brace">}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}


function renderStatCard(item, index, animate) {
  const tone = toneForItem(item);
  const display = animate ? formatValue(0, item.format, item.signed) : formatValue(item.value, item.format, item.signed);
  const barWidth = item.bar ? (animate ? 0 : item.value) : null;

  const bar = item.bar
    ? `<div class="stat-card__bar" role="progressbar" aria-label="${item.label}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${item.value}">
         <div class="stat-card__fill" data-stat-fill style="width:${barWidth}%"></div>
       </div>`
    : '';

  return `
    <div
      class="stat-card stat-card--${tone} ${revealClass(animate)}"
      ${revealStyle(animate, index * 70)}
      data-stat-key="${item.key}"
      data-value="${item.value}"
      data-format="${item.format}"
      data-signed="${item.signed}"
      data-has-bar="${Boolean(item.bar)}"
    >
      <span class="stat-card__label">${item.label}</span>
      <span class="stat-card__value" data-stat-value>${display}</span>
      ${bar}
    </div>`;
}

function renderStatGroups(overview, { animate = true } = {}) {
  return overview.groups
    .map((group, gi) => {
      const cards = group.items.map((item, i) => renderStatCard(item, i, animate)).join('');
      return `
        <div class="stat-group ${revealClass(animate)}" ${revealStyle(animate, gi * 90)}>
          <h3 class="stat-group__title">${group.name}</h3>
          <div class="stat-group__grid">${cards}</div>
        </div>`;
    })
    .join('');
}

function renderOverview(data) {
  const o = data.overview;
  return `
    <section class="section overview" id="overview" aria-labelledby="overview-title">
      <div class="container">
        <p class="section__eyebrow reveal">${o.eyebrow}</p>
        <h2 class="section__title reveal" id="overview-title">${o.title}</h2>
        <p class="section__intro reveal">${o.intro}</p>

        <div class="live-indicator reveal">
          <span class="live-indicator__dot"></span>
          <span>Live &middot; last synced <span id="last-synced">—</span></span>
          <button class="live-indicator__refresh" id="refresh-btn" type="button" aria-label="Refresh live data">
            ${icon('refresh')} Refresh
          </button>
        </div>

        <div class="stat-groups" id="stat-groups">${renderStatGroups(o, { animate: true })}</div>
      </div>
    </section>
  `;
}

function renderLedgerCard(section, modifier) {
  const rows = section.items
    .map(
      (item, i) => `
      <div class="fact-row ${item.emphasis ? 'fact-row--emphasis' : ''} reveal" style="--d:${i * 50}ms">
        <span class="fact-row__key">${item.key}</span>
        <span class="fact-row__colon">:</span>
        <span class="fact-row__value">${item.value}</span>
      </div>`
    )
    .join('');

  return `
    <div class="fact-card ${modifier} reveal">
      <div class="fact-card__head">
        <span class="editor__dot editor__dot--r"></span>
        <span class="editor__dot editor__dot--y"></span>
        <span class="editor__dot editor__dot--g"></span>
        <span class="editor__tab">${section.tab}</span>
      </div>
      <div class="fact-card__body">
        <div class="fact-row fact-row--brace">{</div>
        ${rows}
        <div class="fact-row fact-row--brace">}</div>
      </div>
    </div>`;
}

function monthAbbrev(month) {
  return month.split(' ')[0];
}


function renderMonthlyChartSvg(months) {
  const width = 760;
  const height = 220;
  const padding = { top: 16, right: 10, bottom: 28, left: 10 };
  const chartH = height - padding.top - padding.bottom;
  const zeroY = padding.top + chartH / 2;
  const bandW = (width - padding.left - padding.right) / months.length;
  const barW = Math.max(bandW * 0.5, 10);
  const maxAbs = Math.max(...months.map((m) => Math.abs(m.pnl)), 1);

  const bars = months
    .map((m, i) => {
      const x = padding.left + i * bandW + (bandW - barW) / 2;
      const h = Math.max((Math.abs(m.pnl) / maxAbs) * (chartH / 2 - 6), 2);
      const y = m.pnl >= 0 ? zeroY - h : zeroY;
      const cls = m.pnl >= 0 ? 'monthly-chart__bar--positive' : 'monthly-chart__bar--negative';
      return `
        <rect class="monthly-chart__bar ${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="3">
          <title>${m.month}: ${formatSignedCurrency(m.pnl)}</title>
        </rect>
        <text class="monthly-chart__label" x="${(x + barW / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle">${monthAbbrev(m.month)}</text>`;
    })
    .join('');

  return `
    <svg class="monthly-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Monthly net P&L bar chart" preserveAspectRatio="xMidYMid meet">
      <line class="monthly-chart__zero" x1="${padding.left}" y1="${zeroY}" x2="${width - padding.right}" y2="${zeroY}" />
      ${bars}
    </svg>`;
}

function renderMonthlyTableRows(months) {
  return months
    .map(
      (m) => `
      <tr>
        <td>${m.month}</td>
        <td>${m.trades}</td>
        <td>${formatPercent(m.winRate)}</td>
        <td class="${toneForNumber(m.pnl) === 'positive' ? 'is-positive' : 'is-negative'}">${formatSignedCurrency(m.pnl)}</td>
        <td class="${toneForNumber(m.roi) === 'positive' ? 'is-positive' : 'is-negative'}">${formatSignedPercent(m.roi)}</td>
      </tr>`
    )
    .join('');
}

function renderMonthlyPnl(monthlyPnl) {
  return `
    <div class="monthly-pnl">
      <div class="monthly-chart-wrap reveal">
        <div id="monthly-chart-container">${renderMonthlyChartSvg(monthlyPnl.months)}</div>
      </div>
      <div class="data-table-card reveal">
        <div class="data-table-card__head">
          <span class="editor__dot editor__dot--r"></span>
          <span class="editor__dot editor__dot--y"></span>
          <span class="editor__dot editor__dot--g"></span>
          <span class="editor__tab">monthly-pnl.csv</span>
          <button class="data-table-card__export" id="export-csv-btn" type="button">Export CSV</button>
        </div>
        <div class="data-table-card__body">
          <table class="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Trades</th>
                <th>Win Rate</th>
                <th>P&amp;L</th>
                <th>ROI</th>
              </tr>
            </thead>
            <tbody id="monthly-table-body">${renderMonthlyTableRows(monthlyPnl.months)}</tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function renderPortfolio(data) {
  const b = data.balance;
  return `
    <section class="section portfolio" id="portfolio" aria-labelledby="portfolio-title">
      <div class="container">
        <p class="section__eyebrow reveal">${b.eyebrow}</p>
        <h2 class="section__title reveal" id="portfolio-title">${b.title}</h2>
        <p class="section__intro reveal">${b.intro}</p>

        <h3 class="subsection__title reveal">Assets &amp; liabilities</h3>
        <div class="ledger-grid">
          ${renderLedgerCard(b.assets, 'fact-card--assets')}
          ${renderLedgerCard(b.liabilities, 'fact-card--liabilities')}
        </div>

        <h3 class="subsection__title reveal">${data.monthlyPnl.title}</h3>
        <p class="section__intro reveal" style="margin-bottom:32px;">${data.monthlyPnl.intro}</p>
        ${renderMonthlyPnl(data.monthlyPnl)}
      </div>
    </section>
  `;
}

function renderPerformanceCard(item, index) {
  const statRows = item.stats
    .map(
      (s) => `
      <div class="trade-card__stat">
        <span class="trade-card__stat-label">${s.label}</span>
        <span class="trade-card__stat-value">${s.value}</span>
      </div>`
    )
    .join('');
  const tags = item.tags.map((t) => `<span class="tag">${t}</span>`).join('');

  return `
    <article class="trade-card ${item.featured ? 'trade-card--featured' : ''} reveal" style="--d:${index * 80}ms">
      <div class="trade-card__chrome">
        <span class="editor__dot editor__dot--r"></span>
        <span class="editor__dot editor__dot--y"></span>
        <span class="editor__dot editor__dot--g"></span>
        <span class="editor__tab">${item.tab}</span>
      </div>
      <div class="trade-card__body">
        <span class="trade-card__label">${item.label}</span>
        <span class="trade-card__headline trade-card__headline--${item.tone}">${item.headline}</span>
        <p class="trade-card__meta">${item.meta}</p>
        <div class="trade-card__tags">${tags}</div>
      </div>
      <div class="trade-card__stats">${statRows}</div>
    </article>`;
}

function renderPerformance(data) {
  const p = data.performance;
  const cards = p.items.map((item, i) => renderPerformanceCard(item, i)).join('');

  return `
    <section class="section performance" id="performance" aria-labelledby="performance-title">
      <div class="container">
        <p class="section__eyebrow reveal">${p.eyebrow}</p>
        <h2 class="section__title reveal" id="performance-title">${p.title}</h2>
        <p class="section__intro reveal">${p.intro}</p>
        <div class="performance-grid">${cards}</div>
      </div>
    </section>
  `;
}

function renderTimelineItems(trades, { animate = true } = {}) {
  return trades
    .map((trade, i) => {
      const isWin = trade.type === 'win';
      return `
      <li class="timeline__item ${revealClass(animate)}" ${revealStyle(animate, i * 90)}>
        <span class="timeline__dot timeline__dot--${trade.type}"></span>
        <div class="timeline__card">
          <div class="timeline__meta">
            <span class="timeline__badge timeline__badge--${trade.type}">${isWin ? 'win' : 'loss'}</span>
            <span class="timeline__date">${trade.date}</span>
          </div>
          <h3 class="timeline__title">${trade.symbol} &middot; ${trade.side}</h3>
          <p class="timeline__pnl ${isWin ? 'is-positive' : 'is-negative'}">${formatSignedCurrency(trade.pnl)}</p>
          <p class="timeline__desc">${trade.note}</p>
        </div>
      </li>`;
    })
    .join('');
}

function renderActivity(data) {
  const a = data.activity;
  return `
    <section class="section timeline-section" id="activity" aria-labelledby="activity-title">
      <div class="container">
        <p class="section__eyebrow reveal">${a.eyebrow}</p>
        <h2 class="section__title reveal" id="activity-title">${a.title}</h2>
        <p class="section__intro reveal">${a.intro}</p>
        <ol class="timeline" id="timeline">${renderTimelineItems(a.trades, { animate: true })}</ol>
      </div>
    </section>
  `;
}

function renderContact(data) {
  const c = data.contact;
  const socials = c.socials
    .map(
      (s) => `
      <a class="social-link" href="${s.href}" aria-label="${s.label}">
        ${icon(s.icon)}
        <span>${s.label}</span>
      </a>`
    )
    .join('');

  return `
    <section class="section contact" id="contact" aria-labelledby="contact-title">
      <div class="container">
        <p class="section__eyebrow reveal">${c.eyebrow}</p>
        <h2 class="section__title reveal" id="contact-title">${c.title}</h2>
        <p class="section__intro reveal">${c.intro}</p>

        <div class="contact__grid">
          <div class="contact__aside">
            <div class="contact-card reveal">
              <div class="contact-card__head">
                <span class="editor__dot editor__dot--r"></span>
                <span class="editor__dot editor__dot--y"></span>
                <span class="editor__dot editor__dot--g"></span>
                <span class="editor__tab">contact.json</span>
              </div>
              <div class="contact-card__body">
                <div class="contact-row">
                  ${icon('mail')}
                  <a href="mailto:${data.trader.email}">${data.trader.email}</a>
                </div>
                <div class="contact-row">
                  ${icon('pin')}
                  <span>${data.trader.location}</span>
                </div>
                <div class="contact-row contact-row--status">
                  <span class="status-dot"></span>
                  <span>${data.trader.availability}</span>
                </div>
                <div class="social-links">${socials}</div>
              </div>
            </div>

            <div class="share-card reveal">
              <div class="contact-card__head">
                <span class="editor__dot editor__dot--r"></span>
                <span class="editor__dot editor__dot--y"></span>
                <span class="editor__dot editor__dot--g"></span>
                <span class="editor__tab">share.json</span>
              </div>
              <div class="share-card__body">
                <div class="share-card__qr-wrap">
                  <img id="qr-code-img" class="share-card__qr" alt="QR code linking to this dashboard" width="140" height="140" />
                </div>
                <p class="share-card__label">Scan or share this dashboard</p>
                <div class="share-card__url-row">
                  <span class="share-card__url" id="share-url"></span>
                  <button class="share-card__copy" id="copy-link-btn" type="button" aria-label="Copy dashboard link">
                    ${icon('copy')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <form class="form reveal" id="contact-form" novalidate>
            <div class="form__group">
              <label class="form__label" for="name">Name</label>
              <input class="form__input" type="text" id="name" name="name" autocomplete="name" required />
              <span class="form__error" id="name-error" role="alert"></span>
            </div>
            <div class="form__group">
              <label class="form__label" for="email">Email</label>
              <input class="form__input" type="email" id="email" name="email" autocomplete="email" required />
              <span class="form__error" id="email-error" role="alert"></span>
            </div>
            <div class="form__group">
              <label class="form__label" for="message">Message</label>
              <textarea class="form__input form__textarea" id="message" name="message" rows="5" required></textarea>
              <span class="form__error" id="message-error" role="alert"></span>
            </div>
            <button class="btn btn--primary form__submit" type="submit">
              <span class="form__submit-label">Send message</span> ${icon('arrowRight')}
            </button>
            <p class="form__status" id="form-status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </section>
  `;
}

function renderFooter(data) {
  const links = data.nav.map((item) => `<a href="#${item.id}">${item.label}</a>`).join('');

  return `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <span class="nav__logo-mark">${data.trader.monogram}</span>
          <div>
            <p class="footer__name">${data.trader.name}</p>
            <p class="footer__tagline">${data.footer.tagline}</p>
          </div>
        </div>
        <nav class="footer__links" aria-label="Footer">${links}</nav>
        <p class="footer__disclaimer">${data.footer.shortDisclaimer}</p>
        <p class="footer__copy">&copy; <span id="year"></span> ${data.trader.name}. All rights reserved.</p>
      </div>
      <button class="back-to-top" id="back-to-top" aria-label="Back to top">
        ${icon('arrowUp')}
      </button>
    </footer>
  `;
}

function render(data) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="scroll-sentinel" id="scroll-sentinel"></div>
    ${renderNav(data)}
    <main id="main">
      ${renderHero(data)}
      ${renderDisclaimerBar(data.disclaimer)}
      ${renderProfile(data)}
      ${renderOverview(data)}
      ${renderPortfolio(data)}
      ${renderPerformance(data)}
      ${renderActivity(data)}
      ${renderContact(data)}
    </main>
    ${renderFooter(data)}
  `;
}



const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


let currentData = TRADER_DATA;


function initNav() {
  const nav = document.getElementById('nav');
  const sentinel = document.getElementById('scroll-sentinel');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = Array.from(document.querySelectorAll('[data-nav-link]'));

  new IntersectionObserver(
    ([entry]) => nav.classList.toggle('nav--scrolled', !entry.isIntersecting)
  ).observe(sentinel);

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  });

  links.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  const sections = links
    .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = links.find((l) => l.getAttribute('href') === `#${entry.target.id}`);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((section) => spy.observe(section));
}


async function initTypewriter(data) {
  const body = document.getElementById('editor-body');
  const lines = buildPortfolioSnapshotLines(data.overview);

  if (prefersReducedMotion) {
    body.innerHTML = lines
      .map(
        (line) =>
          `<div class="editor__line">${line
            .map((tok) => `<span class="token token--${tok.c}">${tok.t}</span>`)
            .join('')}</div>`
      )
      .join('');
    return;
  }

  for (const line of lines) {
    const lineEl = document.createElement('div');
    lineEl.className = 'editor__line';
    body.appendChild(lineEl);

    for (const tok of line) {
      const span = document.createElement('span');
      span.className = `token token--${tok.c}`;
      lineEl.appendChild(span);
      for (const char of tok.t) {
        span.textContent += char;
        await sleep(14 + Math.random() * 20);
      }
    }
    await sleep(120);
  }

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  body.lastElementChild.appendChild(cursor);
}


function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}


function initStatCardAnimations() {
  const cards = document.querySelectorAll('.stat-card');

  const animate = (card) => {
    const target = Number(card.dataset.value);
    const format = card.dataset.format;
    const signed = card.dataset.signed === 'true';
    const hasBar = card.dataset.hasBar === 'true';
    const valueEl = card.querySelector('[data-stat-value]');
    const fillEl = card.querySelector('[data-stat-fill]');

    if (prefersReducedMotion) {
      valueEl.textContent = formatValue(target, format, signed);
      if (hasBar && fillEl) fillEl.style.width = `${target}%`;
      return;
    }

    const duration = 900;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      valueEl.textContent = formatValue(current, format, signed);
      if (hasBar && fillEl) fillEl.style.width = `${current}%`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );
  cards.forEach((card) => observer.observe(card));
}


function updateOverviewStats(overview) {
  overview.groups.forEach((group) => {
    group.items.forEach((item) => {
      const card = document.querySelector(`.stat-card[data-stat-key="${item.key}"]`);
      if (!card) return;
      const tone = toneForItem(item);
      card.className = `stat-card stat-card--${tone}`;
      card.dataset.value = String(item.value);
      const valueEl = card.querySelector('[data-stat-value]');
      if (valueEl) valueEl.textContent = formatValue(item.value, item.format, item.signed);
      const fillEl = card.querySelector('[data-stat-fill]');
      if (fillEl && item.bar) fillEl.style.width = `${item.value}%`;
    });
  });
}

/** Live-refresh path for the monthly chart + table — both are cheap to
 *  fully regenerate, so no per-cell diffing is needed. */
function updateMonthlyPnl(monthlyPnl) {
  const chartContainer = document.getElementById('monthly-chart-container');
  const tableBody = document.getElementById('monthly-table-body');
  if (chartContainer) chartContainer.innerHTML = renderMonthlyChartSvg(monthlyPnl.months);
  if (tableBody) tableBody.innerHTML = renderMonthlyTableRows(monthlyPnl.months);
}


function updateRecentTrades(activity) {
  const timeline = document.getElementById('timeline');
  if (timeline) timeline.innerHTML = renderTimelineItems(activity.trades, { animate: false });
}


function initTimelineDraw() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timeline.classList.add('is-visible');
          obs.unobserve(timeline);
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(timeline);
}


function initBackToTop() {
  const button = document.getElementById('back-to-top');
  const hero = document.getElementById('home');

  new IntersectionObserver(
    ([entry]) => button.classList.toggle('is-visible', !entry.isIntersecting)
  ).observe(hero);

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}


function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fields = [
    { id: 'name', validate: (v) => v.trim().length > 0, message: 'Please enter your name.' },
    { id: 'email', validate: (v) => emailPattern.test(v.trim()), message: 'Please enter a valid email address.' },
    { id: 'message', validate: (v) => v.trim().length > 4, message: 'Please add a short message.' },
  ];

  const setError = (id, message) => {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    error.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;
    let valid = true;

    fields.forEach(({ id, validate, message }) => {
      const input = document.getElementById(id);
      const ok = validate(input.value);
      setError(id, ok ? '' : message);
      if (!ok) {
        valid = false;
        firstInvalid = firstInvalid || input;
      }
    });

    if (!valid) {
      firstInvalid?.focus();
      status.textContent = '';
      return;
    }

 
    const submitButton = form.querySelector('.form__submit');
    submitButton.disabled = true;
    status.textContent = 'Sending…';

    setTimeout(() => {
      status.textContent = `Thanks — I\u2019ll get back to you soon.`;
      submitButton.disabled = false;
      form.reset();
    }, 700);
  });

  fields.forEach(({ id }) => {
    document.getElementById(id).addEventListener('input', (e) => {
      if (e.target.getAttribute('aria-invalid') === 'true') setError(id, '');
    });
  });
}

function initFooterYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}



function csvEscape(value) {
  const str = String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

function buildCsvReport(data) {
  const lines = [];
  lines.push(csvEscape(`Trading report — ${data.trader.name}`));
  lines.push(csvEscape(`Generated ${new Date().toLocaleString()}`));
  lines.push('');

  lines.push('Overview');
  data.overview.groups.forEach((group) => {
    group.items.forEach((item) => {
      lines.push([csvEscape(item.label), csvEscape(formatValue(item.value, item.format, item.signed))].join(','));
    });
  });
  lines.push('');

  lines.push('Monthly P&L');
  lines.push(['Month', 'Trades', 'Win Rate', 'Net P&L', 'ROI'].map(csvEscape).join(','));
  data.monthlyPnl.months.forEach((m) => {
    lines.push(
      [m.month, m.trades, formatPercent(m.winRate), formatSignedCurrency(m.pnl), formatSignedPercent(m.roi)]
        .map(csvEscape)
        .join(',')
    );
  });
  lines.push('');

  lines.push('Recent Trades');
  lines.push(['Date', 'Symbol', 'Side', 'P&L', 'Note'].map(csvEscape).join(','));
  data.activity.trades.forEach((t) => {
    lines.push([t.date, t.symbol, t.side, formatSignedCurrency(t.pnl), t.note].map(csvEscape).join(','));
  });
  lines.push('');
  lines.push(csvEscape(data.disclaimer));

  return lines.join('\n');
}

function downloadCsvReport(data) {
  const csv = buildCsvReport(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const dateStamp = new Date().toISOString().slice(0, 10);
  const a = document.createElement('a');
  a.href = url;
  a.download = `trading-report-${dateStamp}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function initDownloadReport() {
  const btn = document.getElementById('download-report-btn');
  if (!btn) return;
  const { reportUrl, autoGenerateReport } = currentData.meta;

  if (reportUrl) {
    btn.setAttribute('href', reportUrl);
    btn.setAttribute('download', '');
    return;
  }

  if (!autoGenerateReport) {
    btn.remove();
    return;
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    downloadCsvReport(currentData);
  });
}

function initExportCsvButton() {
  const btn = document.getElementById('export-csv-btn');
  if (!btn) return;
  btn.addEventListener('click', () => downloadCsvReport(currentData));
}



function getPortfolioUrl() {
  return currentData.meta.siteUrl || `${window.location.origin}${window.location.pathname}`;
}

function getQrCodeSrc(url) {

  return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&data=${encodeURIComponent(url)}`;
}

function initShareCard() {
  const url = getPortfolioUrl();
  const img = document.getElementById('qr-code-img');
  const urlEl = document.getElementById('share-url');
  const copyBtn = document.getElementById('copy-link-btn');

  if (img) img.src = getQrCodeSrc(url);
  if (urlEl) urlEl.textContent = url;

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url);
        } else {
          const temp = document.createElement('textarea');
          temp.value = url;
          temp.style.position = 'fixed';
          temp.style.opacity = '0';
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          temp.remove();
        }
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = icon('check');
        copyBtn.classList.add('is-copied');
        setTimeout(() => {
          copyBtn.innerHTML = original;
          copyBtn.classList.remove('is-copied');
        }, 1600);
      } catch (err) {
       
        console.warn('Copy failed, URL is still shown for manual copy.', err);
      }
    });
  }
}



function updateLastSynced() {
  const el = document.getElementById('last-synced');
  if (el) {
    el.textContent = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}

async function refreshLiveData() {
  const refreshBtn = document.getElementById('refresh-btn');
  refreshBtn?.classList.add('is-spinning');

  try {
    const data = await fetchTraderData();
    currentData = data;
    updateOverviewStats(data.overview);
    updateMonthlyPnl(data.monthlyPnl);
    updateRecentTrades(data.activity);
    updateLastSynced();
  } catch (err) {
    console.warn('Live data refresh failed; keeping the last known values.', err);
  } finally {
    setTimeout(() => refreshBtn?.classList.remove('is-spinning'), 400);
  }
}

function initLiveUpdates() {
  updateLastSynced();
  const interval = currentData.meta.refreshIntervalMs || 30000;
  setInterval(refreshLiveData, interval);
  document.getElementById('refresh-btn')?.addEventListener('click', refreshLiveData);
}

function init() {
  render(currentData);
  initNav();
  initTypewriter(currentData);
  initScrollReveal();
  initStatCardAnimations();
  initTimelineDraw();
  initBackToTop();
  initContactForm();
  initFooterYear();
  initDownloadReport();
  initExportCsvButton();
  initShareCard();
  initLiveUpdates();
}

document.addEventListener('DOMContentLoaded', init);
