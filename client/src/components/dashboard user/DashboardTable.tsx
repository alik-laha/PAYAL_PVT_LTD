import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
   
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

import { Input } from "../ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  import {
    Dialog,
    DialogContent,
    
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DashboardUserModifyForm from './DashboardUserModifyForm'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

const EmployeeTable = () => {
    
    return (
        <div className="ml-5 mt-5">
            <div className="flex ">
            
            <Input className="w-60 mb-10" placeholder="Search By User Name"/>
            
            </div>
            

            
            <Table className="mt-1">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        
                            <TableHead  className="text-center" >Id</TableHead>
                            <TableHead className="text-center" >Emp name</TableHead>
                            <TableHead className="text-center" >User Name </TableHead>
                            <TableHead className="text-center" >Department </TableHead>
                            <TableHead className="text-center" >Role </TableHead>
                            <TableHead className="text-center" >Action</TableHead>
                        
                    </TableHeader>
                    <TableBody>
                    
                        
                            
                                    <TableRow >
                                        <TableCell className="text-center" >1</TableCell>
                                        <TableCell className="text-center" >Sumit Datta</TableCell>
                                        <TableCell className="text-center" >Sumit_PAY</TableCell>
                                        <TableCell className="text-center" >Admin</TableCell>
                                        <TableCell className="text-center" >Admin-Supervisor</TableCell>
                                        <TableCell className="text-center" >

                                        <Popover>
                                        <PopoverTrigger><button className="bg-green-500 p-2 text-white rounded">Action</button>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                            
                                        <Dialog>
                                        <DialogTrigger>   <button className="bg-transparent pb-2 text-left">Modify</button></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>User Modification</p></DialogTitle>
                                        
                                            </DialogHeader>

                                            <DashboardUserModifyForm/>
                                        </DialogContent>
                                    </Dialog>

                                            <AlertDialog>
                                            <AlertDialogTrigger><button className="bg-transparent text-left">Delete</button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete User Data
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction>Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                            </AlertDialog>
                                      </PopoverContent>
                                        </Popover>
                                 
                                        </TableCell>
                                    </TableRow>



                                    <TableRow >
                                        <TableCell className="text-center" >2</TableCell>
                                        <TableCell className="text-center" >Indranil Datta</TableCell>
                                        <TableCell className="text-center" >INDRA_PAy</TableCell>
                                        <TableCell className="text-center" >Production</TableCell>
                                        <TableCell className="text-center" >Production-Manager</TableCell>
    
                                      

                                        <TableCell className="text-center" >

<Popover>
<PopoverTrigger><button className="bg-green-500 p-2 text-white rounded">Action</button>
</PopoverTrigger>
<PopoverContent className="flex flex-col w-30 text-sm font-medium">
    
<Dialog>
<DialogTrigger>   <button className="bg-transparent pb-2 text-left">Modify</button></DialogTrigger>
<DialogContent>
    <DialogHeader>
        <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>User Modification</p></DialogTitle>

    </DialogHeader>

    <DashboardUserModifyForm/>
</DialogContent>
</Dialog>

    <AlertDialog>
    <AlertDialogTrigger><button className="bg-transparent text-left">Delete</button></AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone. This will permanently delete User Data
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>


    
    
    

    
    {/* <button className="bg-transparent pb-2 text-left">Modify</button> */}
{/* <button className="bg-transparent pb-2 text-left">Delete</button> */}
{/* <button className="bg-transparent pb-2 text-left">Resign</button> */}
</PopoverContent>
</Popover>

</TableCell>
                                    </TableRow>
                                
                       
                    </TableBody>
                </Table>
                <Pagination className="pt-5 ">
                                <PaginationContent>
                                    <PaginationItem>
                                    <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    
                                    <PaginationItem>
                                    <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                    <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
        </div>
    )

}
export default EmployeeTable;