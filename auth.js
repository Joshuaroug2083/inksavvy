import { supabaseClient } from './supabase.js'

// SIGN UP
export async function signUp(fullName, email, password) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: 'client'
      }
    }
  })

  if (error) {
    console.error('Signup error:', error.message)
    return { error }
  }

  return { data }
}

// LOG IN
export async function logIn(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error('Login error:', error.message)
    return { error }
  }

  return { data }
}

// LOG OUT
export async function logOut() {
  const { error } = await supabaseClient.auth.signOut()
  if (error) console.error('Logout error:', error.message)
}

// GET CURRENT USER
export async function getCurrentUser() {
  const { data: { user } } = await supabaseClient.auth.getUser()
  return user
}