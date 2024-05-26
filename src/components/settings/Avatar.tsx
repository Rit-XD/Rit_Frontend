'use client'
import {useUser} from '@/lib/user/useUser'
import {Icon} from '@/ui/Icon'
import {fromModule} from '@/utils/styler/Styler'
import {createClient} from '@/utils/supabase/client'
import {useRouter} from 'next/navigation'
import React, {useState} from 'react'
import Skeleton from 'react-loading-skeleton'
import css from './Avatar.module.scss'
import {handleUploadAvatar} from './UploadAvatar'

const styles = fromModule(css)

export default function Avatar({
  uid,
  url,
  size,
  onUpload
}: {
  uid: string | null
  url: string | null
  size: number
  onUpload: (url: string) => void
}) {
  const router = useRouter()
  const {user} = useUser()
  const supabase = createClient()
  const [uploading, setUploading] = useState(false)

  const uploadAvatar: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${user!.id}/${Math.random()}.${fileExt}`

      const {data, error: uploadError} = await supabase.storage
        .from('profilePics')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }
      let url = supabase.storage.from('profilePics').getPublicUrl(filePath)
        .data.publicUrl
      handleUploadAvatar(url)
      router.replace('/dashboard/settings')
    } catch (error) {
      console.log('Error uploading avatar: ', error)
    } finally {
      setUploading(false)
    }
  }

  if (!user) {
    return (
      <div className={styles.container()}>
        <Skeleton className={styles.container.avatar()} />
        <div style={{width: size}}>
          <label className="button primary block" htmlFor="single">
            {uploading ? (
              'Uploading ...'
            ) : (
              <Icon icon="edit" className={styles.container.avatar.edit()} />
            )}
          </label>
          <input
            style={{
              visibility: 'hidden',
              position: 'absolute'
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container()}>
      <img
        src={user?.logo || ''}
        alt=""
        className={styles.container.avatar()}
      />
      <div style={{width: size}}>
        <label className="button primary block" htmlFor="single">
          {uploading ? (
            'Uploading ...'
          ) : (
            <Icon icon="edit" className={styles.container.avatar.edit()} />
          )}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute'
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}
