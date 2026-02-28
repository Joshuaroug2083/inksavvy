import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://orwizikclsdtgaajbxby.supabase.co'
const supabaseKey = 'sb_publishable_pjRndc1Z1Sl-UaiPbtE_Yw_xbpKzuHx'

export const supabaseClient = createClient(supabaseUrl, supabaseKey)