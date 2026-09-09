document.write(String.raw`<div class="vw" id="v-reservations">
  <div class="cd">
    <div class="cdh"><h3>Equipment reservations</h3>
      <div class="cdhr">
        <select class="fsel" style="width:145px;padding:6px 10px;font-size:12px" onchange="renderReservations(this.value)">
          <option value="">All reservations</option><option value="pending">Pending</option><option value="overdue">Overdue</option><option value="inactive">Inactive</option><option value="picked-up">Picked up</option>
        </select>
        <button class="btn bg bsm" onclick="openM('mReservation')">&#43; New reservation</button>
      </div>
    </div>
    <div class="tw"><table><thead><tr><th>Ref</th><th>Client</th><th>Equipment</th><th>Pickup date</th><th>Qty</th><th>Status</th><th>Actions</th></tr></thead><tbody id="reservationsTb"></tbody></table></div>
  </div>
  <div class="cd"><div class="cdh"><h3>Reservation stock hold</h3></div><div class="cdb"><div class="ib bl">Pending reservations reduce available stock. When the client arrives, use <b>Convert to hire</b> to transfer the reservation into Active Hires automatically.</div><div id="reservationSummary" style="font-size:13px;color:var(--t2)"></div></div></div>
</div>`);