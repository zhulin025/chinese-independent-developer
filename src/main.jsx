import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, Code2, Gamepad2, Search, Sparkles, X } from 'lucide-react';
import mainRaw from '../README.md?raw';
import programmerRaw from '../pages/README-Programmer-Edition.md?raw';
import gameRaw from '../pages/README-Game.md?raw';
import archiveRaw from '../pages/README-2018-2020.md?raw';
import './styles.css';

const sources = [
  { id: 'product', label: '即用产品', raw: mainRaw },
  { id: 'programmer', label: '开发者工具', raw: programmerRaw },
  { id: 'game', label: '独立游戏', raw: gameRaw },
  { id: 'archive', label: '经典存档', raw: archiveRaw },
];

function parseProjects({ id: category, raw }) {
  let creator = '独立开发者';
  let creatorUrl = '';
  let date = '';
  const projects = [];
  for (const line of raw.split('\n')) {
    const dateMatch = line.match(/^###\s+(.+?(?:添加|项目列表|年项目列表).*)$/);
    if (dateMatch) date = dateMatch[1].replace(/添加.*$/, '').trim();
    const creatorMatch = line.match(/^####\s+(.+?)(?:\s+-\s+|$)/);
    if (creatorMatch) {
      creator = creatorMatch[1].trim();
      creatorUrl = line.match(/\[(?:GitHub|Github|github)\]\((https?:\/\/[^)]+)\)/)?.[1] || '';
    }
    const item = line.match(/^\*\s+:(white_check_mark|clock\d*|x):\s+\[([^\]]+)\]\((https?:\/\/[^)]+)\)(?:[：:]\s*)?(.*)$/);
    if (!item) continue;
    const status = item[1] === 'white_check_mark' ? 'live' : item[1].startsWith('clock') ? 'building' : 'closed';
    let description = item[4].replace(/\s*-\s*\[(?:查看仓库|更多介绍|GitHub 源码|Edge 商店安装)[^\]]*\]\([^)]+\).*/, '').trim();
    projects.push({ id: `${category}-${projects.length}`, category, creator, creatorUrl, date, status, name: item[2], url: item[3], description });
  }
  return projects;
}

const allProjects = sources.flatMap(parseProjects);
const palette = ['pink', 'yellow', 'blue', 'green', 'purple', 'orange'];
const PAGE_SIZE = 24;

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('active');
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return allProjects.filter((item) =>
      (category === 'all' || item.category === category) &&
      (status === 'all' || (status === 'active' ? item.status !== 'closed' : item.status === status)) &&
      (!needle || `${item.name} ${item.description} ${item.creator}`.toLowerCase().includes(needle))
    );
  }, [query, category, status]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const update = (setter) => (value) => { setter(value); setPage(1); };

  return <div className="site-shell">
    <header className="nav">
      <a className="brand" href="#top" aria-label="独立星球首页"><span className="brand-mark">独</span><span>独立星球</span></a>
      <nav aria-label="主要导航"><a href="#projects">逛作品</a><a href="#submit-guide">提交项目</a></nav>
      <a className="github-button" href="https://github.com/1c7/chinese-independent-developer" target="_blank" rel="noreferrer"><Code2 size={17}/> GitHub</a>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={16}/> 中国创造，独立发光</p>
          <h1>发现独立开发者的<br/><span>奇妙作品。</span></h1>
          <p className="hero-description">这里收集了由中国独立开发者亲手创造的产品、工具与游戏。每一个小点子，都值得被更多人看见。</p>
          <div className="hero-actions"><a className="primary" href="#projects">开始探索 <ArrowUpRight size={18}/></a><a className="secondary" href="#submit-guide">我也做了一个</a></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
          <div className="bubble b1">IDEA</div><div className="bubble b2">100%</div><div className="bubble b3">SHIP</div>
          <div className="planet"><span>🚀</span></div>
          <span className="star s1">✦</span><span className="star s2">✦</span><span className="star s3">●</span>
        </div>
      </section>

      <section className="stats" aria-label="项目统计">
        <div><strong>{allProjects.length.toLocaleString()}<i>+</i></strong><span>收录作品</span></div>
        <div><strong>{new Set(allProjects.map(p => p.creator)).size.toLocaleString()}<i>+</i></strong><span>独立开发者</span></div>
        <div><strong>{allProjects.filter(p => p.status === 'live').length.toLocaleString()}</strong><span>正在运行</span></div>
        <div><strong>∞</strong><span>创造力</span></div>
      </section>

      <section className="projects" id="projects">
        <div className="section-heading"><div><p className="kicker">EXPLORE / 探索</p><h2>今天发现点什么？</h2></div><p>从实用工具到脑洞游戏，从一人公司到周末实验室。</p></div>
        <div className="toolbar">
          <div className="category-tabs" role="tablist">
            <button className={category === 'all' ? 'active' : ''} onClick={() => update(setCategory)('all')}>全部</button>
            <button className={category === 'product' ? 'active' : ''} onClick={() => update(setCategory)('product')}><Sparkles size={15}/>即用产品</button>
            <button className={category === 'programmer' ? 'active' : ''} onClick={() => update(setCategory)('programmer')}><Code2 size={15}/>开发工具</button>
            <button className={category === 'game' ? 'active' : ''} onClick={() => update(setCategory)('game')}><Gamepad2 size={15}/>游戏</button>
            <button className={category === 'archive' ? 'active' : ''} onClick={() => update(setCategory)('archive')}>经典存档</button>
          </div>
          <label className="search"><Search size={18}/><input value={query} onChange={e => update(setQuery)(e.target.value)} placeholder="搜索产品或开发者…" aria-label="搜索产品或开发者"/>{query && <button onClick={() => update(setQuery)('')} aria-label="清除搜索"><X size={15}/></button>}</label>
        </div>
        <div className="subbar"><span>找到 <b>{filtered.length}</b> 个作品</span><div><button className={status === 'active' ? 'active' : ''} onClick={() => update(setStatus)('active')}>活跃项目</button><button className={status === 'all' ? 'active' : ''} onClick={() => update(setStatus)('all')}>全部状态</button></div></div>

        {visible.length ? <div className="grid">{visible.map((item, index) => <article className={`card ${palette[index % palette.length]}`} key={item.id}>
          <div className="card-top"><span className="type">{sources.find(s => s.id === item.category)?.label}</span><span className={`status-dot ${item.status}`}>{item.status === 'live' ? <Check size={12}/> : item.status === 'building' ? <Clock3 size={12}/> : <X size={12}/>}</span></div>
          <div><h3><a href={item.url} target="_blank" rel="noreferrer">{item.name}<ArrowUpRight size={18}/></a></h3><p>{item.description || '一个由独立开发者创造的有趣项目，点击前往了解更多。'}</p></div>
          <footer><span>by {item.creator}</span>{item.date && <time>{item.date}</time>}</footer>
        </article>)}</div> : <div className="empty"><span>🔍</span><h3>没有找到匹配的作品</h3><p>换个关键词，或者浏览全部分类吧。</p></div>}

        {pages > 1 && <div className="pagination"><button disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft size={18}/>上一页</button><span>第 {page} / {pages} 页</span><button disabled={page === pages} onClick={() => setPage(p => p + 1)}>下一页<ChevronRight size={18}/></button></div>}
      </section>

      <section className="submit-guide" id="submit-guide">
        <div className="submit-copy">
          <p className="kicker">JOIN US / 加入星球</p>
          <h2>把你的作品<br/>带到这里。</h2>
          <p>这是一个由社区共同维护的项目目录。只要是中国独立开发者制作、用户可以直接使用的网站或 App，都欢迎提交。</p>
          <a className="primary submit-link" href="https://github.com/1c7/chinese-independent-developer" target="_blank" rel="noreferrer">前往 GitHub 提交 <ArrowUpRight size={18}/></a>
        </div>
        <div className="submit-card">
          <span className="step-label">提交格式</span>
          <pre><code>{`#### 制作者名字(城市) - [Github](你的主页)\n* :white_check_mark: [产品名称](产品网址)：一句话介绍`}</code></pre>
          <div className="writing-tip"><span>💡</span><div><b>一句话介绍怎么写？</b><p>先说清产品是什么，再补充核心价值。尽量加入数字，以及“免费、无需注册、本地处理”等具体特点。</p></div></div>
          <p className="example"><b>好例子</b>　图片压缩工具，70%+ 压缩率同时保持画质，支持批量处理，纯本地运行不上传。</p>
        </div>
      </section>
    </main>
    <footer className="footer"><div><span className="brand-mark">独</span><p><b>独立星球</b><br/>为认真创造的人，留一盏灯。</p></div><p>由社区共同维护 · 数据源自项目 README</p></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
