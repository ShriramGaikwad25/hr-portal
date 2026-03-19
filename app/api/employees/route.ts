import { NextRequest, NextResponse } from "next/server";

const EMPLOYEES_API = "https://preview.keyforge.ai/hrportal/employees";

export type CreateEmployeePayload = {
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  title: string;
  status: string;
  managerId: string | null;
};

export async function GET() {
  try {
    const res = await fetch(EMPLOYEES_API);
    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${res.status}` },
        { status: res.status }
      );
    }
    const data = await res.json();
    const list = Array.isArray(data?.Resources) ? data.Resources : data;
    return NextResponse.json(Array.isArray(list) ? list : []);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateEmployeePayload;
    const res = await fetch(EMPLOYEES_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
      return NextResponse.json({ success: true, message: text || "Employee created" });
    }
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create employee" },
      { status: 500 }
    );
  }
}
