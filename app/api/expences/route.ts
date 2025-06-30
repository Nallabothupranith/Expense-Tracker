import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET: List all expenses for a group
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupId = searchParams.get("groupId");

  if (!groupId) {
    return NextResponse.json(
      { error: "Group ID is required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Expences")
    .select(
      `
      *,
      Users:spent_by ( name )
    `
    )
    .eq("group_id", groupId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Expences error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const expenses = data?.map((expense) => ({
    ...expense,
    spend_by_name: Array.isArray(expense.Users)
      ? expense.Users[0]?.name
      : expense.Users?.name,
  }));

  return NextResponse.json({ expenses });
}

// POST: Add a new expense
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { group_id, amount, currency, spent_by, spent_to, date } = body;

    if (!group_id || !amount || !spent_by || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("Expences")
      .insert({
        group_id,
        amount,
        currency: currency || "USD",
        spent_by,
        spent_to: spent_to || [],
        date,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ expense: data });
  } catch (error) {
    console.error("POST expences error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// (Ready for future: PUT, DELETE, etc.)
