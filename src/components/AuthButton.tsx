import {fetchUser} from '@/lib/user/fetchUser'
import {createClient} from '@/utils/supabase/server'
import Link from 'next/link'
import {redirect} from 'next/navigation'

export default async function AuthButton() {
  const supabase = createClient()
  const profile = await fetchUser()
  const user = profile?.carecenter

  const signOut = async () => {
    'use server'

    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.name}!
      <br />
      {user.email}
      <br />
      {user.city}
      <br />
      {user.phone}
      <br />
      {user.street} {user.number}
      <br />
      {user.postal}
      <br />
      {user.country}
      <br />
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  )
}
