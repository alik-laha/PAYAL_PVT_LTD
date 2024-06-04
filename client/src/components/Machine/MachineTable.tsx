import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { pageNo, pagelimit } from "../common/exportData"
//import { saveAs } from 'file-saver';
//import * as XLSX from 'xlsx';
import { useState } from "react"
import { LuDownload } from "react-icons/lu";
import { Section } from "../common/exportData"
import { FaSearch } from "react-icons/fa"
import axios from "axios"
import { AssetData } from "@/type/type"

const MachineTable = () => {
    //const currDate = new Date().toLocaleDateString();
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [section, setSection] = useState<string>("")
    const [assetidname, setassetidname] = useState<string>("")
    const [
        , setData] = useState<AssetData[]>([])
    
    
    const handleSearch = async () => {

        const response = await axios.put('/asset/assetSearch', {
            assetidname: assetidname,
            section: section,
            
        }, {
            params: {
                page: page,
                limit: limit
            }
        })
        const data = await response.data
        if (data.rcnEntries.length === 0 && page > 1) {
            setPage((prev) => prev - 1)

        }

        setData(data.rcnEntries)
      
    }
    const exportToExcel = async () => {}
    
return(
    <>
        <div className="ml-5 mt-5">
            <div className="flex ">

                <Input className="w-1/3 mb-2" placeholder="Asset Id"  value={assetidname} onChange={(e) => setassetidname(e.target.value)} />
                <select className=' flex h-8 w-1/3 ml-5 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setSection(e.target.value)} value={section}>
                    <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Section (All)</option>
                    {Section.map((data, index) => (
                        <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                            {data}
                        </option>
                    ))}
                </select>
                <span className="w-1/3 pl-5 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>
            </div>

            <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}>
                <LuDownload size={18} /></Button>  </span>

            <Table className="mt-1">
                <TableHeader className="bg-neutral-100 text-stone-950 ">
                <TableHead className="text-center" >Sl No.</TableHead>
                    <TableHead className="text-center" >Asset ID</TableHead>
                    <TableHead className="text-center" >Asset Name </TableHead>
                    <TableHead className="text-center" >Status </TableHead>
                    <TableHead className="text-center" >Section </TableHead>
                    <TableHead className="text-center" >Description</TableHead>
                    <TableHead className="text-center" >Created By</TableHead>
                    <TableHead className="text-center" >Action</TableHead>




                </TableHeader>

                <TableBody>
                <TableRow>
                <TableCell></TableCell>
                </TableRow>
                   
                    </TableBody>
                </Table>
                <Pagination className="pt-5 ">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setPage((prev) => {
                            if (prev === 1) {
                                return prev
                            }
                            return prev - 1
                        })} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">{page}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={() => setPage((prev) => prev + 1)} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    
    
    
    </>
)
}
export default MachineTable