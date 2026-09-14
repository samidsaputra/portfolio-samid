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
          id: string
          full_name: string
          tagline: string | null
          about_text: string | null
          photo_url: string | null
          cv_url: string | null
          linkedin_url: string | null
          github_url: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          tagline?: string | null
          about_text?: string | null
          photo_url?: string | null
          cv_url?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          tagline?: string | null
          about_text?: string | null
          photo_url?: string | null
          cv_url?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      experiences: {
        Row: {
          id: string
          role: string
          institution: string
          start_date: string
          end_date: string | null
          description: string | null
          display_order: number
        }
        Insert: {
          id?: string
          role: string
          institution: string
          start_date: string
          end_date?: string | null
          description?: string | null
          display_order?: number
        }
        Update: {
          id?: string
          role?: string
          institution?: string
          start_date?: string
          end_date?: string | null
          description?: string | null
          display_order?: number
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          thumbnail_url: string | null
          demo_url: string | null
          github_url: string | null
          category: string | null
          is_featured: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          thumbnail_url?: string | null
          demo_url?: string | null
          github_url?: string | null
          category?: string | null
          is_featured?: boolean
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          thumbnail_url?: string | null
          demo_url?: string | null
          github_url?: string | null
          category?: string | null
          is_featured?: boolean
          display_order?: number
          created_at?: string
        }
      }
      tech_stacks: {
        Row: {
          id: string
          name: string
          icon_url: string | null
          category: string
          display_order: number
        }
        Insert: {
          id?: string
          name: string
          icon_url?: string | null
          category: string
          display_order?: number
        }
        Update: {
          id?: string
          name?: string
          icon_url?: string | null
          category?: string
          display_order?: number
        }
      }
      project_tech_stacks: {
        Row: {
          project_id: string
          tech_stack_id: string
        }
        Insert: {
          project_id: string
          tech_stack_id: string
        }
        Update: {
          project_id?: string
          tech_stack_id?: string
        }
      }
      certificates: {
        Row: {
          id: string
          title: string
          issuer: string
          issue_date: string
          certificate_url: string | null
          image_url: string | null
          display_order: number
        }
        Insert: {
          id?: string
          title: string
          issuer: string
          issue_date: string
          certificate_url?: string | null
          image_url?: string | null
          display_order?: number
        }
        Update: {
          id?: string
          title?: string
          issuer?: string
          issue_date?: string
          certificate_url?: string | null
          image_url?: string | null
          display_order?: number
        }
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
  }
}
