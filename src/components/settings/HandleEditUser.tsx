'use server'

import {fetchUser} from '@/lib/user/fetchUser'
import {supabaseAdmin} from '@/utils/supabase/supabaseAdmin'

// export const getUser = async () => {
//   const user = await fetchUser()
//   return user
// }

export async function handleEditUser(
  state: {error: string},
  formData: FormData
): Promise<{error: string}> {
  const user = await fetchUser();
  const name = String(user!.name)
  const street = String(formData.get('street'))
  const city = String(formData.get('city'))
  const postal = Number(formData.get('postal'))
  const number = String(formData.get('number'))
  const phone = String(formData.get('phone'))
  console.log(phone);

  let query = supabaseAdmin
    .from('Carecenter')
    .update({
      name,
      street,
      city,
      postal,
      number,
      phone
    })
    .eq('id', user!.id)
    .select()
  const res = await query
  // console.log(res)
  return {error: '', ...res.data}
}
