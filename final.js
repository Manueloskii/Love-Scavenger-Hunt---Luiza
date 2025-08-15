(() => {
  // Target moment: Feb 14, 2025 18:41 PT (Pacific Time)
  // We'll compute using the America/Los_Angeles time zone.
  const target = new Date('2025-02-14T18:41:00-08:00'); // PT offset around Feb is -08:00

  const els = {
    years: document.getElementById('years'),
    months: document.getElementById('months'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };

  function pad(n) { return n.toString(); }

  function diffBreakdown(from, to) {
    // Compute an exact Y/M/D/H/M/S breakdown by incrementing from target.
    // from <= to otherwise return zeros
    if (to < from) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

    let y = 0, m = 0, d = 0;
    const cursor = new Date(from.getTime());

    // Years
    while (true) {
      const test = new Date(cursor.getTime());
      test.setFullYear(test.getFullYear() + 1);
      if (test <= to) { cursor.setFullYear(cursor.getFullYear() + 1); y++; } else break;
    }

    // Months
    while (true) {
      const test = new Date(cursor.getTime());
      test.setMonth(test.getMonth() + 1);
      if (test <= to) { cursor.setMonth(cursor.getMonth() + 1); m++; } else break;
    }

    // Days
    while (true) {
      const test = new Date(cursor.getTime());
      test.setDate(test.getDate() + 1);
      if (test <= to) { cursor.setDate(cursor.getDate() + 1); d++; } else break;
    }

    const totalMs = to - cursor;
    const s = Math.floor(totalMs / 1000) % 60;
    const min = Math.floor(totalMs / (1000 * 60)) % 60;
    const h = Math.floor(totalMs / (1000 * 60 * 60)) % 24;

    return { years: y, months: m, days: d, hours: h, minutes: min, seconds: s };
  }

  function tick() {
    const now = new Date();
    const breakdown = diffBreakdown(target, now);
    els.years.textContent = pad(breakdown.years);
    els.months.textContent = pad(breakdown.months);
    els.days.textContent = pad(breakdown.days);
    els.hours.textContent = pad(breakdown.hours);
    els.minutes.textContent = pad(breakdown.minutes);
    els.seconds.textContent = pad(breakdown.seconds);
  }

  setInterval(tick, 1000);
  tick();
})();


