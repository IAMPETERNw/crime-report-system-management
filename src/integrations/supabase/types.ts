export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      business_opportunities: {
        Row: {
          company: string | null
          created_at: string
          description: string | null
          id: number
          location: string | null
          postedtime: string | null
          requirement: Json | null
          title: string | null
          type: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          description?: string | null
          id?: number
          location?: string | null
          postedtime?: string | null
          requirement?: Json | null
          title?: string | null
          type?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          description?: string | null
          id?: number
          location?: string | null
          postedtime?: string | null
          requirement?: Json | null
          title?: string | null
          type?: string | null
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          comments: number | null
          created_at: string
          id: number
          image: string | null
          likes: number | null
          user_id: number | null
        }
        Insert: {
          comments?: number | null
          created_at?: string
          id?: number
          image?: string | null
          likes?: number | null
          user_id?: number | null
        }
        Update: {
          comments?: number | null
          created_at?: string
          id?: number
          image?: string | null
          likes?: number | null
          user_id?: number | null
        }
        Relationships: []
      }
      "crime report system": {
        Row: {
          created_at: string
          email: string | null
          id: number
          is_admin: boolean | null
          is_verified: boolean | null
          location: string | null
          name: string | null
          password: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          is_admin?: boolean | null
          is_verified?: boolean | null
          location?: string | null
          name?: string | null
          password?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          is_admin?: boolean | null
          is_verified?: boolean | null
          location?: string | null
          name?: string | null
          password?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      crime_incidents: {
        Row: {
          address: string | null
          created_at: string | null
          description: string | null
          id: string
          incident_date: string | null
          incident_type: string
          latitude: number | null
          longitude: number | null
          priority: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          incident_date?: string | null
          incident_type: string
          latitude?: number | null
          longitude?: number | null
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          incident_date?: string | null
          incident_type?: string
          latitude?: number | null
          longitude?: number | null
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      emergency_alerts: {
        Row: {
          created_at: string
          id: number
          notification_message: string | null
          notifications_number: number | null
          user_id: number | null
          user_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          notification_message?: string | null
          notifications_number?: number | null
          user_id?: number | null
          user_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          notification_message?: string | null
          notifications_number?: number | null
          user_id?: number | null
          user_name?: string | null
        }
        Relationships: []
      }
      Member_cards: {
        Row: {
          bio: string | null
          connection: number | null
          created_at: string
          id: number
          location: string | null
          name: string | null
          profession: string | null
          skills: Json | null
        }
        Insert: {
          bio?: string | null
          connection?: number | null
          created_at?: string
          id?: number
          location?: string | null
          name?: string | null
          profession?: string | null
          skills?: Json | null
        }
        Update: {
          bio?: string | null
          connection?: number | null
          created_at?: string
          id?: number
          location?: string | null
          name?: string | null
          profession?: string | null
          skills?: Json | null
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          comments: string | null
          created_at: string
          id: number
          likes: number | null
          reply: number | null
          user_id: number | null
          user_name: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string
          id?: number
          likes?: number | null
          reply?: number | null
          user_id?: number | null
          user_name?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string
          id?: number
          likes?: number | null
          reply?: number | null
          user_id?: number | null
          user_name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      "sample-job-opportunitie": {
        Row: {
          company: string | null
          created_at: string
          description: string | null
          id: number
          location: string | null
          postedtime: string | null
          requirements: string | null
          salary: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          description?: string | null
          id?: number
          location?: string | null
          postedtime?: string | null
          requirements?: string | null
          salary?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          description?: string | null
          id?: number
          location?: string | null
          postedtime?: string | null
          requirements?: string | null
          salary?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: []
      }
      user_authentifications: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: number
          image_url: string | null
          is_verified: boolean | null
          name: string | null
          nysce_number: string | null
          password: string | null
          phone: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: number
          image_url?: string | null
          is_verified?: boolean | null
          name?: string | null
          nysce_number?: string | null
          password?: string | null
          phone?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: number
          image_url?: string | null
          is_verified?: boolean | null
          name?: string | null
          nysce_number?: string | null
          password?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      user_feature: {
        Row: {
          color: string | null
          created_at: string
          descrption: string | null
          icon: string | null
          id: number
          title: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          descrption?: string | null
          icon?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          descrption?: string | null
          icon?: string | null
          id?: number
          title?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
