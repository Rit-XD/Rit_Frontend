'use server'

import {fetchMeCertain} from '@/lib/me/fetchMe'
import {supabaseAdmin} from '@/lib/supabaseAdmin'

export async function storeFcmToken(fcmToken: string | null) {
  const me = await fetchMeCertain()
  const {data, error} = await supabaseAdmin
    .from('profile')
    .update({fcm_token: fcmToken})
    .eq('id', me.id)
}
