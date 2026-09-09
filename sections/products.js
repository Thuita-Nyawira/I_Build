document.write(String.raw`<div class="vw" id="v-products">
  <div class="mcs">
    <div class="mc g"><div class="mclbl">Catalogue Items</div><div class="mcv" id="pTot">0</div><div class="mcsub">product types</div></div>
    <div class="mc b"><div class="mclbl">Total Units</div><div class="mcv" id="pUnit">0</div><div class="mcsub" id="pUnits"></div></div>
    <div class="mc p"><div class="mclbl">Units Sold / Off</div><div class="mcv" id="pSold">0</div><div class="mcsub">all time</div></div>
    <div class="mc o"><div class="mclbl">Avg Utilization</div><div class="mcv" id="pUtil">0%</div><div class="mcsub">fleet on hire</div></div>
  </div>
  <div class="cd">
    <div class="cdh"><h3>Equipment catalogue</h3>
      <div class="cdhr">
        <select class="fsel" style="width:130px;padding:6px 10px;font-size:12px" onchange="renderProds(this.value)"><option value="">All items</option><option value="avail">Available</option><option value="hired">On hire</option></select>
        <button class="btn bsm" onclick="openM('mRestock')">&#43; Restock</button>
        <button class="btn bg bsm" onclick="openM('mAddProd')">&#43; New Purchase</button>
        <button class="btn br bsm" onclick="openM('mSell')">&#8722; Sell / Dispose</button>
        <button class="btn ba bsm" id="btnPriceMgr" onclick="openPriceMgr()" style="display:none">&#9998; Prices</button>
      </div>
    </div>
    <div class="tw"><table><thead><tr><th>Item</th><th>Code</th><th>Total</th><th>Sold</th><th>On Hire</th><th>Available</th><th>Hire Rate/Day</th><th>Discount</th><th>Utilization</th><th>Actions</th></tr></thead><tbody id="prodTb"></tbody></table></div>
  </div>
  <div class="cd"><div class="cdh"><h3>Stock movement &amp; price history</h3></div>
    <div class="tw"><table><thead><tr><th>Date</th><th>Product</th><th>Type</th><th>Qty / Change</th><th>Unit value (KSh)</th><th>Total (KSh)</th><th>Notes / Reason</th><th>By</th></tr></thead><tbody id="stockTb"></tbody></table></div>
  </div>
</div>

<!-- ══ HIRES ══ -->`);
