(function () {
    const STORAGE_KEY = "theme";

    function getPreferredTheme() {
        let saved = null;
        try {
            saved = localStorage.getItem(STORAGE_KEY);
        } catch (e) {
        }
        if (saved === "light" || saved === "dark") {
            return saved;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-bs-theme", theme);
    }

    applyTheme(getPreferredTheme());

    document.addEventListener("DOMContentLoaded", function () {
        const button = document.getElementById("theme-toggle");
        if (!button) {
            return;
        }

        function updateButton() {
            const current = document.documentElement.getAttribute("data-bs-theme");
            button.textContent = current === "dark" ? "☀️ Light" : "🌙 Dark";
            button.setAttribute(
                "aria-label",
                current === "dark" ? "Switch to light mode" : "Switch to dark mode"
            );
        }
        updateButton();

        button.addEventListener("click", function () {
            const current = document.documentElement.getAttribute("data-bs-theme");
            const next = current === "dark" ? "light" : "dark";
            applyTheme(next);
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch (e) {
            }
            updateButton();
        });
    });
})();
