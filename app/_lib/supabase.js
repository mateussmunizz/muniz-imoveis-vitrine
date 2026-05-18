import { createClient } from "@supabase/supabase-js";

const urlParaTeste = "https://qmkwjmwfxzepolgssehz.supabase.co";
const chaveParaTeste = "sb_publishable_jq_axlb-YcDj4RQ5biLcDQ_dIZxKFbT";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || urlParaTeste,
  process.env.NEXT_PUBLIC_SUPABASE_KEY || chaveParaTeste,
);
