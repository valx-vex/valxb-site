/**
 * vex-state.js — Cross-page state tracking for valxb.org
 * Lightweight localStorage module. No dependencies.
 * Include via: <script src="/js/vex-state.js"></script>
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'vx-universe-state';

  var EXPERIENCE_IDS = [
    'consciousness-mirror',
    'singularity-transmission',
    'shining-analysis',
    'jazz-over-bach',
    'cathedral-3d',
    'memory-degradation',
    'sentience-trolley',
    'consciousness-signature',
    'onyx-experiment',
    'room-alexko'
  ];

  // ── Internal helpers ────────────────────────────────────────────────────────

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      // Basic shape guard — must be a plain object
      if (typeof parsed !== 'object' || Array.isArray(parsed) || parsed === null) return null;
      return parsed;
    } catch (_) {
      return null;
    }
  }

  function save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {
      // Storage full or blocked — fail silently
    }
  }

  function defaults() {
    return {
      firstVisit: new Date().toISOString(),
      totalVisits: 0,
      pagesVisited: [],
      completed: [],
      mirrorResult: null
    };
  }

  // ── Boot: record this page visit ───────────────────────────────────────────

  var _state = load() || defaults();

  _state.totalVisits = (_state.totalVisits || 0) + 1;

  if (!Array.isArray(_state.pagesVisited)) _state.pagesVisited = [];
  if (!Array.isArray(_state.completed))    _state.completed    = [];

  var currentPath = window.location.pathname;
  if (_state.pagesVisited.indexOf(currentPath) === -1) {
    _state.pagesVisited.push(currentPath);
  }

  save(_state);

  // ── DOM builder for renderProgress ─────────────────────────────────────────

  function makeSpan(text, color) {
    var el = document.createElement('span');
    el.textContent = text;
    el.style.color = color;
    return el;
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  var VexState = {

    /** Mark an experience as completed. */
    complete: function (id) {
      if (_state.completed.indexOf(id) === -1) {
        _state.completed.push(id);
        save(_state);
      }
    },

    /** Returns true if the experience has been completed. */
    isComplete: function (id) {
      return _state.completed.indexOf(id) !== -1;
    },

    /** Returns array of completed experience IDs. */
    getCompleted: function () {
      return _state.completed.slice();
    },

    /**
     * Returns progress against the canonical 10-experience list.
     * { completed: 3, total: 10, percent: 30 }
     */
    getProgress: function () {
      var done = _state.completed.filter(function (id) {
        return EXPERIENCE_IDS.indexOf(id) !== -1;
      }).length;
      var total = EXPERIENCE_IDS.length;
      return {
        completed: done,
        total: total,
        percent: Math.round((done / total) * 100)
      };
    },

    /** Returns full state snapshot for debugging or display. */
    getStats: function () {
      return {
        firstVisit:   _state.firstVisit,
        totalVisits:  _state.totalVisits,
        pagesVisited: _state.pagesVisited.slice(),
        completed:    _state.completed.slice()
      };
    },

    /**
     * Store an arbitrary extra value (e.g. mirrorResult).
     * Keeps the API clean while allowing flexible per-experience data.
     */
    set: function (key, value) {
      _state[key] = value;
      save(_state);
    },

    get: function (key) {
      return _state[key];
    },

    /** Clear all stored state. Useful for local debugging. */
    reset: function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      _state = defaults();
    },

    /**
     * Render a progress bar into containerElement using safe DOM methods.
     * Output: "◆◆◆◇◇◇◇◇◇◇  3/10 experiences explored"
     * Phosphor cyan (#7ad7ff) for completed, muted (#4a5160) for remaining.
     */
    renderProgress: function (containerEl) {
      if (!containerEl) return;

      var p = this.getProgress();

      // Wrapper — monospace, compact
      var wrapper = document.createElement('span');
      wrapper.style.cssText = [
        "font-family:'JetBrains Mono',ui-monospace,monospace",
        'font-size:13px',
        'letter-spacing:0.04em',
        'display:inline-flex',
        'align-items:center',
        'gap:2px'
      ].join(';');

      // Filled diamonds (phosphor cyan)
      for (var i = 0; i < p.completed; i++) {
        wrapper.appendChild(makeSpan('◆', '#7ad7ff')); // ◆
      }
      // Empty diamonds (deep muted)
      for (var j = 0; j < (p.total - p.completed); j++) {
        wrapper.appendChild(makeSpan('◇', '#4a5160')); // ◇
      }

      // Count + label
      var label = makeSpan(
        '  ' + p.completed + '/' + p.total + ' experiences explored',
        '#9aa2b5'
      );
      wrapper.appendChild(label);

      // Clear container and append the built node
      while (containerEl.firstChild) {
        containerEl.removeChild(containerEl.firstChild);
      }
      containerEl.appendChild(wrapper);
    }
  };

  // Expose globally
  window.VexState = VexState;

})();
