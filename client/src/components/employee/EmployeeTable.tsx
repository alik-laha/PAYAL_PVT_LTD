import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Input } from "../ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"



const EmployeeTable = () => {
    
    return (
        <div className="ml-5 mt-5">
            <div className="flex ">
            
            <Input className="w-60 mb-10" placeholder="Search By Employee ID/ Name"/>
            
            </div>
            

            
            <Table className="mt-1">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        
                            <TableHead  className="text-center" >Id</TableHead>
                            <TableHead className="text-center" >Emp name</TableHead>
                            <TableHead className="text-center" >Emp ID </TableHead>
                            <TableHead className="text-center" >Desg.</TableHead>
                            <TableHead className="text-center" >Date of Joining</TableHead>
                            <TableHead className="text-center" >Contact No.</TableHead>
                            <TableHead className="text-center" >Email</TableHead>
                            <TableHead className="text-center" >Emp Status </TableHead>
                            <TableHead className="text-center" >Action</TableHead>
                        
                    </TableHeader>
                    <TableBody>
                    
                        
                            
                                    <TableRow >
                                        <TableCell className="text-center" >1</TableCell>
                                        <TableCell className="text-center" >Sumit Datta</TableCell>
                                        <TableCell className="text-center" >PAYC00001</TableCell>
                                        <TableCell className="text-center" >Lecturer</TableCell>
                                        <TableCell className="text-center" >2024-05-20</TableCell>
                                        <TableCell className="text-center" >987654321</TableCell>
                                        <TableCell className="text-center" >sumktdatta@gmail.com</TableCell>
                                        <TableCell className="text-center" >Active</TableCell>
    
                                        <TableCell className="text-center" >
                                        <Popover>
                                        <PopoverTrigger><button className="bg-green-500 p-2 text-white rounded">Action</button>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col w-30 text-sm font-medium"><button className="bg-transparent pb-2 text-left">Modify</button>
                                        <button className="bg-transparent pb-2 text-left">Delete</button>
                                        <button className="bg-transparent pb-2 text-left">Resign</button>
                                      </PopoverContent>
                                        </Popover>
                                 
                                        </TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell className="text-center" >2</TableCell>
                                        <TableCell className="text-center" >Indranil Datta</TableCell>
                                        <TableCell className="text-center" >PAYC00002</TableCell>
                                        <TableCell className="text-center" >Supervisor</TableCell>
                                        <TableCell className="text-center" >2024-03-20</TableCell>
                                        <TableCell className="text-center" >9876545641</TableCell>
                                        <TableCell className="text-center" >idatta@gmail.com</TableCell>
                                        <TableCell className="text-center" >Resigned</TableCell>
    
                                        <TableCell className="text-center" >
                                        <Popover>
                                        <PopoverTrigger><button className="bg-green-500 p-2 text-white rounded">Action</button>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col w-30 text-sm font-medium"><button className="bg-transparent pb-2 text-left">Modify</button>
                                        <button className="bg-transparent pb-2 text-left">Delete</button>
                                        <button className="bg-transparent pb-2 text-left">Resign</button></PopoverContent>
                                       
                                        </Popover>
                                 
                                        </TableCell>
                                    </TableRow>
                                
                       
                    </TableBody>
                </Table>
        </div>
    )

}
export default EmployeeTable;