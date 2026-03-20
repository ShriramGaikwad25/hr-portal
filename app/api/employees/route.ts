import { NextRequest, NextResponse } from "next/server";

const EMPLOYEES_API = "https://preview.keyforge.ai/hrportal/employees";

type UpstreamEmployeeResource = {
  // Note: upstream uses a mix of naming conventions (e.g. `firstname` not `firstName`)
  employeeID?: string;
  employeeId?: string;
  wid?: string;
  firstname?: string;
  firstName?: string;
  lastName?: string;
  emailAddressWork?: string;
  department?: string;
  positionTitle?: string;
  active?: boolean;
  terminationDate?: string | null;
  status?: string;
  managerID?: string;
  managerId?: string;
  username?: string;
  fullName?: string;
  phoneNumberWork?: string;
  phoneNumberHome?: string;
  streetAddress?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  city?: string;
  continousServiceDate?: string;
  costCenterId?: string;
  organizationName?: string;
  workerType?: string;
  lastModifiedBy?: string | null;
  tenantId?: string | null;
};

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

type NormalizedEmployee = {
  employeeId: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  title: string;
  status: string; // ACTIVE | INACTIVE | TERMINATED
  managerId: string | null;
  managerName: string | null;
  username: string;
  active: boolean;
  firstname: string;
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
  lastModifiedBy: string | null;
  tenantId: string | null;
};

function normalizeStatus(resource: UpstreamEmployeeResource): NormalizedEmployee["status"] {
  const termination =
    typeof resource.terminationDate === "string" && resource.terminationDate.trim().length > 0;

  if (termination) return "TERMINATED";

  const active =
    resource.active === true || (typeof resource.active === "string" && resource.active.toLowerCase() === "true");
  return active ? "ACTIVE" : "INACTIVE";
}

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

    const resources: UpstreamEmployeeResource[] = Array.isArray(data?.Resources)
      ? data.Resources
      : Array.isArray(data)
        ? data
        : [];

    // For manager display we may want to resolve `managerID -> manager employee`
    const byEmployeeId = new Map<string, UpstreamEmployeeResource>();
    for (const r of resources) {
      const id = r.employeeID ?? r.employeeId ?? r.wid;
      if (id) byEmployeeId.set(id, r);
    }

    const normalized: NormalizedEmployee[] = resources.map((r) => {
      const employeeId = (r.employeeID ?? r.employeeId ?? r.wid ?? "").toString();
      const managerId = (r.managerID ?? r.managerId ?? "").toString();
      const resolvedManagerId = managerId ? managerId : null;

      const manager = resolvedManagerId ? byEmployeeId.get(resolvedManagerId) : undefined;
      const managerName = manager
        ? `${manager.firstName ?? manager.firstname ?? ""} ${manager.lastName ?? ""}`.trim() || null
        : null;

      return {
        employeeId,
        employeeNumber: employeeId, // upstream doesn't send a separate `employeeNumber` in the sample
        firstName: (r.firstName ?? r.firstname ?? "").toString(),
        lastName: (r.lastName ?? "").toString(),
        email: (r.emailAddressWork ?? "").toString(),
        department: (r.department ?? "").toString(),
        title: (r.positionTitle ?? "").toString(),
        status: normalizeStatus(r),
        managerId: resolvedManagerId,
        managerName,
        username: (r.username ?? "").toString(),
        active:
          r.active === true ||
          (typeof r.active === "string" && r.active.toLowerCase() === "true"),
        firstname: (r.firstname ?? r.firstName ?? "").toString(),
        fullName: (r.fullName ?? "").toString(),
        emailAddressWork: (r.emailAddressWork ?? "").toString(),
        phoneNumberWork: (r.phoneNumberWork ?? "").toString(),
        phoneNumberHome: (r.phoneNumberHome ?? "").toString(),
        positionTitle: (r.positionTitle ?? "").toString(),
        streetAddress: (r.streetAddress ?? "").toString(),
        state: (r.state ?? "").toString(),
        country: (r.country ?? "").toString(),
        postalCode: (r.postalCode ?? "").toString(),
        city: (r.city ?? "").toString(),
        continousServiceDate: (r.continousServiceDate ?? "").toString(),
        terminationDate: r.terminationDate ? r.terminationDate.toString() : null,
        managerID: (r.managerID ?? r.managerId ?? "").toString(),
        costCenterId: (r.costCenterId ?? "").toString(),
        organizationName: (r.organizationName ?? "").toString(),
        workerType: (r.workerType ?? "").toString(),
        employeeID: employeeId,
        lastModifiedBy:
          r.lastModifiedBy === null || r.lastModifiedBy === undefined
            ? null
            : r.lastModifiedBy.toString(),
        tenantId:
          r.tenantId === null || r.tenantId === undefined
            ? null
            : r.tenantId.toString(),
      };
    });

    // Keep rows with missing employeeId out of the grid keys/actions
    return NextResponse.json(normalized.filter((e) => e.employeeId));
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
