export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Car: {
        Row: {
          brand: string | null
          carecenter_id: string | null
          fuel: string | null
          id: string
          insurance: string | null
          model: string | null
          picture: string | null
          plate: string | null
          range: number | null
          registration: string | null
          seats: number | null
          transmission: string | null
          wheelchaircapacity: number | null
        }
        Insert: {
          brand?: string | null
          carecenter_id?: string | null
          fuel?: string | null
          id?: string
          insurance?: string | null
          model?: string | null
          picture?: string | null
          plate?: string | null
          range?: number | null
          registration?: string | null
          seats?: number | null
          transmission?: string | null
          wheelchaircapacity?: number | null
        }
        Update: {
          brand?: string | null
          carecenter_id?: string | null
          fuel?: string | null
          id?: string
          insurance?: string | null
          model?: string | null
          picture?: string | null
          plate?: string | null
          range?: number | null
          registration?: string | null
          seats?: number | null
          transmission?: string | null
          wheelchaircapacity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Car_carecenter_id_fkey"
            columns: ["carecenter_id"]
            isOneToOne: false
            referencedRelation: "Carecenter"
            referencedColumns: ["id"]
          },
        ]
      }
      Carecenter: {
        Row: {
          city: string | null
          country: string | null
          email: string | null
          id: string
          logo: string | null
          name: string | null
          number: string | null
          phone: string | null
          postal: number | null
          street: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          email?: string | null
          id?: string
          logo?: string | null
          name?: string | null
          number?: string | null
          phone?: string | null
          postal?: number | null
          street?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          email?: string | null
          id?: string
          logo?: string | null
          name?: string | null
          number?: string | null
          phone?: string | null
          postal?: number | null
          street?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
