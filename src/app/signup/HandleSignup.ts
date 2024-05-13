import {supabaseAdmin} from '@/src/utils/supabase/supabaseAdmin'

export default async function handleSignup(
  id: string,
  name: string,
  phone: string,
  street: string,
  number: string,
  postal: number,
  city: string,
  country: string,
  email: string,
  logo: string
) {
  const {data, error} = await supabaseAdmin
    .from('Carecenter')
    .insert([
      {
        id: id,
        name: name,
        phone: phone,
        street: street,
        number: number,
        postal: postal,
        city: city,
        country: country,
        email: email,
        logo: logo
      }
    ])
    .select()
  return {data, error}
}
