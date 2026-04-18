(function () {
  try {
    const theme = localStorage.getItem("theme");
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    }
  } catch (e) {}
})();