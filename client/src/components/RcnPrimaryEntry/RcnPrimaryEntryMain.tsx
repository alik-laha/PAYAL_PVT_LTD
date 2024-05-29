import { Button } from "@/components/ui/button"

const RcnPrimaryEntryMain = () => {
    return (
       <>
       
       
       <p className='text-2xl font-semibold text-center drop-shadow-md items-center justify-center '>RCN Entry Dashboard</p>
       <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button>
       <div className="flexbox-header">
       <div className="flexbox-tile">
            Ghana <br/><p>1100</p>
        </div>
        <div className="flexbox-tile">
        Nizeria <br/><p>5000</p>
        </div>
        <div className="flexbox-tile">
        Tanzania<br/><p>5000</p>
        </div>
        <div className="flexbox-tile">
        IVC<br/><p>1000</p>
        </div>
        <div className="flexbox-tile">
        Origin5<br/><p>1340</p>
        </div>
        <div className="flexbox-tile">
       Origin6<br/><p>987</p>
        </div>
       </div>
       
        <div>

        </div>

       
       </>
        
    
    )
}
export default RcnPrimaryEntryMain;