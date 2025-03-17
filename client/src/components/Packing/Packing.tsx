import { useState } from "react";
import { Button } from "../ui/button";
import { RxUpdate } from "react-icons/rx";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";

const Packing = () => {

const handleProdStockUpdateFetch = async () => {

        setLoading(true);
         try {
             const response = await fetch('/api/packing/update-prodstock', {
                 method: 'POST',
             });
             const data = await response.json();
             alert(data.message);
         } catch (error) {
             alert('Failed to update production stock.');
         } finally {
             setLoading(false);
         }
     }
const [loading, setLoading] = useState(false);

return (
    <>
    <div>
    <DashboardHeader />
    <DashboardSidebar />
    <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" 
    disabled={loading} onClick={handleProdStockUpdateFetch} >  {loading ? 'Updating...' : 'Update Stock'} <RxUpdate size={20} className="ml-2"/></Button>
    </div>
    </>
)
  
}

export default Packing;