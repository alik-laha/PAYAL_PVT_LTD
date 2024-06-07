import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import axios from 'axios'
import { Origin } from '../common/exportData'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { AssetData } from '@/type/type'


const RcnGraddingModifyForm = () => {
    const [origin, setOrigin] = useState<string>('')
    const [AllMachine, setAllMachine] = useState([])
    const [mc_name, setMc_name] = useState('')
    const [errortext, setErrortext] = useState('')
    const [date, setDate] = useState('')
    const [A, setA] = useState('')
    const [B, setB] = useState('')
    const [C, setC] = useState('')
    const [D, setD] = useState('')
    const [E, setE] = useState('')
    const [F, setF] = useState('')
    const [G, setG] = useState('')
    const [dust, setDust] = useState('')
    const [mc_on, setMc_on] = useState('')
    const [mc_off, setMc_off] = useState('')
    const [noOfEmployees, setNoOfEmployees] = useState('')
    const [mc_breakdown, setMc_breakdown] = useState('')
    const [otherTime, setOtherTime] = useState('')
    const [grading_lotNo, setGrading_lotNo] = useState('')


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

    }
    useEffect(() => {
        axios.get('/api/asset/getMachineByType/Grading')
            .then(res => {
                console.log(res.data)
                setAllMachine(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div className="pl-10 pr-10 ">
            <form className='flex flex-col  text-xs' onSubmit={handleSubmit}>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Date</Label>
                    <Input className="w-2/4 " placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} type='date' /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Origin</Label>
                    <Select value={origin} onValueChange={(value) => setOrigin(value)}>
                        <SelectTrigger className="w-2/4">
                            <SelectValue placeholder="Origin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    Origin.map((item) => {
                                        return (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>


                <div className="flex">
                    <Label className="w-2/4 pt-1">A</Label>
                    <Input className="w-2/4 " placeholder="A" value={A} onChange={(e) => setA(e.target.value)} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">B</Label>
                    <Input className="w-2/4 " placeholder="B" value={B} onChange={(e) => setB(e.target.value)} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">C</Label>
                    <Input className="w-2/4 " placeholder="C" value={C} onChange={(e) => setC(e.target.value)} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">D</Label>
                    <Input className="w-2/4 " placeholder="D" value={D} onChange={(e) => setD(e.target.value)} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">E</Label>
                    <Input className="w-2/4 " placeholder="E" value={E} onChange={(e) => setE(e.target.value)} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">F</Label>
                    <Input className="w-2/4 " placeholder="F" value={F} onChange={(e) => setF(e.target.value)} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">G</Label>
                    <Input className="w-2/4 " placeholder="G" value={G} onChange={(e) => setG(e.target.value)} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Dust</Label>
                    <Input className="w-2/4 " placeholder="Dust" value={dust} onChange={(e) => setDust(e.target.value)} type='number' step="0.01" /> </div>


                <div className="flex">
                    <Label className="w-2/4 pt-1">Mechine Name</Label>
                    <Select value={mc_name} onValueChange={(value) => setMc_name(value)}>
                        <SelectTrigger className="w-2/4">
                            <SelectValue placeholder="Machine" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    AllMachine.map((item: AssetData, indx) => {
                                        return (
                                            <SelectItem key={indx} value={item.machineName}>
                                                {item.machineName}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">MC ON Time</Label>
                    <Input className="w-2/4 " placeholder="MC ON Time" value={mc_on} onChange={(e) => setMc_on(e.target.value)} type='time' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">MC Off Time</Label>
                    <Input className="w-2/4 " placeholder="MC ON Time" value={mc_off} onChange={(e) => setMc_off(e.target.value)} type='time' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">MC Breek Down</Label>
                    <Input className="w-2/4 " placeholder="MC BreakDown" value={mc_breakdown} onChange={(e) => setMc_breakdown(e.target.value)} type='time' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Other Time</Label>
                    <Input className="w-2/4 " placeholder="Other Time" value={otherTime} onChange={(e) => setOtherTime(e.target.value)} type='time' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">No of Employee</Label>
                    <Input className="w-2/4 " placeholder="No of Employee" value={noOfEmployees} onChange={(e) => setNoOfEmployees(e.target.value)} type='number' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Grading Lot No</Label>
                    <Input className="w-2/4 " placeholder="Graddimng lot No" value={grading_lotNo} onChange={(e) => setGrading_lotNo(e.target.value)} />
                </div>




                <div>
                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
                </div>

            </form>
            <dialog id="successemployeedialog" className="dashboard-modal">
                <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p></span>


            </dialog>

            <dialog id="erroremployeedialog" className="dashboard-modal">
                <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>


            </dialog>




        </div>
    )
}
export default RcnGraddingModifyForm;