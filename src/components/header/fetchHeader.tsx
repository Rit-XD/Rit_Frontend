import {fetchUser} from '@/lib/user/fetchUser'

export const getUser = async () => {
  const user = await fetchUser()
  return user
}
