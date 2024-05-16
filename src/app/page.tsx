import {createClient} from '@/utils/supabase/server'
import {redirect} from 'next/navigation'

export default async function Index() {
  const supabase = createClient()

  //check if user is authenticated
  const {
    data: {user}
  } = await supabase.auth.getUser()

  //if user is not authenticated, redirect to login page
  if (!user) {
    return redirect('/login')
  }

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient()
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return redirect('/dashboard')
}
