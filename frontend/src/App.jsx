import React, { useMemo, useState } from "react";
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, Bell, Boxes,
  Building2, ChevronDown, CircleHelp, Clock3, Factory, Gauge, GitBranch,
  Globe2, LayoutDashboard, Network, Search, Settings, ShieldCheck,
  SlidersHorizontal, Truck, Zap
} from "lucide-react";

const initialNodes = [
  { id: "n1", name: "TechNova Assembly", type: "Manufacturer", location: "Shenzhen, China", risk: "High", delay: "5–7 days", x: 50, y: 48 },
  { id: "n2", name: "Apex Microchips", type: "Component supplier", location: "Taiwan", risk: "Critical", delay: "8–12 days", x: 24, y: 24 },
  { id: "n3", name: "VoltCell Energy", type: "Battery supplier", location: "Seoul, South Korea", risk: "Medium", delay: "2–3 days", x: 25, y: 75 },
  { id: "n4", name: "Northstar Logistics", type: "Logistics partner", location: "Singapore", risk: "Low", delay: "No delay", x: 76, y: 24 },
  { id: "n5", name: "Nova Retail Group", type: "Distribution", location: "Mumbai, India", risk: "Medium", delay: "3–4 days", x: 77, y: 74 },
];

const disruptions = [
  { title: "Port congestion in Kaohsiung", place: "Taiwan · Logistics", severity: "Critical", time: "12 min ago", impact: "18 downstream businesses" },
  { title: "Semiconductor capacity shortage", place: "Hsinchu · Manufacturing", severity: "High", time: "48 min ago", impact: "9 downstream businesses" },
  { title: "Severe weather advisory", place: "South China Sea · Weather", severity: "Medium", time: "2 hrs ago", impact: "4 downstream businesses" },
];

function Badge({ children, tone = "slate" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function StatCard({ icon: Icon, label, value, change, positive, tone }) {
  return <div className="stat-card">
    <div className={`stat-icon ${tone}`}><Icon size={19} /></div>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
    <div className={`stat-change ${positive ? "positive" : "negative"}`}>
      {positive ? <ArrowDownRight size={14}/> : <ArrowUpRight size={14}/>} {change}
    </div>
  </div>;
}

function NetworkMap({ nodes, selected, onSelect }) {
  const positions = Object.fromEntries(nodes.map(n => [n.id, n]));
  const edges = [["n2","n1"],["n3","n1"],["n1","n4"],["n1","n5"],["n4","n5"]];
  return <div className="network-map">
    <div className="map-grid" />
    <svg className="edges" viewBox="0 0 100 100" preserveAspectRatio="none">
      {edges.map(([a,b]) => <line key={a+b} x1={positions[a].x} y1={positions[a].y} x2={positions[b].x} y2={positions[b].y} />)}
      <circle cx="50" cy="48" r="17" className="pulse-ring"/>
    </svg>
    {nodes.map(n => <button
      key={n.id}
      className={`node ${n.risk.toLowerCase()} ${selected === n.id ? "selected" : ""}`}
      style={{left: `${n.x}%`, top: `${n.y}%`}}
      onClick={() => onSelect(n.id)}
      title={`${n.name} — ${n.risk} risk`}
    >
      <span className="node-dot">{n.id === "n1" ? <Factory size={17}/> : n.type.includes("Logistics") ? <Truck size={16}/> : <Building2 size={16}/>}</span>
      <span className="node-name">{n.name}</span>
    </button>)}
    <div className="map-legend"><span><i className="dot critical"/> Critical</span><span><i className="dot high"/> High</span><span><i className="dot medium"/> Medium</span><span><i className="dot low"/> Low</span></div>
  </div>;
}

export default function App() {
  const [active, setActive] = useState("Overview");
  const [selected, setSelected] = useState("n1");
  const [query, setQuery] = useState("");
  const [scenario, setScenario] = useState("Taiwan port closure");
  const [simulated, setSimulated] = useState(false);
  const [nodes, setNodes] = useState(initialNodes);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => nodes.filter(n => `${n.name} ${n.location} ${n.type}`.toLowerCase().includes(query.toLowerCase())), [nodes, query]);
  const selectedNode = nodes.find(n => n.id === selected) || nodes[0];

  function runSimulation() {
    setSimulated(true);
    setNotice(`Scenario analysis completed for “${scenario}”. Results shown are illustrative demo outputs.`);
    setTimeout(() => setNotice(""), 5000);
  }

  const nav = [
    ["Overview", LayoutDashboard], ["Supply Network", Network],
    ["Disruptions", AlertTriangle], ["Ripple Prediction", GitBranch],
    ["Scenario Simulator", SlidersHorizontal]
  ];

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Network size={21}/></div><div><b>AtmoGraph</b><small>SUPPLY CHAIN INTELLIGENCE</small></div></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{nav.map(([label, Icon]) => <button key={label} onClick={() => setActive(label)} className={active === label ? "nav-item active" : "nav-item"}><Icon size={18}/><span>{label}</span>{label === "Disruptions" && <i className="nav-count">3</i>}</button>)}</nav>
      <div className="sidebar-bottom">
        <div className="health-card"><div className="health-head"><span className="live-dot"/> SYSTEM STATUS</div><b>All systems operational</b><small>Last synced just now</small></div>
        <button className="nav-item"><Settings size={18}/> Settings</button>
        <button className="nav-item"><CircleHelp size={18}/> Help & support</button>
        <div className="profile"><div className="avatar">TN</div><div><b>TechNova Electronics</b><small>Demo workspace</small></div><ChevronDown size={15}/></div>
      </div>
    </aside>

    <main className="main-content">
      <header className="topbar">
        <div className="breadcrumb">Workspace <span>/</span> <b>{active}</b></div>
        <div className="top-actions"><div className="system-pill"><span className="live-dot"/> Live monitoring</div><button className="icon-button" aria-label="Notifications"><Bell size={18}/><i/></button><div className="avatar small">TN</div></div>
      </header>

      <section className="page">
        <div className="page-heading">
          <div><div className="eyebrow">SUNDAY, NOVEMBER 22, 2026 <span>•</span> GLOBAL NETWORK</div><h1>{active === "Overview" ? "Supply chain overview" : active}</h1><p>Monitor your network, identify disruptions, and understand downstream impact.</p></div>
          <button className="primary-button" onClick={() => {setActive("Scenario Simulator"); document.getElementById("scenario")?.scrollIntoView({behavior:"smooth"});}}><Zap size={16}/> Run simulation</button>
        </div>

        <div className="stats-grid">
          <StatCard icon={Boxes} label="Tracked suppliers" value="248" change="+12 this month" positive tone="blue"/>
          <StatCard icon={AlertTriangle} label="Active disruptions" value="07" change="2 critical alerts" tone="red"/>
          <StatCard icon={GitBranch} label="Businesses at risk" value="34" change="+8.4% vs last week" tone="orange"/>
          <StatCard icon={Gauge} label="Network resilience" value="82.6%" change="+3.2% this month" positive tone="green"/>
        </div>

        {notice && <div className="notice"><ShieldCheck size={17}/>{notice}</div>}

        <div className="content-grid">
          <section className="panel network-panel">
            <div className="panel-heading"><div><h2>Supply network map</h2><p>Live view of connected suppliers and distribution partners</p></div><button className="subtle-button"><Globe2 size={15}/> Global view <ChevronDown size={14}/></button></div>
            <NetworkMap nodes={nodes} selected={selected} onSelect={setSelected}/>
            <div className="selected-info"><div className="selected-icon"><Building2 size={18}/></div><div className="selected-copy"><b>{selectedNode.name}</b><span>{selectedNode.type} · {selectedNode.location}</span></div><Badge tone={selectedNode.risk.toLowerCase()}>{selectedNode.risk} risk</Badge><div className="delay"><small>Estimated delay</small><b>{selectedNode.delay}</b></div></div>
          </section>

          <section className="panel disruptions-panel">
            <div className="panel-heading"><div><h2>Disruption intelligence</h2><p>Events that may affect your network</p></div><button className="text-button" onClick={() => setActive("Disruptions")}>View all</button></div>
            <div className="disruption-list">{disruptions.map((d,i)=><div className="disruption" key={d.title}><div className={`severity-icon ${d.severity.toLowerCase()}`}><AlertTriangle size={17}/></div><div className="disruption-copy"><b>{d.title}</b><span>{d.place}</span><small><Clock3 size={12}/>{d.time}</small></div><div className="disruption-meta"><Badge tone={d.severity.toLowerCase()}>{d.severity}</Badge><small>{d.impact}</small></div></div>)}</div>
            <div className="panel-footer"><span><span className="live-dot"/> Monitoring 18 data sources</span><span>Updated 2 min ago</span></div>
          </section>
        </div>

        <div className="bottom-grid">
          <section className="panel exposure-panel">
            <div className="panel-heading"><div><h2>Industry exposure</h2><p>Downstream risk by business sector</p></div><button className="subtle-button">This week <ChevronDown size={14}/></button></div>
            {[["Electronics",78,"high"],["Automotive",56,"medium"],["Retail",42,"medium"],["Healthcare",23,"low"]].map(([name,val,tone])=><div className="exposure-row" key={name}><div><span>{name}</span><b>{val}%</b></div><div className="progress"><i className={tone} style={{width:`${val}%`}}/></div></div>)}
          </section>

          <section className="panel simulator-panel" id="scenario">
            <div className="panel-heading"><div><h2>Quick scenario simulator</h2><p>Test a disruption and estimate its ripple effect</p></div><div className="sim-icon"><Activity size={18}/></div></div>
            <label htmlFor="scenario">DISRUPTION SCENARIO</label>
            <select id="scenario" value={scenario} onChange={e=>{setScenario(e.target.value);setSimulated(false);}}>
              <option>Taiwan port closure</option><option>Semiconductor shortage</option><option>Supplier factory shutdown</option><option>Severe weather event</option>
            </select>
            <button className="primary-button full" onClick={runSimulation}><Zap size={16}/> Analyze ripple effect</button>
            {simulated && <div className="simulation-result"><b>Illustrative prediction</b><span>12 suppliers · 34 businesses potentially affected</span><span>Estimated network recovery: 9–14 days</span></div>}
          </section>
        </div>

        <footer className="footer"><span>AtmoGraph <b>·</b> Supply Chain Ripple Effect Predictor</span><span>Demo dashboard · Sample data only</span></footer>
      </section>
    </main>
  </div>;
}
