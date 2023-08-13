export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string | null
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id?: string | null
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_shop_exists: {
        Args: {
          email_to_check: string
        }
        Returns: {
          shop_exists: boolean
          profile_exists: boolean
        }[]
      }
      check_user_exists: {
        Args: {
          email_to_check: string
        }
        Returns: {
          user_exists: boolean
          profile_exists: boolean
        }[]
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
