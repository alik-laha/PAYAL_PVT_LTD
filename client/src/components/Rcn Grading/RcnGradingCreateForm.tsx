import React, { useEffect, useRef, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import axios from 'axios'
import { Origin } from '../common/exportData'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { AssetData } from '@/type/type'


const RcnGradingCreateForm = () => {
    const DateRef = useRef<HTMLInputElement>(null)
    const [origin, setOrigin] = useState<string>('')
    const [AllMachine, setAllMachine] = useState([])
    const aRef = useRef<HTMLInputElement>(null)
    const bRef = useRef<HTMLInputElement>(null)
    const cRef = useRef<HTMLInputElement>(null)
    const dRef = useRef<HTMLInputElement>(null)
    const eRef = useRef<HTMLInputElement>(null)
    const fRef = useRef<HTMLInputElement>(null)
    const gRef = useRef<HTMLInputElement>(null)
    const dustRef = useRef<HTMLInputElement>(null)
    const [mc_name, setMc_name] = useState('')
    const mc_onRef = useRef<HTMLInputElement>(null)
    const mc_offRef = useRef<HTMLInputElement>(null)
    const noofEmployeeRef = useRef<HTMLInputElement>(null)
    const mc_breakdownRef = useRef<HTMLInputElement>(null)
    const [errortext, setErrortext] = useState('')
    const otherRef = useRef<HTMLInputElement>(null)
    const grading_lotNoRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const date = DateRef.current?.value
        const A = aRef.current?.value
        const B = bRef.current?.value
        const C = cRef.current?.value
        const D = dRef.current?.value
        const E = eRef.current?.value
        const F = fRef.current?.value
        const G = gRef.current?.value
        const dust = dustRef.current?.value
        const Mc_on = mc_onRef.current?.value
        const Mc_off = mc_offRef.current?.value
        const Mc_breakdown = mc_breakdownRef.current?.value
        const noOfEmployees = noofEmployeeRef.current?.value
        const otherTime = otherRef.current?.value
        const grading_lotNo = grading_lotNoRef.current?.value
        const Mc_name = mc_name
        console.log(Mc_off)
        axios.post('/api/gradding/createGrading', { date, origin, A, B, C, D, E, F, G, dust, Mc_name, Mc_on, Mc_off, noOfEmployees, Mc_breakdown, otherTime, grading_lotNo })
            .then(res => {
                if (res.status === 200) {
                    const dialog = document.getElementById("successemployeedialog") as HTMLDialogElement
                    dialog.showModal()
                    setTimeout(() => {
                        dialog.close()
                    }, 2000)
                }
            })
            .catch(err => {
                setErrortext(err.data.message)
            })
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
                    <Input className="w-2/4 " placeholder="Date" ref={DateRef} type='date' /> </div>

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
                    <Input className="w-2/4 " placeholder="A" ref={aRef} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">B</Label>
                    <Input className="w-2/4 " placeholder="B" ref={bRef} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">C</Label>
                    <Input className="w-2/4 " placeholder="C" ref={cRef} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">D</Label>
                    <Input className="w-2/4 " placeholder="D" ref={dRef} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">E</Label>
                    <Input className="w-2/4 " placeholder="E" ref={eRef} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">F</Label>
                    <Input className="w-2/4 " placeholder="F" ref={fRef} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">G</Label>
                    <Input className="w-2/4 " placeholder="G" ref={gRef} type='number' step="0.01" /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Dust</Label>
                    <Input className="w-2/4 " placeholder="Dust" ref={dustRef} type='number' step="0.01" /> </div>


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
                    <Input className="w-2/4 " placeholder="MC ON Time" ref={mc_onRef} type='time' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">MC Off Time</Label>
                    <Input className="w-2/4 " placeholder="MC ON Time" ref={mc_offRef} type='time' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">MC Breek Down</Label>
                    <Input className="w-2/4 " placeholder="MC BreakDown" ref={mc_breakdownRef} type='time' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Other Time</Label>
                    <Input className="w-2/4 " placeholder="Other Time" ref={otherRef} type='time' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">No of Employee</Label>
                    <Input className="w-2/4 " placeholder="No of Employee" ref={noofEmployeeRef} type='number' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Grading Lot No</Label>
                    <Input className="w-2/4 " placeholder="Graddimng lot No" ref={grading_lotNoRef} />
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
export default RcnGradingCreateForm;
