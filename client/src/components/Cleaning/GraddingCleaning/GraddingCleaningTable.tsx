import { Input } from "../../ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import React, { useEffect } from "react";
import axios from "axios";
import { AssetData } from "@/type/type";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ViewallImage from "../ViewallImage";



const GraddingMaintenanceTable = () => {
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [allMachine, setAllMachine] = React.useState<AssetData[]>([]);
    const [mc_name, setMc_name] = React.useState<string>('');
    const [CleanTable, setCleanTable] = React.useState([]);
    const [imageView, setImageView] = React.useState<string[]>([]);

    const successdialog = document.getElementById('myDialog') as HTMLInputElement;
    const closeDialogButton = document.getElementById('closeDialog') as HTMLInputElement;

    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (successdialog != null) {
                (successdialog as any).close();
            }


        });
    }

    const handleTodate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.value;
        if (!selected) {
            settoDate('')
            sethidetoDate('')
            return
        }
        const date = new Date(selected)
        date.setDate(date.getDate() + 1);
        const nextday = date.toISOString().split('T')[0];
        sethidetoDate(selected)
        settoDate(nextday)
    }

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        axios.post('/api/cleaning/graddingcleanreportview', { fromdate, todate, mc_name })
            .then((res) => {
                setCleanTable(res.data)

            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        axios.get('/api/asset/getMachineByType/Grading')
            .then((res) => {
                console.log(res)
                setAllMachine(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])
    useEffect(() => {

        axios.post('/api/cleaning/graddingcleanreportview')
            .then((res) => {
                setCleanTable(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    const CheackRate = (rate: number) => {
        if (rate > 90) {
            return 'Too Good'
        } else if (rate > 80 && rate < 90) {
            return 'Very Good'
        } else if (rate > 60 && rate < 80) {
            return 'Good'
        }
        else if (rate > 40 && rate < 60) {
            return 'Average'
        }
        else if (rate > 20 && rate < 40) {
            return 'Poor'
        }
        else if (rate < 20) {
            return 'Very Poor'
        }
    }

    const cheackRateColor = (rate: number) => {
        if (rate > 90) {
            return 'bg-green-500'
        } else if (rate > 80 && rate < 90) {
            return 'bg-green-300'
        } else if (rate > 60 && rate < 80) {
            return 'bg-yellow-500'
        }
        else if (rate > 40 && rate < 60) {
            return 'bg-yellow-300'
        }
        else if (rate > 20 && rate < 40) {
            return 'bg-red-300'
        }
        else if (rate < 20) {
            return 'bg-red-500'
        }
    }
    return (
        <div className="ml-5 mt-5 ">
            <div className="flex flexbox-search">
                <select className='flexbox-search-width flex h-8 w-1/5 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setMc_name(e.target.value)} value={mc_name}>
                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Origin (All)</option>
                    {allMachine.map((data, index) => (
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data.machineName} key={index}>
                            {data.machineName}
                        </option>
                    ))}
                </select>

                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left ">From </label>
                <Input className="w-1/6 flexbox-search-width-calender"
                    type="date"
                    value={fromdate}
                    onChange={(e) => setfromDate(e.target.value)}
                    placeholder="From Date"

                />
                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">To </label>
                <Input className="w-1/6 flexbox-search-width-calender"
                    type="date"
                    value={hidetodate}
                    onChange={handleTodate}
                    placeholder="To Date"

                />


                <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

            </div>
            <Table className="mt-5">
                <TableHeader>
                    <TableHead>Sl No</TableHead>
                    <TableHead>MC Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Clean Rate</TableHead>
                    <TableHead>Damage</TableHead>
                    <TableHead>View Clean Image</TableHead>
                    <TableHead>View Damage Image</TableHead>
                    <TableHead>View Clean Data</TableHead>
                </TableHeader>
                <TableBody>
                    {CleanTable.map((data: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{data.mc_name}</TableCell>
                            <TableCell>{data.date.slice(0, 10)}</TableCell>
                            <TableCell className={cheackRateColor(data.percentage)}>{CheackRate(data.percentage)}</TableCell>
                            <TableCell>{data.damage === true ? "Yes" : "No"}</TableCell>
                            <TableCell><Button onClick={() => {
                                if (JSON.parse(data.cleanedPartsImages).length === 0) {
                                    return
                                }
                                setImageView(JSON.parse(data.cleanedPartsImages));
                                (successdialog as any).showModal()
                            }}>View</Button></TableCell>
                            <TableCell><Button onClick={() => {
                                if (JSON.parse(data.damagedPartsImages).length === 0) {
                                    return
                                }
                                setImageView(JSON.parse(data.damagedPartsImages));
                                (successdialog as any).showModal()
                            }}>View</Button></TableCell>
                            <TableCell><Button className="bg-slate-500 h-8">View</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* {
                DamageReportImage.length > 0 && <ViewallImage url={DamageReportImage} />
            } */}
            <dialog id="myDialog" className="dashboard-modal">
                <button id="closeDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex">{
                    <ViewallImage url={imageView} />
                }
                </span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

        </div >
    )
}
export default GraddingMaintenanceTable