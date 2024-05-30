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

  import {
    Dialog,
    DialogContent,
    
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmployeeModifyForm from './EmployeeModifyForm'
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
                                        <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                            
                                        <Dialog>
                                        <DialogTrigger>   <button className="bg-transparent pb-2 text-left">Modify</button></DialogTrigger>
                                        <DialogContent className='max-w-6xl'>
                                            <DialogHeader>
                                                <DialogTitle><p className='text-1xl pb-1 text-center mt-3 mb-5'>Modify Employee</p></DialogTitle>
                                        
                                            </DialogHeader>

                                            <EmployeeModifyForm/>
                                        </DialogContent>
                                    </Dialog>

                                            <AlertDialog>
                                            <AlertDialogTrigger><button className="bg-transparent pb-2 text-left">Delete</button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete employee Data
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction>Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                            </AlertDialog>

                                            <AlertDialog>
                                            <AlertDialogTrigger><button className="bg-transparent text-left"><button className="bg-transparent pb-2 text-left">Resign</button></button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure want to Resign?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will remove user profile Linked to It.
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