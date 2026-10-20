```javascript
(function () {
  const n = document;
  const o = n.head;

  const hiddenStyle =
    "pointer-events:none;" +
    "height:1px;" +
    "width:0;" +
    "opacity:0;" +
    "visibility:hidden;" +
    "position:fixed;" +
    "bottom:0;";

  const a = n.createElement("div");
  const s = n.createElement("div");
  const d = n.createElement("ins");

  a.id = "div-gpt-ad-3061307416813-0";
  a.style.cssText = hiddenStyle;

  s.className =
    "textads banner-ads banner_ads ad-unit ad-zone ad-space adsbox ads";
  s.style.cssText = hiddenStyle;

  d.className = "adsbygoogle";
  d.style.cssText = "display:none;";

  const state = {
    allowed: null,
    elements: [a, s, d]
  };

  this.checkAdsStatus = function (callback) {
    if (typeof callback !== "function") return;

    // Return a cached result if one is available.
    if (typeof state.allowed === "boolean") {
      callback(state);
      return;
    }

    const body = n.body;

    if (!body || !o) {
      // Inconclusive: never block browsing.
      state.allowed = null;
      callback(state);
      return;
    }

    body.appendChild(a);
    body.appendChild(s);
    body.appendChild(d);

    setTimeout(function () {
      let blocked = false;

      try {
        // Only treat hidden test elements as a possible signal.
        // Do not use firstElementChild as an ad-block test.
        blocked =
          a.offsetHeight === 0 ||
          s.offsetHeight === 0;
      } catch (error) {
        blocked = false;
      }

      a.remove();
      s.remove();
      d.remove();

      if (blocked) {
        state.allowed = false;
        callback(state);
        return;
      }

      // A failed request is inconclusive, not proof of ad blocking.
      const script = n.createElement("script");
      let finished = false;

      function finish(result) {
        if (finished) return;
        finished = true;

        script.onload = null;
        script.onerror = null;

        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }

        state.allowed = result;
        callback(state);
      }

      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.crossOrigin = "anonymous";

      script.onload = function () {
        finish(true);
      };

      script.onerror = function () {
        finish(null);
      };

      // Avoid hanging detection if the request never completes.
      // On timeout, allow browsing.
      setTimeout(function () {
        finish(null);
      }, 4000);

      o.appendChild(script);
    }, 40);
  };
}).call(window);


function antiAdBlockerHandler() {
  if (window.__antiAdBlockerCheckStarted) return;
  window.__antiAdBlockerCheckStarted = true;

  window.checkAdsStatus(function (ads) {
    if (ads.allowed === false) {
      console.log(
        "%c[ADS]",
        "color:#d32f2f;",
        "Possible ad blocker detected"
      );

      const icon =
        "<svg style='stroke:none;fill:currentColor!important' " +
        "viewBox='0 0 24 24'>" +
        "<path d='M12.2 9L10.2 7H13C14.1 7 15 7.9 " +
        "15 9V11.8L13 9.8V9H12.2M23 9V7H19C17.9 " +
        "7 17 7.9 17 9V11C17 12.1 17.9 13 19 " +
        "13H21V15H18.2L20.2 17H21C22.1 17 23 " +
        "16.1 23 15V13C23 11.9 22.1 11 21 " +
        "11H19V9H23M22.1 21.5L20.8 22.8L14.4 " +
        "16.4C14.1 16.7 13.6 17 13 17H9V10.9L7 " +
        "8.9V17H5V13H3V17H1V9C1 7.9 1.9 7 " +
        "3 7H5.1L1.1 3L2.4 1.7L22.1 21.5M5 " +
        "9H3V11H5V9M13 14.9L11 12.9V15H13V14.9Z'/>" +
        "</svg>";

      const title = "Ad blocker detected!";

      const message =
        "<p>Advertising helps support this website. " +
        "Please consider allowing ads on our website " +
        "if you have an ad blocker enabled.</p>";

      // Avoid creating duplicate popups.
      if (!document.querySelector(".popSc")) {
        const element = document.createElement("div");
        element.className = "popSc";

        element.innerHTML =
          "<div class='popBo'>" +
          icon +
          "<h2>" + title + "</h2>" +
          "<div class='popCo'>" + message + "</div>" +
          "</div>";

        document.body.appendChild(element);
      }
    } else if (ads.allowed === true) {
      console.log(
        "%c[ADS]",
        "color:#43a047;",
        "Allowed"
      );
    } else {
      // Network errors, DNS filtering, privacy settings,
      // timeouts, and other inconclusive results.
      // Always leave the website accessible.
      console.log(
        "%c[ADS]",
        "color:#ff9800;",
        "Inconclusive; browsing allowed"
      );
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    antiAdBlockerHandler,
    { once: true }
  );
} else {
  antiAdBlockerHandler();
}
```
