'use server'

import {cms} from '@/cms'
import {createSupabaseForServerComponent} from '@/lib/createSupabaseForServerComponent'
import {Database} from '@/lib/database.types'
import {Me} from '@/lib/me/Me'
import {supabaseAdmin} from '@/lib/supabaseAdmin'

const selectQuery =
  '*, planning(*), themes: profile_theme(tid), ages: profile_age(tid), liked: liked(aid), badges(aid), personalPlanning: personal_planning(planning), group_member(*, group(*))'

export async function fetchMe(): Promise<Me | null> {
  const supabase = await createSupabaseForServerComponent()
  const {
    data: {session}
  } = await supabase.auth.getSession()
  if (!session) return null
  const user = session.user

  const {data} = await supabase
    .from('profile')
    .select(selectQuery)
    .eq('id', user.id)
    .maybeSingle()
    .throwOnError()
  const profile = data as unknown as Me['profile'] | undefined

  if (!profile) {
    const username = user.email!.endsWith('@dummy')
      ? extractUsername(user.email!)
      : user.email!

    const username_caps: string =
      session.user.user_metadata.username || username

    let profile: Database['public']['Tables']['profile']['Insert'] = {
      id: user.id,
      username,
      username_caps,
      email: user.email!
    }
    const {data} = await supabaseAdmin
      .from('profile')
      .upsert(profile)
      .select(selectQuery)
      .single()
      .throwOnError()
    return {
      id: user.id,
      email: user.email!,
      hasEmailConfigured: !user.email!.endsWith('@dummy'),
      isAlineaUser: !!cms.user(),
      user,
      profile: data as unknown as Me['profile']
    }
  }

  if (user.email !== profile.email) {
    await supabaseAdmin
      .from('profile')
      .update({email: user.email})
      .eq('id', user.id)
      .throwOnError()
    return await fetchMe()
  }

  return {
    id: user.id,
    email: user.email!,
    hasEmailConfigured: !user.email!.endsWith('@dummy'),
    isAlineaUser: !!cms.user(),
    user,
    profile
  }
}

// Use this if you are fetching me from a page where the surrounding layout has already verified me exists
export async function fetchMeCertain(): Promise<Me> {
  const me = await fetchMe()
  if (!me) throw new Error('Expecting me to be available but received null')
  return me
}

const extractUsername = email => {
  const regex = /^(.+)_(?:\d+)@dummy$/
  const match = email.match(regex)
  if (match) return match[1]
  return email.substring(0, email.length - '@dummy'.length)
}
