document.write(String.raw`<div class="vw" id="v-reports">
  <div class="mcs">
    <div class="mc g"><div class="mclbl">Revenue MTD</div><div class="mcv" id="repR">KSh 0</div><div class="mcsub">hire income est.</div></div>
    <div class="mc b"><div class="mclbl">Fleet Utilization</div><div class="mcv" id="repU">0%</div><div class="mcsub" id="repUs"></div></div>
    <div class="mc a"><div class="mclbl">Idle Daily Loss</div><div class="mcv" id="repI">KSh 0</div><div class="mcsub">potential per day</div></div>
    <div class="mc p"><div class="mclbl">Deposits Held</div><div class="mcv" id="repD">KSh 0</div><div class="mcsub">active hires</div></div>
  </div>
  <div class="g2">
    <div class="cd"><div class="cdh"><h3>Utilization by product</h3></div><div class="chartc"><canvas id="uChart"></canvas></div></div>
    <div class="cd"><div class="cdh"><h3>Monthly revenue trend</h3></div><div class="chartc"><canvas id="rChart"></canvas></div></div>
  </div>
  <div class="cd"><div class="cdh"><h3>Product performance detail</h3></div>
    <div class="tw"><table><thead><tr><th>Product</th><th>Total</th><th>On Hire</th><th>Utilization</th><th>Eff. Rate/Day</th><th>Revenue MTD (est.)</th><th>Idle cost/day</th></tr></thead><tbody id="repTb"></tbody></table></div>
  </div>
</div>

<!-- ══ USERS ══ -->`);
