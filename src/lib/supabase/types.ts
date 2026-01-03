export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          role: "teacher" | "student" | "admin";
          school_id: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          role?: "teacher" | "student" | "admin";
          school_id?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          role?: "teacher" | "student" | "admin";
          school_id?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      schools: {
        Row: {
          id: string;
          name: string;
          district: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          district?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          district?: string | null;
          created_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string;
          stripe_subscription_id: string;
          tier: "teacher" | "school" | "district";
          status: "active" | "canceled" | "past_due" | "trialing";
          seats_limit: number;
          current_period_start: string;
          current_period_end: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_customer_id: string;
          stripe_subscription_id: string;
          tier?: "teacher" | "school" | "district";
          status?: "active" | "canceled" | "past_due" | "trialing";
          seats_limit?: number;
          current_period_start: string;
          current_period_end: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_customer_id?: string;
          stripe_subscription_id?: string;
          tier?: "teacher" | "school" | "district";
          status?: "active" | "canceled" | "past_due" | "trialing";
          seats_limit?: number;
          current_period_start?: string;
          current_period_end?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      classrooms: {
        Row: {
          id: string;
          teacher_id: string;
          name: string;
          join_code: string;
          grade_level: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          teacher_id: string;
          name: string;
          join_code?: string;
          grade_level?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          teacher_id?: string;
          name?: string;
          join_code?: string;
          grade_level?: string | null;
          created_at?: string;
        };
      };
      classroom_students: {
        Row: {
          id: string;
          classroom_id: string;
          student_id: string;
          reading_level: "low" | "mid" | "high";
          joined_at: string;
        };
        Insert: {
          id?: string;
          classroom_id: string;
          student_id: string;
          reading_level?: "low" | "mid" | "high";
          joined_at?: string;
        };
        Update: {
          id?: string;
          classroom_id?: string;
          student_id?: string;
          reading_level?: "low" | "mid" | "high";
          joined_at?: string;
        };
      };
      topics: {
        Row: {
          id: string;
          title: string;
          domain: "life_systems" | "earth_systems" | "social_systems" | "tech_systems";
          description: string | null;
          icon: string | null;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          domain: "life_systems" | "earth_systems" | "social_systems" | "tech_systems";
          description?: string | null;
          icon?: string | null;
          order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          domain?: "life_systems" | "earth_systems" | "social_systems" | "tech_systems";
          description?: string | null;
          icon?: string | null;
          order?: number;
          created_at?: string;
        };
      };
      content: {
        Row: {
          id: string;
          topic_id: string;
          title: string;
          reading_level: "low" | "mid" | "high";
          content_type: "reader" | "activity" | "assessment";
          mdx_content: string;
          estimated_minutes: number;
          ngss_standards: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          topic_id: string;
          title: string;
          reading_level?: "low" | "mid" | "high";
          content_type?: "reader" | "activity" | "assessment";
          mdx_content: string;
          estimated_minutes?: number;
          ngss_standards?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          topic_id?: string;
          title?: string;
          reading_level?: "low" | "mid" | "high";
          content_type?: "reader" | "activity" | "assessment";
          mdx_content?: string;
          estimated_minutes?: number;
          ngss_standards?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      assignments: {
        Row: {
          id: string;
          classroom_id: string;
          teacher_id: string;
          title: string;
          content_ids: string[];
          due_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          classroom_id: string;
          teacher_id: string;
          title: string;
          content_ids: string[];
          due_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          classroom_id?: string;
          teacher_id?: string;
          title?: string;
          content_ids?: string[];
          due_date?: string | null;
          created_at?: string;
        };
      };
      progress: {
        Row: {
          id: string;
          student_id: string;
          content_id: string;
          classroom_id: string;
          assignment_id: string | null;
          status: "not_started" | "in_progress" | "completed";
          score: number | null;
          time_spent_seconds: number;
          started_at: string | null;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          student_id: string;
          content_id: string;
          classroom_id: string;
          assignment_id?: string | null;
          status?: "not_started" | "in_progress" | "completed";
          score?: number | null;
          time_spent_seconds?: number;
          started_at?: string | null;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          student_id?: string;
          content_id?: string;
          classroom_id?: string;
          assignment_id?: string | null;
          status?: "not_started" | "in_progress" | "completed";
          score?: number | null;
          time_spent_seconds?: number;
          started_at?: string | null;
          completed_at?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      generate_join_code: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
    Enums: {
      user_role: "teacher" | "student" | "admin";
      subscription_tier: "teacher" | "school" | "district";
      subscription_status: "active" | "canceled" | "past_due" | "trialing";
      reading_level: "low" | "mid" | "high";
      content_type: "reader" | "activity" | "assessment";
      progress_status: "not_started" | "in_progress" | "completed";
      topic_domain: "life_systems" | "earth_systems" | "social_systems" | "tech_systems";
    };
  };
};

// Helper types for easier usage
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

// Convenience type aliases
export type User = Tables<"users">;
export type School = Tables<"schools">;
export type Subscription = Tables<"subscriptions">;
export type Classroom = Tables<"classrooms">;
export type ClassroomStudent = Tables<"classroom_students">;
export type Topic = Tables<"topics">;
export type Content = Tables<"content">;
export type Assignment = Tables<"assignments">;
export type Progress = Tables<"progress">;
