/* Self-contained SVG icon set for deployment. */
(function (global) {
  'use strict';

  var paths = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    inbox: '<path d="M4 13h4l1.5 3h5L16 13h4"/><path d="M5.4 4.6h13.2a2 2 0 0 1 1.9 1.4L22 13v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5L3.5 6a2 2 0 0 1 1.9-1.4Z"/>',
    calendarCheck: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M8 3v4M16 3v4M3 10h18"/><path d="m9.5 15.5 1.8 1.8 3.4-3.6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.3l3.4 2"/>',
    award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.6 13.6-1.4 7 4.8-2.6 4.8 2.6-1.4-7"/>',
    wallet: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a2 2 0 0 1 2 2v1"/><rect x="3" y="7.5" width="18" height="12.5" rx="2.5"/><circle cx="16.5" cy="13.8" r="1.3"/>',
    briefcase: '<rect x="2.5" y="7" width="19" height="13" rx="2.5"/><path d="M8.5 7V5.4A1.9 1.9 0 0 1 10.4 3.5h3.2a1.9 1.9 0 0 1 1.9 1.9V7"/><path d="M2.5 12.5h19"/>',
    chartBar: '<path d="M3 20.5h18"/><rect x="4.5" y="11" width="4" height="7" rx="1"/><rect x="10" y="6.5" width="4" height="11.5" rx="1"/><rect x="15.5" y="14" width="4" height="4" rx="1"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',
    bell: '<path d="M18 8.5a6 6 0 1 0-12 0c0 5.2-2 6.5-2 6.5h16s-2-1.3-2-6.5Z"/><path d="M13.7 19a2 2 0 0 1-3.4 0"/>',
    arrowRight: '<path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5"/>',
    plus: '<path d="M12 5.5v13M5.5 12h13"/>',
    check: '<path d="m5 12.5 4.6 4.6L19 7.5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.2 12.3 2.6 2.6 5-5.2"/>',
    alert: '<path d="M12 3.8 21 19.5H3z"/><path d="M12 9.8v4M12 16.6v.1"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.8v.1"/>',
    shield: '<path d="M12 3 20 6v5.6c0 4.7-3.3 8-8 9.4-4.7-1.4-8-4.7-8-9.4V6z"/><path d="m9 12 2.2 2.2L15.2 10"/>',
    eye: '<path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.9"/>',
    download: '<path d="M12 3.8v11M7.8 10.6 12 14.8l4.2-4.2"/><path d="M4.5 16.5v2A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.5-2.5v-2"/>',
    filter: '<path d="M3.5 5.5h17l-6.6 7.6v5.6l-3.8 2v-7.6z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 14.4a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1v.3a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-2.8-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7h-.3a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.1-2.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1v-.3a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 2.8 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.3a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.4 1Z"/>',
    users: '<circle cx="9.2" cy="8.6" r="3.4"/><path d="M2.8 19.5a6.4 6.4 0 0 1 12.8 0"/><path d="M16.4 5.6a3.4 3.4 0 0 1 0 6.6M17.6 14.4a6.4 6.4 0 0 1 3.6 5.1"/>',
    user: '<circle cx="12" cy="8.4" r="3.8"/><path d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0"/>',
    fileCheck: '<path d="M13.5 3.5H7A2.5 2.5 0 0 0 4.5 6v12A2.5 2.5 0 0 0 7 20.5h10a2.5 2.5 0 0 0 2.5-2.5V9.5z"/><path d="M13.5 3.5v6h6"/><path d="m9 15.2 1.8 1.8 3.4-3.6"/>',
    receipt: '<path d="M5 3.5h14v17l-2.3-1.4-2.4 1.4-2.3-1.4-2.4 1.4L7.3 19 5 20.5z"/><path d="M9 8.5h6M9 12.5h6"/>',
    message: '<path d="M20.5 11.4a7.7 7.7 0 0 1-8.3 7.7 8.8 8.8 0 0 1-3.2-.7L3.5 20l1.6-5.2a7.7 7.7 0 0 1-.6-3.1 7.7 7.7 0 0 1 8.2-7.7 7.7 7.7 0 0 1 7.8 7.4Z"/>',
    trend: '<path d="M3 16.5 9 10l4 4 8-8.5"/><path d="M15.5 5.5H21v5.5"/>',
    layers: '<path d="m12 3 9 4.6-9 4.6-9-4.6z"/><path d="m3 12.4 9 4.6 9-4.6M3 16.9l9 4.6 9-4.6"/>',
    building: '<rect x="4" y="3" width="12" height="18" rx="1.6"/><path d="M16 9h3.2A1.8 1.8 0 0 1 21 10.8V21"/><path d="M8 7h4M8 11h4M8 15h4M16 13h2M16 17h2"/><path d="M3 21h18"/>',
    history: '<path d="M3.6 9.6A9 9 0 1 1 3 12"/><path d="M3.2 4.5v5.2h5.2"/><path d="M12 7.5V12l3.2 1.9"/>',
    sparkle: '<path d="m12 3 1.9 5.4L19.5 10l-5.6 1.6L12 17l-1.9-5.4L4.5 10l5.6-1.6z"/><path d="m18.5 16 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
    scan: '<path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16"/><path d="M3 12h18"/>',
    boxes: '<rect x="2.5" y="12" width="8.5" height="8.5" rx="1.5"/><rect x="13" y="12" width="8.5" height="8.5" rx="1.5"/><rect x="7.7" y="3.5" width="8.5" height="8.5" rx="1.5"/>',
    tag: '<path d="M11.6 3.5H20a.5.5 0 0 1 .5.5v8.4a2 2 0 0 1-.6 1.4l-6.2 6.2a1.6 1.6 0 0 1-2.3 0l-7.4-7.4a1.6 1.6 0 0 1 0-2.3l6.2-6.2a2 2 0 0 1 1.4-.6Z"/><circle cx="16.4" cy="7.6" r="1.5"/>',
    gift: '<rect x="3" y="8.5" width="18" height="4" rx="1"/><path d="M4.5 12.5v7A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5v-7M12 8.5V21"/><path d="M12 8.5S10.4 3 7.8 3a2.4 2.4 0 0 0 0 5.5zM12 8.5S13.6 3 16.2 3a2.4 2.4 0 0 1 0 5.5z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    pause: '<rect x="6.5" y="4" width="4" height="16" rx="1.4"/><rect x="13.5" y="4" width="4" height="16" rx="1.4"/>',
    refresh: '<path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1"/><path d="M20.5 4v5h-5"/>',
    branch: '<path d="M3 21V8.5L10 4v17"/><path d="M10 9.5 21 6v15"/><path d="M2 21h20"/><path d="M6 12h1M6 16h1M14 11h1M14 15h1M17.5 11h1M17.5 15h1"/>',
    database: '<ellipse cx="12" cy="5.8" rx="8" ry="3"/><path d="M4 5.8v12.4c0 1.7 3.6 3 8 3s8-1.3 8-3V5.8"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    clipboard: '<rect x="4.5" y="4.5" width="15" height="16" rx="2"/><path d="M9 4.5V3.6A1.6 1.6 0 0 1 10.6 2h2.8A1.6 1.6 0 0 1 15 3.6v.9z"/><path d="M8.5 11h7M8.5 15h4"/>',
    dot: '<circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none"/>'
  };

  function icon(name, options) {
    options = options || {};
    var size = options.size || 24;
    var body = paths[name] || paths.dot;
    var accessibility = options.label
      ? ' role="img" aria-label="' + String(options.label).replace(/"/g, '&quot;') + '"'
      : ' aria-hidden="true" focusable="false"';

    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"' + accessibility + '>' + body + '</svg>';
  }

  icon.has = function (name) {
    return Object.prototype.hasOwnProperty.call(paths, name);
  };

  global.Icon = icon;
})(window);
