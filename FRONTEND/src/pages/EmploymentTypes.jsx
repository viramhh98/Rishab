import { Users } from "lucide-react";
import MasterDataCrud from "../components/master-data/MasterDataCrud";
import { employmentTypeService } from "../services/employmentType.services";

export default function EmploymentTypes() {
  return (
   <MasterDataCrud
  title="Employment Types"
  entityName="Employment Type"
  service={employmentTypeService}
  icon={Users}
  countField="employees"
/>
  );
}