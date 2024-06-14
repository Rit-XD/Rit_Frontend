import {fetchUser} from '@/providers/user/fetchUser'
import Image from 'next/image'
import {redirect} from 'next/navigation'

export default async function Chat() {

  return (
    <main>
      <div
        style={{
          height: '75vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image
          src="https://image.api.playstation.com/vulcan/ap/rnd/202204/2008/J8tdXQc59EDwrIgeHySj1yHf.png"
          width={500}
          height={500}
          alt=""
        />
      </div>
    </main>
  )
}
