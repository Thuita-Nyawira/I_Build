document.write(String.raw`<div class="vw" id="v-invoices">
  <div class="g2">
    <div>
      <div class="cd"><div class="cdh"><h3>Create document</h3></div>
        <div class="cdb">
          <div class="fg"><label class="fl">Document type</label>
            <select class="fsel" id="docType" onchange="refreshInv()"><option value="invoice">Hire Invoice</option><option value="receipt">Payment Receipt</option><option value="deposit">Deposit Receipt</option><option value="return">Return &amp; Refund Note</option></select>
          </div>
          <div class="fr"><div class="fg"><label class="fl">Client</label><select class="fsel" id="docClient" onchange="refreshInv();autofillDocRef()"></select></div>
          <div class="fg"><label class="fl">Hire reference</label><input class="fi" id="docRef" placeholder="HIR-2025-001" oninput="refreshInv()"/></div></div>
          <div class="fr"><div class="fg"><label class="fl">Equipment</label><select class="fsel" id="docItem" onchange="refreshInv()"></select></div>
          <div class="fg"><label class="fl">Date</label><input class="fi" id="docDate" type="date" oninput="refreshInv()"/></div></div>
          <div class="fr"><div class="fg"><label class="fl">Quantity</label><input class="fi" id="docQty" type="number" value="10" min="1" oninput="refreshInv()"/></div>
          <div class="fg"><label class="fl">Days</label><input class="fi" id="docDays" type="number" value="14" min="1" oninput="refreshInv()"/></div></div>
          <div class="fr"><div class="fg"><label class="fl">Deposit / Payment (KSh)</label><input class="fi" id="docDep" type="number" value="0" oninput="refreshInv()"/></div>
          <div class="fg"><label class="fl">VAT</label><select class="fsel" id="docVat" onchange="refreshInv()"><option value="0">No VAT</option><option value="16">16% VAT</option></select></div></div>
          <div class="fg"><label class="fl">Notes</label><textarea class="fta" id="docNotes" rows="2" oninput="refreshInv()"></textarea></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn bg" style="flex:1;min-width:120px" onclick="saveDoc()">&#128438; Save &amp; Print</button>
            <button class="btn bwh" onclick="shareWhatsApp()">&#128172; WhatsApp</button>
            <button class="btn bsm" onclick="refreshInv()">Refresh</button>
          </div>
        </div>
      </div>
    </div>
    <div class="cd" style="overflow:auto"><div class="cdh"><h3>Document preview</h3>
      <div class="cdhr"><button class="btn bsm" onclick="printPrev()">&#128438; Print / PDF</button></div>
    </div><div id="invPrev" style="padding:10px"></div></div>
  </div>
  <div class="cd"><div class="cdh"><h3>Document history</h3></div>
    <div class="tw"><table><thead><tr><th>Type</th><th>Ref</th><th>Client</th><th>Amount (KSh)</th><th>Created by</th><th>Date</th><th></th></tr></thead><tbody id="docTb"></tbody></table></div>
  </div>
</div>

<!-- ══ REPORTS ══ -->`);
