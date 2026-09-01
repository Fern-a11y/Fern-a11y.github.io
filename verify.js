(() => {
  const WORKER_URL =
    "https://holy-dawn-702f.devisserrik.workers.dev/";

  const ua = navigator.userAgent;

  function getBrowser() {
    if (/Edg\//i.test(ua)) return "Edge";
    if (/OPR\//i.test(ua)) return "Opera";
    if (/Firefox\//i.test(ua)) return "Firefox";
    if (/Chrome\//i.test(ua)) return "Chrome";
    if (/Safari\//i.test(ua)) return "Safari";
    return "Unknown";
  }

  function getOS() {
    if (/Windows/i.test(ua)) return "Windows";
    if (/Android/i.test(ua)) return "Android";
    if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
    if (/Mac OS/i.test(ua)) return "macOS";
    if (/Linux/i.test(ua)) return "Linux";
    return "Unknown";
  }

  function getDevice() {
    if (/iPad|Tablet/i.test(ua)) return "Tablet";
    if (/Mobi|Android/i.test(ua)) return "Mobile";
    return "Desktop";
  }

  function getWebGL() {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");

      return gl ? "Available" : "Unavailable";
    } catch {
      return "Unavailable";
    }
  }

  const data = {
    website: location.hostname,
    referrer: document.referrer || "Direct",

    browser: getBrowser(),
    browserVersion:
      ua.match(/(?:Edg|OPR|Firefox|Chrome|Version)\/([\d.]+)/i)?.[1] ||
      "Unknown",

    os: getOS(),
    device: getDevice(),

    screen: `${screen.width} × ${screen.height}`,
    viewport: `${window.innerWidth} × ${window.innerHeight}`,
    pixelRatio: window.devicePixelRatio || 1,

    cpuCores: navigator.hardwareConcurrency || "Unknown",
    memory: navigator.deviceMemory
      ? `${navigator.deviceMemory} GB approx.`
      : "Unknown",

    touch:
      navigator.maxTouchPoints > 0,

    timezone:
      Intl.DateTimeFormat().resolvedOptions().timeZone ||
      "Unknown",

    language: navigator.language || "Unknown",

    languages:
      navigator.languages?.join(", ") || "Unknown",

    cookies:
      navigator.cookieEnabled,

    doNotTrack:
      navigator.doNotTrack || "Unknown",

    webdriver:
      navigator.webdriver === true,

    webgl:
      getWebGL(),

    online:
      navigator.onLine,

    colorScheme:
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "Dark"
        : "Light"
  };

  fetch(WORKER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(async response => {
      if (!response.ok) {
        console.error(
          "Verification failed:",
          response.status,
          await response.text()
        );
      }
    })
    .catch(error => {
      console.error("Verification connection failed:", error);
    });
})();
