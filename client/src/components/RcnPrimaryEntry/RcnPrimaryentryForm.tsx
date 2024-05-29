import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const RcnPrimaryEntryForm = () => {
return(
    <>
        <Label >Origin</Label>
       <Input  placeholder="Difference"/>
       <Label >BL No.</Label>
       <Input  placeholder="Truck No."/>
       <Label >Container No.</Label>
        <Input placeholder="Container No."/>
        <Label >BL Weight</Label>
        <Input placeholder="BL Weight"/>
        <Label >Net Weight</Label>
        <Input placeholder="Net Weight"/>
        <Label >Difference</Label>
       <Input  placeholder="Difference"/>
            <Button/>
    </>
)


}
export default RcnPrimaryEntryForm