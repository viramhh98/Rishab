import { Building2 } from "lucide-react";
import MasterDataCrud from "../components/master-data/MasterDataCrud";
import { departmentService } from "../services/department.services";

export default function Departments() {
  return (
    <MasterDataCrud
  title="Departments"
  entityName="Department"
  service={departmentService}
  icon={Building2}
  countField="employees"
/>
  );
}