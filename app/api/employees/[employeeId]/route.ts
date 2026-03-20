import { NextRequest, NextResponse } from "next/server";

const EMPLOYEES_API_BASE = "https://preview.keyforge.ai/hrportal/employees";

export type UpdateEmployeePayload = {
  username: string;
  active: boolean;
  firstname: string;
  lastName: string;
  fullName: string;
  emailAddressWork: string;
  phoneNumberWork: string;
  phoneNumberHome: string;
  positionTitle: string;
  streetAddress: string;
  state: string;
  country: string;
  postalCode: string;
  city: string;
  continousServiceDate: string;
  terminationDate: string | null;
  managerID: string;
  costCenterId: string;
  organizationName: string;
  workerType: string;
  employeeID: string;
  department: string;
  lastModifiedBy: null;
  tenantId: null;
};

export async function PUT(
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
  try {
    const body = (await request.json()) as UpdateEmployeePayload;
    const targetIdentifier = body.username?.trim() || employeeId;
    const res = await fetch(`${EMPLOYEES_API_BASE}/${encodeURIComponent(targetIdentifier)}`, {
      method: "PUT",
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
      return NextResponse.json({ success: true, message: text || "Employee updated" });
    }
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to update employee" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ employeeId: string }> }
) {
  const { employeeId } = await params;
  if (!employeeId) {
    return NextResponse.json(
      { error: "employeeId is required" },
      { status: 400 }
    );
  }
  try {
    const res = await fetch(`${EMPLOYEES_API_BASE}/${employeeId}`, {
      method: "DELETE",
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
      return NextResponse.json({ success: true, message: text || "Employee deleted" });
    }
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to delete employee" },
      { status: 500 }
    );
  }
}
