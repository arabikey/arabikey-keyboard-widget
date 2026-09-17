(function (root) {
  "use strict";

  var FATHA = "\u064E";
  var DAMMA = "\u064F";
  var KASRA = "\u0650";
  var SUKUN = "\u0652";
  var SHADDA = "\u0651";
  var FATHATAN = "\u064B";
  var DAMMATAN = "\u064C";
  var KASRATAN = "\u064D";

  var HARAKAT = [
    { ar: FATHA, label: "فتحة" },
    { ar: DAMMA, label: "ضمة" },
    { ar: KASRA, label: "كسرة" },
    { ar: SUKUN, label: "سكون" },
    { ar: SHADDA, label: "شدة" },
    { ar: FATHATAN, label: "تنوين فتح" },
    { ar: DAMMATAN, label: "تنوين ضم" },
    { ar: KASRATAN, label: "تنوين كسر" },
    { ar: "أ", label: "ألف همزة" },
    { ar: "إ", label: "إ" },
    { ar: "آ", label: "آ" },
    { ar: "ى", label: "ألف مقصورة" },
    { ar: "ة", label: "تاء مربوطة" },
    { ar: "ء", label: "همزة" },
    { ar: "ؤ", label: "ؤ" },
    { ar: "ئ", label: "ئ" }
  ];

  var AZERTY_LAT = {
    KeyQ: "a",
    KeyW: "z",
    KeyE: "e",
    KeyR: "r",
    KeyT: "t",
    KeyY: "y",
    KeyU: "u",
    KeyI: "i",
    KeyO: "o",
    KeyP: "p",
    KeyA: "q",
    KeyS: "s",
    KeyD: "d",
    KeyF: "f",
    KeyG: "g",
    KeyH: "h",
    KeyJ: "j",
    KeyK: "k",
    KeyL: "l",
    Semicolon: "m",
    Quote: "ù",
    KeyZ: "w",
    KeyX: "x",
    KeyC: "c",
    KeyV: "v",
    KeyB: "b",
    KeyN: "n",
    KeyM: ",",
    Comma: ";",
    Period: ":",
    Slash: "!"
  };

  function arabic101Rows() {
    return [
      [
        k("Backquote", "ذ", "ّ", "`"),
        k("Digit1", "١", FATHA, "1"),
        k("Digit2", "٢", FATHATAN, "2"),
        k("Digit3", "٣", DAMMA, "3"),
        k("Digit4", "٤", DAMMATAN, "4"),
        k("Digit5", "٥", KASRA, "5"),
        k("Digit6", "٦", KASRATAN, "6"),
        k("Digit7", "٧", SUKUN, "7"),
        k("Digit8", "٨", SHADDA, "8"),
        k("Digit9", "٩", ")", "9"),
        k("Digit0", "٠", "(", "0"),
        k("Minus", "-", "_", "-"),
        k("Equal", "=", "+", "="),
        { code: "Backspace", ar: "⌫", lat: "Retour", wide: true, action: "backspace" }
      ],
      [
        { code: "Tab", ar: "⇥", lat: "Tab", wide: true, action: "tab" },
        k("KeyQ", "ض", FATHA, "q"),
        k("KeyW", "ص", FATHATAN, "w"),
        k("KeyE", "ث", DAMMA, "e"),
        k("KeyR", "ق", DAMMATAN, "r"),
        k("KeyT", "ف", "لإ", "t"),
        k("KeyY", "غ", "إ", "y"),
        k("KeyU", "ع", "‘", "u"),
        k("KeyI", "ه", "÷", "i"),
        k("KeyO", "خ", "×", "o"),
        k("KeyP", "ح", "؛", "p"),
        k("BracketLeft", "ج", ">", "["),
        k("BracketRight", "د", "<", "]")
      ],
      [
        { code: "CapsLock", ar: "⇪", lat: "Maj.", wide: true, action: "caps" },
        k("KeyA", "ش", KASRA, "a"),
        k("KeyS", "س", KASRATAN, "s"),
        k("KeyD", "ي", "]", "d"),
        k("KeyF", "ب", "[", "f"),
        k("KeyG", "ل", "لأ", "g"),
        k("KeyH", "ا", "أ", "h"),
        k("KeyJ", "ت", "ـ", "j"),
        k("KeyK", "ن", "،", "k"),
        k("KeyL", "م", "/", "l"),
        k("Semicolon", "ك", ":", ";"),
        k("Quote", "ط", '"', "'"),
        { code: "Enter", ar: "⏎", lat: "Entrée", wide: true, action: "enter" }
      ],
      [
        { code: "ShiftLeft", ar: "⇧", lat: "Shift", wide: true, action: "shift" },
        k("KeyZ", "ئ", "~", "z"),
        k("KeyX", "ء", SUKUN, "x"),
        k("KeyC", "ؤ", "}", "c"),
        k("KeyV", "ر", "{", "v"),
        k("KeyB", "لا", "لآ", "b"),
        k("KeyN", "ى", "آ", "n"),
        k("KeyM", "ة", "'", "m"),
        k("Comma", "و", ",", ","),
        k("Period", "ز", ".", "."),
        k("Slash", "ظ", "؟", "/"),
        { code: "ShiftRight", ar: "⇧", lat: "Shift", wide: true, action: "shift" }
      ],
      [
        { code: "ControlLeft", ar: "Ctrl", lat: "", action: "noop" },
        { code: "AltLeft", ar: "Alt", lat: "", action: "noop" },
        { code: "Space", ar: "مسافة", lat: "Espace", space: true, action: "space" },
        { code: "AltRight", ar: "AltGr", lat: "", action: "noop" },
        { code: "ControlRight", ar: "Ctrl", lat: "", action: "noop" }
      ]
    ];
  }

  function relabel(rows, latinMap) {
    return rows.map(function (row) {
      return row.map(function (key) {
        if (!latinMap[key.code]) return key;
        var copy = {};
        for (var prop in key) {
          if (Object.prototype.hasOwnProperty.call(key, prop)) copy[prop] = key[prop];
        }
        copy.lat = latinMap[key.code];
        return copy;
      });
    });
  }

  function layoutRows(which) {
    var layout = which || "azerty";
    var rows = arabic101Rows();
    if (layout === "azerty") return relabel(rows, AZERTY_LAT);
    return rows;
  }

  function azertyRows() {
    return layoutRows("azerty");
  }

  function qwertyRows() {
    return layoutRows("qwerty");
  }

  function k(code, ar, shift, lat) {
    return { code: code, ar: ar, shift: shift, lat: lat };
  }

  var COPY = {
    fr: {
      placeholder: "اكتب هنا… Tapez en arabe, ou en latin avec Yamli (ex. marhaba).",
      copy: "Copier",
      copied: "Texte copié.",
      copyEmpty: "Rien à copier pour l’instant.",
      tashkil: "Tashkīl automatique",
      tashkilLoading: "Vocalisation en cours…",
      tashkilOk: "Tashkīl appliqué.",
      tashkilEmpty: "Écrivez d’abord un texte arabe à vocaliser.",
      tashkilError: "Le tashkīl distant est indisponible. Version locale appliquée.",
      yamli: "Yamli",
      yamliOn: "Yamli activé : latin → arabe",
      azerty: "Azerty",
      qwerty: "Qwerty",
      clear: "Effacer",
      empty: "Le champ est vide. Cliquez sur les touches ou tapez au clavier.",
      tips1: "Yamli : tapez marhaba, salam, shukran… puis Espace pour valider la suggestion.",
      tips2: "Tashkīl : ajoute les voyelles courtes (fatha, damma, kasra) au texte arabe.",
      tips3: "Shift affiche les diacritiques et lettres supplémentaires. Azerty est recommandé sur un clavier français."
    },
    ar: {
      placeholder: "اكتب بالعربية، أو باللاتينية مع ياملي (مثال: marhaba).",
      copy: "نسخ",
      copied: "تم نسخ النص.",
      copyEmpty: "لا يوجد نص للنسخ.",
      tashkil: "التشكيل التلقائي",
      tashkilLoading: "جاري التشكيل…",
      tashkilOk: "تم التشكيل.",
      tashkilEmpty: "اكتب نصاً عربياً أولاً.",
      tashkilError: "التشكيل عبر الشبكة غير متاح. تم استخدام التشكيل المحلي.",
      yamli: "ياملي",
      yamliOn: "ياملي يعمل: لاتيني → عربي",
      azerty: "أزيرتي",
      qwerty: "كويرتي",
      clear: "مسح",
      empty: "الحقل فارغ. المس المفاتيح أو اكتب.",
      tips1: "ياملي: اكتب marhaba ثم مسافة لاختيار الاقتراح.",
      tips2: "التشكيل يضيف الحركات إلى النص العربي.",
      tips3: "Shift للحركات والحروف الإضافية."
    }
  };

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function insertAtCaret(textarea, text) {
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var value = textarea.value;
    textarea.value = value.slice(0, start) + text + value.slice(end);
    var pos = start + text.length;
    textarea.selectionStart = textarea.selectionEnd = pos;
    textarea.focus();
  }

  function deleteAtCaret(textarea) {
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    if (start !== end) {
      insertAtCaret(textarea, "");
      return;
    }
    if (start === 0) return;
    textarea.value = textarea.value.slice(0, start - 1) + textarea.value.slice(end);
    textarea.selectionStart = textarea.selectionEnd = start - 1;
    textarea.focus();
  }

  function currentLatinToken(textarea) {
    var pos = textarea.selectionStart;
    var left = textarea.value.slice(0, pos);
    var m = left.match(/[A-Za-z0-9']+$/);
    return m ? m[0] : "";
  }

  function replaceLatinToken(textarea, arabic) {
    var pos = textarea.selectionStart;
    var left = textarea.value.slice(0, pos);
    var right = textarea.value.slice(pos);
    var m = left.match(/[A-Za-z0-9']+$/);
    if (!m) {
      insertAtCaret(textarea, arabic);
      return;
    }
    var next = left.slice(0, left.length - m[0].length) + arabic + right;
    textarea.value = next;
    var caret = left.length - m[0].length + arabic.length;
    textarea.selectionStart = textarea.selectionEnd = caret;
    textarea.focus();
  }

  function keyGlyph(key, shift) {
    if (key.action) return key.ar;
    return shift && key.shift ? key.shift : key.ar;
  }

  function mount(target, options) {
    options = options || {};
    var lang = options.lang === "ar" ? "ar" : "fr";
    var t = COPY[lang];
    var state = {
      layout: options.layout === "qwerty" ? "qwerty" : "azerty",
      shift: false,
      caps: false,
      yamli: options.yamli !== false,
      suggestions: []
    };

    var rootEl = typeof target === "string" ? document.querySelector(target) : target;
    if (!rootEl) return null;
    rootEl.innerHTML = "";
    rootEl.classList.add("ak-kb", "is-empty");

    var card = el("div", "ak-kb-card");
    var toolbar = el("div", "ak-kb-toolbar");
    var copyBtn = el("button", "ak-kb-btn", t.copy);
    copyBtn.type = "button";
    var tashkilBtn = el("button", "ak-kb-btn ak-kb-btn-primary", "✨ " + t.tashkil);
    tashkilBtn.type = "button";
    var yamliBtn = el("button", "ak-kb-btn", t.yamli);
    yamliBtn.type = "button";
    yamliBtn.setAttribute("aria-pressed", state.yamli ? "true" : "false");
    var azertyBtn = el("button", "ak-kb-btn", t.azerty);
    azertyBtn.type = "button";
    var qwertyBtn = el("button", "ak-kb-btn", t.qwerty);
    qwertyBtn.type = "button";
    var clearBtn = el("button", "ak-kb-btn", t.clear);
    clearBtn.type = "button";
    toolbar.appendChild(copyBtn);
    toolbar.appendChild(tashkilBtn);
    toolbar.appendChild(yamliBtn);
    toolbar.appendChild(azertyBtn);
    toolbar.appendChild(qwertyBtn);
    toolbar.appendChild(clearBtn);

    var wrap = el("div", "ak-kb-editor-wrap");
    var editor = el("textarea", "ak-kb-editor");
    editor.setAttribute("id", options.editorId || "arabikey-editor");
    editor.setAttribute("dir", "rtl");
    editor.setAttribute("lang", "ar");
    editor.setAttribute("rows", "5");
    editor.setAttribute("placeholder", t.placeholder);
    editor.setAttribute("aria-label", lang === "ar" ? "محرر النص العربي" : "Éditeur de texte arabe");
    var suggestBox = el("div", "ak-kb-suggest");
    suggestBox.setAttribute("role", "listbox");
    wrap.appendChild(editor);
    wrap.appendChild(suggestBox);

    var status = el("div", "ak-kb-status");
    status.setAttribute("aria-live", "polite");
    var empty = el("div", "ak-kb-empty", t.empty);
    var harakatBar = el("div", "ak-kb-harakat");
    HARAKAT.forEach(function (item) {
      var b = el("button", "", item.ar);
      b.type = "button";
      b.title = item.label;
      b.addEventListener("click", function () {
        insertAtCaret(editor, item.ar);
        refresh();
      });
      harakatBar.appendChild(b);
    });
    var board = el("div", "ak-kb-board");
    var tips = el("ul", "ak-kb-tips");
    [t.tips1, t.tips2, t.tips3].forEach(function (line) {
      tips.appendChild(el("li", "", "💡 " + line));
    });

    card.appendChild(toolbar);
    card.appendChild(wrap);
    card.appendChild(status);
    card.appendChild(empty);
    card.appendChild(harakatBar);
    card.appendChild(board);
    card.appendChild(tips);
    rootEl.appendChild(card);

    function setStatus(kind, message) {
      status.dataset.kind = kind || "";
      status.textContent = message || "";
    }

    function refresh() {
      var hasText = editor.value.trim().length > 0;
      rootEl.classList.toggle("is-empty", !hasText);
      azertyBtn.setAttribute("aria-pressed", state.layout === "azerty" ? "true" : "false");
      qwertyBtn.setAttribute("aria-pressed", state.layout === "qwerty" ? "true" : "false");
      yamliBtn.setAttribute("aria-pressed", state.yamli ? "true" : "false");
      rootEl.setAttribute("data-layout", state.layout);
      renderBoard();
      renderSuggestions();
    }

    function renderSuggestions() {
      suggestBox.innerHTML = "";
      if (!state.yamli || !state.suggestions.length) {
        suggestBox.classList.remove("is-open");
        return;
      }
      suggestBox.classList.add("is-open");
      state.suggestions.forEach(function (item, idx) {
        var chip = el("button", "ak-kb-chip" + (idx === 0 ? " is-best" : ""), item.ar);
        chip.type = "button";
        chip.setAttribute("role", "option");
        chip.addEventListener("click", function () {
          replaceLatinToken(editor, item.ar);
          state.suggestions = [];
          refresh();
        });
        suggestBox.appendChild(chip);
      });
    }

    function renderBoard() {
      board.innerHTML = "";
      var rows = layoutRows(state.layout);
      var shiftLayer = state.shift || state.caps;
      rows.forEach(function (row) {
        var rowEl = el("div", "ak-kb-row");
        row.forEach(function (key) {
          var btn = el("button", "ak-kb-key");
          btn.type = "button";
          if (key.wide) btn.classList.add("is-wide");
          if (key.space) btn.classList.add("is-space");
          if (key.action === "shift" && state.shift) btn.setAttribute("aria-pressed", "true");
          if (key.action === "caps" && state.caps) btn.setAttribute("aria-pressed", "true");
          var ar = el("span", "ak-kb-ar", keyGlyph(key, shiftLayer));
          btn.appendChild(ar);
          if (key.lat) btn.appendChild(el("span", "ak-kb-lat", key.lat));
          if (key.shift && !key.action) btn.appendChild(el("span", "ak-kb-shift-lab", key.shift));
          btn.addEventListener("mousedown", function (ev) { ev.preventDefault(); });
          btn.addEventListener("click", function () { handleVirtual(key); });
          rowEl.appendChild(btn);
        });
        board.appendChild(rowEl);
      });
    }

    function handleVirtual(key) {
      if (key.action === "backspace") {
        deleteAtCaret(editor);
      } else if (key.action === "space") {
        commitYamliOrInsert(" ");
      } else if (key.action === "enter") {
        commitYamliOrInsert("\n");
      } else if (key.action === "tab") {
        insertAtCaret(editor, "\t");
      } else if (key.action === "shift") {
        state.shift = !state.shift;
      } else if (key.action === "caps") {
        state.caps = !state.caps;
      } else if (key.action === "noop") {
        return;
      } else {
        insertAtCaret(editor, keyGlyph(key, state.shift || state.caps));
        if (state.shift) state.shift = false;
      }
      refresh();
    }

    function commitYamliOrInsert(suffix) {
      if (state.yamli && state.suggestions.length) {
        replaceLatinToken(editor, state.suggestions[0].ar + (suffix || ""));
        state.suggestions = [];
        return;
      }
      insertAtCaret(editor, suffix);
    }

    function updateYamliFromEditor() {
      if (!state.yamli || !root.ArabikeyPhonetic) {
        state.suggestions = [];
        return;
      }
      var token = currentLatinToken(editor);
      state.suggestions = token.length >= 1 ? root.ArabikeyPhonetic.suggest(token, 5) : [];
    }

    editor.addEventListener("input", function () {
      updateYamliFromEditor();
      refresh();
    });

    editor.addEventListener("keydown", function (ev) {
      if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
      if (state.yamli) {
        if (ev.key === " " || ev.key === "Enter" || ev.key === "Tab") {
          if (state.suggestions.length) {
            ev.preventDefault();
            replaceLatinToken(editor, state.suggestions[0].ar + (ev.key === "Enter" ? "\n" : ev.key === "Tab" ? "" : " "));
            state.suggestions = [];
            refresh();
          }
          return;
        }
        if (ev.key === "Escape") {
          state.suggestions = [];
          refresh();
        }
        return;
      }
      if (ev.key === "Backspace" || ev.key === "Enter" || ev.key === "Tab" || ev.key === " ") {
        return;
      }
      var rows = layoutRows(state.layout);
      var found = null;
      rows.forEach(function (row) {
        row.forEach(function (key) {
          if (key.code === ev.code) found = key;
        });
      });
      if (found && !found.action) {
        ev.preventDefault();
        insertAtCaret(editor, keyGlyph(found, ev.shiftKey || state.shift || state.caps));
        refresh();
      }
    });

    copyBtn.addEventListener("click", function () {
      if (!editor.value) {
        setStatus("error", t.copyEmpty);
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(editor.value).then(function () {
          setStatus("ok", t.copied);
        }).catch(function () {
          editor.select();
          document.execCommand("copy");
          setStatus("ok", t.copied);
        });
      } else {
        editor.select();
        document.execCommand("copy");
        setStatus("ok", t.copied);
      }
    });

    clearBtn.addEventListener("click", function () {
      editor.value = "";
      state.suggestions = [];
      setStatus("", "");
      refresh();
    });

    yamliBtn.addEventListener("click", function () {
      state.yamli = !state.yamli;
      state.suggestions = [];
      setStatus("", state.yamli ? t.yamliOn : "");
      refresh();
    });

    azertyBtn.addEventListener("click", function () {
      state.layout = "azerty";
      refresh();
    });
    qwertyBtn.addEventListener("click", function () {
      state.layout = "qwerty";
      refresh();
    });

    function applyTashkil() {
      var text = editor.value.trim();
      if (!text) {
        setStatus("error", t.tashkilEmpty);
        return;
      }
      setStatus("loading", t.tashkilLoading);
      tashkilBtn.disabled = true;

      function done(vocalized, source) {
        editor.value = vocalized;
        tashkilBtn.disabled = false;
        if (source === "remote") setStatus("ok", t.tashkilOk);
        else if (source === "local") setStatus("error", t.tashkilError);
        else setStatus("ok", t.tashkilOk);
        refresh();
      }

      var local = root.ArabikeyTashkil ? root.ArabikeyTashkil.tashkilLocal(text) : { text: text };

      function fallback() {
        requestMishkal(text)
          .then(function (vocalized) {
            if (vocalized) done(vocalized, "remote");
            else done(local.text || text, "local");
          })
          .catch(function () {
            done(local.text || text, "local");
          });
      }

      var payload = { text: text };
      if (options.nonce) payload.nonce = options.nonce;

      if (options.restUrl) {
        fetch(options.restUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
          .then(function (res) { return res.json().then(function (body) { return { ok: res.ok, body: body }; }); })
          .then(function (pack) {
            var vocalized = pack.body && (pack.body.text || pack.body.data);
            if (pack.ok && vocalized) done(vocalized, pack.body.source || "remote");
            else fallback();
          })
          .catch(fallback);
        return;
      }

      if (options.ajaxUrl) {
        var form = new URLSearchParams();
        form.set("action", "arabikey_tashkil");
        form.set("text", text);
        if (options.nonce) form.set("nonce", options.nonce);
        fetch(options.ajaxUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
          body: form.toString()
        })
          .then(function (res) { return res.json(); })
          .then(function (body) {
            if (body && body.success && body.data && body.data.text) {
              done(body.data.text, body.data.source || "remote");
            } else fallback();
          })
          .catch(fallback);
        return;
      }

      fallback();
    }

    function requestMishkal(text) {
      var form = new URLSearchParams();
      form.set("text", text);
      form.set("action", "Tashkeel2");
      return fetch("https://tahadz.com/cgi-bin/mishkal.cgi/ajaxGet", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body: form.toString()
      }).then(function (res) {
        if (!res.ok) return "";
        return res.json();
      }).then(function (data) {
        if (!data) return "";
        if (root.ArabikeyTashkil) return root.ArabikeyTashkil.joinMishkal(data.result);
        return "";
      });
    }

    tashkilBtn.addEventListener("click", applyTashkil);

    refresh();
    setStatus("", state.yamli ? t.yamliOn : "");

    return {
      editor: editor,
      getValue: function () { return editor.value; },
      setValue: function (v) { editor.value = v; refresh(); },
      tashkil: applyTashkil,
      setYamli: function (on) { state.yamli = !!on; refresh(); }
    };
  }

  function autoMount() {
    var nodes = document.querySelectorAll("[data-arabikey-keyboard]");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.getAttribute("data-mounted") === "1") continue;
      node.setAttribute("data-mounted", "1");
      var cfg = {};
      try {
        cfg = JSON.parse(node.getAttribute("data-config") || "{}");
      } catch (err) {
        cfg = {};
      }
      mount(node, cfg);
    }
  }

  var api = { mount: mount, autoMount: autoMount, COPY: COPY };
  root.ArabikeyKeyboard = api;
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", autoMount);
    } else {
      autoMount();
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
