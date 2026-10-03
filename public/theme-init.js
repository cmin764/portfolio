(function () {
  var dark = false;
  try {
    var theme = localStorage.getItem("theme");
    dark = theme === "dark" || (theme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  } catch (e) {
    dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  if (dark) {
    document.documentElement.classList.add("dark");
    // Favicon link is parsed after this script; set it once the DOM is ready.
    document.addEventListener("DOMContentLoaded", function () {
      var favicon = document.getElementById("favicon");
      if (favicon) favicon.href = favicon.href.replace("favicon-light", "favicon-dark");
    });
  }
})();
