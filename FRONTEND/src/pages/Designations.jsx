import { Briefcase } from "lucide-react";
import MasterDataCrud from "../components/master-data/MasterDataCrud";
import { designationService } from "../services/designation.services";

export default function Designations() {
  return (
    <MasterDataCrud
  title="Designations"
  entityName="Designation"
  service={designationService}
  icon={Briefcase}
  countField="employees"
/>
  );
}