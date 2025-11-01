// ---------- MODULE: Conversion Logic ----------
const TemperatureConverter = (() => {
  const toCelsius = (val, unit) => {
    if (unit === 'F') return (val - 32) * 5 / 9;
    if (unit === 'K') return val - 273.15;
    return val;
  };

  const fromCelsius = c => ({
    C: c,
    F: (c * 9 / 5) + 32,
    K: c + 273.15
  });

  const convert = (val, unit) => fromCelsius(toCelsius(val, unit));
  return { convert };
})();

// ---------- MODULE: Clipboard Utility ----------
const Clipboard = (() => {
  const copy = (text, btn) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {
        // Fallback: create textarea and execCommand
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
      });
    }
    btn.textContent = "✅";
    setTimeout(() => (btn.textContent = "📋"), 1000);
  };
  return { copy };
})();

// ---------- MODULE: UI Handling ----------
const UI = (() => {
  const tempInput = document.getElementById("tempInput");
  const unitSelect = document.getElementById("unitSelect");
  const unitSymbol = document.getElementById("unitSymbol");
  const result = document.getElementById("result");

  const updateSymbol = unit => {
    unitSymbol.textContent = unit === "C" ? "°C" : unit === "F" ? "°F" : "K";
  };

  const showError = msg => {
    result.innerHTML = `<p style="color:red;">⚠️ ${msg}</p>`;
  };

  const updateResult = data => {
    result.innerHTML = `
      <div class="result-item"><p><b>Celsius:</b> ${data.C.toFixed(2)} °C</p> <button class="copy-btn">📋</button></div>
      <div class="result-item"><p><b>Fahrenheit:</b> ${data.F.toFixed(2)} °F</p> <button class="copy-btn">📋</button></div>
      <div class="result-item"><p><b>Kelvin:</b> ${data.K.toFixed(2)} K</p> <button class="copy-btn">📋</button></div>
    `;

    // Add copy events
    result.querySelectorAll(".copy-btn").forEach((btn, i) => {
      const val = [data.C, data.F, data.K][i].toFixed(2);
      btn.addEventListener("click", () => Clipboard.copy(val, btn));
    });
  };

  const handleInput = () => {
    const val = parseFloat(tempInput.value);
    const unit = unitSelect.value;
    updateSymbol(unit);
    if (isNaN(val)) return showError("Please enter a valid number.");
    updateResult(TemperatureConverter.convert(val, unit));
  };

  const init = () => {
    [tempInput, unitSelect].forEach(el => el.addEventListener("input", handleInput));
  };

  return { init };
})();

// ---------- MODULE: Theme Toggle ----------
const Theme = (() => {
  const toggleBtn = document.getElementById("modeToggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
})();

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  UI.init();
});
