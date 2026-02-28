// Shared site interactions: mobile nav + services dropdown
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownParent = dropdownToggle ? dropdownToggle.closest('.nav-item') : null;

  const setDropdown = (open) => {
    if (!dropdownParent || !dropdownToggle) return;
    dropdownParent.classList.toggle('dropdown-open', open);
    dropdownToggle.setAttribute('aria-expanded', String(open));
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
      if (expanded) {
        setDropdown(false);
      }
    });
  }

  if (dropdownToggle && dropdownParent) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dropdownParent.classList.contains('dropdown-open');
      setDropdown(!isOpen);
    });
  }

  document.addEventListener('click', (event) => {
    if (!dropdownParent) return;
    if (dropdownParent.contains(event.target)) return;
    setDropdown(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    setDropdown(false);
    if (navToggle && nav) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      if (!navToggle || !nav) return;
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      setDropdown(false);
    });
  });

  // Auth form role switcher
  const authCards = document.querySelectorAll('[data-auth-form]');
  const sharedKey = (name) => `inksavvy.shared.${name}`;
  const readShared = (name, fallback) => {
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
  const writeShared = (name, value) => localStorage.setItem(sharedKey(name), JSON.stringify(value));

  authCards.forEach((card) => {
    const roleButtons = card.querySelectorAll('.role-btn');
    const fields = Array.from(card.querySelectorAll('[data-role]')).filter(
      (el) => !el.classList.contains('role-btn')
    );
    const submit = card.querySelector('[data-auth-submit]');
    const mode = card.getAttribute('data-auth-form');

    const setRole = (role) => {
      roleButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.role === role));
      fields.forEach((field) => {
        const roles = (field.dataset.role || '').split(' ');
        const show = roles.includes(role);
        field.hidden = !show;
        if (field.tagName === 'INPUT' || field.tagName === 'SELECT' || field.tagName === 'TEXTAREA') {
          field.disabled = !show;
        }
      });
      if (submit) {
        if (role === 'staff') {
          submit.textContent = mode === 'signup' ? 'Create Staff Account' : 'Login as Staff';
          submit.className = 'btn btn-dark';
        } else {
          submit.textContent = mode === 'signup' ? 'Create Client Account' : 'Login as Client';
          submit.className = 'btn btn-primary';
        }
      }
      if (card.dataset.currentRole !== role) {
        card.dataset.currentRole = role;
      }
    };

    roleButtons.forEach((btn) => {
      btn.addEventListener('click', () => setRole(btn.dataset.role));
    });

    if (submit) {
      submit.addEventListener('click', async () => {
        const role = card.dataset.currentRole || 'client';
        const mode = card.getAttribute('data-auth-form');
        if (mode === 'signup' && role === 'staff') {
          const name = document.getElementById('signup-name');
          const email = document.getElementById('signup-staff-email');
          const portfolio = document.getElementById('signup-portfolio');
          const statusEl = document.getElementById('staff-application-status');
          if (!email || !email.value.trim()) {
            if (statusEl) statusEl.textContent = 'Please add a valid work email.';
            return;
          }
          const applications = readShared('staffApplications', []);
          applications.unshift({
            id: `APP-${Date.now()}`,
            name: name?.value || 'Staff Applicant',
            email: email.value.trim(),
            portfolio: portfolio?.value || '',
            status: 'Pending',
            submittedAt: new Date().toLocaleString(),
            portfolioReviewed: false,
          });
          writeShared('staffApplications', applications);
          // Push to Supabase if available
          try {
            if (window.supabaseClient) {
              await window.supabaseClient.from('staff_applications').insert({
                name: name?.value || null,
                email: email.value.trim(),
                portfolio: portfolio?.value || null,
                status: 'Pending',
              });
            }
          } catch (err) {
            console.warn('Supabase staff application insert failed', err.message);
          }
          if (statusEl) {
            statusEl.textContent = 'Application submitted. We will review and email your Employment ID.';
          }
          const form = document.getElementById('auth-signup-form');
          if (form) form.reset();
          setRole('staff');
          return;
        }

        if (mode === 'login' && role === 'staff') {
          const staffId = document.getElementById('login-employment-id');
          const idValue = staffId?.value?.trim();
          const staffDirectory = readShared('staffDirectory', []);
          const exists = staffDirectory.find((s) => s.employmentId === idValue);
          if (!exists) {
            alert('Employment ID not found. Please wait for approval or contact support.');
            return;
          }
          if (idValue) {
            writeShared('currentStaffId', idValue);
          }
        }

        if (mode === 'signup' && role === 'client') {
          const email = document.getElementById('signup-client-email')?.value?.trim();
          const password = document.getElementById('signup-password')?.value;
          const payload = {
            name: document.getElementById('signup-name')?.value || null,
            company: document.getElementById('signup-company')?.value || null,
            phone: document.getElementById('signup-phone')?.value || null,
            title: document.getElementById('signup-title')?.value || null,
            website: document.getElementById('signup-website')?.value || null,
            country: document.getElementById('signup-country')?.value || null,
            industry: document.getElementById('signup-industry')?.value || null,
            company_size: document.getElementById('signup-company-size')?.value || null,
            project_type: document.getElementById('signup-project-type')?.value || null,
            budget: document.getElementById('signup-budget')?.value || null,
            timeline: document.getElementById('signup-timeline')?.value || null,
            brief: document.getElementById('signup-brief')?.value || null,
            referral: document.getElementById('signup-referral')?.value || null,
          };
          try {
            if (window.supabaseClient && email && password) {
              const { data, error } = await window.supabaseClient.auth.signUp({
                email,
                password,
                options: { data: payload },
              });
              if (error) throw error;
              await window.supabaseClient.from('client_profiles').upsert({
                user_id: data.user?.id,
                email,
                ...payload,
              });
            }
          } catch (err) {
            console.warn('Supabase client signup failed', err.message);
          }
        }

        if (mode === 'login' && role === 'client') {
          const email = document.getElementById('login-email')?.value?.trim();
          const password = document.getElementById('login-password')?.value;
          if (window.supabaseClient && email && password) {
            try {
              const { error } = await window.supabaseClient.auth.signInWithPassword({ email, password });
              if (error) {
                alert('Login failed: ' + error.message);
                return;
              }
            } catch (err) {
              console.warn('Supabase login failed', err.message);
            }
          }
        }

        const target = role === 'staff' ? 'dashboard-staff.html' : 'dashboard-client.html';
        window.location.href = target;
      });
    }

    setRole('client');
  });
});
