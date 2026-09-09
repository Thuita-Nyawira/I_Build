document.write(String.raw`<div class="mo" id="mNewHire">
  <div class="md">
    <div class="mdt">New Hire Agreement<button class="cls" onclick="closeM('mNewHire')">&#215;</button></div>
    <div class="fr"><div class="fg"><label class="fl">Client name</label><input class="fi" id="nhc" placeholder="Name or company"/></div><div class="fg"><label class="fl">Phone</label><input class="fi" id="nhp" placeholder="07XX XXX XXX"/></div></div>
    <div class="fr"><div class="fg"><label class="fl">Equipment</label><select class="fsel" id="nhi" onchange="calcHT()"></select></div><div class="fg"><label class="fl">Quantity</label><input class="fi" id="nhq" type="number" value="1" min="1" oninput="calcHT()"/></div></div>
    <div class="fr"><div class="fg"><label class="fl">Hire start</label><input class="fi" id="nhs" type="date" oninput="calcHT()"/></div><div class="fg"><label class="fl">Return due</label><input class="fi" id="nhr" type="date" oninput="calcHT()"/></div></div>
    <div id="htprev" style="background:var(--bg);border-radius:var(--r);padding:13px 15px;margin-bottom:14px;font-size:13px;display:none">
      <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="color:var(--t2)">Estimated total:</span><span id="htv" style="font-weight:700;color:var(--G);font-family:'Syne',sans-serif;font-size:16px">KSh 0</span></div>
      <div id="htd" style="font-size:11px;color:var(--t3)"></div>
    </div>
    <div class="fr">
      <div class="fg"><label class="fl">Deposit paid now (KSh)</label><input class="fi" id="nhd" type="number" placeholder="0" oninput="calcHT()"/></div>
      <div class="fg"><label class="fl">Max installments</label>
        <select class="fsel" id="nhmi"><option value="1">1 &mdash; full payment on return</option><option value="2">2 payments</option><option value="3">3 payments</option><option value="4">4 payments</option><option value="5" selected>5 payments (maximum)</option></select>
      </div>
    </div>
    <div class="fg"><label class="fl">Notes</label><input class="fi" id="nhn" placeholder="Optional notes"/></div>
    <div class="mdf"><button class="btn" style="flex:1" onclick="closeM('mNewHire')">Cancel</button><button class="btn bg" style="flex:2" onclick="saveHire()">Save hire agreement</button></div>
  </div>
</div>

<!-- VIEW HIRE -->
<div class="mo" id="mViewHire">
  <div class="md mdlg">
    <div class="mdt" id="vhTitle">Hire Details<button class="cls" onclick="closeM('mViewHire')">&#215;</button></div>
    <div id="vhBody"></div>
    <div class="mdf"><button class="btn" style="flex:1" onclick="closeM('mViewHire')">Close</button></div>
  </div>
</div>

<!-- ADD PAYMENT -->
<div class="mo" id="mPay">
  <div class="md">
    <div class="mdt">Record Payment<button class="cls" onclick="closeM('mPay')">&#215;</button></div>
    <div id="payBody"></div>
    <div class="mdf"><button class="btn" style="flex:1" onclick="closeM('mPay')">Cancel</button><button class="btn bg" style="flex:2" onclick="confirmPay()">Save payment</button></div>
  </div>
</div>

<!-- PROCESS RETURN -->
<div class="mo" id="mReturn">
  <div class="md mdlg">
    <div class="mdt">Process Equipment Return<button class="cls" onclick="closeM('mReturn')">&#215;</button></div>
    <div id="retBody"></div>
    <div class="mdf"><button class="btn" style="flex:1" onclick="closeM('mReturn')">Cancel</button><button class="btn bg" style="flex:2" onclick="confirmReturn()">Confirm return</button></div>
  </div>
</div>

<!-- ADD / PURCHASE PRODUCT -->
<div class="mo" id="mAddProd">
  <div class="md">
    <div class="mdt">New Equipment Purchase<button class="cls" onclick="closeM('mAddProd')">&#215;</button></div>
    <div class="ib bl">Records a <b>purchase of new equipment</b> and adds it to your catalogue. To add more units to an existing product, use <b>Restock</b>.</div>
    <div class="fr"><div class="fg"><label class="fl">Item name</label><input class="fi" id="apn" placeholder="e.g. Scaffolding Bay 1.2m"/></div><div class="fg"><label class="fl">Item code</label><input class="fi" id="apc" placeholder="e.g. SCF-120"/></div></div>
    <div class="fr"><div class="fg"><label class="fl">Units purchased</label><input class="fi" id="apq" type="number" min="1" placeholder="10"/></div><div class="fg"><label class="fl">Unit cost (KSh)</label><input class="fi" id="apuc" type="number" placeholder="50000"/></div></div>
    <div class="fr"><div class="fg"><label class="fl">Hire rate / day (KSh)</label><input class="fi" id="apr" type="number" placeholder="350"/></div>
    <div class="fg"><label class="fl">Category</label><select class="fsel" id="apcat"><option>Scaffolding</option><option>Mixers</option><option>Generators</option><option>Compactors</option><option>Vibrators</option><option>Access</option><option>Pumps</option><option>Other</option></select></div></div>
    <div class="fg"><label class="fl">Supplier / Notes</label><input class="fi" id="apnotes" placeholder="Supplier name, invoice ref, or notes"/></div>
    <div class="mdf"><button class="btn" style="flex:1" onclick="closeM('mAddProd')">Cancel</button><button class="btn bg" style="flex:2" onclick="saveProd()">Add to inventory</button></div>
  </div>
</div>

<!-- RESTOCK -->
<div class="mo" id="mRestock">
  <div class="md">
    <div class="mdt">Restock Existing Item<button class="cls" onclick="closeM('mRestock')">&#215;</button></div>
    <div class="fg"><label class="fl">Select product</label><select class="fsel" id="rsP" onchange="updRsInfo()"></select></div>
    <div id="rsInfo" style="background:var(--bg);border-radius:var(--r);padding:11px 13px;margin-bottom:14px;font-size:12px;color:var(--t2)"></div>
    <div class="fr"><div class="fg"><label class="fl">Units to add</label><input class="fi" id="rsQ" type="number" min="1" value="1"/></div><div class="fg"><label class="fl">Unit cost (KSh)</label><input class="fi" id="rsCost" type="number" placeholder="0"/></div></div>
    <div class="fg"><label class="fl">Supplier / Notes</label><input class="fi" id="rsN" placeholder="Purchase notes"/></div>
    <div class="mdf"><button class="btn" style="flex:1" onclick="closeM('mRestock')">Cancel</button><button class="btn bg" style="flex:2" onclick="doRestock()">Add to inventory</button></div>
  </div>
</div>

<!-- SELL / DISPOSE -->
<div class="mo" id="mSell">
  <div class="md">
    <div class="mdt">Record Sale / Disposal<button class="cls" onclick="closeM('mSell')">&#215;</button></div>
    <div class="ib a">Permanently removes units from inventory. Units currently on hire <b>cannot</b> be sold.</div>
    <div class="fg"><label class="fl">Product</label><select class="fsel" id="spP" onchange="updSellInfo()"></select></div>
    <div id="spInfo" style="font-size:12px;color:var(--t3);margin-bottom:12px"></div>
    <div class="fr"><div class="fg"><label class="fl">Quantity to remove</label><input class="fi" id="spQ" type="number" min="1" value="1"/></div><div class="fg"><label class="fl">Sale price / unit (KSh)</label><input class="fi" id="spPrice" type="number" placeholder="0"/></div></div>
    <div class="fr"><div class="fg"><label class="fl">Reason</label>
      <select class="fsel" id="spR"><option value="sold">Sold to customer</option><option value="scrapped">Scrapped / damaged beyond repair</option><option value="written-off">Written off (lost / stolen)</option><option value="transferred">Transferred / gifted</option></select>
    </div><div class="fg"><label class="fl">Buyer / Notes</label><input class="fi" id="spN" placeholder="Buyer name or additional notes"/></div></div>
    <div class="mdf"><button class="btn" style="flex:1" onclick="closeM('mSell')">Cancel</button><button class="btn br" style="flex:2" onclick="doSell()">Confirm &amp; deduct from stock</button></div>
  </div>
</div>

<!-- PRICE MANAGER -->
<div class="mo" id="mPriceMgr">
  <div class="md mdxl">
    <div class="mdt">Pricing &amp; Discount Management<button class="cls" onclick="closeM('mPriceMgr')">&#215;</button></div>
    <div id="pmBody"></div>
    <div class="mdf"><button class="btn" onclick="closeM('mPriceMgr')">Close</button></div>
  </div>
</div>

<!-- ADD CLIENT -->
<div class="mo" id="mAddClient">
  <div class="md">
    <div class="mdt">Add Client<button class="cls" onclick="closeM('mAddClient')">&#215;</button></div>
    <div class="fr"><div class="fg"><label class="fl">Name / Company</label><input class="fi" id="acN" placeholder="James Kariuki"/></div><div class="fg"><label class="fl">Phone</label><input class="fi" id="acP" placeholder="07XX XXX XXX"/></div></div>
    <div class="fr"><div class="fg"><label class="fl">Email</label><input class="fi" id="acE" type="email" placeholder="optional"/></div><div class="fg"><label class="fl">Location</label><input class="fi" id="acL" placeholder="Nairobi, Karen"/></div></div>
    <div class="fg"><label class="fl">Notes</label><textarea class="fta" id="acNo" rows="2" placeholder="Notes about this client..."></textarea></div>
    <div class="mdf"><button class="btn" style="flex:1" onclick="closeM('mAddClient')">Cancel</button><button class="btn bg" style="flex:2" onclick="saveClient()">Save client</button></div>
  </div>
</div>

<!-- RESERVATION -->
<div class="mo" id="mReservation">
  <div class="md">
    <div class="mdt">New Equipment Reservation<button class="cls" onclick="closeM('mReservation')">&#215;</button></div>
    <div class="ib bl">This holds equipment for the client without starting an active hire. Convert it to an active hire when the client arrives.</div>
    <div class="fr"><div class="fg"><label class="fl">Client name</label><input class="fi" id="rsc" placeholder="Name or company"/></div><div class="fg"><label class="fl">Phone</label><input class="fi" id="rsp" placeholder="07XX XXX XXX"/></div></div>
    <div class="fr"><div class="fg"><label class="fl">Equipment</label><select class="fsel" id="rsi"></select></div><div class="fg"><label class="fl">Quantity</label><input class="fi" id="rsq" type="number" value="1" min="1"/></div></div>
    <div class="fr"><div class="fg"><label class="fl">Pickup date</label><input class="fi" id="rsd" type="date"/></div><div class="fg"><label class="fl">Expected return</label><input class="fi" id="rse" type="date"/></div></div>
    <div class="fr"><div class="fg"><label class="fl">Site location</label><input class="fi" id="rsl" placeholder="Project site location"/></div><div class="fg"><label class="fl">Fulfilment</label><select class="fsel" id="rsm" onchange="toggleReservationTransport()"><option value="delivery">Delivery</option><option value="pickup">Client pick-up</option></select></div></div>
    <div class="fg" id="rstw"><label class="fl">Transport cost (KSh)</label><input class="fi" id="rst" type="number" min="0" value="0" placeholder="0"/><div class="fn">Added to the hire total for delivery.</div></div>
    <div class="fg"><label class="fl">Notes</label><textarea class="fta" id="rsn" rows="2" placeholder="Optional reservation notes"></textarea></div>
    <div class="mdf"><button class="btn" style="flex:1" onclick="closeM('mReservation')">Cancel</button><button class="btn bg" style="flex:2" onclick="saveReservation()">Save reservation</button></div>
  </div>
</div>

<!-- ADD USER -->
<div class="mo" id="mAddUser">
  <div class="md">
    <div class="mdt">Admit New User<button class="cls" onclick="closeM('mAddUser')">&#215;</button></div>
    <div class="ib a">Maximum <b>5 users</b> including yourself. All actions are logged under each user&rsquo;s account.</div>
    <div class="fr"><div class="fg"><label class="fl">Full name</label><input class="fi" id="nuN" placeholder="e.g. Faith Njeri"/></div><div class="fg"><label class="fl">Username</label><input class="fi" id="nuU" placeholder="e.g. faith"/></div></div>
    <div class="fr"><div class="fg"><label class="fl">Password</label><input class="fi" id="nuPw" type="password"/></div>
    <div class="fg"><label class="fl">Role</label><select class="fsel" id="nuR"><option value="manager">Manager</option><option value="staff">Staff</option></select></div></div>
    <div class="fg"><label class="fl">Phone</label><input class="fi" id="nuPh" placeholder="07XX XXX XXX"/></div>
    <div class="mdf"><button class="btn" style="flex:1" onclick="closeM('mAddUser')">Cancel</button><button class="btn bg" style="flex:2" onclick="admitUser()">Admit user</button></div>
  </div>
</div>
`);
