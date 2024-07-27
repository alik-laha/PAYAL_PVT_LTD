import { useContext, useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Origin } from "../common/exportData"
import React from "react"
import axios from "axios"
import { QcRcnEntryData } from "@/type/type"
import { pageNo, pagelimit } from "../common/exportData"
import { FaSearch } from "react-icons/fa"
import { LuDownload } from "react-icons/lu"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { format, toZonedTime } from 'date-fns-tz'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,

    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FcApprove, FcDisapprove } from "react-icons/fc"
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { pendingCheckRole } from '../common/exportData';
import { QcRcnEntryExcelData, PermissionRole, pendingCheckRoles } from "@/type/type";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Context from "../context/context"


const PackagingMetirialQualityTable = () => {



    const handleSearchPendingQC = () => {

    }
    const handleSearchPendingEdit = () => {

    }

    return (
        <div>
            {/* <Button className="bg-lime-500 mb-5 mt-5 max-w-52 responsive-button-adjust" onClick={handleSearchPendingQC} disabled={pendingqccount === 0 ? true : false}>Pending QC ({pendingqccount})</Button>
            {checkpending('QCRCN') && <Button className="bg-orange-400 mb-5 ml-4 max-w-52 responsive-button-adjust responsive-no-margin" onClick={handleSearchPendingEdit} disabled={counteditpending === 0 ? true : false}>
                Pending Edit ({counteditpending})</Button>} */}

        </div>
    )
}
export default PackagingMetirialQualityTable