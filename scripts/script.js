function calculate() {
    const entry = parseFloat(document.getElementById("entryPrice").value);
    const lev = parseFloat(document.getElementById("leverage").value);
    const margin = parseFloat(document.getElementById("margin").value);
    const tp = parseFloat(document.getElementById("tp").value);
    const sl = parseFloat(document.getElementById("sl").value);
    const direction = document.getElementById("direction").value;
    
    if(direction == "long"){
      const liq = entry * (1 - (1 / lev));
      const posSize = (margin * lev) / entry;

      // SMART STOP LOSS
      const smartSL = sl || entry * 0.95;

      let risk = posSize * (entry - smartSL);
      let reward = tp ? posSize * (tp - entry) : "N/A";
      let rr = (typeof reward === "number" && risk !== 0) ? (reward / risk) : "N/A";

      // Take profit zones (2R, 3R)
      const tp2R = entry + 2 * (entry - smartSL);
      const tp3R = entry + 3 * (entry - smartSL);

      // Stop Loss Warning
      let slWarning = (smartSL - liq) < entry * 0.05 ? "YES" : "NO";
    }else
    {
      
      
    }

    if (!entry || !lev || !margin) {
        document.getElementById("output").innerHTML = "Please enter Entry, Leverage, and Margin";
        document.getElementById("output").style.color = "red";
        return
    }
    else {
        document.getElementById("output").style.color = "#00ffd1";
    }

    

    document.getElementById("output").innerHTML = `
    <p><b>Estimated Liquidation Price:</b> ${liq.toFixed(6)}</p>
    <p><b>Position Size (Tokens):</b> ${posSize.toFixed(6)}</p>
    <p><b>Smart Stop Loss (5% below entry if not provided):</b> ${smartSL.toFixed(6)}</p>
    <p><b>Risk if SL Hits:</b> ${risk.toFixed(4)} USDT</p>
    <p><b>Reward if TP Hits:</b> ${typeof reward === "number" ? reward.toFixed(4) + " USDT" : reward}</p>
    <p><b>Risk:Reward Ratio:</b> ${typeof rr === "number" ? rr.toFixed(2) : rr}</p>
    <p><b>Suggested Take Profit Points:</b>
      <ul>
        <li>2R Take Profit: ${tp2R.toFixed(6)}</li>
        <li>3R Take Profit: ${tp3R.toFixed(6)}</li>
      </ul>
    </p>
    <p><b>Stop Loss Close to Liq?</b> <span class="${slWarning === 'YES' ? 'warning' : ''}">${slWarning}</span></p>
    `;
}