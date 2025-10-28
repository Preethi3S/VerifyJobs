chrome.action.onClicked.addListener(async (tab) => {
  chrome.tabs.sendMessage(tab.id, { action: 'ANALYZE_PAGE' }, async (resp) => {
    if(!resp) { return; }
    const modelApi = 'http://localhost:5000/api/analyze';
    try {
      const r = await fetch(modelApi, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ text: resp.text })
      });
      const data = await r.json();
      const risk = data.data.result.risk_pct;
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: `VeriJobs Risk: ${risk}%`,
        message: `Red flags: ${data.data.result.red_flags.join(', ') || 'None'}`
      });
    } catch(e) {
      console.error(e);
    }
  });
});
