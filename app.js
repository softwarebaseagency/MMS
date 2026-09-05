(function () {
  'use strict';

  var members = [
    { id: 'MB-1048', name: 'Dilan Ahmed', initials: 'DA', plan: 'Annual VIP', branch: 'Erbil Central', status: 'Active', expiry: '18 Sep 2026', phone: '+964 750 123 4488', email: 'dilan.ahmed@example.com', balance: '$0.00', visits: 18 },
    { id: 'MB-1032', name: 'Shilan Omar', initials: 'SO', plan: 'Quarterly Plus', branch: 'Erbil Central', status: 'Due soon', expiry: '22 Sep 2026', phone: '+964 751 245 9012', email: 'shilan.omar@example.com', balance: '$85.00', visits: 12 },
    { id: 'MB-1019', name: 'Aram Hassan', initials: 'AH', plan: 'Monthly Standard', branch: 'Family Mall', status: 'Active', expiry: '04 Oct 2026', phone: '+964 770 880 1122', email: 'aram.hassan@example.com', balance: '$0.00', visits: 9 },
    { id: 'MB-1007', name: 'Narin Salim', initials: 'NS', plan: 'Student Flex', branch: 'Erbil Central', status: 'Expired', expiry: '29 Aug 2026', phone: '+964 750 654 7788', email: 'narin.salim@example.com', balance: '$120.00', visits: 3 },
    { id: 'MB-0994', name: 'Baran Karim', initials: 'BK', plan: 'Corporate Team', branch: 'Family Mall', status: 'Active', expiry: '12 Nov 2026', phone: '+964 751 990 3321', email: 'baran.karim@example.com', balance: '$0.00', visits: 22 }
  ];

  var navGroups = [
    { label: 'Workspace', items: [
      ['dashboard', 'Overview', 'grid'], ['members', 'Members', 'users'], ['memberships', 'Memberships', 'award'], ['leads', 'Leads & trials', 'inbox']
    ] },
    { label: 'Operations', items: [
      ['attendance', 'Attendance', 'calendarCheck'], ['payments', 'Sales & payments', 'wallet'], ['engagement', 'Engagement', 'trend'], ['calendar', 'Calendar & bookings', 'calendar']
    ] },
    { label: 'Growth', items: [
      ['offers', 'Offers & loyalty', 'tag'], ['reports', 'Reports & analytics', 'chartBar'], ['communications', 'Communications', 'message']
    ] },
    { label: 'Administration', items: [
      ['staff', 'Staff & permissions', 'briefcase'], ['branches', 'Branches & resources', 'building'], ['settings', 'Settings & policies', 'settings']
    ] }
  ];

  var main = document.getElementById('main');
  var nav = document.getElementById('nav');
  var toast = document.getElementById('toast');
  var modalRoot = document.getElementById('modalRoot');
  var activeView = 'dashboard';
  var toastTimer;

  function icon(name, size) { return window.Icon ? Icon(name, { size: size || 18 }) : ''; }
  function initials(name) { return name.split(' ').map(function (part) { return part.charAt(0); }).slice(0, 2).join(''); }
  function esc(value) { return String(value).replace(/[&<>"']/g, function (char) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]; }); }
  function statusClass(status) { return status.toLowerCase().replace(/\s+/g, '-'); }
  function statusPill(status) { return '<span class="status status--' + statusClass(status) + '">' + esc(status) + '</span>'; }
  function showToast(message) { clearTimeout(toastTimer); toast.textContent = message; toast.classList.add('is-visible'); toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2800); }

  function renderNav() {
    nav.innerHTML = navGroups.map(function (group) {
      return '<div class="nav-group">' + group.label + '</div>' + group.items.map(function (item) {
        var count = item[0] === 'members' ? '<span class="nav-count">1,248</span>' : '';
        return '<button class="nav-item ' + (activeView === item[0] ? 'is-active' : '') + '" data-view="' + item[0] + '" aria-current="' + (activeView === item[0] ? 'page' : 'false') + '">' + icon(item[2], 17) + '<span>' + item[1] + '</span>' + count + '</button>';
      }).join('');
    }).join('');
  }

  function pageHeader(eyebrow, title, lede, actions) {
    return '<div class="page-header"><div><span class="eyebrow">' + eyebrow + '</span><h1 class="page-title">' + title + '</h1><p class="page-lede">' + lede + '</p></div><div class="page-actions">' + (actions || '') + '</div></div>';
  }

  function demoNotice(text) {
    return '<div class="demo-notice">' + icon('info', 17) + '<span><strong>Demo environment.</strong> ' + text + ' No live messages, payments, device integrations, or data are sent.</span></div>';
  }

  function actionButton(label, action, primary) { return '<button class="btn ' + (primary ? 'btn-primary' : '') + '" type="button" data-action="' + action + '">' + (action === 'add-member' ? icon('plus', 15) : '') + label + '</button>'; }

  function kpi(label, value, note, delta, iconName, tone) {
    return '<article class="kpi-card"><div class="kpi-head"><span>' + label + '</span><span class="kpi-icon" style="color:' + (tone || 'var(--blue)') + ';background:#edf3ff">' + icon(iconName, 16) + '</span></div><div class="kpi-value">' + value + '</div><div class="kpi-foot"><span class="delta-up">' + delta + '</span><span>' + note + '</span></div></article>';
  }

  function lineChart() {
    var points = [[32,137],[110,111],[188,120],[266,86],[344,97],[422,61],[500,75],[578,42]];
    var line = points.map(function (point) { return point[0] + ',' + point[1]; }).join(' ');
    var area = '32,160 ' + line + ' 578,160';
    return '<div class="chart"><svg viewBox="0 0 610 180" role="img" aria-label="Member visits increased from 420 to 688 over the last eight weeks"><line class="chart-gridline" x1="32" y1="40" x2="578" y2="40"></line><line class="chart-gridline" x1="32" y1="80" x2="578" y2="80"></line><line class="chart-gridline" x1="32" y1="120" x2="578" y2="120"></line><line class="chart-gridline" x1="32" y1="160" x2="578" y2="160"></line><polygon class="chart-area" points="' + area + '"></polygon><polyline class="chart-line" points="' + line + '"></polyline>' + points.map(function (point) { return '<circle class="chart-dot" cx="' + point[0] + '" cy="' + point[1] + '" r="3.5"></circle>'; }).join('') + '<text class="chart-label" x="24" y="176">W1</text><text class="chart-label" x="178" y="176">W3</text><text class="chart-label" x="334" y="176">W5</text><text class="chart-label" x="570" y="176">W8</text></svg></div><div class="chart-legend"><span><i class="legend-dot"></i> Visits</span><span><i class="legend-dot orange"></i> New check-ins</span></div>';
  }

  function activityList() {
    var items = [
      ['checkCircle', 'Membership renewed', 'Dilan Ahmed renewed Annual VIP', '8 min ago'],
      ['user', 'New member registered', 'Mina Salih joined Student Flex', '24 min ago'],
      ['wallet', 'Payment received', 'Invoice INV-2084 marked paid', '1 hr ago'],
      ['message', 'Follow-up completed', 'Shilan Omar contacted by Sarah A.', '2 hrs ago']
    ];
    return items.map(function (item) { return '<div class="activity-row"><span class="activity-icon">' + icon(item[0], 15) + '</span><div class="row-copy"><strong>' + item[1] + '</strong><small>' + item[2] + '</small></div><span class="time-label">' + item[3] + '</span></div>'; }).join('');
  }

  function renewalList() {
    return members.slice(0, 4).map(function (member) {
      return '<div class="renewal-row"><span class="avatar">' + member.initials + '</span><div class="row-copy"><strong>' + member.name + '</strong><div class="renewal-meta">' + statusPill(member.status) + '<span class="renewal-date">' + member.expiry + '</span></div></div><span class="amount">' + (member.balance === '$0.00' ? '$240' : member.balance) + '</span></div>';
    }).join('');
  }

  function dashboardView() {
    return pageHeader('Workspace / overview', 'Good morning, Sarah', 'A single operating view for members, revenue, attendance, and retention across your branches.', actionButton('Add member', 'add-member', true) + actionButton('Export report', 'export')) + demoNotice('Sample member records and analytics are shown to demonstrate the workflow.') + '<section class="kpi-grid">' + kpi('Total members', '1,248', 'vs last month', '+8.4%', 'users') + kpi('Active memberships', '1,086', 'of total members', '+5.2%', 'award', 'var(--green)') + kpi('Revenue this month', '$42,680', 'vs last month', '+12.8%', 'wallet', 'var(--gold)') + kpi('At-risk members', '64', 'need follow-up', '-6.1%', 'alert', 'var(--red)') + '</section><section class="content-grid"><article class="card"><div class="card-header"><div><h2 class="card-title">Member activity</h2><p class="card-subtitle">Visits and check-ins over the last 8 weeks</p></div><button class="text-button" type="button" data-view="attendance">View attendance ' + icon('arrowRight', 13) + '</button></div><div class="chart-wrap">' + lineChart() + '</div></article><article class="card"><div class="card-header"><div><h2 class="card-title">Upcoming renewals</h2><p class="card-subtitle">Members to contact in the next 14 days</p></div><button class="text-button" type="button" data-view="memberships">See all</button></div><div class="renewal-list">' + renewalList() + '</div></article></section><section class="content-grid"><article class="card"><div class="card-header"><div><h2 class="card-title">Recent activity</h2><p class="card-subtitle">A live-style audit stream for staff actions</p></div><button class="text-button" type="button" data-view="communications">Activity log ' + icon('arrowRight', 13) + '</button></div><div class="activity-list">' + activityList() + '</div></article><article class="card"><div class="card-header"><div><h2 class="card-title">Quick actions</h2><p class="card-subtitle">Common tasks for the front desk</p></div></div><div class="quick-grid"><button class="quick-action" type="button" data-action="check-in">' + icon('scan', 17) + '<span>Check in member</span></button><button class="quick-action" type="button" data-action="add-payment">' + icon('receipt', 17) + '<span>Record payment</span></button><button class="quick-action" type="button" data-action="send-reminder">' + icon('message', 17) + '<span>Send reminder</span></button><button class="quick-action" type="button" data-view="reports">' + icon('chartBar', 17) + '<span>Open reports</span></button><button class="quick-action" type="button" data-view="calendar">' + icon('calendar', 17) + '<span>Book a session</span></button><button class="quick-action" type="button" data-view="offers">' + icon('tag', 17) + '<span>Create an offer</span></button></div></article></section>';
  }

  function memberRows(query) {
    var filtered = members.filter(function (member) { var haystack = (member.name + ' ' + member.id + ' ' + member.plan + ' ' + member.branch + ' ' + member.status).toLowerCase(); return !query || haystack.indexOf(query.toLowerCase()) > -1; });
    if (!filtered.length) return '<tr><td colspan="6"><div class="empty-state">' + icon('search', 32) + '<strong>No member matches this search</strong><span>Try a name, ID, plan, branch, or status.</span></div></td></tr>';
    return filtered.map(function (member) { return '<tr data-member-id="' + member.id + '"><td><div class="member-cell"><span class="avatar">' + member.initials + '</span><span><strong>' + member.name + '</strong><small>' + member.id + '</small></span></div></td><td>' + member.plan + '</td><td>' + member.branch + '</td><td>' + statusPill(member.status) + '</td><td>' + member.expiry + '</td><td>' + member.balance + '</td></tr>'; }).join('');
  }

  function membersView() {
    return pageHeader('Workspace / members', 'Members', 'Search profiles, review status, balances, attendance, documents, and communication history.', actionButton('Add member', 'add-member', true) + actionButton('Import CSV', 'import')) + demoNotice('The member list covers registration, profiles, segmentation, status tracking, custom fields, documents, and privacy controls as demo surfaces.') + '<article class="card"><div class="card-header"><div><h2 class="card-title">Member directory</h2><p class="card-subtitle">1,248 records across 2 branches</p></div><button class="text-button" type="button" data-action="export">Export list ' + icon('download', 13) + '</button></div><div class="filter-bar"><input id="memberSearch" type="search" placeholder="Search name, member ID, plan, branch..." aria-label="Search members"><select><option>All statuses</option><option>Active</option><option>Due soon</option><option>Expired</option></select><select><option>All plans</option><option>Annual VIP</option><option>Quarterly Plus</option><option>Student Flex</option></select><button class="btn" type="button" data-demo="Advanced filters">' + icon('filter', 14) + ' Filters</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Member</th><th>Plan</th><th>Branch</th><th>Status</th><th>Expiry</th><th>Balance</th></tr></thead><tbody id="memberTableBody">' + memberRows('') + '</tbody></table></div></article>';
  }

  var moduleCopy = {
    memberships: ['Workspace / memberships', 'Memberships & subscriptions', 'Manage plans, renewals, freezes, upgrades, transfers, cancellations, trials, and family or corporate accounts.', 'Create membership plan'],
    leads: ['Workspace / pipeline', 'Leads & trial memberships', 'Track inquiries, sources, assigned sales staff, follow-ups, trial access, and conversion performance.', 'Add lead'],
    attendance: ['Operations / access', 'Attendance & access', 'Review check-ins, visit history, access results, attendance trends, capacity, and device integrations.', 'Record check-in'],
    payments: ['Operations / finance', 'Sales & payments', 'Track payments, invoices, receipts, refunds, discounts, penalties, add-ons, products, and payment methods.', 'Record payment'],
    engagement: ['Operations / retention', 'Engagement & retention', 'Prioritize inactive members, expiring plans, unpaid balances, cancellation risk, feedback, and retention offers.', 'Create follow-up'],
    calendar: ['Operations / scheduling', 'Calendar & bookings', 'Coordinate sessions, appointments, staff schedules, waiting lists, events, capacity, and resource availability.', 'Book session'],
    offers: ['Growth / campaigns', 'Offers, referrals & loyalty', 'Create targeted deals, referral rewards, loyalty levels, vouchers, promotions, and performance reports.', 'Create offer'],
    reports: ['Growth / intelligence', 'Reports & analytics', 'Explore membership growth, revenue, renewals, cancellations, attendance, staff performance, and lead conversion.', 'Build report'],
    communications: ['Growth / follow-up', 'Communications & workflows', 'Plan SMS, WhatsApp, email, announcements, surveys, automated reminders, tasks, and communication history.', 'Create workflow'],
    staff: ['Administration / control', 'Staff & permissions', 'Manage roles, departments, tasks, activity history, access rights, privacy controls, and audit logs.', 'Invite staff'],
    branches: ['Administration / network', 'Branches & resources', 'Manage locations, branch transfers, inventory, cards, capacity, access devices, and shared reporting.', 'Add branch'],
    settings: ['Administration / policy', 'Settings & policies', 'Configure custom fields, rules, refunds, freezes, cancellations, privacy, backups, archives, and member portal settings.', 'Open settings']
  };

  function moduleView(view) {
    var copy = moduleCopy[view];
    var actions = actionButton(copy[3], 'module-action', true) + actionButton('Export view', 'export');
    var rows = view === 'payments' ? '<tr><td><div class="member-cell"><span class="avatar">DA</span><span><strong>INV-2084</strong><small>Dilan Ahmed</small></span></div></td><td>Annual VIP renewal</td><td>Card</td><td>' + statusPill('Paid') + '</td><td>05 Sep 2026</td><td>$240.00</td></tr><tr><td><div class="member-cell"><span class="avatar">SO</span><span><strong>INV-2081</strong><small>Shilan Omar</small></span></div></td><td>Quarterly Plus</td><td>Cash</td><td>' + statusPill('Pending') + '</td><td>04 Sep 2026</td><td>$85.00</td></tr>' : '<tr><td><div class="member-cell"><span class="avatar">DA</span><span><strong>Dilan Ahmed</strong><small>MB-1048</small></span></div></td><td>' + (view === 'attendance' ? 'Erbil Central / 09:14' : view === 'offers' ? 'Renewal reward 10%' : 'Annual VIP') + '</td><td>' + (view === 'attendance' ? 'Front desk' : 'Sarah A.') + '</td><td>' + statusPill(view === 'engagement' ? 'At risk' : view === 'leads' ? 'Trial' : 'Active') + '</td><td>Today</td><td><button class="text-button" type="button" data-action="module-detail">Open ' + icon('arrowRight', 12) + '</button></td></tr><tr><td><div class="member-cell"><span class="avatar">SO</span><span><strong>Shilan Omar</strong><small>MB-1032</small></span></div></td><td>' + (view === 'attendance' ? 'Family Mall / 18:42' : view === 'offers' ? 'Win-back campaign' : 'Quarterly Plus') + '</td><td>' + (view === 'attendance' ? 'QR scan' : 'Assigned team') + '</td><td>' + statusPill(view === 'engagement' ? 'Due soon' : 'Pending') + '</td><td>Tomorrow</td><td><button class="text-button" type="button" data-action="module-detail">Open ' + icon('arrowRight', 12) + '</button></td></tr>';
    return pageHeader(copy[0], copy[1], copy[2], actions) + demoNotice('This module is a representative demo surface. Complex integrations such as hardware access, payment gateways, messaging providers, digital signatures, backups, and automated jobs require a production backend.') + '<section class="kpi-grid">' + kpi('Items in view', view === 'reports' ? '18' : '248', 'sample records', '+4.2%', 'layers') + kpi('Needs attention', view === 'engagement' ? '64' : '12', 'assigned today', '-8.1%', 'alert', 'var(--red)') + kpi('Completion rate', '86%', 'this period', '+6.7%', 'checkCircle', 'var(--green)') + kpi('Projected value', '$18,420', 'current pipeline', '+11.4%', 'trend', 'var(--gold)') + '</section><article class="card"><div class="card-header"><div><h2 class="card-title">' + (view === 'reports' ? 'Saved reports and analytics' : 'Operational queue') + '</h2><p class="card-subtitle">A focused sample of the records and actions this module would support</p></div><button class="text-button" type="button" data-demo="Advanced module filters">Advanced filters ' + icon('filter', 13) + '</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Record</th><th>Context</th><th>Owner / method</th><th>Status</th><th>Due</th><th>Action</th></tr></thead><tbody>' + rows + '</tbody></table></div></article>';
  }

  function render(view) {
    activeView = view || 'dashboard';
    renderNav();
    main.innerHTML = '<div class="module-view">' + (activeView === 'dashboard' ? dashboardView() : activeView === 'members' ? membersView() : moduleView(activeView)) + '</div>';
    window.scrollTo(0, 0);
  }

  function openMember(member) {
    var backdrop = document.createElement('div'); backdrop.className = 'detail-panel-backdrop is-open';
    var panel = document.createElement('aside'); panel.className = 'detail-panel is-open'; panel.setAttribute('aria-label', 'Member profile');
    panel.innerHTML = '<div class="detail-panel-header"><div><span class="eyebrow">Member profile</span><h2 class="page-title">' + member.name + '</h2></div><button class="icon-button" type="button" data-close-panel aria-label="Close profile">×</button></div><div class="detail-panel-body"><div class="detail-person"><span class="avatar">' + member.initials + '</span><div><strong>' + member.id + '</strong><div>' + statusPill(member.status) + '</div></div></div><div class="detail-section"><h3>Membership</h3><dl class="detail-fields"><div><dt>Assigned plan</dt><dd>' + member.plan + '</dd></div><div><dt>Expiry date</dt><dd>' + member.expiry + '</dd></div><div><dt>Branch</dt><dd>' + member.branch + '</dd></div><div><dt>Visits this month</dt><dd>' + member.visits + '</dd></div></dl></div><div class="detail-section"><h3>Contact details</h3><dl class="detail-fields"><div><dt>Phone</dt><dd>' + member.phone + '</dd></div><div><dt>Email</dt><dd>' + member.email + '</dd></div><div><dt>Open balance</dt><dd>' + member.balance + '</dd></div><div><dt>Consent</dt><dd>Marketing opted in</dd></div></dl></div><div class="detail-section"><h3>Profile activity</h3><div class="activity-list"><div class="activity-row"><span class="activity-icon">' + icon('calendarCheck', 15) + '</span><div class="row-copy"><strong>Last check-in</strong><small>Today at 09:14 · Erbil Central</small></div></div><div class="activity-row"><span class="activity-icon">' + icon('fileCheck', 15) + '</span><div class="row-copy"><strong>Agreement signed</strong><small>Membership agreement · 12 Aug 2026</small></div></div></div></div><button class="btn btn-primary" type="button" data-demo="Edit member profile">Edit member profile</button></div>';
    document.body.appendChild(backdrop); document.body.appendChild(panel);
    function close() { backdrop.remove(); panel.remove(); }
    backdrop.addEventListener('click', close); panel.addEventListener('click', function (event) { if (event.target.closest('[data-close-panel]')) close(); if (event.target.closest('[data-demo]')) showToast('Demo action: this would open the live member workflow.'); });
  }

  function openAddMember() {
    modalRoot.innerHTML = '<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="addMemberTitle"><div class="modal-header"><div><span class="eyebrow">Registration</span><h2 id="addMemberTitle">Add a new member</h2></div><button class="icon-button" type="button" data-close-modal aria-label="Close">×</button></div><div class="modal-body"><div class="form-grid"><div class="form-field"><label for="memberName">Full name</label><input id="memberName" placeholder="e.g. Lana Ahmed"></div><div class="form-field"><label for="memberPhone">Phone number</label><input id="memberPhone" placeholder="+964 750 000 0000"></div><div class="form-field"><label for="memberEmail">Email address</label><input id="memberEmail" type="email" placeholder="name@example.com"></div><div class="form-field"><label for="memberPlan">Membership plan</label><select id="memberPlan"><option>Monthly Standard</option><option>Quarterly Plus</option><option>Annual VIP</option><option>Student Flex</option><option>Corporate Team</option></select></div><div class="form-field"><label for="memberDob">Date of birth</label><input id="memberDob" type="date"></div><div class="form-field"><label for="memberJoinDate">Joining date</label><input id="memberJoinDate" type="date" value="2026-09-05"></div><div class="form-field form-field--wide"><label for="memberAddress">Address</label><input id="memberAddress" placeholder="Street, area, city"></div><div class="form-field form-field--wide"><label for="memberEmergency">Emergency contact</label><input id="memberEmergency" placeholder="Name and phone number"></div></div></div><div class="modal-footer"><button class="btn" type="button" data-close-modal>Cancel</button><button class="btn btn-primary" type="button" data-save-member>Register member</button></div></section></div>';
  }

  document.addEventListener('click', function (event) {
    var viewButton = event.target.closest('[data-view]');
    if (viewButton) { render(viewButton.getAttribute('data-view')); return; }
    var action = event.target.closest('[data-action]');
    if (action) {
      var actionName = action.getAttribute('data-action');
      if (actionName === 'add-member') openAddMember();
      else if (actionName === 'export') showToast('Demo export queued: a CSV or PDF would download here.');
      else if (actionName === 'check-in') showToast('Demo check-in recorded for the selected member.');
      else if (actionName === 'add-payment') showToast('Demo payment form opened. No payment was processed.');
      else if (actionName === 'send-reminder') showToast('Demo reminder prepared for 64 at-risk members.');
      else if (actionName === 'import') showToast('Demo import: choose a CSV file in the production workflow.');
      else if (actionName === 'module-action') showToast('Demo action: this workflow is ready for backend integration.');
      else showToast('Demo action: this would open the detailed workflow.');
      return;
    }
    var demo = event.target.closest('[data-demo]');
    if (demo) { showToast('Demo action: ' + demo.getAttribute('data-demo') + ' is represented here.'); return; }
    var memberRow = event.target.closest('[data-member-id]');
    if (memberRow) { var member = members.filter(function (item) { return item.id === memberRow.getAttribute('data-member-id'); })[0]; if (member) openMember(member); }
    if (event.target.closest('[data-close-modal]')) modalRoot.innerHTML = '';
    if (event.target.closest('[data-save-member]')) { modalRoot.innerHTML = ''; showToast('Demo member registered. The record would now be saved to the member directory.'); }
  });

  document.addEventListener('input', function (event) { if (event.target.id === 'memberSearch') { document.getElementById('memberTableBody').innerHTML = memberRows(event.target.value.trim()); } });
  document.getElementById('globalSearch').addEventListener('keydown', function (event) { if (event.key === 'Enter') { render('members'); var memberSearch = document.getElementById('memberSearch'); memberSearch.value = event.target.value; memberSearch.dispatchEvent(new Event('input')); } });
  document.getElementById('menuToggle').addEventListener('click', function () { document.getElementById('sidebar').classList.toggle('is-open'); });
  document.getElementById('notificationButton').addEventListener('click', function () { showToast('4 demo notifications: renewals, payments, and follow-ups.'); });
  render('dashboard');
})();
