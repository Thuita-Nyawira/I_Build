document.write(String.raw`<div class="vw on" id="v-dashboard">
  <div class="mcs">
    <div class="mc g"><div class="mclbl">Active Hires</div><div class="mcv" id="dH">0</div><div class="mcsub" id="dHs"></div></div>
    <div class="mc b"><div class="mclbl">Fleet Utilization</div><div class="mcv" id="dU">0%</div><div class="mcsub" id="dUs"></div></div>
    <div class="mc r"><div class="mclbl">Overdue Returns</div><div class="mcv" id="dO">0</div><div class="mcsub">Needs action now</div></div>
    <div class="mc a"><div class="mclbl">Unpaid Balances</div><div class="mcv" id="dUB">KSh 0</div><div class="mcsub" id="dUBs"></div></div>
  </div>
  <div class="g2">
    <div class="cd"><div class="cdh"><h3>Returns due soon</h3></div><div id="dRet"></div></div>
    <div class="cd"><div class="cdh"><h3>Recent activity</h3><span id="onlbl" style="font-size:11px;color:var(--t3)"></span></div><div id="dAct"></div></div>
  </div>
  <div class="cd"><div class="cdh"><h3>Fleet utilization &mdash; live</h3></div><div class="cdb" id="dUtil"></div></div>
</div>

<!-- ══ PRODUCTS ══ -->`);
