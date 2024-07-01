import React, { ChangeEvent, useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { Origin } from '../common/exportData'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { AssetData } from '@/type/type'
import Context from '../context/context'
import { useContext } from 'react'
import axios from 'axios'
interface RcnGraddingModifyFormProps {
    data: {
        id: number;
        origin: string;
        A: string;
        B: string;
        C: string;
        D: string;
        E: string;
        F: string;
        G: string;
        dust: string;
        Mc_name: string;
        Mc_on: string;
        Mc_off: string;
        noOfEmployees: number;
        Mc_breakdown: string;
        otherTime: string;
        date: string;
        grading_lotNo: string;
    }
}

const RcnGraddingModifyForm = (props: RcnGraddingModifyFormProps) => {
    const [origin, setOrigin] = useState<string>('')
    const [Mc_name, setMc_name] = useState('')
    //const [errortext, setErrortext] = useState('')
    const [date, setDate] = useState('')
    const [A, setA] = useState<string>()
    const [B, setB] = useState<string>()
    const [C, setC] = useState<string>()
    const [D, setD] = useState<string>()
    const [E, setE] = useState<string>()
    const [F, setF] = useState<string>()
    const [G, setG] = useState<string>()
    const [dust, setDust] = useState<string>()
    const [dustkg, setDustkg] = useState<string>()
    const [Mc_on, setMc_on] = useState('')
    const [Mc_off, setMc_off] = useState('')
    const [noOfEmployees, setNoOfEmployees] = useState<number>()
    const [Mc_breakdown, setMc_breakdown] = useState('00:00')
    const [otherTime, setOtherTime] = useState('00:00')
    const [grading_lotNo, setGrading_lotNo] = useState('')
    const [errortext, setErrortext] = useState('')
    const [originStock, setOriginStock] = useState<number>(0)
    //const [originoldStock, setOriginoldStock] = useState<number>(0)
    const dialog = document.getElementById("erroremployeedialog") as HTMLDialogElement
    const rejectcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;
    if (rejectcloseDialogButton) {
        rejectcloseDialogButton.addEventListener('click', () => {
            if (dialog != null) {
                (dialog as any).close();
                return
            }
        });
    }

    function formatNumber(num:any) {
        return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
    }
    const handleoriginStock = (value:string) => {
      
        setOrigin(value)
        axios.get(`/api/grading/getGradeStockByOrigin/${value}`)
        .then(res => {
          if(res.data.finalSum){

            if(value===props.data.origin){
                setOriginStock(parseFloat(res.data.finalSum)+
                parseFloat(props.data.A)+parseFloat(props.data.B)
                +parseFloat(props.data.C)+parseFloat(props.data.D)
                    +parseFloat(props.data.E)+parseFloat(props.data.F)
                    +parseFloat(props.data.G)+parseFloat(props.data.dust))
                    
            }
            else{
                setOriginStock(res.data.finalSum)
            }
            
          }
          else{
            setOriginStock(0)
          }           
        })
        .catch(err => {
            console.log(err)
        })

      
    
    }
    const handleDustChange = (e: ChangeEvent<HTMLInputElement>) => {
        //e.preventDefault()
        setDustkg((e.target.value))
        setDust((parseFloat(e.target.value)/80).toString())
        console.log(dust)

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const sumGrade=(A?Number(A):0)+(B?Number(B):0)+(C?Number(C):0)+(D?Number(D):0)+(E?Number(E):0)
        +(F?Number(F):0)+(G?Number(G):0)+(dust?Number(dust):0)
        if (sumGrade > originStock)
            {
           setErrortext('Total Bag Cannot Exceed Stock Left')
          
           dialog.showModal()
           return
           


       }
        axios.put(`/api/grading/updateGrading/${props.data.id}`, { date, origin, A, B, C, D, E, F, G, dust, Mc_name, Mc_on, Mc_off, noOfEmployees, otherTime, grading_lotNo, Mc_breakdown })
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
    useEffect(() => {
        setOrigin(props.data.origin)
        setDate(new Date(props.data.date).toISOString().slice(0, 10))
        setA(formatNumber(props.data.A))
        setB(props.data.B)
        setC(props.data.C)
        setD(props.data.D)
        setE(props.data.E)
        setF(props.data.F)
        setG(props.data.G)
        setDust(props.data.dust)
        setMc_name(props.data.Mc_name)
        setMc_on(props.data.Mc_on)
        setMc_off(props.data.Mc_off)
        setNoOfEmployees(props.data.noOfEmployees)
        setMc_breakdown(props.data.Mc_breakdown)
        setOtherTime(props.data.otherTime)
        setGrading_lotNo(props.data.grading_lotNo)
        setDustkg((formatNumber(parseFloat(props.data.dust))*80).toString())
  
        axios.get(`/api/grading/getGradeStockByOrigin/${props.data.origin}`)
        .then(res => {
          if(res.data.finalSum){
            setOriginStock(parseFloat(res.data.finalSum)+
                parseFloat(props.data.A)+parseFloat(props.data.B)
                +parseFloat(props.data.C)+parseFloat(props.data.D)
                    +parseFloat(props.data.E)+parseFloat(props.data.F)
                    +parseFloat(props.data.G)+parseFloat(props.data.dust))
          }        
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    const { AllMachines } = useContext(Context)
    return (
        <div className="pl-5 pr-5  ">
            <form className='flex flex-col gap-1 text-xs' onSubmit={handleSubmit}>
            <div className="flex">
                    <Label className="w-1/6 pt-1">Origin</Label>
                    <Select value={origin} onValueChange={(value) => handleoriginStock(value)}>
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
                    <Label className="w-1/3 pt-1 ml-2 text-center font-semibold text-red-500">Stock  : {originStock} Bag</Label>
                </div>
                <div className="flex mt-2">
                    
                    <Label className="w-1/4 pt-2">A</Label>
                    <Input className="w-2/4 bg-cyan-100" placeholder="Bag" value={A} onChange={(e) => setA(e.target.value)} type='number' required />
                    <Label className="w-2/4 pt-2 text-center">B</Label>
                    <Input className="w-2/4 bg-cyan-100" placeholder="Bag" value={B} onChange={(e) => setB(e.target.value)} type='number' required />
                </div>

                <div className="flex">
                    <Label className="w-1/4 pt-2">C</Label>
                    <Input className="w-2/4 bg-cyan-100" placeholder="Bag" value={C} onChange={(e) => setC(e.target.value)} type='number' required />
                    <Label className="w-2/4 pt-2 text-center">D</Label>
                    <Input className="w-2/4 bg-cyan-100" placeholder="bag" value={D} onChange={(e) => setD(e.target.value)} type='number' required />
                </div>

                <div className="flex">
                    <Label className="w-1/4 pt-2">E</Label>
                    <Input className="w-2/4 bg-cyan-100" placeholder="Bag" value={E} onChange={(e) => setE(e.target.value)} type='number' required />
                    <Label className="w-2/4 pt-2 text-center">F</Label>
                    <Input className="w-2/4 bg-cyan-100" placeholder="Bag" value={F} onChange={(e) => setF(e.target.value)} type='number' required />
                </div>

                <div className="flex">
                    <Label className="w-1/4 pt-2">G</Label>
                    <Input className="w-2/4 bg-cyan-100" placeholder="Bag" value={G} onChange={(e) => setG(e.target.value)} type='number' required />
                    <Label className="w-2/4 pt-2 text-center">Dust (kg)</Label>
                    <Input className="w-2/4 bg-cyan-100" placeholder="Kg" value={dustkg} onChange={(e) => handleDustChange(e)} type='number' required />
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Machine Name</Label>
                    <Select value={Mc_name} onValueChange={(value) => setMc_name(value)}>
                        <SelectTrigger className="w-2/4">
                            <SelectValue placeholder="Machine" />
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
                    <Label className="w-1/4 pt-2">ON</Label>
                    <Input className="w-2/4 bg-cyan-100" placeholder="MC ON Time" value={Mc_on} onChange={(e) => setMc_on(e.target.value)} type='time' />
                    <Label className="w-2/4 pt-2 text-center">OFF</Label>
                    <Input className="w-2/4 bg-cyan-100" placeholder="MC ON Time" value={Mc_off} onChange={(e) => setMc_off(e.target.value)} type='time' />
                </div>

                <div className="flex">

                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-2">Break Down Duration(Total)</Label>
                    <Input className="w-2/4 " placeholder="MC BreakDown" value={Mc_breakdown} onChange={(e) => setMc_breakdown(e.target.value)} type='time' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-2">Other Duration(Total)</Label>
                    <Input className="w-2/4 " placeholder="Other Time" value={otherTime} onChange={(e) => setOtherTime(e.target.value)} type='time' />
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-2">Date</Label>
                    <Input className="w-2/4 " placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} type='date' /> </div>

              

                <div className="flex">
                    <Label className="w-2/4 pt-2">No of Employee</Label>
                    <Input className="w-2/4 " placeholder="No of Employee" value={noOfEmployees} onChange={(e) => setNoOfEmployees(Number(e.target.value))} type='number' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-2">Grading Lot No</Label>
                    <Input className="w-2/4 " placeholder="Grading lot No" value={grading_lotNo} onChange={(e) => setGrading_lotNo(e.target.value)} />
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
export default RcnGraddingModifyForm;