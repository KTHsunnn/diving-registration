import { createClient } from '@supabase/supabase-js';

// 讀取我們剛剛在 .env.local 設定的環境變數
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 建立並匯出 supabase 客戶端
export const supabase = createClient(supabaseUrl, supabaseAnonKey);