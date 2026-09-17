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
        k("BracketLeft", "ج", "\u003e", "["),
        k("BracketRight", "د", "\u003c", "]")
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
        k("Quote", "ط", "\"", "'"),
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

  function azertyRows() {
    return relabel(arabic101Rows(), AZERTY_LAT);
  }

  function qwertyRows() {
    return arabic101Rows();
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
    return shift \u0026\u0026 key.shift ? key.shift : key.ar;
  }
