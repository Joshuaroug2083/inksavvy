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
      submit.addEventListener('click', () => {
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
          const staffDirectory = readShared('staffDirectory', []);
          const idValue = staffId?.value?.trim();
          const exists = staffDirectory.find((s) => s.employmentId === idValue);
          if (!exists) {
            alert('Employment ID not found. Please wait for approval or contact support.');
            return;
          }
          if (idValue) {
            writeShared('currentStaffId', idValue);
          }
        }

        const target = role === 'staff' ? 'dashboard-staff.html' : 'dashboard-client.html';
        window.location.href = target;
      });
    }

    setRole('client');
  });
});
