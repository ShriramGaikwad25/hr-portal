import { NextRequest, NextResponse } from "next/server";

const EMPLOYEES_API_BASE = "https://preview.keyforge.ai/hrportal/employees";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ employeeId: string }> }
) {
  const { employeeId } = await params;
  if (!employeeId) {
    return NextResponse.json(
      { error: "employeeId is required" },
      { status: 400 }
    );
  }
  const terminationDate = request.nextUrl.searchParams.get("terminationDate");
  if (!terminationDate) {
    return NextResponse.json(
      { error: "terminationDate query parameter is required" },
      { status: 400 }
    );
  }
  try {
    const url = `${EMPLOYEES_API_BASE}/${employeeId}/terminate?terminationDate=${encodeURIComponent(terminationDate)}`;
    const res = await fetch(url, {
      method: "POST",
    });
    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json(
        { error: text || `Upstream returned ${res.status}` },
        { status: res.status }
      );
    }
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ success: true, message: text || "Employee terminated" });
    }
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to terminate employee" },
      { status: 500 }
    );
  }
}
