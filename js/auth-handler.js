import { supabaseClient } from '../supabase.js'

// ─── GOOGLE AUTH ─────────────────────────────────────────
async function handleGoogleLogin() {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/client-dashboard.html'
    }
  })

  if (error) {
    alert('Google login failed: ' + error.message)
  }
}

// ─── LOGIN ───────────────────────────────────────────────
async function handleLogin(role) {
  const email = document.getElementById('login-email').value.trim()
  const password = document.getElementById('login-password').value.trim()
  const employmentId = document.getElementById('login-employment-id').value.trim()

  if (!email || !password) {
    alert('Please enter your email and password.')
    return
  }

  if (role === 'staff' && !employmentId) {
    alert('Please enter your Employment ID.')
    return
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password })

  if (error) {
    alert('Login failed: ' + error.message)
    return
  }

  // Get user profile
  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  if (!profile) {
    alert('Profile not found. Contact support.')
    return
  }

  // Verify role matches
  if (profile.role !== role) {
    alert(`This account is not a ${role} account.`)
    await supabaseClient.auth.signOut()
    return
  }

  // Verify staff employment ID
  if (role === 'staff' && profile.staff_code !== employmentId) {
    alert('Invalid Employment ID.')
    await supabaseClient.auth.signOut()
    return
  }

  // Redirect based on role
  if (profile.role === 'client') window.location.href = 'client-dashboard.html'
  else if (profile.role === 'staff') window.location.href = 'staff-dashboard.html'
  else if (profile.role === 'admin') window.location.href = 'admin-dashboard.html'
}

// ─── CLIENT SIGNUP ───────────────────────────────────────
async function handleClientSignup() {
  const fullName = document.getElementById('signup-name').value.trim()
  const email = document.getElementById('signup-client-email').value.trim()
  const password = document.getElementById('signup-password').value.trim()
  const company = document.getElementById('signup-company').value.trim()
  const phone = document.getElementById('signup-phone').value.trim()
  const country = document.getElementById('signup-country').value.trim()
  const industry = document.getElementById('signup-industry').value
  const companySize = document.getElementById('signup-company-size').value
  const projectType = document.getElementById('signup-project-type').value
  const budget = document.getElementById('signup-budget').value
  const timeline = document.getElementById('signup-timeline').value
  const brief = document.getElementById('signup-brief').value.trim()
  const referral = document.getElementById('signup-referral').value.trim()

  if (!fullName || !email || !password) {
    alert('Please fill in all required fields.')
    return
  }

  // Create auth account
  const { data, error } = await supabaseClient.auth.signUp({ email, password })

  if (error) {
    alert('Signup failed: ' + error.message)
    return
  }

  // Create profile
  const { error: profileError } = await supabaseClient
    .from('profiles')
    .insert({
      id: data.user.id,
      full_name: fullName,
      email,
      role: 'client',
      company,
      phone,
      country,
      industry,
      company_size: companySize,
      project_type: projectType,
      budget,
      timeline,
      brief,
      referral
    })

  if (profileError) {
    alert('Profile creation failed: ' + profileError.message)
    return
  }

  alert('Account created! Please check your email to verify your account.')
}

// ─── STAFF APPLICATION ────────────────────────────────────
async function handleStaffApplication() {
  const fullName = document.getElementById('signup-name').value.trim()
  const email = document.getElementById('signup-staff-email').value.trim()
  const password = document.getElementById('signup-password').value.trim()
  const portfolio = document.getElementById('signup-portfolio').value.trim()

  if (!fullName || !email || !password) {
    alert('Please fill in all required fields.')
    return
  }

  const { error } = await supabaseClient
    .from('staff_applications')
    .insert({
      full_name: fullName,
      email,
      portfolio_url: portfolio,
      status: 'pending'
    })

  if (error) {
    alert('Application failed: ' + error.message)
    return
  }

  document.getElementById('staff-application-status').textContent =
    'Application submitted! We will review and get back to you by email.'
}

// ─── WIRE UP BUTTONS ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Track active role
  let loginRole = 'client'
  let signupRole = 'client'

  // Google auth buttons
  const googleLogin = document.getElementById('google-login-btn')
  if (googleLogin) googleLogin.addEventListener('click', handleGoogleLogin)
  const googleSignup = document.getElementById('google-signup-btn')
  if (googleSignup) googleSignup.addEventListener('click', handleGoogleLogin)

  // Login role buttons
  document.querySelectorAll('[data-auth-form="login"] .role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      loginRole = btn.dataset.role
      const submitBtn = document.querySelector('[data-auth-form="login"] [data-auth-submit]')
      submitBtn.textContent = `Login as ${loginRole.charAt(0).toUpperCase() + loginRole.slice(1)}`
    })
  })

  // Signup role buttons
  document.querySelectorAll('[data-auth-form="signup"] .role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      signupRole = btn.dataset.role
      const submitBtn = document.querySelector('[data-auth-form="signup"] [data-auth-submit]')
      submitBtn.textContent = signupRole === 'staff' ? 'Submit Application' : 'Create Client Account'
    })
  })

  // Login submit
  document.querySelector('[data-auth-form="login"] [data-auth-submit]')
    .addEventListener('click', () => handleLogin(loginRole))

  // Signup submit
  document.querySelector('[data-auth-form="signup"] [data-auth-submit]')
    .addEventListener('click', () => {
      if (signupRole === 'client') handleClientSignup()
      else handleStaffApplication()
    })
})
