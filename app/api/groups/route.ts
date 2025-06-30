import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  //const { data, error } = await supabase.from("Groups").select("*");

  const { data, error } = await supabase.from("group_summary").select("*");

  // Debug log
  console.log("Supabase Groups data:", data, "error:", error);
  if (error) {
    return NextResponse.json(
      { error: error.message, rawError: error },
      { status: 500 }
    );
  }
  return NextResponse.json({ groups: data, raw: data, error });
}
