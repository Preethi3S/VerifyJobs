chrome.runtime.onMessage.addListener((msg, sender, sendResp) => {
  if(msg.action === 'ANALYZE_PAGE'){
    const text = document.body.innerText.slice(0, 12000);
    sendResp({ text });
  }
  return true;
});
