import React, { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import axios from 'axios'
import { Origin } from '../common/exportData'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { AssetData } from '@/type/type'
import Context from '../context/context'


const RcnGradingCreateForm = () => {
    const DateRef = useRef<HTMLInputElement>(null)
    const [origin, setOrigin] = useState<string>('')
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
    const [Mc_breakdown, setMc_breakdown] = useState<string>("00:00")
    const [otherTime, setOtherTime] = useState<string>("00:00")
    const [errortext, setErrortext] = useState('')
    const grading_lotNoRef = useRef<HTMLInputElement>(null)
    const [originStock, setOriginStock] = useState(0)



   

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
        const noOfEmployees = noofEmployeeRef.current?.value
        const grading_lotNo = grading_lotNoRef.current?.value
        const Mc_name = mc_name
        console.log(Mc_off)
        axios.post('/api/grading/createGrading', { date, origin, A, B, C, D, E, F, G, dust, Mc_name, Mc_on, Mc_off, noOfEmployees, Mc_breakdown, otherTime, grading_lotNo })
            .then(res => {
                setErrortext(res.data.message)
                if (res.status === 200) {
                    const dialog = document.getElementById("successemployeedialog") as HTMLDialogElement
                    dialog.showModal()
                    setTimeout(() => {
                        dialog.close()
                        window.location.reload()
                    }, 2000)
                }
            })
            .catch(err => {
                console.log(err.response.data.message)
                setErrortext(err.response.data.message)
                const dialog = document.getElementById("erroremployeedialog") as HTMLDialogElement
                dialog.showModal()
                setTimeout(() => {
                    dialog.close()
                }, 2000)
            })
    }
    const handleoriginStock = (value:string) => {
        //e.preventDefault();
        setOriginStock(0)
        setOrigin(value)
        axios.get(`/api/rcnprimary/getStockByOrigin/${value}`)
        .then(res => {
            console.log(res.data.AllOriginRcnPrimary[0].totalBags)
            if(res.data.AllOriginRcnPrimary){
                setOriginStock(res.data.AllOriginRcnPrimary[0].totalBags)
            }
            
        })
        .catch(err => {
            console.log(err)
        })
    
    }
    const { AllMachines } = useContext(Context)
    return (
        <div className="pl-5 pr-5 ">
            <form className='flex flex-col gap-1 text-xs' onSubmit={handleSubmit}>


            
            <div className="flex">
                    <Label className="w-2/4 bg-green-500 text-center rounded-md pt-2 mr-1 text-primary-foreground">MC ON  </Label>
                    <Input className="w-3/5  justify-center bg-green-100 mr-1" placeholder="MC ON Time" ref={mc_onRef} type='time' required />
                    <Input className="w-3/5 justify-center bg-red-100 ml-1" placeholder="MC OFF Time" ref={mc_offRef} type='time' required />
                    <Label className="w-2/4 bg-red-500 rounded-md text-white-600 text-center pt-2 ml-1 text-primary-foreground">MC OFF</Label>
                   
                </div> 
                <div className="flex mt-3">
                    <Label className="w-1/3 pt-2 text-center">Origin</Label>
                    <Select value={origin} onValueChange={(value) => handleoriginStock(value)} required>
                        <SelectTrigger className="w-1/3">
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
                    <Label className="w-1/3 pt-2 text-center text-red-500">Stock  : {originStock} Bag</Label>
                </div>

                <div className="flex mt-3">

                    <Label className="w-1/4 pt-2 ">A </Label>
                    <Input className="w-2/4 justify-center bg-cyan-100 text-center" placeholder="Bag" ref={aRef} type='number' required />
                    <Label className="w-2/4 pt-2 text-center">B </Label>
                    <Input className="w-2/4 bg-cyan-100 text-center" placeholder="Bag" ref={bRef} type='number' required /> </div>

                <div className="flex">
                    <Label className="w-1/4 pt-2">C </Label>
                    <Input className="w-2/4 bg-cyan-100 text-center" placeholder="Bag" ref={cRef} type='number' required />
                    <Label className="text-center w-2/4 pt-2">D </Label>
                    <Input className="w-2/4 bg-cyan-100 text-center" placeholder="Bag" ref={dRef} type='number' required /> </div>



                <div className="flex">
                    <Label className="w-1/4 pt-2">E </Label>
                    <Input className="w-2/4 bg-cyan-100 text-center" placeholder="Bag" ref={eRef} type='number' required />
                    <Label className="w-2/4 pt-2 text-center">F </Label>
                    <Input className="w-2/4 bg-cyan-100 text-center" placeholder="Bag" ref={fRef} type='number' required />
                </div>

                <div className="flex">
                    <Label className="w-1/4 pt-2">G </Label>
                    <Input className="w-2/4 bg-cyan-100 text-center" placeholder="Bag" ref={gRef} type='number' required />
                    <Label className="w-2/4 pt-2 text-center">Dust </Label>
                    <Input className="w-2/4 bg-cyan-100 text-center" placeholder="Bag" ref={dustRef} type='number' required />
                </div>




               
                  
                <div className="flex mt-2">
                    <Label className="w-2/4 pt-1 ">Machine Name</Label>
                    <Select value={mc_name} onValueChange={(value) => setMc_name(value)} required={true}>
                        <SelectTrigger className="w-2/4">
                            <SelectValue placeholder="Machine Name" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    AllMachines.map((item: AssetData, indx) => {
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
                    <Label className="w-2/4 pt-2">MC Breakdown (Total) </Label>
                    <Input className="w-2/4 justify-center " placeholder="MC BreakDown" value={Mc_breakdown} type='time' onChange={(e) => setMc_breakdown(e.target.value)} />
                </div>

                <div className="flex ">
                    <Label className="w-2/4 pt-2">Other Duration (Total)</Label>
                    <Input className="w-2/4 justify-center " placeholder="Other Time" value={otherTime} type='time' onChange={(e) => setOtherTime(e.target.value)} />
                </div>
            
                

                <div className="flex ">
                    <Label className="w-2/4 pt-1">Date</Label>
                    <Input className="w-2/4 justify-center" placeholder="Date" ref={DateRef} type='date' required /> </div>

                



                <div className="flex">
                    <Label className="w-2/4 pt-2">No of Labours</Label>
                    <Input className="w-2/4 text-center" placeholder="No of Labours" ref={noofEmployeeRef} type='number' required />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-2">Garding Lot (Optional)</Label>
                    <Input className="w-2/4 text-center" placeholder="Lot No." ref={grading_lotNoRef} />
                </div>




                <div>
                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
                </div>

            </form>
            <dialog id="successemployeedialog" className="dashboard-modal">
                <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p>
                </span>


            </dialog>

            <dialog id="erroremployeedialog" className="dashboard-modal">
                <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p>
                </span>


            </dialog>




        </div>
    )
}
export default RcnGradingCreateForm;
