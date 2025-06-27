import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const groupId = params.id;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("GroupMembers")
    .select("*")
    .eq("group_id", groupId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ members: data });
}
