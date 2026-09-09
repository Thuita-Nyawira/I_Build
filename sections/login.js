document.write(String.raw`<div class="scr" id="sLogin">
  <div class="lcard">
    <div class="lbrand">ILoadList</div>
    <div class="ltag">Construction Equipment Rental</div>
    <h2 class="ltitle">Welcome back</h2>
    <p class="lsub">Sign in to manage your hire operations.</p>
    <div class="lerr" id="lerr"></div>
    <div class="fg"><label class="fl">Username</label><input class="fi" id="luser" type="text" placeholder="Your username" autocomplete="username"/></div>
    <div class="fg"><label class="fl">Password</label><input class="fi" id="lpass" type="password" placeholder="Your password"/></div>
    <button class="btn bg bbl" onclick="doLogin()">Sign in to ILoadList</button>
    <div class="lhint">
      <strong>Demo accounts &mdash; click to fill</strong>
      <div class="lcred" onclick="fillL('owner','owner123')"><span><b>owner</b> &nbsp;&nbsp; Owner</span><span style="color:var(--t3)">owner123</span></div>
      <div class="lcred" onclick="fillL('manager','mgr123')"><span><b>manager</b> &nbsp;&nbsp; Manager</span><span style="color:var(--t3)">mgr123</span></div>
      <div class="lcred" onclick="fillL('john','staff123')"><span><b>john</b> &nbsp;&nbsp; Staff</span><span style="color:var(--t3)">staff123</span></div>
    </div>
  </div>
</div>

<!-- ═══════════════════════ APP ═══════════════════════ -->`);
