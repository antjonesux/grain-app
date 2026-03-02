/**
 * Supabase database types (v4 schema).
 * Regenerate with: npx supabase gen types typescript --local > src/types/database.types.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type JourneyStatus = 'active' | 'paused' | 'archived'
export type JourneyRole = 'primary' | 'secondary'
export type JourneyActionSource = 'suggested' | 'custom'
export type ActionLogDuration = 0.5 | 1.0 | 1.5 | 2.0 | 3.0

export interface Database {
  public: {
    Tables: {
      journey_categories: {
        Row: {
          id: string
          key: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          key: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          key?: string
          name?: string
          created_at?: string
        }
      }
      journeys: {
        Row: {
          id: string
          user_id: string
          title: string
          why: string
          category_id: string | null
          weekly_hours: number
          status: JourneyStatus
          role: JourneyRole
          created_at: string
          paused_at: string | null
          archived_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          why: string
          category_id?: string | null
          weekly_hours: number
          status?: JourneyStatus
          role?: JourneyRole
          created_at?: string
          paused_at?: string | null
          archived_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          why?: string
          category_id?: string | null
          weekly_hours?: number
          status?: JourneyStatus
          role?: JourneyRole
          created_at?: string
          paused_at?: string | null
          archived_at?: string | null
        }
      }
      actions: {
        Row: {
          id: string
          user_id: string
          category_id: string | null
          title: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id?: string | null
          title: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string | null
          title?: string
          is_active?: boolean
          created_at?: string
        }
      }
      journey_actions: {
        Row: {
          id: string
          user_id: string
          journey_id: string
          action_id: string
          source: JourneyActionSource
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          journey_id: string
          action_id: string
          source: JourneyActionSource
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          journey_id?: string
          action_id?: string
          source?: JourneyActionSource
          sort_order?: number
          created_at?: string
        }
      }
      action_logs: {
        Row: {
          id: string
          user_id: string
          journey_id: string
          action_id: string | null
          log_date: string
          duration: number | null
          note: string | null
          logged_at: string
        }
        Insert: {
          id?: string
          user_id: string
          journey_id: string
          action_id?: string | null
          log_date: string
          duration?: ActionLogDuration | null
          note?: string | null
          logged_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          journey_id?: string
          action_id?: string | null
          log_date?: string
          duration?: ActionLogDuration | null
          note?: string | null
          logged_at?: string
        }
      }
      action_log_items: {
        Row: {
          id: string
          log_id: string
          user_id: string
          journey_id: string
          action_id: string
          duration: number
          log_date: string
          logged_at: string
          created_at: string
        }
        Insert: {
          id?: string
          log_id: string
          user_id: string
          journey_id: string
          action_id: string
          duration: number
          log_date: string
          logged_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          log_id?: string
          user_id?: string
          journey_id?: string
          action_id?: string
          duration?: number
          log_date?: string
          logged_at?: string
          created_at?: string
        }
      }
      weekly_summaries: {
        Row: {
          id: string
          journey_id: string
          user_id: string
          week_start: string
          commitment: number
          actual: number
          delta: number
          zero_days: number
          needle_moved: boolean | null
          recalibrated: boolean
          skipped: boolean
          created_at: string
        }
        Insert: {
          id?: string
          journey_id: string
          user_id: string
          week_start: string
          commitment: number
          actual?: number
          zero_days?: number
          needle_moved?: boolean | null
          recalibrated?: boolean
          skipped?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          journey_id?: string
          user_id?: string
          week_start?: string
          commitment?: number
          actual?: number
          zero_days?: number
          needle_moved?: boolean | null
          recalibrated?: boolean
          skipped?: boolean
          created_at?: string
        }
      }
      recalibrations: {
        Row: {
          id: string
          journey_id: string
          user_id: string
          action: string
          previous_value: string | null
          new_value: string | null
          reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          journey_id: string
          user_id: string
          action: string
          previous_value?: string | null
          new_value?: string | null
          reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          journey_id?: string
          user_id?: string
          action?: string
          previous_value?: string | null
          new_value?: string | null
          reason?: string | null
          created_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type JourneyCategoryRow = Database['public']['Tables']['journey_categories']['Row']
export type JourneyRow = Database['public']['Tables']['journeys']['Row']
export type JourneyInsert = Database['public']['Tables']['journeys']['Insert']
export type ActionRow = Database['public']['Tables']['actions']['Row']
export type ActionInsert = Database['public']['Tables']['actions']['Insert']
export type JourneyActionRow = Database['public']['Tables']['journey_actions']['Row']
export type JourneyActionInsert = Database['public']['Tables']['journey_actions']['Insert']
export type ActionLogRow = Database['public']['Tables']['action_logs']['Row']
export type ActionLogInsert = Database['public']['Tables']['action_logs']['Insert']
export type ActionLogItemRow = Database['public']['Tables']['action_log_items']['Row']
export type ActionLogItemInsert = Database['public']['Tables']['action_log_items']['Insert']
export type WeeklySummaryRow = Database['public']['Tables']['weekly_summaries']['Row']
