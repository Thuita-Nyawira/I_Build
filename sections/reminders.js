document.write(String.raw`<div class="vw" id="v-reminders">
  <div class="g2">
    <div class="cd"><div class="cdh"><h3>&#128344; Due within 3 days</h3></div><div id="rSoon"></div></div>
    <div class="cd"><div class="cdh"><h3>&#128308; Overdue &mdash; escalate</h3></div><div id="rOver"></div></div>
  </div>
  <div class="cd"><div class="cdh"><h3>&#128176; Outstanding payment balances</h3></div><div id="rUnpaid"></div></div>
  <div class="cd"><div class="cdh"><h3>Reminder &amp; notification log</h3></div>
    <div class="tw"><table><thead><tr><th>Client</th><th>Hire ref</th><th>Message</th><th>Sent by</th><th>Date &amp; time</th></tr></thead><tbody id="rlogTb"></tbody></table></div>
  </div>
</div>

<!-- ══ CLIENTS ══ -->`);
