import { CreditCard } from "lucide-react";
import MasterDataCrud from "../components/master-data/MasterDataCrud";
import { paymentMethodService } from "../services/paymentMethod.services";

export default function PaymentMethods() {
  return (
   <MasterDataCrud
  title="Payment Methods"
  entityName="Payment Method"
  service={paymentMethodService}
  icon={CreditCard}
/>
  );
}