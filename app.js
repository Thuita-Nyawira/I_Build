// ════════════════════════════════════════════════════
//  DATA STORE  (localStorage, key prefix hdk3_)
// ════════════════════════════════════════════════════
const LS={
  g:k=>{try{return JSON.parse(localStorage.getItem('hdk3_'+k))}catch{return null}},
  s:(k,v)=>{localStorage.setItem('hdk3_'+k,JSON.stringify(v))}
};

// helpers
const N=()=>new Date().toLocaleString('en-KE',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'});
const today=()=>new Date().toISOString().split('T')[0];
const dlbl=d=>{if(!d)return'—';try{return new Date(d).toLocaleDateString('en-KE',{day:'2-digit',month:'short',year:'numeric'})}catch{return d}};
const daysFrom=d=>Math.round((new Date(d)-new Date())/86400000);
const uid=()=>'i'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const ini=n=>n.split(' ').map(p=>p[0]).join('').substring(0,2).toUpperCase();
const cap=s=>s?s[0].toUpperCase()+s.slice(1):'';
const fmt=n=>Math.round(n||0).toLocaleString();
const effRate=p=>p.discountRate?Math.round(p.rate*(1-p.discountRate/100)):p.rate;

// ════════════════════════════════════════════════════
//  SEED DATA
// ════════════════════════════════════════════════════
function initData(){
  if(LS.g('seeded4'))return;
  const d=n=>{let t=new Date();t.setDate(t.getDate()+n);return t.toISOString().split('T')[0]};
  LS.s('users',[
    {id:'u1',name:'Mary Kimani',username:'owner',password:'owner123',role:'owner',phone:'0700000001',active:true},
    {id:'u2',name:'Peter Mwangi',username:'manager',password:'mgr123',role:'manager',phone:'0700000002',active:true},
    {id:'u3',name:'John Otieno',username:'john',password:'staff123',role:'staff',phone:'0700000003',active:true},
  ]);
  LS.s('products',[
    {id:'p1',name:'Scaffolding Bay 1.2m',code:'SCF-120',total:260,hired:190,sold:40,rate:350,cat:'Scaffolding',cost:12000,discountRate:0},
    {id:'p2',name:'Concrete Mixer 350L',code:'MX-350',total:8,hired:7,sold:2,rate:2800,cat:'Mixers',cost:85000,discountRate:0},
    {id:'p3',name:'Generator 20KVA',code:'GEN-20K',total:5,hired:4,sold:1,rate:4500,cat:'Generators',cost:220000,discountRate:10},
    {id:'p4',name:'Vibrator Poker 38mm',code:'VB-38',total:12,hired:8,sold:3,rate:600,cat:'Vibrators',cost:18000,discountRate:0},
    {id:'p5',name:'Plate Compactor',code:'PC-300',total:4,hired:2,sold:0,rate:3200,cat:'Compactors',cost:95000,discountRate:0},
    {id:'p6',name:'Access Tower 3m',code:'AT-300',total:6,hired:1,sold:0,rate:1800,cat:'Access',cost:45000,discountRate:0},
  ]);
  const mH=(id,ref,cl,ph,item,qty,st,due,dep,tot,paid,ps,mi,by,uid_,status)=>({
    id,ref,client:cl,phone:ph,item,qty,start:st,due,deposit:dep,totalDue:tot,totalPaid:paid,
    payments:[{amount:paid,date:st,note:'Deposit',by}],paymentStatus:ps,
    maxInstallments:mi,by,userId:uid_,status
  });
  LS.s('hires',[
    mH('h1','HIR-2025-001','James Kariuki','0712345678','Scaffolding Bay 1.2m',60,d(-20),d(7),25000,98000,25000,'partial',5,'Mary (Owner)','u1','active'),
    mH('h2','HIR-2025-002','Buildmaster Ltd','0733456789','Concrete Mixer 350L',3,d(-14),d(2),30000,117600,30000,'partial',3,'Peter (Manager)','u2','due-soon'),
    mH('h3','HIR-2025-003','Summit Works','0722567890','Generator 20KVA',1,d(-10),d(5),63000,63000,63000,'paid',1,'Mary (Owner)','u1','active'),
    mH('h4','HIR-2025-004','Nyeri Contractors','0700678901','Scaffolding Bay 1.2m',40,d(-21),d(-3),18000,73500,18000,'partial',5,'John (Staff)','u3','overdue'),
    mH('h5','HIR-2025-005','Alpha Structures','0755789012','Vibrator Poker 38mm',4,d(-8),d(10),12000,33600,12000,'partial',5,'Mary (Owner)','u1','active'),
    mH('h6','HIR-2025-006','Kariuki Const.','0788901234','Plate Compactor',1,d(-15),d(-5),16000,48000,16000,'partial',4,'Peter (Manager)','u2','overdue'),
  ]);
  LS.s('clients',[
    {id:'c1',name:'James Kariuki',phone:'0712345678',email:'james@email.com',location:'Nairobi',notes:'Reliable, always pays',addedBy:'Mary',hires:3,total:78000,lastHire:d(-20)},
    {id:'c2',name:'Buildmaster Ltd',phone:'0733456789',email:'info@buildmaster.co.ke',location:'Mombasa Rd',notes:'',addedBy:'Peter',hires:2,total:145000,lastHire:d(-14)},
    {id:'c3',name:'Summit Works',phone:'0722567890',email:'',location:'Westlands',notes:'',addedBy:'Mary',hires:1,total:44000,lastHire:d(-10)},
    {id:'c4',name:'Nyeri Contractors',phone:'0700678901',email:'',location:'Nyeri',notes:'Late payer — always insist on deposit',addedBy:'John',hires:4,total:92000,lastHire:d(-21)},
    {id:'c5',name:'Alpha Structures',phone:'0755789012',email:'',location:'Karen',notes:'',addedBy:'Mary',hires:2,total:58000,lastHire:d(-8)},
    {id:'c6',name:'Kariuki Const.',phone:'0788901234',email:'',location:'Thika',notes:'',addedBy:'Peter',hires:1,total:32000,lastHire:d(-15)},
  ]);
  LS.s('docs',[
    {id:'d1',type:'Invoice',ref:'HIR-2025-001',client:'James Kariuki',amount:98000,by:'Mary (Owner)',date:d(-20)},
    {id:'d2',type:'Deposit Receipt',ref:'HIR-2025-002',client:'Buildmaster Ltd',amount:30000,by:'Peter (Manager)',date:d(-14)},
  ]);
  LS.s('stockH',[
    {id:'s1',date:d(-60),product:'Scaffolding Bay 1.2m',type:'buy',qty:20,val:12000,total:240000,notes:'Initial batch purchase',by:'Mary (Owner)'},
    {id:'s2',date:d(-30),product:'Concrete Mixer 350L',type:'sell',qty:2,val:45000,total:90000,notes:'Sold — end of life',by:'Peter (Manager)'},
    {id:'s3',date:d(-10),product:'Generator 20KVA',type:'price',qty:null,val:4500,total:null,notes:'Rate set. Reason: Demand increase',by:'Mary (Owner)'},
  ]);
  LS.s('priceH',[
    {id:'ph1',productId:'p3',product:'Generator 20KVA',type:'discount',oldRate:4500,newRate:4500,discount:10,reason:'Seasonal promotion discount',date:d(-10),by:'Mary (Owner)'},
  ]);
  LS.s('rlog',[{client:'Buildmaster Ltd',ref:'HIR-2025-002',msg:'Return reminder — due in 2 days',by:'System',date:d(0)+' 07:00'}]);
  LS.s('sessions',[]);
  LS.s('actLog',[
    {id:'a1',userId:'u1',user:'Mary (Owner)',action:'New hire: James Kariuki — Scaffolding 60 bays (HIR-2025-001) Total KSh 98,000',type:'hire',time:d(-20)+' 09:14'},
    {id:'a2',userId:'u2',user:'Peter (Manager)',action:'Invoice created: HIR-2025-002 — Buildmaster Ltd',type:'invoice',time:d(-14)+' 10:22'},
    {id:'a3',userId:'u3',user:'John (Staff)',action:'New client added: Nyeri Contractors',type:'inventory',time:d(-21)+' 14:05'},
    {id:'a4',userId:'u1',user:'Mary (Owner)',action:'Price change: Generator 20KVA — 10% seasonal discount applied',type:'inventory',time:d(-10)+' 11:30'},
  ]);
  LS.s('unpaidAlerts',[]);
  LS.s('seeded4',true);
}

// ════════════════════════════════════════════════════
//  STATE
// ════════════════════════════════════════════════════
let CU=null,charts={},retHireId=null,payHireId=null;

// ════════════════════════════════════════════════════
//  IDLE AUTO-LOGOUT  (10 minutes)
// ════════════════════════════════════════════════════
let idleWT=null,idleTick=null,idleSec=600;
const ILIM=600,IWRN=60;
function resetIdle(){
  clearTimeout(idleWT);clearInterval(idleTick);
  document.getElementById('idleBar').style.display='none';
  if(!CU)return;
  idleSec=ILIM;
  idleWT=setTimeout(()=>{
    idleSec=IWRN;
    document.getElementById('idleBar').style.display='block';
    idleTick=setInterval(()=>{
      idleSec--;
      const m=Math.floor(idleSec/60),s=idleSec%60;
      document.getElementById('idleCnt').textContent=(m>0?m+':':'')+(s<10&&m>0?'0':'')+s+(m===0?'s':'');
      if(idleSec<=0){clearInterval(idleTick);autoOut();}
    },1000);
  },(ILIM-IWRN)*1000);
}
function autoOut(){if(!CU)return;showAlert('warn','Auto sign-out','10 min inactivity. Signed out.','&#9203;');doLogout();}
['mousemove','mousedown','keydown','touchstart','scroll','click'].forEach(e=>
  document.addEventListener(e,()=>{if(CU)resetIdle();},{passive:true})
);

// ════════════════════════════════════════════════════
//  AUTH
// ════════════════════════════════════════════════════
function fillL(u,p){document.getElementById('luser').value=u;document.getElementById('lpass').value=p;}

function doLogin(){
  const u=document.getElementById('luser').value.trim();
  const p=document.getElementById('lpass').value.trim();
  const users=LS.g('users')||[];
  const user=users.find(x=>x.username===u&&x.password===p&&x.active);
  const err=document.getElementById('lerr');
  if(!user){err.textContent='Incorrect username or password. Please try again.';err.style.display='block';return;}
  err.style.display='none';CU=user;
  const ss=LS.g('sessions')||[];
  const sess={id:uid(),userId:user.id,userName:user.name,role:user.role,loginTime:N(),logoutTime:null,duration:null,actions:0};
  LS.s('sessions',[sess,...ss]);LS.s('as_'+user.id,sess.id);
  logA(user.id,user.name+' ('+cap(user.role)+')','Logged in','login');
  if(user.role!=='owner')LS.s('pal_'+user.id,{user:user.name,role:user.role,time:N()});
  resetIdle();showApp();
}

function doLogout(){
  if(!CU)return;
  closeAllM();
  const sid=LS.g('as_'+CU.id);
  if(sid){
    const ss=LS.g('sessions')||[];const i=ss.findIndex(s=>s.id===sid);
    if(i>=0){
      ss[i].logoutTime=N();
      try{const ms=new Date()-new Date(ss[i].loginTime.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$3-$2-$1'));const mn=Math.round(ms/60000);ss[i].duration=mn>=60?Math.floor(mn/60)+'h '+(mn%60)+'m':mn+'m';}catch{}
      LS.s('sessions',ss);
    }
    LS.s('as_'+CU.id,null);
  }
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','Logged out','login');
  CU=null;
  clearTimeout(idleWT);clearInterval(idleTick);
  document.getElementById('idleBar').style.display='none';
  document.getElementById('sApp').classList.remove('on');
  document.getElementById('sLogin').classList.add('on');
}

function showApp(){
  document.getElementById('sLogin').classList.remove('on');
  document.getElementById('sApp').classList.add('on');
  document.getElementById('sbav').textContent=ini(CU.name);
  document.getElementById('sbav').className='uav '+CU.role;
  document.getElementById('sbn').textContent=CU.name;
  document.getElementById('sbr').textContent=cap(CU.role);
  document.getElementById('admNav').style.display=(CU.role==='owner'||CU.role==='manager')?'block':'none';
  const pb=document.getElementById('btnPriceMgr');
  if(pb)pb.style.display=(CU.role==='owner'||CU.role==='manager')?'inline-flex':'none';
  populateSels();sv('dashboard',document.querySelector('[data-v=dashboard]'));updateBadges();
  // pending login alerts for owner/manager
  if(CU.role==='owner'||CU.role==='manager'){
    (LS.g('users')||[]).forEach(x=>{
      if(x.id===CU.id)return;
      const a=LS.g('pal_'+x.id);
      if(a){showAlert('login',x.name+' signed in',cap(a.role)+' &middot; '+a.time,'&#128100;');LS.s('pal_'+x.id,null);}
    });
    const ua=LS.g('unpaidAlerts')||[];
    ua.forEach(a=>showAlert('warn','Unpaid balance alert',a.client+' &mdash; '+a.ref+' owes KSh '+fmt(a.balance),'&#9888;'));
    LS.s('unpaidAlerts',[]);
  }
}

// ════════════════════════════════════════════════════
//  ACTIVITY LOG
// ════════════════════════════════════════════════════
function logA(uid_,ulbl,action,type){
  const log=LS.g('actLog')||[];
  LS.s('actLog',[{id:uid(),userId:uid_,user:ulbl,action,type,time:N()},...log.slice(0,999)]);
  const sid=LS.g('as_'+uid_);
  if(sid){const ss=LS.g('sessions')||[];const i=ss.findIndex(s=>s.id===sid);if(i>=0){ss[i].actions=(ss[i].actions||0)+1;LS.s('sessions',ss);}}
}

// ════════════════════════════════════════════════════
//  NAVIGATION
// ════════════════════════════════════════════════════
const PT={dashboard:'Dashboard',products:'Products & Inventory',hires:'Active Hires',reservations:'Reservations',reminders:'Reminders',clients:'Clients',invoices:'Invoices & Documents',reports:'Reports',users:'User Management',actlog:'Activity Log'};
const PS={dashboard:'Live overview of hire operations',products:'Equipment catalogue, stock management & pricing',hires:'Hire agreements & payment tracking',reservations:'Hold equipment for clients before pickup',reminders:'Return alerts & outstanding balance queue',clients:'Client directory & hire history',invoices:'Create, send & print hire documents',reports:'Fleet utilization & revenue analytics',users:'User access, session history & audit',actlog:'Full timestamped audit trail'};

function sv(id,el){
  document.querySelectorAll('.vw').forEach(v=>v.classList.remove('on'));
  document.querySelectorAll('.nvi').forEach(n=>n.classList.remove('on'));
  const vEl=document.getElementById('v-'+id);if(vEl)vEl.classList.add('on');
  if(el)el.classList.add('on');
  document.getElementById('pgt').textContent=PT[id]||id;
  document.getElementById('pgs').innerHTML='<span class="odot"></span>'+PS[id]+' &nbsp;&mdash;&nbsp; <b>'+CU.name+'</b>';
  const fns={
    dashboard:renderDash,products:()=>renderProds(),hires:()=>renderHires(),reservations:()=>renderReservations(),
    reminders:renderReminders,clients:renderClients,
    invoices:()=>{populateInvSels();refreshInv();renderDocH();},
    reports:renderReports,users:renderUsers,actlog:renderAct
  };
  if(fns[id])fns[id]();
}

function updateBadges(){
  updateReservationStatuses();
  const hs=LS.g('hires')||[];
  const ov=hs.filter(h=>h.status==='overdue').length;
  const ob=document.getElementById('obadge');ob.style.display=ov>0?'inline':'none';ob.textContent=ov;
  const unpaid=hs.filter(h=>h.status!=='returned'&&h.paymentStatus==='partial').length;
  const rb=document.getElementById('rbadge');rb.style.display=unpaid>0?'inline':'none';
  const rs=LS.g('reservations')||[];const pending=rs.filter(r=>r.status==='pending'||r.status==='overdue').length;
  const resb=document.getElementById('resbadge');if(resb){resb.style.display=pending>0?'inline':'none';resb.textContent=pending;}
}

function reservedQty(productId,excludeId){
  return (LS.g('reservations')||[]).filter(r=>r.productId===productId&&r.id!==excludeId&&(r.status==='pending'||r.status==='overdue')).reduce((sum,r)=>sum+r.qty,0);
}

function updateReservationStatuses(){
  const reservations=LS.g('reservations')||[];let changed=false;const now=new Date(today());
  reservations.forEach(r=>{
    if(r.status!=='pending'&&r.status!=='overdue')return;
    const pickup=new Date(r.pickupDate);const lateDays=Math.floor((now-pickup)/86400000);
    const nextStatus=lateDays>=3?'inactive':lateDays>=0?'overdue':'pending';
    if(r.status!==nextStatus){r.status=nextStatus;changed=true;}
  });
  if(changed)LS.s('reservations',reservations);
}

function populateSels(){
  const ps=LS.g('products')||[];
  const nhi=document.getElementById('nhi');
  if(nhi)nhi.innerHTML=ps.map(p=>'<option value="'+p.id+'">'+p.name+'</option>').join('');
  const rsi=document.getElementById('rsi');
  if(rsi)rsi.innerHTML=ps.map(p=>'<option value="'+p.id+'">'+p.name+' (available: '+Math.max(0,p.total-p.hired-(p.sold||0)-reservedQty(p.id))+')</option>').join('');
  const spP=document.getElementById('spP');
  if(spP){spP.innerHTML=ps.map(p=>'<option value="'+p.id+'">'+p.name+' (avail: '+(p.total-p.hired-(p.sold||0))+')</option>').join('');updSellInfo();}
  const rsP=document.getElementById('rsP');
  if(rsP){rsP.innerHTML=ps.map(p=>'<option value="'+p.id+'">'+p.name+'</option>').join('');updRsInfo();}
}

// ════════════════════════════════════════════════════
//  DASHBOARD
// ════════════════════════════════════════════════════
function renderDash(){
  const hs=LS.g('hires')||[];const ps=LS.g('products')||[];
  const active=hs.filter(h=>h.status!=='returned');
  const ov=hs.filter(h=>h.status==='overdue');
  const totU=ps.reduce((a,p)=>a+p.total,0);const hirU=ps.reduce((a,p)=>a+p.hired,0);
  const util=totU>0?Math.round(hirU/totU*100):0;
  const unpaidH=active.filter(h=>h.paymentStatus==='partial');
  const unpaidAmt=unpaidH.reduce((a,h)=>a+(h.totalDue-h.totalPaid),0);
  document.getElementById('dH').textContent=active.length;
  document.getElementById('dHs').textContent=active.length+' agreements active';
  document.getElementById('dU').textContent=util+'%';
  document.getElementById('dUs').textContent=hirU+' of '+totU+' units on hire';
  document.getElementById('dO').textContent=ov.length;
  document.getElementById('dUB').textContent='KSh '+fmt(unpaidAmt);
  document.getElementById('dUBs').textContent=unpaidH.length+' hire'+(unpaidH.length!==1?'s':'')+' with balance due';
  const soon=hs.filter(h=>h.status!=='returned'&&daysFrom(h.due)<=3&&daysFrom(h.due)>=-7);
  document.getElementById('dRet').innerHTML=soon.length?soon.map(h=>{
    const dy=daysFrom(h.due);const c=dy<0?'var(--R)':dy<=2?'var(--A)':'var(--G)';
    const l=dy<0?Math.abs(dy)+'d overdue':dy===0?'Today':dy===1?'Tomorrow':dy+'d left';
    return '<div class="aci"><div class="acd" style="background:'+c+'"></div><div class="acb"><div class="act">'+h.client+' &mdash; '+h.item+' &times;'+h.qty+'</div><div class="acm">'+h.ref+' &middot; Balance: KSh '+fmt(h.totalDue-h.totalPaid)+'</div></div><div class="actime" style="color:'+c+';font-weight:700">'+l+'</div></div>';
  }).join(''):'<div style="padding:22px;text-align:center;color:var(--t3);font-size:13px">No returns due in the next 3 days</div>';
  const al=LS.g('actLog')||[];
  document.getElementById('dAct').innerHTML=al.slice(0,6).map(a=>'<div class="aci"><div class="acd" style="background:var(--b2)"></div><div class="acb"><div class="act">'+a.action+'</div><div class="acm">'+a.user+' &middot; '+a.time+'</div></div></div>').join('');
  const ss=LS.g('sessions')||[];
  document.getElementById('onlbl').textContent=ss.filter(s=>!s.logoutTime).length+' online now';
  document.getElementById('dUtil').innerHTML=ps.map(p=>{
    const u=Math.round(p.hired/p.total*100);const c=u>=80?'#142B6F':u>=50?'#FFD601':'#E1DEE6';
    return '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px"><div style="width:170px;font-size:12px;color:var(--t2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:0">'+p.name+'</div><div style="flex:1;height:8px;background:var(--bg2);border-radius:5px"><div style="width:'+u+'%;height:8px;background:'+c+';border-radius:5px"></div></div><div style="width:38px;text-align:right;font-size:12px;font-weight:700;color:'+c+'">'+u+'%</div><div style="width:72px;font-size:11px;color:var(--t3);text-align:right">'+p.hired+'/'+p.total+' units</div></div>';
  }).join('');
}

// ════════════════════════════════════════════════════
//  PRODUCTS
// ════════════════════════════════════════════════════
function renderProds(filter){
  let ps=LS.g('products')||[];const allPs=ps;
  if(filter==='avail')ps=ps.filter(p=>p.total-p.hired-(p.sold||0)-reservedQty(p.id)>0);
  else if(filter==='hired')ps=ps.filter(p=>p.hired>0);
  const totU=allPs.reduce((a,p)=>a+p.total,0);const hirU=allPs.reduce((a,p)=>a+p.hired,0);
  const soldU=allPs.reduce((a,p)=>a+(p.sold||0),0);
  document.getElementById('pTot').textContent=allPs.length;
  document.getElementById('pUnit').textContent=totU;
  document.getElementById('pUnits').textContent=(totU-hirU)+' available now';
  document.getElementById('pSold').textContent=soldU;
  document.getElementById('pUtil').textContent=(totU>0?Math.round(hirU/totU*100):0)+'%';
  document.getElementById('prodTb').innerHTML=ps.map(p=>{
    const avail=p.total-p.hired-(p.sold||0)-reservedQty(p.id);const u=Math.round(p.hired/p.total*100);
    const c=u>=80?'#142B6F':u>=50?'#FFD601':'#E1DEE6';
    const er=effRate(p);const disc=p.discountRate||0;
    const discPill=disc>0?'<span class="pl phire" style="font-size:10px;padding:2px 7px">'+disc+'% off</span>':'<span style="font-size:11px;color:var(--t3)">—</span>';
    const priceBtn=(CU.role==='owner'||CU.role==='manager')?'<button class="btn bxs ba" onclick="openPriceEdit(\''+p.id+'\')">&#9998;</button>':'';
    return '<tr><td><div style="font-weight:600">'+p.name+'</div><div style="font-size:11px;color:var(--t3)">'+p.cat+'</div></td>'+
      '<td class="mono">'+p.code+'</td><td>'+p.total+'</td>'+
      '<td style="color:var(--P)">'+(p.sold||0)+'</td>'+
      '<td style="color:var(--B)">'+p.hired+'</td>'+
      '<td style="color:'+(avail>0?'var(--G)':'var(--R)')+';font-weight:700">'+avail+'</td>'+
      '<td><div style="font-weight:600">KSh '+fmt(er)+'/day</div>'+(disc>0?'<div style="font-size:10px;color:var(--t3);text-decoration:line-through">KSh '+fmt(p.rate)+'</div>':'')+'</td>'+
      '<td>'+discPill+'</td>'+
      '<td><div class="uw"><div class="ut"><div class="uf" style="width:'+u+'%;background:'+c+'"></div></div><span style="font-weight:700;color:'+c+'">'+u+'%</span></div></td>'+
      '<td style="display:flex;gap:4px;flex-wrap:wrap"><button class="btn bxs bb" onclick="openRestock(\''+p.id+'\')">+Stock</button><button class="btn bxs br" onclick="openSell(\''+p.id+'\')">&#8722;Sell</button>'+priceBtn+'</td></tr>';
  }).join('');
  // Stock + price history combined
  const sh=LS.g('stockH')||[];
  document.getElementById('stockTb').innerHTML=sh.map(s=>{
    let tag,qtyVal,valVal,totVal;
    if(s.type==='buy'){tag='<span class="bdg buy">Purchase</span>';qtyVal='+'+s.qty+' units';valVal='KSh '+fmt(s.val);totVal='<span style="color:var(--R);font-weight:600">&minus;KSh '+fmt(s.total)+'</span>';}
    else if(s.type==='sell'){tag='<span class="bdg sell">Sold</span>';qtyVal='&minus;'+s.qty+' units';valVal='KSh '+fmt(s.val);totVal='<span style="color:var(--G);font-weight:600">+KSh '+fmt(s.total)+'</span>';}
    else{tag='<span class="bdg price">Price</span>';qtyVal='Rate change';valVal='KSh '+fmt(s.val)+'/day';totVal='&mdash;';}
    return '<tr><td class="mono">'+dlbl(s.date)+'</td><td style="font-weight:500">'+s.product+'</td><td>'+tag+'</td><td>'+qtyVal+'</td><td>'+valVal+'</td><td>'+totVal+'</td><td style="font-size:12px;color:var(--t2)">'+s.notes+'</td><td style="font-size:11px;color:var(--t3)">'+s.by+'</td></tr>';
  }).join('');
}

function openRestock(pid){const rsp=document.getElementById('rsP');if(rsp){rsp.value=pid;updRsInfo();}openM('mRestock');}
function openSell(pid){const spp=document.getElementById('spP');if(spp){spp.value=pid;updSellInfo();}openM('mSell');}

function updRsInfo(){
  const ps=LS.g('products')||[];const pid=document.getElementById('rsP')?.value;
  const p=ps.find(x=>x.id===pid);const el=document.getElementById('rsInfo');
  if(p&&el)el.innerHTML='Stock: <b>'+p.total+'</b> total &nbsp;&middot;&nbsp; <b>'+p.hired+'</b> on hire &nbsp;&middot;&nbsp; <b>'+(p.total-p.hired)+'</b> available &nbsp;&middot;&nbsp; Rate: KSh <b>'+fmt(effRate(p))+'</b>/day';
}
function updSellInfo(){
  const ps=LS.g('products')||[];const pid=document.getElementById('spP')?.value;
  const p=ps.find(x=>x.id===pid);const el=document.getElementById('spInfo');
  if(p&&el)el.innerHTML='Can sell up to <b>'+(p.total-p.hired)+'</b> units &nbsp;(<i>'+p.hired+' currently on hire cannot be removed</i>)';
}

// ====================================================
//  RESERVATIONS
// ====================================================
function renderReservations(filter){
  updateReservationStatuses();
  let reservations=LS.g('reservations')||[];
  if(filter)reservations=reservations.filter(r=>r.status===filter);
  const labels={pending:'Pending',overdue:'Overdue',inactive:'Inactive', 'picked-up':'Picked up'};
  const pills={pending:'pdue',overdue:'pover',inactive:'psold','picked-up':'phire'};
  const rows=reservations.map(r=>{
    const actions=r.status==='pending'||r.status==='overdue'
      ?'<button class="btn bxs bg" onclick="convertReservation(\''+r.id+'\')">Convert to hire</button><button class="btn bxs br" onclick="deactivateReservation(\''+r.id+'\')">Deactivate</button>'
      :'<span style="font-size:11px;color:var(--t3)">No actions</span>';
    return '<tr><td class="mono">'+r.ref+'</td><td style="font-weight:600">'+r.client+'<div style="font-size:10px;color:var(--t3)">'+r.phone+'</div></td><td>'+r.item+' &times;'+r.qty+'</td><td class="mono">'+dlbl(r.pickupDate)+'</td><td>'+r.qty+'</td><td><span class="pl '+(pills[r.status]||'pavail')+'" style="font-size:11px">'+(labels[r.status]||r.status)+'</span></td><td style="display:flex;gap:4px;flex-wrap:wrap">'+actions+'</td></tr>';
  }).join('');
  const tb=document.getElementById('reservationsTb');
  if(tb)tb.innerHTML=rows||'<tr><td colspan="7" style="text-align:center;color:var(--t3);padding:28px">No reservations match this filter</td></tr>';
  const active=(LS.g('reservations')||[]).filter(r=>r.status==='pending'||r.status==='overdue');
  const summary=document.getElementById('reservationSummary');
  if(summary)summary.textContent=active.length+' active reservation'+(active.length===1?'':'s')+' currently holding '+active.reduce((sum,r)=>sum+r.qty,0)+' unit'+(active.reduce((sum,r)=>sum+r.qty,0)===1?'':'s')+'.';
}

function saveReservation(){
  const client=document.getElementById('rsc').value.trim(),phone=document.getElementById('rsp').value.trim();
  const productId=document.getElementById('rsi').value,qty=parseInt(document.getElementById('rsq').value)||0;
  const pickupDate=document.getElementById('rsd').value,returnDate=document.getElementById('rse').value,notes=document.getElementById('rsn').value.trim();
  const siteLocation=document.getElementById('rsl').value.trim(),fulfilment=document.getElementById('rsm').value;
  const transportCost=fulfilment==='delivery'?Math.max(0,parseInt(document.getElementById('rst').value)||0):0;
  const p=(LS.g('products')||[]).find(x=>x.id===productId);
  if(!client||!phone||!pickupDate||!returnDate||!siteLocation||qty<=0||!p){alert('Please fill in the client, equipment, quantity, dates, and site location.');return;}
  if(new Date(returnDate)<new Date(pickupDate)){alert('Expected return must be on or after pickup date.');return;}
  const available=Math.max(0,p.total-p.hired-(p.sold||0)-reservedQty(productId));
  if(qty>available){alert('Only '+available+' units are available for reservation.');return;}
  const reservations=LS.g('reservations')||[];const ref='RES-2025-'+String(reservations.length+1).padStart(3,'0');
  reservations.unshift({id:uid(),ref,client,phone,productId,item:p.name,qty,pickupDate,returnDate,siteLocation,fulfilment,transportCost,notes,status:'pending',by:CU.name+' ('+cap(CU.role)+')',userId:CU.id,created:today()});
  LS.s('reservations',reservations);
  const cs=LS.g('clients')||[];if(!cs.find(c=>c.name===client)){cs.unshift({id:uid(),name:client,phone,email:'',location:'',notes:'',addedBy:CU.name,hires:0,total:0,lastHire:pickupDate});LS.s('clients',cs);}
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','Reservation created: '+client+' — '+p.name+' ×'+qty+' ('+ref+')','hire');
  closeM('mReservation');['rsc','rsp','rsl','rsn'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});document.getElementById('rst').value='0';document.getElementById('rsm').value='delivery';toggleReservationTransport();
  updateBadges();renderReservations();populateSels();showAlert('login','Reservation saved',ref+' &mdash; '+client,'&#128197;');
}

function convertReservation(id){
  updateReservationStatuses();const reservations=LS.g('reservations')||[];const i=reservations.findIndex(r=>r.id===id);if(i<0)return;
  const r=reservations[i];if(r.status!=='pending'&&r.status!=='overdue'){alert('This reservation is no longer active.');return;}
  const p=(LS.g('products')||[]).find(x=>x.id===r.productId);if(!p)return;
  const available=p.total-p.hired-(p.sold||0);if(r.qty>available){alert('Not enough equipment is currently available to convert this reservation.');return;}
  const hs=LS.g('hires')||[];const ref='HIR-2025-'+String(hs.length+1).padStart(3,'0');const days=Math.max(1,Math.round((new Date(r.returnDate)-new Date(r.pickupDate))/86400000));const total=effRate(p)*r.qty*days;
  const transportCost=r.fulfilment==='delivery'?Math.max(0,r.transportCost||0):0;
  hs.unshift({id:uid(),ref,client:r.client,phone:r.phone,item:r.item,qty:r.qty,start:r.pickupDate,due:r.returnDate,siteLocation:r.siteLocation,fulfilment:r.fulfilment,transportCost,deposit:0,totalDue:total+transportCost,totalPaid:0,payments:[],paymentStatus:'partial',maxInstallments:5,notes:r.notes,by:CU.name+' ('+cap(CU.role)+')',userId:CU.id,status:daysFrom(r.returnDate)<0?'overdue':daysFrom(r.returnDate)<=3?'due-soon':'active',reservationId:r.id});
  LS.s('hires',hs);p.hired+=r.qty;LS.s('products',LS.g('products'));
  r.status='picked-up';r.pickedUpOn=today();r.convertedHireRef=ref;reservations[i]=r;LS.s('reservations',reservations);
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','Reservation converted to active hire: '+r.ref+' → '+ref,'hire');
  updateBadges();renderReservations();renderHires();renderDash();populateSels();showAlert('login','Reservation converted',ref+' is now an active hire','&#10003;');
}

function toggleReservationTransport(){
  const delivery=document.getElementById('rsm')?.value==='delivery';
  const wrap=document.getElementById('rstw'),input=document.getElementById('rst');
  if(wrap)wrap.style.display=delivery?'block':'none';
  if(input){input.disabled=!delivery;if(!delivery)input.value='0';}
}

function deactivateReservation(id){
  const reservations=LS.g('reservations')||[];const r=reservations.find(x=>x.id===id);if(!r)return;
  r.status='inactive';r.inactiveOn=today();LS.s('reservations',reservations);logA(CU.id,CU.name+' ('+cap(CU.role)+')','Reservation deactivated: '+r.ref,'hire');
  updateBadges();renderReservations();populateSels();showAlert('info','Reservation inactive',r.ref+' no longer holds stock','&#9888;');
}

function saveProd(){
  const n=document.getElementById('apn').value.trim(),c=document.getElementById('apc').value.trim();
  const q=parseInt(document.getElementById('apq').value)||0,uc=parseInt(document.getElementById('apuc').value)||0;
  const r=parseInt(document.getElementById('apr').value)||0,cat=document.getElementById('apcat').value;
  const notes=document.getElementById('apnotes').value;
  if(!n||!c||q<=0||r<=0){alert('Fill in name, code, quantity and hire rate.');return;}
  const ps=LS.g('products')||[];
  const ei=ps.findIndex(p=>p.code.toLowerCase()===c.toLowerCase());
  if(ei>=0){ps[ei].total+=q;}
  else ps.push({id:uid(),name:n,code:c,total:q,hired:0,sold:0,rate:r,cat,cost:uc,discountRate:0});
  LS.s('products',ps);
  const sh=LS.g('stockH')||[];
  sh.unshift({id:uid(),date:today(),product:n,type:'buy',qty:q,val:uc,total:uc*q,notes:notes||'New purchase',by:CU.name+' ('+cap(CU.role)+')'});
  LS.s('stockH',sh);
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','Equipment purchased: '+n+' x'+q+' units @ KSh '+fmt(uc)+' each','inventory');
  closeM('mAddProd');['apn','apc','apq','apuc','apr','apnotes'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  renderProds();populateSels();showAlert('login','Equipment added',n+' &times;'+q+' units added to inventory','&#128230;');
}

function doRestock(){
  const ps=LS.g('products')||[];const pid=document.getElementById('rsP').value;
  const q=parseInt(document.getElementById('rsQ').value)||0,cost=parseInt(document.getElementById('rsCost').value)||0;
  const notes=document.getElementById('rsN').value;
  const i=ps.findIndex(p=>p.id===pid);
  if(i<0||q<=0){alert('Select a product and enter quantity.');return;}
  ps[i].total+=q;LS.s('products',ps);
  const sh=LS.g('stockH')||[];
  sh.unshift({id:uid(),date:today(),product:ps[i].name,type:'buy',qty:q,val:cost,total:cost*q,notes:notes||'Restock',by:CU.name+' ('+cap(CU.role)+')'});
  LS.s('stockH',sh);
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','Restocked: '+ps[i].name+' +'+q+' units','inventory');
  closeM('mRestock');renderProds();populateSels();
  showAlert('login','Restocked',ps[i].name+' +'+q+' units added','&#128230;');
}

function doSell(){
  const ps=LS.g('products')||[];const pid=document.getElementById('spP').value;
  const q=parseInt(document.getElementById('spQ').value)||0,price=parseInt(document.getElementById('spPrice').value)||0;
  const reason=document.getElementById('spR').value,notes=document.getElementById('spN').value;
  const i=ps.findIndex(p=>p.id===pid);if(i<0){alert('Select a product.');return;}
  const maxSell=ps[i].total-ps[i].hired;
  if(q<=0||q>maxSell){alert('Cannot remove '+q+' units. Max available: '+maxSell);return;}
  ps[i].total-=q;ps[i].sold=(ps[i].sold||0)+q;LS.s('products',ps);
  const sh=LS.g('stockH')||[];
  sh.unshift({id:uid(),date:today(),product:ps[i].name,type:'sell',qty:q,val:price,total:price*q,notes:cap(reason)+(notes?' — '+notes:''),by:CU.name+' ('+cap(CU.role)+')'});
  LS.s('stockH',sh);
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','Stock disposed: '+ps[i].name+' x'+q+' ('+reason+') @ KSh '+fmt(price)+'/unit','inventory');
  closeM('mSell');renderProds();populateSels();
  showAlert('info','Stock updated',ps[i].name+' &minus;'+q+' units ('+reason+')','&#128412;');
}

// ════════════════════════════════════════════════════
//  PRICE MANAGEMENT  (owner/manager only)
// ════════════════════════════════════════════════════
function openPriceMgr(){
  if(CU.role!=='owner'&&CU.role!=='manager'){alert('Only the owner or manager can manage pricing.');return;}
  const ps=LS.g('products')||[];const ph=LS.g('priceH')||[];
  document.getElementById('pmBody').innerHTML=
    '<div class="ib bl">Only <b>Owner</b> and <b>Manager</b> can change hire rates or apply discounts. Every change is logged with a mandatory reason.</div>'+
    '<div style="font-size:13px;font-weight:700;margin-bottom:10px;font-family:\'Syne\',sans-serif">All product rates</div>'+
    '<div class="tw" style="margin-bottom:22px"><table><thead><tr><th>Product</th><th>Base rate/day</th><th>Discount</th><th>Effective rate</th><th>Last changed</th><th></th></tr></thead><tbody>'+
    ps.map(p=>{
      const disc=p.discountRate||0;const er=effRate(p);
      const last=ph.filter(h=>h.productId===p.id).sort((a,b)=>b.date.localeCompare(a.date))[0];
      return '<tr><td style="font-weight:600">'+p.name+'<div style="font-size:11px;color:var(--t3)">'+p.cat+'</div></td>'+
        '<td>KSh '+fmt(p.rate)+'/day</td>'+
        '<td>'+(disc>0?'<span class="pl phire" style="font-size:11px">'+disc+'% off</span>':'<span style="color:var(--t3)">None</span>')+'</td>'+
        '<td style="font-weight:700;color:var(--G)">KSh '+fmt(er)+'/day</td>'+
        '<td style="font-size:11px;color:var(--t3)">'+(last?dlbl(last.date)+' by '+last.by:'No changes yet')+'</td>'+
        '<td><button class="btn bxs ba" onclick="openPriceEdit(\''+p.id+'\')">Edit</button></td></tr>';
    }).join('')+
    '</tbody></table></div>'+
    '<div style="font-size:13px;font-weight:700;margin-bottom:10px;font-family:\'Syne\',sans-serif">Price change history</div>'+
    (ph.length?
      '<div class="tw"><table><thead><tr><th>Date</th><th>Product</th><th>Change</th><th>Old rate</th><th>New/Discount</th><th>Effective</th><th>Reason</th><th>By</th></tr></thead><tbody>'+
      ph.slice(0,50).map(h=>'<tr><td class="mono">'+h.date+'</td><td>'+h.product+'</td>'+
        '<td><span class="bdg price">'+(h.type==='rate'?'Rate':'Discount')+'</span></td>'+
        '<td>KSh '+fmt(h.oldRate)+'</td>'+
        '<td>'+(h.type==='discount'?h.discount+'% off':'KSh '+fmt(h.newRate))+'</td>'+
        '<td style="color:var(--G);font-weight:600">KSh '+fmt(h.newRate*(h.type==='discount'?1-h.discount/100:1))+'</td>'+
        '<td style="font-size:12px;color:var(--t2)">'+h.reason+'</td>'+
        '<td style="font-size:11px;color:var(--t3)">'+h.by+'</td></tr>').join('')+
      '</tbody></table></div>'
    :'<div style="padding:14px 0;font-size:13px;color:var(--t3)">No price changes recorded yet.</div>');
  openM('mPriceMgr');
}

function openPriceEdit(pid){
  if(CU.role!=='owner'&&CU.role!=='manager'){alert('Access denied.');return;}
  const ps=LS.g('products')||[];const p=ps.find(x=>x.id===pid);if(!p)return;
  const disc=p.discountRate||0;const er=effRate(p);
  document.getElementById('pmBody').innerHTML=
    '<div class="ib bl" style="margin-bottom:16px"><b>'+p.name+'</b> &nbsp;&middot;&nbsp; Code: '+p.code+'</div>'+
    '<div style="background:var(--bg);border-radius:var(--r);padding:14px 16px;margin-bottom:18px">'+
      '<div class="fr3"><div><div style="font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:.7px;margin-bottom:4px">Base rate</div><div style="font-size:18px;font-weight:700;font-family:\'Syne\',sans-serif">KSh '+fmt(p.rate)+'/day</div></div>'+
      '<div><div style="font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:.7px;margin-bottom:4px">Discount</div><div style="font-size:18px;font-weight:700;font-family:\'Syne\',sans-serif;color:'+(disc>0?'var(--G)':'var(--t3)')+'">'+(disc>0?disc+'%':'None')+'</div></div>'+
      '<div><div style="font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:.7px;margin-bottom:4px">Effective rate</div><div style="font-size:18px;font-weight:700;font-family:\'Syne\',sans-serif;color:var(--G)">KSh '+fmt(er)+'/day</div></div></div>'+
    '</div>'+
    '<div class="fr"><div class="fg"><label class="fl">Change type</label>'+
      '<select class="fsel" id="peType" onchange="updPricePrev(\''+pid+'\','+p.rate+','+disc+')">'+
        '<option value="rate">Update hire rate (new base rate)</option>'+
        '<option value="discount">Set discount percentage</option>'+
        '<option value="remove">Remove current discount</option>'+
      '</select>'+
    '</div>'+
    '<div class="fg" id="peVW"><label class="fl" id="peVL">New rate (KSh/day)</label><input class="fi" id="peV" type="number" value="'+p.rate+'" oninput="updPricePrev(\''+pid+'\','+p.rate+','+disc+')"/></div></div>'+
    '<div id="pePrev" style="border-radius:var(--r);padding:12px 14px;font-size:13px;margin-bottom:16px;display:none"></div>'+
    '<div class="fg"><label class="fl">Reason for change <span style="color:var(--R)">*</span></label>'+
      '<select class="fsel" id="peReas" onchange="peCustomToggle()">'+
        '<option value="">Select reason...</option>'+
        '<option value="New purchase — higher unit cost">New purchase — higher unit cost</option>'+
        '<option value="New purchase — lower unit cost negotiated">New purchase — lower unit cost negotiated</option>'+
        '<option value="Market rate increase">Market rate increase</option>'+
        '<option value="Market rate reduction — competitor pricing">Market rate reduction — competitor pricing</option>'+
        '<option value="Bulk / loyal client discount">Bulk / loyal client discount</option>'+
        '<option value="Seasonal promotion discount">Seasonal promotion discount</option>'+
        '<option value="Equipment depreciation — rate reduction">Equipment depreciation — rate reduction</option>'+
        '<option value="Owner directive">Owner directive</option>'+
        '<option value="custom">Other — type below...</option>'+
      '</select>'+
    '</div>'+
    '<div class="fg" id="peCustomW" style="display:none"><label class="fl">Custom reason</label><input class="fi" id="peCustom" placeholder="Describe the reason..."/></div>'+
    '<div style="display:flex;gap:10px;margin-top:4px">'+
      '<button class="btn" style="flex:1" onclick="openPriceMgr()">&#8592; Back</button>'+
      '<button class="btn bg" style="flex:2" onclick="savePriceChange(\''+pid+'\')">Confirm price change</button>'+
    '</div>';
  updPricePrev(pid,p.rate,disc);
  openM('mPriceMgr');
}

function updPricePrev(pid,oldRate,oldDisc){
  const type=document.getElementById('peType')?.value;
  const val=parseFloat(document.getElementById('peV')?.value)||0;
  const vw=document.getElementById('peVW'),vl=document.getElementById('peVL'),pv=document.getElementById('pePrev');
  if(type==='remove'){
    if(vw)vw.style.display='none';
    if(pv){pv.style.display='block';pv.className='ib g';pv.innerHTML='Discount of <b>'+oldDisc+'%</b> will be removed. Rate returns to full KSh '+fmt(oldRate)+'/day';}
    return;
  }
  if(vw)vw.style.display='block';
  if(type==='discount'){
    if(vl)vl.textContent='Discount % (e.g. 15 for 15% off)';
    if(val>0&&pv){const er=Math.round(oldRate*(1-val/100));pv.style.display='block';pv.className='ib g';pv.innerHTML='KSh '+fmt(oldRate)+'/day &nbsp;&minus;&nbsp; <b>'+val+'% discount</b> &nbsp;=&nbsp; effective rate <b style="font-size:15px">KSh '+fmt(er)+'/day</b>';}
  }else{
    if(vl)vl.textContent='New hire rate (KSh/day)';
    if(val>0&&pv){const d=val>oldRate?'increase':'reduction';const diff=Math.abs(val-oldRate);pv.style.display='block';pv.className='ib '+(val>oldRate?'o':'g');pv.innerHTML='Rate <b>'+d+'</b> of KSh '+fmt(diff)+'/day &nbsp;&middot;&nbsp; KSh '+fmt(oldRate)+' &rarr; <b style="font-size:15px">KSh '+fmt(val)+'/day</b>';}
  }
}
function peCustomToggle(){const v=document.getElementById('peReas')?.value;const cw=document.getElementById('peCustomW');if(cw)cw.style.display=v==='custom'?'block':'none';}

function savePriceChange(pid){
  if(CU.role!=='owner'&&CU.role!=='manager'){alert('Access denied.');return;}
  const ps=LS.g('products')||[];const i=ps.findIndex(p=>p.id===pid);if(i<0)return;
  const type=document.getElementById('peType')?.value;
  const val=parseFloat(document.getElementById('peV')?.value)||0;
  const reasSel=document.getElementById('peReas')?.value||'';
  const reasCustom=document.getElementById('peCustom')?.value||'';
  const reason=reasSel==='custom'?reasCustom:reasSel;
  if(!reason){alert('Please select or enter a reason for the price change.');return;}
  const oldRate=ps[i].rate;const oldDisc=ps[i].discountRate||0;
  let newRate=oldRate,newDisc=0,ptype='rate',logMsg='';
  if(type==='rate'){
    if(val<=0){alert('Enter a valid rate.');return;}
    newRate=val;newDisc=0;ptype='rate';
    logMsg='Rate changed: KSh '+fmt(oldRate)+' → KSh '+fmt(newRate)+'/day. Reason: '+reason;
  }else if(type==='discount'){
    if(val<=0||val>=100){alert('Enter a discount between 1 and 99%.');return;}
    newDisc=val;ptype='discount';
    logMsg='Discount applied: '+val+'% off on '+ps[i].name+' (eff. KSh '+fmt(Math.round(newRate*(1-val/100)))+'/day). Reason: '+reason;
  }else{
    newDisc=0;ptype='rate';
    logMsg='Discount removed from '+ps[i].name+'. Full rate KSh '+fmt(newRate)+'/day restored. Reason: '+reason;
  }
  ps[i].rate=newRate;ps[i].discountRate=newDisc;LS.s('products',ps);
  const ph=LS.g('priceH')||[];
  ph.unshift({id:uid(),productId:pid,product:ps[i].name,type:ptype,oldRate,newRate,discount:newDisc||null,reason,date:N(),by:CU.name+' ('+cap(CU.role)+')'});
  LS.s('priceH',ph);
  const sh=LS.g('stockH')||[];
  sh.unshift({id:uid(),date:today(),product:ps[i].name,type:'price',qty:null,val:Math.round(newRate*(1-newDisc/100)),total:null,notes:(ptype==='discount'?newDisc+'% discount. ':'Rate update. ')+'Reason: '+reason,by:CU.name+' ('+cap(CU.role)+')'});
  LS.s('stockH',sh);
  logA(CU.id,CU.name+' ('+cap(CU.role)+')',logMsg,'inventory');
  renderProds();openPriceMgr();
  showAlert('login','Price updated',ps[i].name,'&#128176;');
}

// ════════════════════════════════════════════════════
//  HIRES
// ════════════════════════════════════════════════════
function calcHT(){
  const ps=LS.g('products')||[];const pid=document.getElementById('nhi')?.value;
  const p=ps.find(x=>x.id===pid);const q=parseInt(document.getElementById('nhq')?.value)||0;
  const s=document.getElementById('nhs')?.value,r=document.getElementById('nhr')?.value;
  const dep=parseInt(document.getElementById('nhd')?.value)||0;
  if(!p||!s||!r||q<=0){document.getElementById('htprev').style.display='none';return;}
  const days=Math.max(1,Math.round((new Date(r)-new Date(s))/86400000));
  const er=effRate(p);const total=er*q*days;
  document.getElementById('htprev').style.display='block';
  document.getElementById('htv').textContent='KSh '+fmt(total);
  document.getElementById('htd').innerHTML=q+' &times; '+days+'d &times; KSh '+fmt(er)+'/day'+(p.discountRate?' <span style="color:var(--G);">('+p.discountRate+'% discount applied)</span>':'')+' &nbsp;&middot;&nbsp; Deposit: KSh '+fmt(dep)+' &nbsp;&middot;&nbsp; Balance: KSh '+fmt(Math.max(0,total-dep));
}

function renderHires(filter){
  let hs=LS.g('hires')||[];
  if(filter==='partial')hs=hs.filter(h=>h.paymentStatus==='partial'&&h.status!=='returned');
  else if(filter)hs=hs.filter(h=>h.status===filter);
  hs=hs.filter(h=>h.status!=='returned');
  const spm={active:'phire',overdue:'pover','due-soon':'pdue'};
  const slm={active:'Active',overdue:'Overdue','due-soon':'Due soon'};
  document.getElementById('hiresTb').innerHTML=hs.length?hs.map(h=>{
    const bal=h.totalDue-h.totalPaid;const pct=h.totalDue>0?Math.min(100,Math.round(h.totalPaid/h.totalDue*100)):0;
    const dy=daysFrom(h.due);const instN=(h.payments||[]).length;const maxI=h.maxInstallments||5;
    const ppill=bal<=0?'<span class="pl ppaid" style="font-size:11px">Paid</span>':'<span class="pl ppart" style="font-size:11px">'+pct+'%</span>';
    const pbar='<div class="ptk" style="width:80px;height:5px;display:inline-block;margin-left:6px;vertical-align:middle"><div class="pfl'+(pct>=100?' done':'')+'" style="width:'+pct+'%"></div></div>';
    const canPay=bal>0&&instN<maxI;
    const canRet=CU.role==='owner'||CU.role==='manager';
    return '<tr><td class="mono">'+h.ref+'</td>'+
      '<td style="font-weight:600">'+h.client+'<div style="font-size:10px;color:var(--t3)">'+h.by+'</div></td>'+
      '<td>'+h.item+' &times;'+h.qty+(h.siteLocation?'<div style="font-size:10px;color:var(--t3)">'+(h.fulfilment==='delivery'?'Delivery':'Client pick-up')+' · '+h.siteLocation+(h.transportCost>0?' · Transport KSh '+fmt(h.transportCost):'')+'</div>':'')+'</td>'+
      '<td style="color:'+(dy<0?'var(--R)':dy<=2?'var(--A)':'inherit')+'">'+dlbl(h.due)+'</td>'+
      '<td style="font-weight:600">'+fmt(h.totalDue)+'</td>'+
      '<td style="color:var(--G)">'+fmt(h.totalPaid)+'</td>'+
      '<td style="color:'+(bal>0?'var(--R)':'var(--G)')+';font-weight:600">'+(bal>0?fmt(bal):'—')+'</td>'+
      '<td>'+ppill+pbar+'<div style="font-size:10px;color:var(--t3);margin-top:2px">'+instN+'/'+maxI+' payments</div></td>'+
      '<td><span class="pl '+(spm[h.status]||'phire')+'" style="font-size:11px">'+(slm[h.status]||h.status)+'</span></td>'+
      '<td style="display:flex;gap:3px;flex-wrap:wrap">'+
        '<button class="btn bxs" onclick="viewHire(\''+h.id+'\')">View</button>'+
        (canPay?'<button class="btn bxs bg" onclick="openPay(\''+h.id+'\')">+Pay</button>':'')+
        (canRet?'<button class="btn bxs br" onclick="openRet(\''+h.id+'\')">Return</button>':'')+
      '</td></tr>';
  }).join(''):'<tr><td colspan="10" style="text-align:center;color:var(--t3);padding:28px">No hires match this filter</td></tr>';
  updateBadges();
}

function viewHire(hid){
  const h=(LS.g('hires')||[]).find(x=>x.id===hid);if(!h)return;
  const bal=h.totalDue-h.totalPaid;const pct=Math.min(100,Math.round(h.totalPaid/h.totalDue*100));
  document.getElementById('vhTitle').innerHTML=h.ref+' &mdash; '+h.client+' <button class="cls" onclick="closeM(\'mViewHire\')">&#215;</button>';
  document.getElementById('vhBody').innerHTML=
    '<div class="g2" style="margin-bottom:14px">'+
    '<div style="background:var(--bg);border-radius:var(--r);padding:14px 16px"><div style="font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:.7px;margin-bottom:10px;font-weight:700">Hire details</div>'+
      '<div style="font-size:14px;margin-bottom:5px;font-weight:700">'+h.item+'</div>'+
      '<div style="font-size:13px;color:var(--t2)">Qty: '+h.qty+' &nbsp;&middot;&nbsp; Start: '+dlbl(h.start)+' &nbsp;&middot;&nbsp; Due: '+dlbl(h.due)+'</div>'+
      '<div style="font-size:12px;color:var(--t3);margin-top:4px">Logged by: '+h.by+'</div>'+
      (h.siteLocation?'<div style="font-size:12px;color:var(--t3);margin-top:4px">'+(h.fulfilment==='delivery'?'Delivery to':'Client pick-up')+': '+h.siteLocation+(h.transportCost>0?' &middot; Transport: KSh '+fmt(h.transportCost):'')+'</div>':'')+'</div>'+
    '<div style="background:var(--bg);border-radius:var(--r);padding:14px 16px"><div style="font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:.7px;margin-bottom:10px;font-weight:700">Payment summary</div>'+
      '<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px"><span>Total due</span><span style="font-weight:700">KSh '+fmt(h.totalDue)+'</span></div>'+
      '<div style="display:flex;justify-content:space-between;font-size:13px;color:var(--G);margin-bottom:5px"><span>Total paid</span><span style="font-weight:700">KSh '+fmt(h.totalPaid)+'</span></div>'+
      '<div style="display:flex;justify-content:space-between;font-size:14px;color:'+(bal>0?'var(--R)':'var(--G)')+';border-top:1px solid var(--b);padding-top:6px;margin-top:6px"><span>Balance</span><span style="font-weight:800">KSh '+fmt(bal)+'</span></div></div>'+
    '</div>'+
    '<div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;font-size:11px;color:var(--t3);margin-bottom:6px"><span>Payment progress</span><span>'+pct+'% paid &nbsp;&middot;&nbsp; '+(h.payments||[]).length+' of '+h.maxInstallments+' installments used</span></div>'+
    '<div class="ptk" style="height:13px"><div class="pfl'+(pct>=100?' done':'')+'" style="width:'+pct+'%"></div></div></div>'+
    '<div style="font-size:13px;font-weight:700;margin-bottom:10px;font-family:\'Syne\',sans-serif">Payment history</div>'+
    (h.payments||[]).map((py,i)=>'<div class="irow"><div class="inum">'+(i+1)+'</div><div style="flex:1"><div style="font-size:13px;font-weight:600">KSh '+fmt(py.amount)+'</div><div style="font-size:11px;color:var(--t3)">'+py.note+'</div></div><div style="text-align:right"><div class="mono">'+dlbl(py.date)+'</div><div style="font-size:11px;color:var(--t3)">'+py.by+'</div></div></div>').join('')+
    (bal>0&&(h.payments||[]).length<h.maxInstallments?'<div style="margin-top:14px"><button class="btn bg bsm" onclick="closeM(\'mViewHire\');openPay(\''+h.id+'\')">&#43; Record next payment</button></div>':'');
  openM('mViewHire');
}

function openPay(hid){
  const h=(LS.g('hires')||[]).find(x=>x.id===hid);if(!h)return;
  payHireId=hid;const bal=h.totalDue-h.totalPaid;const inst=(h.payments||[]).length;
  document.getElementById('payBody').innerHTML=
    '<div class="ib g" style="margin-bottom:14px"><b>'+h.ref+' &mdash; '+h.client+'</b><br>Total: KSh '+fmt(h.totalDue)+' &middot; Paid: KSh '+fmt(h.totalPaid)+' &middot; <b style="font-size:14px">Balance: KSh '+fmt(bal)+'</b><br><span style="font-size:12px">Payment '+(inst+1)+' of max '+h.maxInstallments+(inst+1<h.maxInstallments?' &middot; '+(h.maxInstallments-inst-1)+' more allowed after this':'&nbsp;&mdash;&nbsp;this is the final allowed payment')+'</span></div>'+
    '<div class="fr"><div class="fg"><label class="fl">Amount paid (KSh)</label><input class="fi" id="pyAmt" type="number" max="'+bal+'" placeholder="'+fmt(bal)+'" oninput="updPayPrev('+h.totalDue+','+h.totalPaid+')"/><div class="fn">Balance: KSh '+fmt(bal)+'</div></div>'+
    '<div class="fg"><label class="fl">Payment date</label><input class="fi" id="pyDate" type="date" value="'+today()+'"/></div></div>'+
    '<div class="fg"><label class="fl">Method / Note</label><input class="fi" id="pyNote" placeholder="M-Pesa, Cash, Bank transfer, Cheque..."/></div>'+
    '<div id="pyPrev" style="background:var(--bg);border-radius:var(--r);padding:12px 14px;font-size:13px;margin-top:4px;display:none">'+
      '<div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="color:var(--t2)">New total paid:</span><span id="pyPV" style="color:var(--G);font-weight:700"></span></div>'+
      '<div style="display:flex;justify-content:space-between"><span style="color:var(--t2)">Remaining balance:</span><span id="pyBV" style="font-weight:700"></span></div>'+
    '</div>';
  openM('mPay');
}
function updPayPrev(td,tp){
  const amt=parseFloat(document.getElementById('pyAmt')?.value)||0;
  if(amt<=0){document.getElementById('pyPrev').style.display='none';return;}
  const np=tp+amt,bal=Math.max(0,td-np);
  document.getElementById('pyPrev').style.display='block';
  document.getElementById('pyPV').textContent='KSh '+fmt(np);
  document.getElementById('pyBV').textContent='KSh '+fmt(bal);
  document.getElementById('pyBV').style.color=bal<=0?'var(--G)':'var(--R)';
}
function confirmPay(){
  const amt=parseFloat(document.getElementById('pyAmt')?.value)||0;
  const date=document.getElementById('pyDate')?.value||today();
  const note=document.getElementById('pyNote')?.value||'Payment';
  if(amt<=0){alert('Enter a valid amount.');return;}
  const hs=LS.g('hires')||[];const i=hs.findIndex(h=>h.id===payHireId);if(i<0)return;
  const h=hs[i];const bal=h.totalDue-h.totalPaid;
  if(amt>bal+0.01){alert('Amount exceeds balance. Max: KSh '+fmt(bal));return;}
  h.totalPaid+=amt;h.payments=h.payments||[];
  h.payments.push({amount:amt,date,note,by:CU.name+' ('+cap(CU.role)+')'});
  h.paymentStatus=h.totalPaid>=h.totalDue?'paid':'partial';
  hs[i]=h;LS.s('hires',hs);
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','Payment: KSh '+fmt(amt)+' on '+h.ref+' ('+h.client+') — balance now KSh '+fmt(Math.max(0,h.totalDue-h.totalPaid)),'payment');
  closeM('mPay');renderHires();updateBadges();
  showAlert('login','Payment recorded','KSh '+fmt(amt)+' on '+h.ref,'&#128176;');
}

// ════════════════════════════════════════════════════
//  RETURN
// ════════════════════════════════════════════════════
function openRet(hid){
  const h=(LS.g('hires')||[]).find(x=>x.id===hid);if(!h)return;
  retHireId=hid;const bal=h.totalDue-h.totalPaid;const dy=daysFrom(h.due);const late=dy<0?Math.abs(dy)*500:0;
  document.getElementById('retBody').innerHTML=
    '<div class="ib '+(bal>0?'a':'g')+'" style="margin-bottom:16px">'+
      '<b>'+h.ref+' &mdash; '+h.client+'</b> &nbsp;&middot;&nbsp; '+h.item+' &times;'+h.qty+'<br>'+
      'Total: KSh '+fmt(h.totalDue)+' &nbsp;&middot;&nbsp; Paid: KSh '+fmt(h.totalPaid)+' &nbsp;&middot;&nbsp; '+
      '<b style="color:'+(bal>0?'var(--A)':'var(--G)')+'">Balance: KSh '+fmt(bal)+'</b>'+
      (bal>0?'<br><span style="color:var(--R);">&#9888; Equipment returned with outstanding balance &mdash; reminder will be sent to manager &amp; owner</span>':'')+'</div>'+
    '<div class="fr"><div class="fg"><label class="fl">Equipment returned</label><input class="fi" value="'+h.item+' &times;'+h.qty+'" readonly/></div>'+
    '<div class="fg"><label class="fl">Return date</label><input class="fi" id="retDate" type="date" value="'+today()+'"/></div></div>'+
    '<div class="fr"><div class="fg"><label class="fl">Late return penalty (KSh)</label><input class="fi" id="retPen" type="number" value="'+late+'" oninput="calcRet('+h.totalDue+','+h.totalPaid+','+h.deposit+')"/></div>'+
    '<div class="fg"><label class="fl">Damage deduction (KSh)</label><input class="fi" id="retDmg" type="number" value="0" oninput="calcRet('+h.totalDue+','+h.totalPaid+','+h.deposit+')"/></div></div>'+
    '<div class="fr"><div class="fg"><label class="fl">Final payment on return (KSh)</label><input class="fi" id="retFp" type="number" value="'+Math.max(0,bal)+'" oninput="calcRet('+h.totalDue+','+h.totalPaid+','+h.deposit+')"/></div>'+
    '<div class="fg"><label class="fl">Deposit refund to client (KSh)</label><input class="fi" id="retRef" type="number" value="0" readonly style="color:var(--G);font-weight:600"/></div></div>'+
    '<div id="retSt" style="background:var(--bg);border-radius:var(--r);padding:11px 14px;font-size:13px;margin-bottom:12px"></div>'+
    '<div class="fg"><label class="fl">Equipment condition notes</label><textarea class="fta" id="retNotes" rows="2" placeholder="Condition of equipment on return, any damage noted..."></textarea></div>';
  calcRet(h.totalDue,h.totalPaid,h.deposit);openM('mReturn');
}
function calcRet(td,tp,dep){
  const fp=parseFloat(document.getElementById('retFp')?.value)||0;
  const pen=parseFloat(document.getElementById('retPen')?.value)||0;
  const dmg=parseFloat(document.getElementById('retDmg')?.value)||0;
  const ntp=tp+fp;const bal=Math.max(0,td-ntp+pen+dmg);
  const ref=bal<=0?Math.max(0,dep-pen-dmg):0;
  const rf=document.getElementById('retRef');if(rf)rf.value=Math.round(ref);
  const st=document.getElementById('retSt');
  if(st)st.innerHTML=bal<=0?'<span style="color:var(--G);font-weight:700">&#10003; Fully settled</span> &mdash; Deposit refund to client: KSh '+fmt(ref):'<span style="color:var(--R);font-weight:700">&#9888; Still owes KSh '+fmt(bal)+'</span> &mdash; Recorded as outstanding &amp; manager/owner alerted';
}
function confirmReturn(){
  if(!retHireId)return;
  const hs=LS.g('hires')||[];const i=hs.findIndex(h=>h.id===retHireId);if(i<0)return;
  const h=hs[i];
  const fp=parseFloat(document.getElementById('retFp')?.value)||0;
  const pen=parseFloat(document.getElementById('retPen')?.value)||0;
  const dmg=parseFloat(document.getElementById('retDmg')?.value)||0;
  const retDate=document.getElementById('retDate')?.value||today();
  const notes=document.getElementById('retNotes')?.value;
  if(fp>0){h.totalPaid+=fp;h.payments=h.payments||[];h.payments.push({amount:fp,date:retDate,note:'Return payment',by:CU.name+' ('+cap(CU.role)+')'});}
  const newBal=Math.max(0,h.totalDue-h.totalPaid+pen+dmg);
  h.paymentStatus=newBal<=0?'paid':'partial';h.status='returned';h.returnedOn=retDate;h.returnNotes=notes;
  hs[i]=h;LS.s('hires',hs);
  const ps=LS.g('products')||[];const pi=ps.findIndex(p=>p.name===h.item);
  if(pi>=0){ps[pi].hired=Math.max(0,ps[pi].hired-h.qty);LS.s('products',ps);}
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','Equipment returned: '+h.client+' '+h.ref+(newBal>0?' [OUTSTANDING KSh '+fmt(newBal)+']':'[FULLY SETTLED]'),'hire');
  if(newBal>0){
    const rl=LS.g('rlog')||[];
    rl.unshift({client:h.client,ref:h.ref,msg:'&#9888; Returned with outstanding balance: KSh '+fmt(newBal),by:'System',date:N()});
    LS.s('rlog',rl);
    const ua=LS.g('unpaidAlerts')||[];ua.push({client:h.client,ref:h.ref,balance:newBal,time:N()});LS.s('unpaidAlerts',ua);
    if(CU.role==='owner'||CU.role==='manager')showAlert('warn','Unpaid balance on return',h.client+' &mdash; '+h.ref+' owes KSh '+fmt(newBal),'&#9888;');
    else showAlert('warn','Balance outstanding',h.client+' owes KSh '+fmt(newBal)+'. Manager &amp; owner notified.','&#9888;');
  }
  closeM('mReturn');retHireId=null;renderHires();renderDash();updateBadges();
  if(newBal<=0)showAlert('login','Return complete',h.ref+' &mdash; '+h.client+' fully settled','&#10003;');
}

// ════════════════════════════════════════════════════
//  REMINDERS
// ════════════════════════════════════════════════════
function renderReminders(){
  const hs=(LS.g('hires')||[]).filter(h=>h.status!=='returned');
  const soon=hs.filter(h=>{const d=daysFrom(h.due);return d>=0&&d<=3;});
  const over=hs.filter(h=>h.status==='overdue');
  const unpaid=hs.filter(h=>h.paymentStatus==='partial');
  document.getElementById('rSoon').innerHTML=soon.length?soon.map(h=>'<div class="aci"><div class="acd" style="background:var(--A)"></div><div class="acb"><div class="act">'+h.client+' &mdash; '+h.item+' &times;'+h.qty+'</div><div class="acm">Due '+dlbl(h.due)+' &middot; Balance: KSh '+fmt(h.totalDue-h.totalPaid)+' &middot; '+h.ref+'</div></div><button class="btn bxs" onclick="sendRem(\''+h.id+'\',\'soon\')">Send reminder</button></div>').join(''):'<div style="padding:22px;text-align:center;color:var(--t3)">No returns due within 3 days</div>';
  document.getElementById('rOver').innerHTML=over.length?over.map(h=>'<div class="aci"><div class="acd" style="background:var(--R)"></div><div class="acb"><div class="act">'+h.client+' &mdash; '+h.item+' &times;'+h.qty+'</div><div class="acm">Was due '+dlbl(h.due)+' &middot; '+Math.abs(daysFrom(h.due))+'d overdue &middot; Balance: KSh '+fmt(h.totalDue-h.totalPaid)+'</div></div><button class="btn bxs br" onclick="sendRem(\''+h.id+'\',\'over\')">Escalate</button></div>').join(''):'<div style="padding:22px;text-align:center;color:var(--t3)">No overdue hires &#127881;</div>';
  document.getElementById('rUnpaid').innerHTML=unpaid.length?unpaid.map(h=>{
    const bal=h.totalDue-h.totalPaid;const pct=Math.round(h.totalPaid/h.totalDue*100);
    return '<div class="aci"><div class="acd" style="background:var(--P)"></div><div class="acb"><div class="act">'+h.client+' &mdash; '+h.ref+'</div><div class="acm">'+pct+'% paid &middot; Balance KSh '+fmt(bal)+' &middot; '+(h.payments||[]).length+'/'+h.maxInstallments+' installments used</div><div class="ptk" style="width:120px;height:5px;margin-top:5px"><div class="pfl" style="width:'+pct+'%"></div></div></div><button class="btn bxs bg" onclick="openPay(\''+h.id+'\')">+Pay</button></div>';
  }).join(''):'<div style="padding:18px 20px;font-size:13px;color:var(--t3)">No outstanding balances on active hires</div>';
  const rl=LS.g('rlog')||[];
  document.getElementById('rlogTb').innerHTML=rl.length?rl.map(r=>'<tr><td style="font-weight:600">'+r.client+'</td><td class="mono">'+r.ref+'</td><td>'+r.msg+'</td><td style="font-size:11px;color:var(--t3)">'+r.by+'</td><td class="mono">'+r.date+'</td></tr>').join(''):'<tr><td colspan="5" style="text-align:center;color:var(--t3);padding:20px">No reminders sent yet</td></tr>';
}
function sendRem(hid,type){
  const h=(LS.g('hires')||[]).find(x=>x.id===hid);if(!h)return;
  const msg=type==='over'?'Overdue escalation &mdash; '+Math.abs(daysFrom(h.due))+'d overdue':'Return reminder &mdash; due '+dlbl(h.due)+(h.totalDue-h.totalPaid>0?' &middot; Balance: KSh '+fmt(h.totalDue-h.totalPaid):'');
  const rl=LS.g('rlog')||[];
  rl.unshift({client:h.client,ref:h.ref,msg,by:CU.name+' ('+cap(CU.role)+')',date:N()});LS.s('rlog',rl);
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','Reminder sent to '+h.client+' for '+h.ref,'reminder');
  renderReminders();showAlert('login','Reminder logged',h.client+' &middot; '+h.ref,'&#128276;');
}

// ════════════════════════════════════════════════════
//  CLIENTS
// ════════════════════════════════════════════════════
function renderClients(){
  const cs=LS.g('clients')||[];const hs=LS.g('hires')||[];
  document.getElementById('clientsTb').innerHTML=cs.length?cs.map(c=>{
    const ah=hs.filter(h=>h.client===c.name&&h.status!=='returned');
    const outstanding=ah.reduce((a,h)=>a+(h.totalDue-h.totalPaid),0);
    return '<tr><td style="font-weight:600">'+c.name+(c.notes?'<div style="font-size:11px;color:var(--t3)">'+c.notes+'</div>':'')+'</td><td>'+c.phone+'</td><td>'+ah.length+'</td><td style="color:'+(outstanding>0?'var(--R)':'var(--t)')+';font-weight:'+(outstanding>0?'600':'400')+'">'+fmt(outstanding)+'</td><td>'+fmt(c.total)+'</td><td class="mono">'+dlbl(c.lastHire)+'</td><td style="font-size:11px;color:var(--t3)">'+c.addedBy+'</td></tr>';
  }).join(''):'<tr><td colspan="7" style="text-align:center;color:var(--t3);padding:24px">No clients yet</td></tr>';
}
function saveClient(){
  const n=document.getElementById('acN').value.trim(),ph=document.getElementById('acP').value.trim();
  if(!n||!ph){alert('Name and phone are required.');return;}
  const cs=LS.g('clients')||[];
  cs.unshift({id:uid(),name:n,phone:ph,email:document.getElementById('acE').value,location:document.getElementById('acL').value,notes:document.getElementById('acNo').value,addedBy:CU.name,hires:0,total:0,lastHire:today()});
  LS.s('clients',cs);
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','New client: '+n,'inventory');
  closeM('mAddClient');['acN','acP','acE','acL','acNo'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  renderClients();showAlert('login','Client saved',n,'&#128100;');
}

// ════════════════════════════════════════════════════
//  INVOICES & DOCUMENTS
// ════════════════════════════════════════════════════
function populateInvSels(){
  const cs=LS.g('clients')||[];const ps=LS.g('products')||[];
  const dc=document.getElementById('docClient');
  const di=document.getElementById('docItem');
  if(dc)dc.innerHTML=cs.map(c=>'<option value="'+c.name+'|'+c.phone+'">'+c.name+'</option>').join('');
  if(di)di.innerHTML=ps.map(p=>{const er=effRate(p);return '<option value="'+p.name+'|'+er+'">'+p.name+' &mdash; KSh '+fmt(er)+'/day'+(p.discountRate?' ('+p.discountRate+'% off)':'')+'</option>';}).join('');
  if(!document.getElementById('docDate').value)document.getElementById('docDate').value=today();
}

function autofillDocRef(){
  const cn=(document.getElementById('docClient')?.value||'').split('|')[0];
  const hs=LS.g('hires')||[];
  const h=hs.find(x=>x.client===cn&&x.status!=='returned');
  if(h)document.getElementById('docRef').value=h.ref;
  refreshInv();
}

function refreshInv(){
  const type=document.getElementById('docType')?.value||'invoice';
  const cr=(document.getElementById('docClient')?.value||'').split('|');const cn=cr[0]||'Client';const cp=cr[1]||'';
  const ref=document.getElementById('docRef')?.value||'HIR-2025-XXX';
  const date=document.getElementById('docDate')?.value||today();
  const ir=(document.getElementById('docItem')?.value||'').split('|');const iname=ir[0]||'Equipment';const rate=parseInt(ir[1])||0;
  const q=parseInt(document.getElementById('docQty')?.value)||1;const dy=parseInt(document.getElementById('docDays')?.value)||1;
  const dep=parseInt(document.getElementById('docDep')?.value)||0;const vr=parseInt(document.getElementById('docVat')?.value)||0;
  const sub=rate*q*dy,vat=Math.round(sub*vr/100),total=sub+vat,bal=Math.max(0,total-dep);
  const tlbl={invoice:'Invoice',receipt:'Receipt',deposit:'Deposit Receipt',return:'Return Note'}[type]||'Invoice';
  const num=type==='invoice'?'INV':type==='return'?'RET':'REC';
  const refShort=ref.replace('HIR-','').replace('2025-','');
  // Get hire payments for this ref
  const hs=LS.g('hires')||[];const h=hs.find(x=>x.ref===ref);
  let payHistHtml='';
  if(h&&h.payments&&h.payments.length>1&&type==='invoice'){
    payHistHtml='<div style="margin-top:14px;margin-bottom:18px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:#142B6F;margin-bottom:6px">Payment history</div>'+
      h.payments.map(py=>'<div class="invpayrow"><span>'+dlbl(py.date)+' &mdash; '+py.note+'</span><span style="font-weight:600">KSh '+fmt(py.amount)+'</span></div>').join('')+
    '</div>';
  }
  let html='<div class="invp"><div class="invhd"><div><div class="invbn">YOUR COMPANY NAME</div><div class="invbt">Construction Equipment Rental &nbsp;&middot;&nbsp; Nairobi, Kenya</div><div style="font-size:11px;color:#142B6F;margin-top:6px">Tel: 0700 000 000 &nbsp;&middot;&nbsp; info@yourcompany.co.ke</div></div>'+
    '<div><div class="invty">'+tlbl+'</div><div class="invrb">'+num+'-'+refShort+'<br>Date: '+dlbl(date)+'<br>Prepared by: '+CU.name+'</div></div></div>'+
    '<div class="invpt"><div><div class="invpl">From</div><div class="invpn">YOUR COMPANY NAME Ltd</div><div class="invpd">PIN: YOUR KRA PIN</div><div class="invpd">Registered in Kenya</div></div>'+
    '<div><div class="invpl">To</div><div class="invpn">'+cn+'</div><div class="invpd">'+cp+'</div><div class="invpd">Hire ref: '+ref+'</div></div></div>';
  if(type!=='receipt'){
    html+='<table class="invtab"><thead><tr><th>Description</th><th>Qty</th><th>Days</th><th>Rate / day</th><th style="text-align:right">Amount (KSh)</th></tr></thead><tbody><tr><td>'+iname+'</td><td>'+q+'</td><td>'+dy+'</td><td>KSh '+fmt(rate)+'</td><td style="text-align:right">'+fmt(sub)+'</td></tr></tbody></table>';
    if(dep>0)html+='<div class="invdn">Deposit paid: KSh '+fmt(dep)+' &nbsp;&middot;&nbsp; Balance payable on return: KSh '+fmt(bal)+'</div>';
    html+=payHistHtml;
    html+='<div class="invtw"><div class="invto"><div class="invr"><span>Subtotal</span><span>KSh '+fmt(sub)+'</span></div>';
    if(vr>0)html+='<div class="invr"><span>VAT '+vr+'%</span><span>KSh '+fmt(vat)+'</span></div>';
    if(dep>0)html+='<div class="invr"><span>Less deposit paid</span><span style="color:#142B6F">&minus;KSh '+fmt(dep)+'</span></div>';
    html+='<div class="invr gd"><span>Balance due</span><span style="color:#142B6F">KSh '+fmt(bal)+'</span></div></div></div>';
  }else{
    html+='<table class="invtab"><thead><tr><th>Description</th><th>Ref</th><th style="text-align:right">Amount (KSh)</th></tr></thead><tbody><tr><td>Payment received &mdash; '+iname+'</td><td>'+ref+'</td><td style="text-align:right;font-weight:700">'+fmt(dep)+'</td></tr></tbody></table>'+
    '<div style="text-align:center;padding:10px 0"><span class="invstamp">PAID</span></div>';
  }
  const notes=document.getElementById('docNotes')?.value;
  if(notes)html+='<div style="margin-top:14px;padding:11px 13px;background:#E1DEE6;border-radius:6px;font-size:12px;color:#142B6F">'+notes+'</div>';
  html+='<div class="invft">Thank you for your business &nbsp;&middot;&nbsp; M-Pesa Till: 000000 &nbsp;&middot;&nbsp; Payment must be received before equipment leaves site<br>Generated by ILoadList</div></div>';
  const wp=document.getElementById('invPrev');if(wp)wp.innerHTML=html;
}

function saveDoc(){
  const type=document.getElementById('docType').value;
  const cr=document.getElementById('docClient').value.split('|');const cn=cr[0];
  const ir=document.getElementById('docItem').value.split('|');const rate=parseInt(ir[1])||0;
  const q=parseInt(document.getElementById('docQty').value)||1,dy=parseInt(document.getElementById('docDays').value)||1;
  const dep=parseInt(document.getElementById('docDep').value)||0;const vr=parseInt(document.getElementById('docVat').value)||0;
  const sub=rate*q*dy,total=sub+Math.round(sub*vr/100);
  const amount=type==='receipt'?dep:total;const ref=document.getElementById('docRef').value;
  const tlbl={invoice:'Invoice',receipt:'Receipt',deposit:'Deposit Receipt',return:'Return Note'}[type];
  const docs=LS.g('docs')||[];
  docs.unshift({id:uid(),type:tlbl,ref,client:cn,amount,by:CU.name+' ('+cap(CU.role)+')',date:today()});
  LS.s('docs',docs);
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','Document: '+tlbl+' '+ref+' for '+cn+' KSh '+fmt(amount),'invoice');
  renderDocH();printPrev();
}
function printPrev(){
  const h=document.getElementById('invPrev').innerHTML;
  document.getElementById('pz').innerHTML=h;document.getElementById('pz').style.display='block';
  window.print();setTimeout(()=>document.getElementById('pz').style.display='none',1000);
}
function shareWhatsApp(){
  const cn=(document.getElementById('docClient')?.value||'').split('|')[0]||'Client';
  const cp=(document.getElementById('docClient')?.value||'').split('|')[1]||'';
  const ref=document.getElementById('docRef')?.value||'';
  const iname=(document.getElementById('docItem')?.value||'').split('|')[0]||'Equipment';
  const rate=parseInt((document.getElementById('docItem')?.value||'').split('|')[1])||0;
  const q=parseInt(document.getElementById('docQty')?.value)||1,dy=parseInt(document.getElementById('docDays')?.value)||1;
  const dep=parseInt(document.getElementById('docDep')?.value)||0;const vr=parseInt(document.getElementById('docVat')?.value)||0;
  const sub=rate*q*dy,total=sub+Math.round(sub*vr/100),bal=Math.max(0,total-dep);
  const phone=cp.replace(/\D/g,'').replace(/^0/,'254');
  const msg='*YOUR COMPANY NAME — Invoice*\n'+
    'Ref: *'+ref+'*\n'+
    'Client: '+cn+'\n'+
    'Equipment: '+iname+' ×'+q+'\n'+
    'Duration: '+dy+' days\n'+
    'Total: *KSh '+fmt(total)+'*\n'+
    (dep>0?'Deposit paid: KSh '+fmt(dep)+'\n':'')+
    (bal>0?'Balance due: *KSh '+fmt(bal)+'*\n':'')+
    '\nM-Pesa Till: 000000\nYOUR COMPANY NAME — 0700 000 000';
  const url='https://wa.me/'+phone+'?text='+encodeURIComponent(msg);
  window.open(url,'_blank');
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','Invoice shared via WhatsApp: '+ref+' — '+cn,'invoice');
  showAlert('info','WhatsApp opened','Invoice details sent to '+cn,'&#128172;');
}
function renderDocH(){
  const docs=LS.g('docs')||[];
  const tc={'Invoice':'pavail','Deposit Receipt':'phire','Receipt':'pmaint','Return Note':'pover'};
  document.getElementById('docTb').innerHTML=docs.length?docs.map(d=>'<tr><td><span class="pl '+(tc[d.type]||'pavail')+'" style="font-size:11px">'+d.type+'</span></td><td class="mono">'+d.ref+'</td><td style="font-weight:500">'+d.client+'</td><td>'+fmt(d.amount)+'</td><td style="font-size:11px;color:var(--t3)">'+d.by+'</td><td class="mono">'+dlbl(d.date)+'</td>'+
    '<td><button class="btn bxs bo" onclick="shareDocWa(\''+d.id+'\')">&#128172;</button></td></tr>').join(''):'<tr><td colspan="7" style="text-align:center;color:var(--t3);padding:20px">No documents yet</td></tr>';
}
function shareDocWa(docId){
  const docs=LS.g('docs')||[];const d=docs.find(x=>x.id===docId);if(!d)return;
  // Find hire for phone number
  const hs=LS.g('hires')||[];const h=hs.find(x=>x.ref===d.ref);
  const phone=h?h.phone.replace(/\D/g,'').replace(/^0/,'254'):'';
  const msg='*YOUR COMPANY NAME — '+d.type+'*\nRef: *'+d.ref+'*\nClient: '+d.client+'\nAmount: *KSh '+fmt(d.amount)+'*\nDate: '+dlbl(d.date)+'\n\nM-Pesa Till: 000000 &nbsp; YOUR COMPANY NAME — 0700 000 000';
  window.open('https://wa.me/'+(phone||'254')+' ?text='+encodeURIComponent(msg.replace(/&nbsp;/g,' ')),'_blank');
}

// ════════════════════════════════════════════════════
//  REPORTS
// ════════════════════════════════════════════════════
function renderReports(){
  const ps=LS.g('products')||[];const hs=(LS.g('hires')||[]).filter(h=>h.status!=='returned');
  const totU=ps.reduce((a,p)=>a+p.total,0);const hirU=ps.reduce((a,p)=>a+p.hired,0);
  const util=totU>0?Math.round(hirU/totU*100):0;
  const rev=hs.reduce((a,h)=>{const p=ps.find(x=>x.name===h.item);return a+(p?effRate(p)*h.qty*14:0);},0);
  const dep=hs.reduce((a,h)=>a+h.deposit,0);
  const idle=ps.reduce((a,p)=>a+(p.total-p.hired)*effRate(p),0);
  document.getElementById('repR').textContent='KSh '+(rev/1000).toFixed(0)+'K';
  document.getElementById('repU').textContent=util+'%';
  document.getElementById('repUs').textContent=hirU+' of '+totU+' units on hire';
  document.getElementById('repI').textContent='KSh '+(idle/1000).toFixed(1)+'K/day';
  document.getElementById('repD').textContent='KSh '+fmt(dep);
  document.getElementById('repTb').innerHTML=ps.map(p=>{
    const u=Math.round(p.hired/p.total*100);const c=u>=80?'#142B6F':u>=50?'#FFD601':'#E1DEE6';
    const er=effRate(p);const revM=p.hired*er*14;const idleC=(p.total-p.hired)*er;
    return '<tr><td style="font-weight:600">'+p.name+'<div style="font-size:11px;color:var(--t3)">'+p.code+'</div></td><td>'+p.total+'</td><td>'+p.hired+'</td>'+
      '<td><div class="uw"><div class="ut"><div class="uf" style="width:'+u+'%;background:'+c+'"></div></div><span style="font-weight:700;color:'+c+'">'+u+'%</span></div></td>'+
      '<td>KSh '+fmt(er)+(p.discountRate?'<div style="font-size:10px;color:var(--G)">'+p.discountRate+'% disc</div>':'')+'</td>'+
      '<td style="color:var(--G);font-weight:600">'+fmt(revM)+'</td><td style="color:var(--R)">'+fmt(idleC)+'</td></tr>';
  }).join('');
  if(charts.util)charts.util.destroy();if(charts.rev)charts.rev.destroy();
  const uctx=document.getElementById('uChart');
  if(uctx)charts.util=new Chart(uctx,{type:'bar',data:{labels:ps.map(p=>p.name.length>13?p.name.slice(0,13)+'…':p.name),datasets:[{data:ps.map(p=>Math.round(p.hired/p.total*100)),backgroundColor:ps.map(p=>{const u=Math.round(p.hired/p.total*100);return u>=80?'#142B6F':u>=50?'#FFD601':'#E1DEE6';}),borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{max:100,ticks:{callback:v=>v+'%',font:{size:10}},grid:{color:'rgba(20,43,111,.12)'}},x:{ticks:{font:{size:10}}}}}});
  const rctx=document.getElementById('rChart');
  if(rctx)charts.rev=new Chart(rctx,{type:'bar',data:{labels:['Oct','Nov','Dec','Jan','Feb','Mar'],datasets:[{data:[148000,172000,136000,215000,242000,258000],backgroundColor:'#E1DEE6',hoverBackgroundColor:'#FFD601',borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{callback:v=>'KSh '+(v/1000).toFixed(0)+'K',font:{size:10}},grid:{color:'rgba(20,43,111,.12)'}},x:{ticks:{font:{size:10}}}}}});
}

// ════════════════════════════════════════════════════
//  USERS
// ════════════════════════════════════════════════════
function renderUsers(){
  const us=LS.g('users')||[];const ss=LS.g('sessions')||[];
  document.getElementById('ucntlbl').textContent=us.length+' of 5 accounts';
  const btn=document.getElementById('addUBtn');btn.disabled=us.length>=5;btn.style.opacity=us.length>=5?'.4':'1';
  document.getElementById('ugrid').innerHTML=us.map(u=>{
    const isOn=ss.some(s=>s.userId===u.id&&!s.logoutTime);
    const last=ss.find(s=>s.userId===u.id);
    const canRm=CU.role==='owner'&&u.id!==CU.id;
    return '<div class="ucrd"><div style="position:relative"><div class="ucav '+u.role+'">'+ini(u.name)+'</div>'+
      '<div class="oind '+(isOn?'on':'off')+'"></div></div>'+
      '<div style="flex:1;min-width:0">'+
        '<div style="font-size:14px;font-weight:700">'+u.name+'</div>'+
        '<div style="display:flex;gap:7px;align-items:center;margin-top:4px;flex-wrap:wrap">'+
          '<span class="pl p'+u.role+'" style="font-size:10px;padding:2px 8px">'+cap(u.role)+'</span>'+
          '<span style="font-size:11px;color:var(--t3)">@'+u.username+'</span>'+
          (isOn?'<span class="pl phire" style="font-size:10px;padding:2px 7px">&#128994; Online</span>':'')+
        '</div>'+
        '<div style="font-size:11px;color:var(--t3);margin-top:5px">'+(last?'Last session: '+last.loginTime:'Never logged in')+'</div>'+
      '</div>'+
      (canRm?'<button class="btn bxs br" onclick="removeUser(\''+u.id+'\')">Remove</button>':'')+
    '</div>';
  }).join('');
  document.getElementById('sessTb').innerHTML=ss.length?ss.slice(0,40).map(s=>'<tr>'+
    '<td style="font-weight:600">'+s.userName+'</td>'+
    '<td><span class="pl p'+s.role+'" style="font-size:10px">'+cap(s.role)+'</span></td>'+
    '<td class="mono">'+s.loginTime+'</td>'+
    '<td class="mono">'+(s.logoutTime||'<span style="color:var(--G);font-weight:600">Active now</span>')+'</td>'+
    '<td>'+(s.duration||'&mdash;')+'</td>'+
    '<td>'+(s.actions||0)+' action'+(s.actions!==1?'s':'')+'</td></tr>').join(''):'<tr><td colspan="6" style="text-align:center;color:var(--t3);padding:24px">No sessions recorded yet</td></tr>';
}
function admitUser(){
  const n=document.getElementById('nuN').value.trim(),u=document.getElementById('nuU').value.trim().toLowerCase();
  const pw=document.getElementById('nuPw').value.trim(),role=document.getElementById('nuR').value;
  const ph=document.getElementById('nuPh').value.trim();
  if(!n||!u||!pw){alert('Name, username and password are all required.');return;}
  const us=LS.g('users')||[];
  if(us.length>=5){alert('Maximum 5 users reached. Remove a user first.');return;}
  if(us.find(x=>x.username===u)){alert('That username is already taken. Choose a different one.');return;}
  us.push({id:uid(),name:n,username:u,password:pw,role,phone:ph,active:true});LS.s('users',us);
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','User admitted: '+n+' as '+cap(role),'inventory');
  closeM('mAddUser');['nuN','nuU','nuPw','nuPh'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  renderUsers();showAlert('login',n+' admitted',cap(role)+' account created','&#10003;');
}
function removeUser(uid_){
  if(CU.role!=='owner'){alert('Only the owner can remove users.');return;}
  if(!confirm('Remove this user? They will no longer be able to log in.'))return;
  LS.s('users',(LS.g('users')||[]).filter(u=>u.id!==uid_));
  logA(CU.id,CU.name+' (Owner)','User removed','inventory');renderUsers();
}

// ════════════════════════════════════════════════════
//  ACTIVITY LOG
// ════════════════════════════════════════════════════
function renderAct(){
  const uf=document.getElementById('actF')?.value||'';const tf=document.getElementById('actTF')?.value||'';
  const af=document.getElementById('actF');
  if(af&&af.options.length<=1)(LS.g('users')||[]).forEach(u=>{const o=document.createElement('option');o.value=u.id;o.textContent=u.name;af.appendChild(o);});
  let log=LS.g('actLog')||[];
  if(uf)log=log.filter(l=>l.userId===uf);if(tf)log=log.filter(l=>l.type===tf);
  const dc={login:'var(--B)',hire:'var(--G)',invoice:'var(--P)',inventory:'var(--A)',payment:'var(--Gm)',reminder:'var(--R)'};
  document.getElementById('actList').innerHTML=log.slice(0,200).map(l=>'<div class="aci"><div class="acd" style="background:'+(dc[l.type]||'var(--b2)')+'"></div><div class="acb"><div class="act">'+l.action+'</div><div class="acm">'+l.user+'</div></div><div class="actime">'+l.time+'</div></div>').join('')||'<div style="padding:24px;text-align:center;color:var(--t3)">No activity matching this filter</div>';
}

// ════════════════════════════════════════════════════
//  SAVE NEW HIRE
// ════════════════════════════════════════════════════
function saveHire(){
  const client=document.getElementById('nhc').value.trim(),phone=document.getElementById('nhp').value.trim();
  const pid=document.getElementById('nhi').value,qty=parseInt(document.getElementById('nhq').value)||1;
  const start=document.getElementById('nhs').value,ret=document.getElementById('nhr').value;
  const dep=parseInt(document.getElementById('nhd').value)||0,maxI=parseInt(document.getElementById('nhmi').value)||5;
  const notes=document.getElementById('nhn').value;
  if(!client||!phone||!start||!ret){alert('Please fill in client name, phone, and both dates.');return;}
  const ps=LS.g('products')||[];const p=ps.find(x=>x.id===pid);
  if(!p){alert('Please select a product.');return;}
  const days=Math.max(1,Math.round((new Date(ret)-new Date(start))/86400000));
  const er=effRate(p);const total=er*qty*days;
  const hs=LS.g('hires')||[];const ref='HIR-2025-'+String(hs.length+1).padStart(3,'0');
  const df=daysFrom(ret);const status=df<0?'overdue':df<=3?'due-soon':'active';
  hs.unshift({id:uid(),ref,client,phone,item:p.name,qty,start,due:ret,deposit:dep,
    totalDue:total,totalPaid:dep,
    payments:dep>0?[{amount:dep,date:start,note:'Deposit',by:CU.name+' ('+cap(CU.role)+')'}]:[],
    paymentStatus:dep>=total?'paid':'partial',maxInstallments:maxI,notes,
    by:CU.name+' ('+cap(CU.role)+')',userId:CU.id,status});
  LS.s('hires',hs);
  const pi=ps.findIndex(x=>x.id===pid);
  if(pi>=0){ps[pi].hired=Math.min(ps[pi].total,ps[pi].hired+qty);LS.s('products',ps);}
  const cs=LS.g('clients')||[];
  if(!cs.find(c=>c.name===client)){cs.unshift({id:uid(),name:client,phone,email:'',location:'',notes:'',addedBy:CU.name,hires:1,total:dep,lastHire:start});LS.s('clients',cs);}
  logA(CU.id,CU.name+' ('+cap(CU.role)+')','New hire: '+client+' — '+p.name+' ×'+qty+' ('+ref+') Total: KSh '+fmt(total)+(p.discountRate?' ['+p.discountRate+'% disc applied]':''),'hire');
  closeM('mNewHire');['nhc','nhp','nhn'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  document.getElementById('htprev').style.display='none';
  updateBadges();renderHires();renderDash();
  showAlert('login','Hire saved',ref+' &mdash; '+client,'&#128203;');
}

// ════════════════════════════════════════════════════
//  ALERTS
// ════════════════════════════════════════════════════
function showAlert(type,title,body,icon){
  const b=document.getElementById('ab');const el=document.createElement('div');
  el.className='ai '+type;
  el.innerHTML='<div class="aico '+type+'">'+icon+'</div><div class="abod"><div class="at">'+title+'</div><div class="as">'+body+'</div></div><button class="acls" onclick="this.parentElement.remove()">&#215;</button>';
  b.appendChild(el);setTimeout(()=>{if(el.parentNode)el.remove();},8000);
}

// ════════════════════════════════════════════════════
//  MODALS
// ════════════════════════════════════════════════════
function openM(id){
  document.getElementById(id).classList.add('on');
  if(id==='mNewHire'){const t=today();const r=new Date();r.setDate(r.getDate()+14);document.getElementById('nhs').value=t;document.getElementById('nhr').value=r.toISOString().split('T')[0];calcHT();}
  if(id==='mReservation'){const t=today();const pickup=new Date();pickup.setDate(pickup.getDate()+1);const ret=new Date();ret.setDate(ret.getDate()+15);document.getElementById('rsd').value=pickup.toISOString().split('T')[0];document.getElementById('rse').value=ret.toISOString().split('T')[0];populateSels();toggleReservationTransport();}
  if(id==='mSell')updSellInfo();
  if(id==='mRestock')updRsInfo();
}
function closeM(id){document.getElementById(id).classList.remove('on');}
function closeAllM(){document.querySelectorAll('.mo.on').forEach(m=>m.classList.remove('on'));}
document.querySelectorAll('.mo').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('on');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAllM();});
document.getElementById('lpass').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});
document.getElementById('luser').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('lpass').focus();});

// ════════════════════════════════════════════════════
//  DATA EXPORT (backup via browser console)
// ════════════════════════════════════════════════════
function exportData(){
  const keys=['users','products','hires','reservations','clients','docs','stockH','priceH','rlog','sessions','actLog'];
  const data={};keys.forEach(k=>{data[k]=LS.g(k);});
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='iloadlist_backup_'+today()+'.json';a.click();
}

// ════════════════════════════════════════════════════
//  BOOT
// ════════════════════════════════════════════════════
initData();
document.getElementById('sLogin').classList.add('on');
