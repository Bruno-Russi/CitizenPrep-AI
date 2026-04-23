// Auto-generated from schema — supabase/migrations/20260422000000_combined.sql
// Regenerar após mudanças no schema:
//   DATABASE_URL="..." npx supabase gen types typescript --db-url $DATABASE_URL > src/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ─── Enums ────────────────────────────────────────────────────────────────────

export type CivicsFormat = 'standard' | '2025';

export type CivicsCategory =
  | 'principles_of_democracy'
  | 'system_of_government'
  | 'rights_and_responsibilities'
  | 'colonial_period_and_independence'
  | 'the_1800s'
  | 'recent_american_history'
  | 'geography'
  | 'symbols'
  | 'holidays'
  | 'integrated_civics';

export type SessionMode = 'practice' | 'simulation';

// ─── Row types (leitura) ──────────────────────────────────────────────────────

export interface ProfileRow {
  id: string;
  name: string | null;
  email: string | null;
  language: string;
  xp: number | null;
  created_at: string;
  updated_at: string;
}

export interface CivicsQuestionRow {
  id: number;
  question: string;
  answers: string[];
  category: CivicsCategory;
  format: CivicsFormat;
  active: boolean;
  audio_url_onyx: string | null;
  audio_url_nova: string | null;
  created_at: string;
}

export interface SessionRow {
  id: string;
  user_id: string;
  mode: SessionMode;
  format: CivicsFormat;
  score: number | null;
  total: number | null;
  passed: boolean | null;
  started_at: string;
  ended_at: string | null;
}

export interface SessionAnswerRow {
  id: string;
  session_id: string;
  question_id: number;
  transcript: string | null;
  correct: boolean;
  feedback: string | null;
  created_at: string;
}

export interface UserProgressRow {
  user_id: string;
  question_id: number;
  attempts: number;
  correct_count: number;
  last_seen: string;
}

export interface StreakRow {
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  updated_at: string;
}

// ─── Insert types ─────────────────────────────────────────────────────────────

export type ProfileInsert = Omit<ProfileRow, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type SessionInsert = Omit<SessionRow, 'id' | 'started_at'> & {
  id?: string;
  started_at?: string;
};

export type SessionAnswerInsert = Omit<SessionAnswerRow, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

export type UserProgressInsert = UserProgressRow;

export type StreakInsert = Omit<StreakRow, 'updated_at'> & {
  updated_at?: string;
};

// ─── Database shape (para createClient<Database>) ────────────────────────────

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: {
          name?: string | null;
          email?: string | null;
          language?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      civics_questions: {
        Row: CivicsQuestionRow;
        Insert: Omit<CivicsQuestionRow, 'id' | 'created_at'> & { id?: number; created_at?: string };
        Update: Partial<Omit<CivicsQuestionRow, 'id'>>;
        Relationships: [];
      };
      sessions: {
        Row: SessionRow;
        Insert: SessionInsert;
        Update: Partial<SessionInsert>;
        Relationships: [
          { foreignKeyName: 'sessions_user_id_fkey'; columns: ['user_id']; referencedRelation: 'users'; referencedColumns: ['id'] }
        ];
      };
      session_answers: {
        Row: SessionAnswerRow;
        Insert: SessionAnswerInsert;
        Update: Partial<SessionAnswerInsert>;
        Relationships: [
          { foreignKeyName: 'session_answers_session_id_fkey'; columns: ['session_id']; referencedRelation: 'sessions'; referencedColumns: ['id'] },
          { foreignKeyName: 'session_answers_question_id_fkey'; columns: ['question_id']; referencedRelation: 'civics_questions'; referencedColumns: ['id'] }
        ];
      };
      user_progress: {
        Row: UserProgressRow;
        Insert: UserProgressInsert;
        Update: Partial<UserProgressInsert>;
        Relationships: [
          { foreignKeyName: 'user_progress_user_id_fkey'; columns: ['user_id']; referencedRelation: 'users'; referencedColumns: ['id'] },
          { foreignKeyName: 'user_progress_question_id_fkey'; columns: ['question_id']; referencedRelation: 'civics_questions'; referencedColumns: ['id'] }
        ];
      };
      streaks: {
        Row: StreakRow;
        Insert: StreakInsert;
        Update: Partial<StreakInsert>;
        Relationships: [
          { foreignKeyName: 'streaks_user_id_fkey'; columns: ['user_id']; referencedRelation: 'users'; referencedColumns: ['id'] }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      upsert_user_progress: {
        Args: { p_user_id: string; p_question_id: number; p_correct: boolean };
        Returns: void;
      };
      update_streak: {
        Args: { p_user_id: string };
        Returns: void;
      };
    };
    Enums: {
      civics_format: CivicsFormat;
      civics_category: CivicsCategory;
      session_mode: SessionMode;
    };
    CompositeTypes: Record<string, never>;
  };
}
