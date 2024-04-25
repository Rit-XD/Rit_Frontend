export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[]

export type Database = {
  public: {
    Tables: {
      badges: {
        Row: {
          aid: string
          created_at: string
          uid: string
        }
        Insert: {
          aid: string
          created_at?: string
          uid: string
        }
        Update: {
          aid?: string
          created_at?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: 'badges_uid_fkey'
            columns: ['uid']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          }
        ]
      }
      booking: {
        Row: {
          aid: string
          created_at: string
          day: string
          id: string
          pid: string
          spots: number
          time: string
          uid: string
        }
        Insert: {
          aid: string
          created_at?: string
          day: string
          id?: string
          pid: string
          spots?: number
          time: string
          uid?: string
        }
        Update: {
          aid?: string
          created_at?: string
          day?: string
          id?: string
          pid?: string
          spots?: number
          time?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_booking_pid_fkey'
            columns: ['pid']
            isOneToOne: false
            referencedRelation: 'planning'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_booking_uid_fkey'
            columns: ['uid']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          }
        ]
      }
      global_notification: {
        Row: {
          content: Json
          created_at: string
          entryId: string
          finished_at: string | null
          status: string
          users_reached: number
        }
        Insert: {
          content: Json
          created_at?: string
          entryId: string
          finished_at?: string | null
          status: string
          users_reached?: number
        }
        Update: {
          content?: Json
          created_at?: string
          entryId?: string
          finished_at?: string | null
          status?: string
          users_reached?: number
        }
        Relationships: []
      }
      group: {
        Row: {
          code: number
          created_at: string
          creator: string
          groupsname: string
          id: string
          sync: boolean
        }
        Insert: {
          code: number
          created_at?: string
          creator: string
          groupsname: string
          id?: string
          sync?: boolean
        }
        Update: {
          code?: number
          created_at?: string
          creator?: string
          groupsname?: string
          id?: string
          sync?: boolean
        }
        Relationships: [
          {
            foreignKeyName: 'public_group_creator_fkey'
            columns: ['creator']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          }
        ]
      }
      group_member: {
        Row: {
          created_at: string
          gid: string
          uid: string
        }
        Insert: {
          created_at?: string
          gid: string
          uid: string
        }
        Update: {
          created_at?: string
          gid?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_group_member_gid_fkey'
            columns: ['gid']
            isOneToOne: false
            referencedRelation: 'group'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_group_member_uid_fkey'
            columns: ['uid']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          }
        ]
      }
      liked: {
        Row: {
          aid: string
          created_at: string
          uid: string
        }
        Insert: {
          aid: string
          created_at?: string
          uid: string
        }
        Update: {
          aid?: string
          created_at?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: 'liked_uid_fkey'
            columns: ['uid']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          }
        ]
      }
      password_failed_verification_attempts: {
        Row: {
          email: string
          failed_at: string
        }
        Insert: {
          email: string
          failed_at?: string
        }
        Update: {
          email?: string
          failed_at?: string
        }
        Relationships: []
      }
      personal_planning: {
        Row: {
          planning: Json
          uid: string
        }
        Insert: {
          planning?: Json
          uid: string
        }
        Update: {
          planning?: Json
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: 'personal_planning_uid_fkey'
            columns: ['uid']
            isOneToOne: true
            referencedRelation: 'profile'
            referencedColumns: ['id']
          }
        ]
      }
      planning: {
        Row: {
          aid: string | null
          bid: string | null
          created_at: string
          data: Json | null
          date: string
          end: string | null
          gid: string | null
          id: string
          spots: number | null
          start: string
          type: string | null
          uid: string | null
        }
        Insert: {
          aid?: string | null
          bid?: string | null
          created_at?: string
          data?: Json | null
          date: string
          end?: string | null
          gid?: string | null
          id?: string
          spots?: number | null
          start: string
          type?: string | null
          uid?: string | null
        }
        Update: {
          aid?: string | null
          bid?: string | null
          created_at?: string
          data?: Json | null
          date?: string
          end?: string | null
          gid?: string | null
          id?: string
          spots?: number | null
          start?: string
          type?: string | null
          uid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_planning_bid_fkey'
            columns: ['bid']
            isOneToOne: false
            referencedRelation: 'booking'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_planning_gid_fkey'
            columns: ['gid']
            isOneToOne: false
            referencedRelation: 'group'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_planning_uid_fkey'
            columns: ['uid']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          }
        ]
      }
      profile: {
        Row: {
          active: boolean | null
          age: number | null
          audience: string | null
          created_at: string
          email: string
          fcm_token: string | null
          id: string
          locale: string | null
          preferences: Json | null
          username: string
          username_caps: string | null
        }
        Insert: {
          active?: boolean | null
          age?: number | null
          audience?: string | null
          created_at?: string
          email: string
          fcm_token?: string | null
          id?: string
          locale?: string | null
          preferences?: Json | null
          username: string
          username_caps?: string | null
        }
        Update: {
          active?: boolean | null
          age?: number | null
          audience?: string | null
          created_at?: string
          email?: string
          fcm_token?: string | null
          id?: string
          locale?: string | null
          preferences?: Json | null
          username?: string
          username_caps?: string | null
        }
        Relationships: []
      }
      profile_age: {
        Row: {
          created_at: string
          tid: string
          uid: string
        }
        Insert: {
          created_at?: string
          tid: string
          uid: string
        }
        Update: {
          created_at?: string
          tid?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_age_uid_fkey'
            columns: ['uid']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          }
        ]
      }
      profile_theme: {
        Row: {
          created_at: string
          tid: string
          uid: string
        }
        Insert: {
          created_at?: string
          tid: string
          uid: string
        }
        Update: {
          created_at?: string
          tid?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_profile_theme_uid_fkey'
            columns: ['uid']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          }
        ]
      }
      quiz: {
        Row: {
          aid: string
          answers: Json | null
          created_at: string
          finished: boolean
          uid: string
        }
        Insert: {
          aid: string
          answers?: Json | null
          created_at?: string
          finished?: boolean
          uid: string
        }
        Update: {
          aid?: string
          answers?: Json | null
          created_at?: string
          finished?: boolean
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: 'quiz_uid_fkey'
            columns: ['uid']
            isOneToOne: true
            referencedRelation: 'profile'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      booking_count: {
        Row: {
          aid: string | null
          day: string | null
          spots_booked: number | null
          time: string | null
        }
        Relationships: []
      }
      liked_count: {
        Row: {
          aid: string | null
          likes: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_accessible_groups: {
        Args: {
          user_id: string
        }
        Returns: {
          gid: string
        }[]
      }
      get_accessible_members: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
        }[]
      }
      verifydummyemails: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | {schema: keyof Database},
  EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends {schema: keyof Database}
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never
