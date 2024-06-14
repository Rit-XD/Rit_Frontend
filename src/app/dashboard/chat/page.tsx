import {fetchUser} from '@/providers/user/fetchUser'
import Image from 'next/image'
import {redirect} from 'next/navigation'
import ChatComponent from '@/components/chat/Chat'
import { useUser } from '@/providers/user/useUser'

export default function Chat() {

  return (
    <main>
        {/* <Image
          src="https://image.api.playstation.com/vulcan/ap/rnd/202204/2008/J8tdXQc59EDwrIgeHySj1yHf.png"
          width={500}
          height={500}
          alt=""
        /> */}
        <ChatComponent/>
    </main>
  )
}
