// Dashboard functionality for client and staff (localStorage-backed)
(function () {
  const dashboard = document.body?.dataset.dashboard;
  if (!dashboard) return;

  const key = (name) => `inksavvy.${dashboard}.${name}`;
  const sharedKey = (name) => `inksavvy.shared.${name}`;
  const init = (name, fallback) => {
    const raw = localStorage.getItem(key(name));
    if (!raw) {
      localStorage.setItem(key(name), JSON.stringify(fallback));
      return fallback;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      localStorage.setItem(key(name), JSON.stringify(fallback));
      return fallback;
    }
  };
  const save = (name, value) => localStorage.setItem(key(name), JSON.stringify(value));
  const nowStamp = () => new Date().toLocaleString();
  const initShared = (name, fallback) => {
    const raw = localStorage.getItem(sharedKey(name));
    if (!raw) {
      localStorage.setItem(sharedKey(name), JSON.stringify(fallback));
      return fallback;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      localStorage.setItem(sharedKey(name), JSON.stringify(fallback));
      return fallback;
    }
  };
  const saveShared = (name, value) => localStorage.setItem(sharedKey(name), JSON.stringify(value));

  if (dashboard === 'client') {
    const supabase = window.supabaseClient;
    const messages = init('messages', [
      { sender: 'INKSAVVY', project: 'Brand clarity audit', text: 'Messaging brief is ready for review.', time: nowStamp() },
    ]);
    const files = init('files', [
      { name: 'brand-brief.pdf', date: nowStamp() },
    ]);
    const invoices = init('invoices', [
      { id: 'INV-1023', amount: '$2,500', status: 'Due' },
      { id: 'INV-1011', amount: '$1,200', status: 'Paid' },
    ]);
    const questionnaires = init('questionnaires', [
      { title: 'Brand discovery', status: 'Pending' },
      { title: 'Audience profile', status: 'Pending' },
    ]);
    const schedule = init('schedule', []);
    const appointments = init('appointments', []);
    const tickets = init('tickets', []);
    const contract = init('contract', { signed: false });
    const staging = init('staging', { link: '', generated: false });

    const renderMessages = () => {
      const feed = document.getElementById('client-message-feed');
      if (!feed) return;
      feed.innerHTML = '';
      messages.forEach((msg) => {
        const item = document.createElement('div');
        item.className = 'message';
        const meta = document.createElement('div');
        meta.className = 'message-meta';
        meta.textContent = `${msg.sender} • ${msg.project} • ${msg.time}`;
        const body = document.createElement('div');
        body.className = 'message-text';
        body.textContent = msg.text;
        item.append(meta, body);
        feed.appendChild(item);
      });
    };

    const renderFiles = () => {
      const list = document.getElementById('client-file-list');
      if (!list) return;
      list.innerHTML = '';
      files.forEach((file) => {
        const li = document.createElement('li');
        li.textContent = `${file.name} — ${file.date}`;
        list.appendChild(li);
      });
    };

    const renderInvoices = () => {
      const body = document.getElementById('client-invoice-body');
      if (!body) return;
      body.innerHTML = '';
      invoices.forEach((inv, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${inv.id}</td>
          <td>${inv.amount}</td>
          <td><span class="badge">${inv.status}</span></td>
          <td></td>
        `;
        const actionCell = tr.querySelector('td:last-child');
        const btn = document.createElement('button');
        btn.className = 'btn btn-ghost btn-sm';
        btn.textContent = inv.status === 'Paid' ? 'Paid' : 'Pay invoice';
        btn.disabled = inv.status === 'Paid';
        btn.addEventListener('click', () => {
          invoices[idx].status = 'Paid';
          save('invoices', invoices);
          renderInvoices();
        });
        actionCell.appendChild(btn);
        body.appendChild(tr);
      });
    };

    const renderQuestionnaires = () => {
      const body = document.getElementById('client-questionnaire-body');
      if (!body) return;
      body.innerHTML = '';
      questionnaires.forEach((q, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${q.title}</td>
          <td><span class="badge">${q.status}</span></td>
          <td></td>
        `;
        const actionCell = tr.querySelector('td:last-child');
        const btn = document.createElement('button');
        btn.className = 'btn btn-ghost btn-sm';
        btn.textContent = q.status === 'Completed' ? 'Completed' : 'Complete';
        btn.disabled = q.status === 'Completed';
        btn.addEventListener('click', () => {
          questionnaires[idx].status = 'Completed';
          save('questionnaires', questionnaires);
          renderQuestionnaires();
        });
        actionCell.appendChild(btn);
        body.appendChild(tr);
      });
    };

    const renderSchedule = () => {
      const list = document.getElementById('client-schedule-list');
      if (!list) return;
      list.innerHTML = '';
      schedule.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.title} — ${item.channel} — ${item.date} ${item.time}`;
        list.appendChild(li);
      });
    };

    const renderAppointments = () => {
      const list = document.getElementById('client-appointment-list');
      if (!list) return;
      list.innerHTML = '';
      appointments.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.date} ${item.time} — ${item.topic}`;
        list.appendChild(li);
      });
    };

    const renderTickets = () => {
      const list = document.getElementById('client-ticket-list');
      if (!list) return;
      list.innerHTML = '';
      tickets.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.subject} — ${item.priority} — ${item.status}`;
        list.appendChild(li);
      });
    };

    const renderContract = () => {
      const status = document.getElementById('client-contract-status');
      const btn = document.getElementById('client-contract-toggle');
      if (!status || !btn) return;
      status.textContent = contract.signed ? 'Status: Signed' : 'Status: Pending signature';
      btn.textContent = contract.signed ? 'Signed' : 'Sign agreement';
      btn.disabled = contract.signed;
    };

    const renderStaging = () => {
      const status = document.getElementById('client-staging-status');
      const link = document.getElementById('client-staging-link');
      if (!status || !link) return;
      status.textContent = staging.generated ? 'Preview link active.' : 'No preview link generated yet.';
      link.textContent = staging.generated ? staging.link : '';
    };

    renderMessages();
    renderFiles();
    renderInvoices();
    renderQuestionnaires();
    renderSchedule();
    renderAppointments();
    renderTickets();
    renderContract();
    renderStaging();

    const messageForm = document.getElementById('client-message-form');
    if (messageForm) {
      messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const sender = document.getElementById('client-message-sender');
        const project = document.getElementById('client-message-project');
        const text = document.getElementById('client-message-text');
        if (!text.value.trim()) return;
        messages.unshift({
          sender: sender.value || 'Client',
          project: project.value || 'General',
          text: text.value.trim(),
          time: nowStamp(),
        });
        save('messages', messages);
        if (supabase) {
          try {
            await supabase.from('messages').insert({
              sender: sender.value || 'Client',
              project: project.value || 'General',
              body: text.value.trim(),
            });
          } catch (err) {
            console.warn('Supabase message insert failed', err.message);
          }
        }
        text.value = '';
        renderMessages();
      });
    }

    const fileInput = document.getElementById('client-file-input');
    const fileBtn = document.getElementById('client-file-upload');
    if (fileInput && fileBtn) {
      fileBtn.addEventListener('click', () => {
        const selected = Array.from(fileInput.files || []);
        if (!selected.length) return;
        selected.forEach((file) => {
          files.unshift({ name: file.name, date: nowStamp() });
        });
        save('files', files);
        fileInput.value = '';
        renderFiles();
      });
    }

    const scheduleForm = document.getElementById('client-schedule-form');
    if (scheduleForm) {
      scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('client-schedule-title');
        const date = document.getElementById('client-schedule-date');
        const time = document.getElementById('client-schedule-time');
        const channel = document.getElementById('client-schedule-channel');
        if (!title.value.trim() || !date.value) return;
        schedule.unshift({
          title: title.value.trim(),
          date: date.value,
          time: time.value || 'TBD',
          channel: channel.value || 'General',
        });
        save('schedule', schedule);
        scheduleForm.reset();
        renderSchedule();
      });
    }

    const appointmentForm = document.getElementById('client-appointment-form');
    if (appointmentForm) {
      appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('client-appointment-date');
        const time = document.getElementById('client-appointment-time');
        const topic = document.getElementById('client-appointment-topic');
        if (!date.value || !time.value) return;
        appointments.unshift({
          date: date.value,
          time: time.value,
          topic: topic.value || 'Strategy call',
        });
        save('appointments', appointments);
        appointmentForm.reset();
        renderAppointments();
      });
    }

    const ticketForm = document.getElementById('client-ticket-form');
    if (ticketForm) {
      ticketForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const subject = document.getElementById('client-ticket-subject');
        const priority = document.getElementById('client-ticket-priority');
        const message = document.getElementById('client-ticket-message');
        if (!subject.value.trim()) return;
        tickets.unshift({
          subject: subject.value.trim(),
          priority: priority.value || 'Standard',
          status: 'Open',
          message: message.value.trim(),
        });
        save('tickets', tickets);
        if (supabase) {
          try {
            await supabase.from('tickets').insert({
              subject: subject.value.trim(),
              priority: priority.value || 'Standard',
              status: 'Open',
              body: message.value.trim(),
            });
          } catch (err) {
            console.warn('Supabase ticket insert failed', err.message);
          }
        }
        ticketForm.reset();
        renderTickets();
      });
    }

    const contractBtn = document.getElementById('client-contract-toggle');
    if (contractBtn) {
      contractBtn.addEventListener('click', () => {
        contract.signed = true;
        save('contract', contract);
        renderContract();
      });
    }

    const stagingBtn = document.getElementById('client-staging-generate');
    if (stagingBtn) {
      stagingBtn.addEventListener('click', () => {
        staging.generated = true;
        staging.link = 'https://preview.inksavvy.example/project/brand-audit';
        save('staging', staging);
        renderStaging();
      });
    }

    document.querySelectorAll('[data-project-row]').forEach((row) => {
      const status = row.querySelector('[data-project-status]');
      row.querySelectorAll('[data-project-action]').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (!status) return;
          if (btn.dataset.projectAction === 'approve') {
            status.textContent = 'Approved';
          } else {
            status.textContent = 'Revision requested';
          }
        });
      });
    });
  }

  if (dashboard === 'staff') {
    const tasks = init('tasks', [
      { project: 'Brand clarity audit', task: 'Draft positioning brief', due: 'Mar 10', status: 'Pending' },
      { project: 'Website and portal build', task: 'Review tone guidelines', due: 'Mar 12', status: 'Pending' },
    ]);
    let sharedAssignments = initShared('assignments', []);
    const staffDirectory = initShared('staffDirectory', []);
    const currentStaffId = initShared('currentStaffId', '');
    const supabase = window.supabaseClient;
    let staffId = currentStaffId;
    if (!staffId && staffDirectory.length) {
      staffId = staffDirectory[0]?.employmentId || '';
    }
    const deliverables = init('deliverables', []);
    const timesheets = init('timesheets', []);
    const messages = init('messages', [
      { sender: 'PM Desk', project: 'Brand clarity audit', text: 'Kickoff notes uploaded.', time: nowStamp() },
    ]);
    const availability = init('availability', { days: 'Mon-Fri', hours: '9am-6pm' });
    const profile = init('profile', { portfolio: '', role: 'Brand Strategist', bio: '' });

    const syncStaffAssignments = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('assignments')
          .select('*')
          .eq('staff_id', staffId)
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (Array.isArray(data)) {
          sharedAssignments = data.map((row) => ({
            id: row.id,
            project: row.project,
            role: row.role,
            staffId: row.staff_id,
            staffName: row.staff_name,
            due: row.due,
            status: row.status || 'Assigned',
          }));
          saveShared('assignments', sharedAssignments);
        }
      } catch (err) {
        console.warn('Supabase staff assignments fetch failed', err.message);
      }
    };

    const updateAssignmentStatus = async (assignmentId, status) => {
      if (!supabase || !assignmentId) return;
      try {
        const { error } = await supabase.from('assignments').update({ status }).eq('id', assignmentId);
        if (error) throw error;
      } catch (err) {
        console.warn('Supabase assignment status update failed', err.message);
      }
    };

    const renderTasks = () => {
      const body = document.getElementById('staff-task-body');
      if (!body) return;
      body.innerHTML = '';
      const merged = [
        ...sharedAssignments.map((assign) => ({
          id: assign.id,
          project: assign.project,
          task: assign.role || 'Assignment',
          due: assign.due || '-',
          status: assign.status || 'Assigned',
          source: 'assignment',
          staffId: assign.staffId,
        })),
        ...tasks.map((task) => ({ ...task, source: 'task' })),
      ];
      merged.forEach((task, idx) => {
        if (task.source === 'assignment' && task.staffId && staffId && task.staffId !== staffId) {
          return;
        }
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${task.project}</td>
          <td>${task.task}</td>
          <td>${task.due}</td>
          <td><span class="badge">${task.status}</span></td>
          <td></td>
        `;
        const cell = tr.querySelector('td:last-child');
        const accept = document.createElement('button');
        accept.className = 'btn btn-ghost btn-sm';
        accept.textContent = 'Accept';
        accept.disabled = task.status !== 'Pending' && task.status !== 'Assigned';
        accept.addEventListener('click', () => {
          if (task.source === 'assignment') {
            const match = sharedAssignments.find((a) => a.id === task.id);
            if (match) {
              match.status = 'In progress';
              saveShared('assignments', sharedAssignments);
              updateAssignmentStatus(match.id, 'In progress');
            }
          } else {
            tasks[idx].status = 'In progress';
            save('tasks', tasks);
          }
          renderTasks();
        });
        const complete = document.createElement('button');
        complete.className = 'btn btn-ghost btn-sm';
        complete.textContent = 'Complete';
        complete.disabled = task.status !== 'In progress';
        complete.addEventListener('click', () => {
          if (task.source === 'assignment') {
            const match = sharedAssignments.find((a) => a.id === task.id);
            if (match) {
              match.status = 'Completed';
              saveShared('assignments', sharedAssignments);
              updateAssignmentStatus(match.id, 'Completed');
            }
          } else {
            tasks[idx].status = 'Completed';
            save('tasks', tasks);
          }
          renderTasks();
        });
        const reassign = document.createElement('button');
        reassign.className = 'btn btn-ghost btn-sm';
        reassign.textContent = 'Reassign';
        reassign.disabled = task.status === 'Completed';
        reassign.addEventListener('click', () => {
          if (task.source === 'assignment') {
            const match = sharedAssignments.find((a) => a.id === task.id);
            if (match) {
              match.status = 'Reassign requested';
              saveShared('assignments', sharedAssignments);
              updateAssignmentStatus(match.id, 'Reassign requested');
            }
          } else {
            tasks[idx].status = 'Reassign requested';
            save('tasks', tasks);
          }
          renderTasks();
        });
        const wrap = document.createElement('div');
        wrap.className = 'table-actions';
        wrap.append(accept, complete, reassign);
        cell.appendChild(wrap);
        body.appendChild(tr);
      });
    };

    const renderDeliverables = () => {
      const list = document.getElementById('staff-deliverable-list');
      if (!list) return;
      list.innerHTML = '';
      deliverables.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} — ${item.date}`;
        list.appendChild(li);
      });
    };

    const renderTimesheets = () => {
      const list = document.getElementById('staff-timesheet-list');
      if (!list) return;
      list.innerHTML = '';
      timesheets.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.week} — ${item.hours} hours — ${item.note}`;
        list.appendChild(li);
      });
    };

    const renderMessages = () => {
      const feed = document.getElementById('staff-message-feed');
      if (!feed) return;
      feed.innerHTML = '';
      messages.forEach((msg) => {
        const item = document.createElement('div');
        item.className = 'message';
        const meta = document.createElement('div');
        meta.className = 'message-meta';
        meta.textContent = `${msg.sender} • ${msg.project} • ${msg.time}`;
        const body = document.createElement('div');
        body.className = 'message-text';
        body.textContent = msg.text;
        item.append(meta, body);
        feed.appendChild(item);
      });
    };

    const renderAvailability = () => {
      const status = document.getElementById('staff-availability-status');
      if (status) {
        status.textContent = `Current: ${availability.days}, ${availability.hours}`;
      }
    };

    const renderProfile = () => {
      const status = document.getElementById('staff-profile-status');
      if (status) {
        status.textContent = profile.portfolio ? 'Profile saved.' : '';
      }
    };

    (async () => {
      await syncStaffAssignments();
      renderTasks();
      renderDeliverables();
      renderTimesheets();
      renderMessages();
      renderAvailability();
      renderProfile();
    })();

    const deliverableBtn = document.getElementById('staff-deliverable-upload');
    const deliverableInput = document.getElementById('staff-deliverable-input');
    if (deliverableBtn && deliverableInput) {
      deliverableBtn.addEventListener('click', () => {
        const selected = Array.from(deliverableInput.files || []);
        if (!selected.length) return;
        selected.forEach((file) => {
          deliverables.unshift({ name: file.name, date: nowStamp() });
        });
        save('deliverables', deliverables);
        deliverableInput.value = '';
        renderDeliverables();
      });
    }

    const timesheetForm = document.getElementById('staff-timesheet-form');
    if (timesheetForm) {
      timesheetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const week = document.getElementById('staff-timesheet-week');
        const hours = document.getElementById('staff-timesheet-hours');
        const note = document.getElementById('staff-timesheet-note');
        if (!week.value.trim() || !hours.value) return;
        timesheets.unshift({
          week: week.value.trim(),
          hours: hours.value,
          note: note.value || 'Work logged',
        });
        save('timesheets', timesheets);
        timesheetForm.reset();
        renderTimesheets();
      });
    }

    const availabilityForm = document.getElementById('staff-availability-form');
    if (availabilityForm) {
      availabilityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const days = document.getElementById('staff-availability-days');
        const hours = document.getElementById('staff-availability-hours');
        availability.days = days.value || availability.days;
        availability.hours = hours.value || availability.hours;
        save('availability', availability);
        renderAvailability();
      });
    }

    const messageForm = document.getElementById('staff-message-form');
    if (messageForm) {
      messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sender = document.getElementById('staff-message-sender');
        const project = document.getElementById('staff-message-project');
        const text = document.getElementById('staff-message-text');
        if (!text.value.trim()) return;
        messages.unshift({
          sender: sender.value || 'Staff',
          project: project.value || 'General',
          text: text.value.trim(),
          time: nowStamp(),
        });
        save('messages', messages);
        text.value = '';
        renderMessages();
      });
    }

    const profileForm = document.getElementById('staff-profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const portfolio = document.getElementById('staff-profile-portfolio');
        const role = document.getElementById('staff-profile-role');
        const bio = document.getElementById('staff-profile-bio');
        profile.portfolio = portfolio.value;
        profile.role = role.value || profile.role;
        profile.bio = bio.value;
        save('profile', profile);
        renderProfile();
      });
    }
  }

  if (dashboard === 'admin') {
    const applications = initShared('staffApplications', []);
    const staffDirectory = initShared('staffDirectory', []);
    const emailLog = initShared('emailLog', []);
    let assignments = initShared('assignments', []);

    const supabase = window.supabaseClient;

    const syncApplicationsFromSupabase = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase.from('staff_applications').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (Array.isArray(data)) {
          const mapped = data.map((row) => ({
            id: row.id,
            name: row.name || 'Staff Applicant',
            email: row.email,
            portfolio: row.portfolio,
            status: row.status || 'Pending',
            employmentId: row.employment_id,
            tempPassword: row.temp_password,
            submittedAt: row.created_at,
            portfolioReviewed: row.portfolio_reviewed || false,
          }));
          saveShared('staffApplications', mapped);
          applications.splice(0, applications.length, ...mapped);
        }
      } catch (err) {
        console.warn('Supabase applications fetch failed', err.message);
      }
    };

    const syncAssignmentsFromSupabase = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase.from('assignments').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        if (Array.isArray(data)) {
          assignments = data.map((row) => ({
            id: row.id,
            project: row.project,
            role: row.role,
            staffId: row.staff_id,
            staffName: row.staff_name,
            due: row.due,
            status: row.status || 'Assigned',
          }));
          saveShared('assignments', assignments);
        }
      } catch (err) {
        console.warn('Supabase assignments fetch failed', err.message);
      }
    };

    const insertAssignmentSupabase = async (payload) => {
      if (!supabase) return null;
      try {
        const { data, error } = await supabase.from('assignments').insert(payload).select().single();
        if (error) throw error;
        return data;
      } catch (err) {
        console.warn('Supabase assignment insert failed', err.message);
        return null;
      }
    };

    const updateAssignmentSupabase = async (id, status) => {
      if (!supabase || !id) return;
      try {
        const { error } = await supabase.from('assignments').update({ status }).eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.warn('Supabase assignment update failed', err.message);
      }
    };

    const generateEmploymentId = () => {
      const year = new Date().getFullYear();
      const seq = initShared('staffSequence', 1);
      const id = `INK-S-${year}-${String(seq).padStart(4, '0')}`;
      saveShared('staffSequence', seq + 1);
      return id;
    };

    const logEmail = (to, subject) => {
      emailLog.unshift({ to, subject, time: nowStamp() });
      saveShared('emailLog', emailLog);
    };

    const renderStats = () => {
      const pending = applications.filter((app) => app.status === 'Pending').length;
      const approved = staffDirectory.length;
      const emails = emailLog.length;
      const pendingEl = document.getElementById('admin-stat-pending');
      const approvedEl = document.getElementById('admin-stat-approved');
      const emailsEl = document.getElementById('admin-stat-emails');
      if (pendingEl) pendingEl.textContent = pending;
      if (approvedEl) approvedEl.textContent = approved;
      if (emailsEl) emailsEl.textContent = emails;
    };

    const renderAssignments = () => {
      const body = document.getElementById('admin-assignment-body');
      if (!body) return;
      body.innerHTML = '';
      if (!assignments.length) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="5">No assignments yet.</td>';
        body.appendChild(tr);
        return;
      }
      assignments.forEach((assign) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${assign.project}</td>
          <td>${assign.staffName}</td>
          <td>${assign.role}</td>
          <td>${assign.due || '-'}</td>
          <td><span class="badge">${assign.status}</span></td>
        `;
        body.appendChild(tr);
      });
    };

    const renderAssignmentSelect = () => {
      const select = document.getElementById('admin-assignment-staff');
      if (!select) return;
      select.innerHTML = '';
      if (!staffDirectory.length) {
        const option = document.createElement('option');
        option.textContent = 'No staff available';
        option.value = '';
        select.appendChild(option);
        select.disabled = true;
        return;
      }
      select.disabled = false;
      staffDirectory.forEach((staff) => {
        const option = document.createElement('option');
        option.value = staff.employmentId;
        option.textContent = `${staff.name} (${staff.employmentId})`;
        select.appendChild(option);
      });
    };

    const renderApplications = () => {
      const body = document.getElementById('admin-application-body');
      if (!body) return;
      body.innerHTML = '';
      if (!applications.length) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="8">No applications yet.</td>';
        body.appendChild(tr);
        return;
      }
      applications.forEach((app, idx) => {
        const tr = document.createElement('tr');
        const portfolioCell = app.portfolio
          ? `<a href="${app.portfolio}" target="_blank" rel="noopener">View</a>`
          : 'Not provided';
        tr.innerHTML = `
          <td>${app.name}</td>
          <td>${app.email}</td>
          <td>${portfolioCell}</td>
          <td><span class="badge">${app.status}</span></td>
          <td>${app.employmentId || '-'}</td>
          <td>${app.tempPassword || '-'}</td>
          <td>${app.submittedAt || '-'}</td>
          <td></td>
        `;
        const actionCell = tr.querySelector('td:last-child');
        const wrap = document.createElement('div');
        wrap.className = 'table-actions';

        const approve = document.createElement('button');
        approve.className = 'btn btn-ghost btn-sm';
        approve.textContent = 'Approve';
        approve.disabled = app.status !== 'Pending';
        approve.addEventListener('click', () => {
          const employmentId = generateEmploymentId();
          const tempPassword = `INK-${Math.random().toString(36).slice(2, 8)}`;
          applications[idx].status = 'Approved';
          applications[idx].employmentId = employmentId;
          applications[idx].tempPassword = tempPassword;
          saveShared('staffApplications', applications);
          staffDirectory.unshift({
            name: app.name,
            email: app.email,
            employmentId,
            status: 'Active',
          });
          saveShared('staffDirectory', staffDirectory);
          logEmail(app.email, `Employment ID issued: ${employmentId} (Temp password: ${tempPassword})`);
          renderAll();
        });

        const reject = document.createElement('button');
        reject.className = 'btn btn-ghost btn-sm';
        reject.textContent = 'Reject';
        reject.disabled = app.status === 'Rejected';
        reject.addEventListener('click', () => {
          applications[idx].status = 'Rejected';
          saveShared('staffApplications', applications);
          logEmail(app.email, 'Application status update');
          renderAll();
        });

        const review = document.createElement('button');
        review.className = 'btn btn-ghost btn-sm';
        review.textContent = app.portfolioReviewed ? 'Reviewed' : 'Mark portfolio reviewed';
        review.disabled = app.portfolioReviewed || !app.portfolio;
        review.addEventListener('click', () => {
          applications[idx].portfolioReviewed = true;
          saveShared('staffApplications', applications);
          logEmail(app.email, 'Portfolio review complete');
          renderAll();
        });

        wrap.append(approve, reject, review);
        actionCell.appendChild(wrap);
        body.appendChild(tr);
      });
    };

    const renderStaffDirectory = () => {
      const body = document.getElementById('admin-staff-body');
      if (!body) return;
      body.innerHTML = '';
      if (!staffDirectory.length) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="4">No approved staff yet.</td>';
        body.appendChild(tr);
        return;
      }
      staffDirectory.forEach((staff) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${staff.name}</td>
          <td>${staff.email}</td>
          <td>${staff.employmentId}</td>
          <td><span class="badge">${staff.status}</span></td>
        `;
        body.appendChild(tr);
      });
    };

    const renderEmails = () => {
      const body = document.getElementById('admin-email-body');
      if (!body) return;
      body.innerHTML = '';
      if (!emailLog.length) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="3">No emails sent yet.</td>';
        body.appendChild(tr);
        return;
      }
      emailLog.forEach((email) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${email.to}</td>
          <td>${email.subject}</td>
          <td>${email.time}</td>
        `;
        body.appendChild(tr);
      });
    };

    const renderAll = () => {
      renderStats();
      renderApplications();
      renderAssignmentSelect();
      renderAssignments();
      renderStaffDirectory();
      renderEmails();
    };

    (async () => {
      await syncAssignmentsFromSupabase();
      renderAll();
    })();

    const assignmentForm = document.getElementById('admin-assignment-form');
    if (assignmentForm) {
      assignmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const project = document.getElementById('admin-assignment-project');
        const role = document.getElementById('admin-assignment-role');
        const staffSelect = document.getElementById('admin-assignment-staff');
        const due = document.getElementById('admin-assignment-due');
        if (!staffSelect || !staffSelect.value || !project?.value) return;
        const staff = staffDirectory.find((s) => s.employmentId === staffSelect.value);
        const newAssignment = {
          id: `A-${Date.now()}`,
          project: project.value.trim(),
          role: role?.value || 'Staff',
          staffId: staffSelect.value,
          staffName: staff?.name || staffSelect.value,
          due: due?.value || '',
          status: 'Assigned',
        };
        assignments.unshift(newAssignment);
        saveShared('assignments', assignments);
        insertAssignmentSupabase({
          id: newAssignment.id,
          project: newAssignment.project,
          role: newAssignment.role,
          staff_id: newAssignment.staffId,
          staff_name: newAssignment.staffName,
          due: newAssignment.due,
          status: newAssignment.status,
        }).then((created) => {
          if (created?.id) {
            assignments = assignments.map((a) =>
              a.id === newAssignment.id ? { ...a, id: created.id } : a
            );
            saveShared('assignments', assignments);
            renderAssignments();
          }
        });
        assignmentForm.reset();
        renderAssignments();
      });
    }
  }
})();
