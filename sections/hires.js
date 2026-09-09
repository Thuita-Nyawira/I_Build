document.write(String.raw`<div class="vw" id="v-hires">
  <div class="cd">
    <div class="cdh"><h3>Active hire agreements</h3>
      <div class="cdhr">
        <select class="fsel" style="width:145px;padding:6px 10px;font-size:12px" onchange="renderHires(this.value)"><option value="">All hires</option><option value="active">Active</option><option value="overdue">Overdue</option><option value="due-soon">Due soon</option><option value="partial">Part paid</option></select>
        <button class="btn bg bsm" onclick="openM('mNewHire')">&#43; New hire</button>
      </div>
    </div>
    <div class="tw"><table><thead><tr><th>Ref</th><th>Client</th><th>Equipment</th><th>Return Due</th><th>Total (KSh)</th><th>Paid</th><th>Balance</th><th>Payments</th><th>Status</th><th>Actions</th></tr></thead><tbody id="hiresTb"></tbody></table></div>
  </div>
</div>

<!-- ══ REMINDERS ══ -->`);
