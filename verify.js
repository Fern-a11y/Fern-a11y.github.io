```javascript
(() => {
  const WORKER_URL = "https://holy-dawn-702f.devisserrik.workers.dev/";

  const ua = navigator.userAgent;

  let browser = "Unknown";

  if (/Edg/i.test(ua)) browser = "Edge";
  else if (/Chrome/i.test(ua)) browser = "Chrome";
  else if (/Firefox/i.test(ua)) browser = "Firefox";
  else if (/Safari/i.test(ua)) browser = "Safari";

  let os = "Unknown";

  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad/i.test(ua)) os = "iOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  const data = {
    website: location.hostname,
    browser,
    os,
    timezone:
      Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
    language: navigator.language || "Unknown",
    screen: `${screen.width} × ${screen.height}`
  };

  console.log("Sending verification:", data);
  console.log("Worker:", WORKER_URL);

  fetch(WORKER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(async response => {
      const text = await response.text();

      console.log("Worker status:", response.status);
      console.log("Worker response:", text);

      if (!response.ok) {
        console.error("Worker returned an error.");
      }
    })
    .catch(error => {
      console.error("Could not contact Worker:", error);
    });
})();
```
