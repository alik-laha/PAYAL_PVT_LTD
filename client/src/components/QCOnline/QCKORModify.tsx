import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import tick from "../../assets/Static_Images/Flat_tick_icon.svg.png"
import cross from "../../assets/Static_Images/error_img.png"

type ModifyProps = {
  data: {
    id: number
    LotNo: string
    origin: string
    date: string
    qcKOR: string | number
    qcBormaLoss: string | number
  }
}

const QCKORModify = (props: ModifyProps) => {

  const qcKorRef = useRef<HTMLInputElement>(null)
  const qcBormaLossRef = useRef<HTMLInputElement>(null)

  const [date, setDate] = useState<string>("")
  const [lotNo, setLotNo] = useState<string>("")
  const [origin, setOrigin] = useState<string>("")

  const [errortext, setErrorText] = useState("")
  const [isDisable, setIsDisable] = useState(false)

  const successDialog = useRef<HTMLDialogElement>(null)
  const errorDialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {

    const d = props?.data
    if (!d) return

    setDate(d.date ? d.date.slice(0, 10) : "")
    setLotNo(d.LotNo || "")
    setOrigin(d.origin || "")

    if (qcKorRef.current) qcKorRef.current.value = String(d.qcKOR ?? "")
    if (qcBormaLossRef.current) qcBormaLossRef.current.value = String(d.qcBormaLoss ?? "")

  }, [props?.data])

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault()
    setIsDisable(true)

    const payload = {
      qcKOR: qcKorRef.current?.value,
      qcBormaLoss: qcBormaLossRef.current?.value,
    }

    axios
      .post(`/api/qconline/editQCKOR/${props.data.id}`, payload)
      .then((res) => {
        if (res.status === 200) {
          successDialog.current?.showModal()
        }
      })
      .catch((err) => {
        setErrorText(err.response?.data?.message || "Something went wrong")
        errorDialog.current?.showModal()
      })
      .finally(() => setIsDisable(false))
  }

  return (
    <>
      <div className="pb-6 px-6">

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>

          {/* Lot No */}

          <div className="flex">
            <Label className="w-2/4 pt-1">Lot No</Label>
            <Input
              className="w-2/4 text-center bg-yellow-100"
              value={lotNo}
              readOnly
            />
          </div>

          {/* Origin */}

          <div className="flex">
            <Label className="w-2/4 pt-1">Origin</Label>
            <Input
              className="w-2/4 text-center bg-yellow-100"
              value={origin}
              readOnly
            />
          </div>

          {/* Date */}

          <div className="flex">
            <Label className="w-2/4 pt-1">QC Entry Date</Label>
            <Input
              className="w-2/4 text-center bg-yellow-100 justify-center items-center"
              value={date}
              type="date"
              readOnly
            />
          </div>

          {/* QC KOR */}

          <div className="flex">
            <Label className="w-2/4 pt-1">QC KOR</Label>
            <Input
              className="w-2/4 text-center"
              ref={qcKorRef}
              type="number"
              step="0.01"
              required
            />
          </div>

          {/* QC Borma Loss */}

          <div className="flex">
            <Label className="w-2/4 pt-1">QC Borma Loss</Label>
            <Input
              className="w-2/4 text-center"
              ref={qcBormaLossRef}
              type="number"
              step="0.01"
              required
            />
          </div>

          <Button className="bg-blue-500 mt-4 mx-20" disabled={isDisable}>
            {isDisable ? "Submitting..." : "Submit"}
          </Button>

        </form>

      </div>

      {/* Success Dialog */}

      <dialog ref={successDialog} className="dashboard-modal">

        <button
          className="dashboard-modal-close-btn"
          onClick={() => {
            successDialog.current?.close()
            window.location.reload()
          }}
        >
          X
        </button>

        <span className="flex">

          <img src={tick} height={25} width={25} alt="success" />

          <p className="pl-3 mt-1 font-medium">
            QC KOR Modification Submitted!
          </p>

        </span>

      </dialog>

      {/* Error Dialog */}

      <dialog ref={errorDialog} className="dashboard-modal">

        <button
          className="dashboard-modal-close-btn"
          onClick={() => errorDialog.current?.close()}
        >
          X
        </button>

        <span className="flex">

          <img src={cross} height={25} width={25} alt="error" />

          <p className="pl-3 mt-1 font-medium">{errortext}</p>

        </span>

      </dialog>

    </>
  )
}

export default QCKORModify