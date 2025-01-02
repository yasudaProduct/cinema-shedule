import { createBrowserClient } from '@supabase/ssr'

function createClient() {
  console.log('createClient')
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export const supabase = createClient();