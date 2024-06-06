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
    const mc_breakdown = useRef<HTMLInputElement>(null)
    const [errortext, setErrortext] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const date = DateRef.current?.value
        console.log(date)
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
            <form className='flex flex-col gap-0.5 text-xs' onSubmit={handleSubmit}>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Date</Label>
                    <Input className="w-2/4 " placeholder="Date" ref={DateRef} /> </div>

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
                    <Input className="w-2/4 " placeholder="A" ref={aRef} /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">B</Label>
                    <Input className="w-2/4 " placeholder="B" ref={bRef} /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">C</Label>
                    <Input className="w-2/4 " placeholder="C" ref={cRef} /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">D</Label>
                    <Input className="w-2/4 " placeholder="D" ref={dRef} /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">E</Label>
                    <Input className="w-2/4 " placeholder="E" ref={eRef} /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">F</Label>
                    <Input className="w-2/4 " placeholder="F" ref={fRef} /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">G</Label>
                    <Input className="w-2/4 " placeholder="G" ref={gRef} /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Dust</Label>
                    <Input className="w-2/4 " placeholder="Dust" ref={dustRef} /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Mechine Name</Label>
                    <Select value={mc_name} onValueChange={(value) => setMc_name(value)}>
                        <SelectTrigger className="w-2/4">
                            <SelectValue placeholder="Origin" />
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




                <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
            </form>
            <dialog id="successemployeedialog" className="dashboard-modal">
                <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="erroremployeedialog" className="dashboard-modal">
                <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>




        </div>
    )
}
export default RcnGradingCreateForm;
