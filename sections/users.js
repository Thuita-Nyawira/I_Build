document.write(String.raw`<div class="vw" id="v-users">
  <div class="cd"><div class="cdh"><h3>User accounts</h3>
    <div class="cdhr"><span id="ucntlbl" style="font-size:12px;color:var(--t3)"></span><button class="btn bg bsm" id="addUBtn" onclick="openM('mAddUser')">&#43; Admit user</button></div>
  </div><div class="cdb"><div id="ugrid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px"></div></div></div>
  <div class="cd"><div class="cdh"><h3>Session history &mdash; login &amp; logout times</h3></div>
    <div class="tw"><table><thead><tr><th>User</th><th>Role</th><th>Login time</th><th>Logout time</th><th>Duration</th><th>Actions this session</th></tr></thead><tbody id="sessTb"></tbody></table></div>
  </div>
</div>

<!-- ══ ACTIVITY LOG ══ -->`);
