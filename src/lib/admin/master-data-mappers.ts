import type { FlatOption, HierarchyOption } from "@/lib/admin/master-data";
import type { MasterDataRecord } from "@/lib/api/backend";

export function toHierarchyOptions(records: MasterDataRecord[]): HierarchyOption[] {
  const active = records.filter((item) => item.status === "active");
  const parents = active.filter((item) => !item.parentId);
  return parents.map((parent) => ({
    id: parent.id,
    name: parent.name,
    children: active
      .filter((item) => item.parentId === parent.id)
      .map((item) => ({ id: item.id, name: item.name })),
  }));
}

export function toFlatOptions(records: MasterDataRecord[]): FlatOption[] {
  return records
    .filter((item) => item.status === "active")
    .map((item) => ({ id: item.id, name: item.name }));
}

