document.write(String.raw`<div class="vw" id="v-actlog">
  <div class="cd"><div class="cdh"><h3>Full activity log</h3>
    <div class="cdhr">
      <select class="fsel" style="width:155px;padding:6px 10px;font-size:12px" id="actF" onchange="renderAct()"><option value="">All users</option></select>
      <select class="fsel" style="width:145px;padding:6px 10px;font-size:12px" id="actTF" onchange="renderAct()">
        <option value="">All actions</option><option value="login">Logins / Logouts</option><option value="hire">Hires</option>
        <option value="payment">Payments</option><option value="invoice">Invoices</option>
        <option value="inventory">Inventory / Prices</option><option value="reminder">Reminders</option>
      </select>
    </div>
  </div><div id="actList"></div></div>
</div>`);
