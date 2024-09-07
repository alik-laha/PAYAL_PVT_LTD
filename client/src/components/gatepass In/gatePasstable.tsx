import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight, FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { format, toZonedTime } from 'date-fns-tz'
import React from "react";
import {  SelectGatePassType, pageNo, pagelimit, pendingCheckRole, sectionDataonTypeGate } from "../common/exportData";
import axios from "axios";
import { LuDownload } from "react-icons/lu";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import logo from '../../assets/Static_Images/Company Logo.jpeg'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { GatePassData, GatePassExcelData, pendingCheckRoles, PermissionRole } from "@/type/type";

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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
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
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcApprove } from "react-icons/fc";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import GatepassApprove from "./gatePassApprove";
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { Document, Page, Text, View,PDFDownloadLink,StyleSheet,Image } from '@react-pdf/renderer';
interface pdfprops{
    data:GatePassData;
}

const GatePassTable = () => {

    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    const [hidetodate, sethidetoDate] = useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const [section, setSection] = useState<string>("")
    const [type, settype] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [Data, setData] = useState<GatePassData[]>([])
    const [page, setPage] = useState(pageNo)
    const [netWeight, setNetWeight] = useState<number>()

    const limit = pagelimit
    const [errview, setErrView] = useState<string>("hidden")
    const successdialog = document.getElementById('machinescs') as HTMLInputElement;
    const errordialog = document.getElementById('machineerror') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('machinescsbtn') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('machineerrorbtn') as HTMLInputElement;
    const [errortext, setErrorText] = useState<string>("")
    // const [pdfdata,setPDFdata]=useState([])
    // const [pdfstate,setpdfstate]=useState(false)
    const borderColor = "#3778C2";
    const styles = StyleSheet.create({
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
          },

          headerline:{
            borderBottomColor:'black',
            borderBottomWidth:1,
            marginVertical:10,
          },
        page: {
          
          fontFamily: "Helvetica",
          fontSize: 11,
          paddingTop: 10,
          paddingLeft: 50,
          paddingRight: 50,
          lineHeight: 1.5,
          flexDirection: "column"
        },
        logo: {
          width: 60,
          height: 60,
          marginTop:20,
          marginRight:20
          
        },
        mainHeader: {
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center"
        },

        tableContainer: {
            // backgroundColor: '#E4E4E4',
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 15,
            borderWidth: 1,
            borderColor: "#3778C2"
          },
          container: {
            flexDirection: "row",
            borderBottomColor: "#00519C",
            backgroundColor: "#00519C",
            color: "#fff",
            borderBottomWidth: 1,
            alignItems: "center",
            height: 20,
            textAlign: "center",
            fontStyle: "bold",
            flexGrow: 1
          },
          description: {
            width: "40%",
            borderRightColor: borderColor,
            borderRightWidth: 1,
            fontSize:'12',
            marginLeft:'10px'
          },
          qty: {
            width: "60%",
            fontSize:'12',
            marginRight:'10px'   
           
          },
          row: {
            display:'flex',
            flexDirection: "row",
            borderBottomColor: "#3778C2",
            borderBottomWidth: 1,
            alignItems: "center",
            height: 20,
            
          },
          rowTextArea: {
            display:'flex',
            flexDirection: "row",
            borderBottomColor: "#3778C2",
            borderBottomWidth: 1,
            alignItems: "center",
            height: 40,
            
          },
         
          rowdescription: {
            width: "40%",
            textAlign: "center",
            borderRightColor: borderColor,
            borderRightWidth: 1,
            backgroundColor: "azure",
            fontSize:'10px',
            fontWeight: "extrabold",
            color:'#00519C'
            
          },
          rowdescriptionTextArea: {
            width: "40%",
            backgroundColor: "white",
            textAlign: "center",
            borderRightColor: borderColor,
            borderRightWidth: 1,
            fontSize:'10px',
            fontWeight: "extrabold",
            color:'#00519C'
            
          },
         
          rowqty: {
            width: "60%",
            backgroundColor: "white",
            textAlign: "center",
            fontSize:'10px'
          },
          
          headerContainer: {
            marginTop: 25,
            justifyContent: "flex-start",
            width: "50%"
          },
          billTo: {
            marginRight: 10,
            fontWeight:'extrabold'

          },
          Mainbillto: {
            display: "flex",
            flexDirection: "row",
            marginTop: 2,
            paddingBottom: 1,
            fontSize:'10px'
          },
          instituteheader:{
            textAlign:'center',
            flexDirection:'row'
            
            
          },
          institutedesc:{
            
            flexDirection:'column',
            marginLeft:'10px'
            
          },
          institutename:{
            textAlign:'center',
            fontSize:'18',
            fontWeight:'bold',
            color:'#00519C',
            marginTop: 20,
            
          },
          instituteother:{
            textAlign:'center',
            fontSize:'10',
            fontWeight:'bold',
            color:'black',
            
            
          },
          formDetails:{
           
            width:'100%',
            marginTop: 10,
            textAlign:'center',
            fontSize:'14',
            color:'#00519C',
            fontWeight:'bold',
            textDecoration:'underline',
            fontStyle:'cursive'
          },
          formDetails2:{
           
            width:'100%',
            marginTop: 20,
            textAlign:'left',
            fontSize:'10',
            color:'black',
            fontWeight:'bold',
         
            fontStyle:'cursive'
          },
          blankrow:{
            width:'100%',
            backgroundColor:'antiquewhite',
            color:'#00519C',
            textAlign:'center',
            fontWeight:'bold',
            fontSize:'10px'
          },
          footer:{
            marginTop:'105px',
            display:'flex',
            flexDirection:'row',
            textAlign:'center'
          },
          rightfooter:{
            width:'50%',
            marginLeft:'50px',
            float:'right'
          },
          leftfooter:{
            width:'50%',
            float:'left'
          }
          
      });

      const stylesSmall = StyleSheet.create({
        section: {
          margin: 2,
          padding: 2,
          flexGrow: 1,
        },
        headerline: {
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginVertical: 2,
        },
        page: {
          fontFamily: "Helvetica",
          fontSize: 5,
          paddingTop: 2,
          paddingLeft: 2,
          paddingRight: 2,
          lineHeight: 0.7,
          flexDirection: "column",
          width: 80,
          height: 200,
        },
        logo: {
          width: 15,
          height: 15,
          marginTop: 2,
          marginRight: 2,
        },
        mainHeader: {
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
        },
        tableContainer: {
          flexDirection: "column",
          marginTop: 7,
          borderWidth: 0.5,
          // borderColor: "#3778C2",
        },
        container: {
          flexDirection: "row",
          // borderBottomColor: "#00519C",
          // backgroundColor: "#00519C",
          color: "black",
          borderBottomWidth: 1,
          alignItems: "center",
          height: 10,
          textAlign: "center",
          fontStyle: "bold",
          flexGrow: 1,
        },
        description: {
          width: "50%",
          // borderRightColor: "#3778C2",
          borderRightWidth: 0.5,
          fontSize: 3.5,
          marginLeft: 2,
        },
        qty: {
          width: "50%",
          fontSize: 3.5,
          marginRight: 2,
        },
        row: {
          display: 'flex',
          flexDirection: "row",
          // borderBottomColor: "#3778C2",
          borderBottomWidth: 0.5,
          alignItems: "center",
          height: 10,
        },
        rowdescription: {
          width: "50%",
          textAlign: "center",
          // borderRightColor: "#3778C2",
          borderRightWidth: 1,
        
          fontSize: 3.5,
          fontWeight: "bold",
          // color: '#00519C',
        },
        rowqty: {
          width: "50%",
          backgroundColor: "white",
          textAlign: "center",
          fontSize: 3.5,
        },
        headerContainer: {
          marginTop: 10,
          justifyContent: "flex-start",
          width: "100%",
        },
        billTo: {
          marginRight: 2,
          fontWeight: 'bold',
        },
        Mainbillto: {
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          paddingBottom: 1,
          fontSize: 3.5,
        },
        instituteheader: {
          textAlign: 'center',
          flexDirection: 'row',
        },
        institutedesc: {
          flexDirection: 'column',
          marginLeft: 2,
        },
        institutename: {
            marginTop: 1,
          textAlign: 'center',
          fontSize: 4,
          fontWeight: 'bold',
          // color: '#00519C',
          marginBottom: 3,
        },
        instituteother: {
          textAlign: 'center',
          fontSize: 3,
          fontWeight: 'bold',
          color: 'black',
          marginTop: 1,
        },
        formDetails: {
          width: '100%',
          marginTop: 5,
          textAlign: 'center',
          fontSize: 4,
          // color: '#00519C',
          fontWeight: 'bold',
       
          fontStyle: 'italic',
        },
        formDetails2: {
          width: '100%',
          marginTop: 5,
          textAlign: 'left',
          fontSize: 3,
          color: 'black',
          fontWeight: 'bold',
          textDecoration: 'none',
          fontStyle: 'italic',
          lineHeight:'1.5'
        },
      });


      const MyDocument = ( data:pdfprops ) => (

        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    {/* <View style={styles.mainHeader}>
                        
                        
                    </View> */}
                    <View style={styles.instituteheader}>
                        <Image
                            style={styles.logo}
                            src={logo}
                        />
                         <View style={styles.institutedesc}>
                            <Text style={styles.institutename}> PAYEL DEALERS PVT. LTD.</Text>{"\n"}
                            <Text style={styles.instituteother}> GST No: 19AACCP9943Q1ZF </Text>{"\n"}
                            <Text style={styles.instituteother}> FSSAI License No :10014031001340 </Text>{"\n"}
                    
                            <Text style={styles.instituteother}> 51 Km Stone Durgapur ExpressWay, Vill: Kanajuly,Hooghly,712305 </Text>{"\n"}
                    
                        </View>
                        
                    

                        
                    </View>
                    <View style={{borderBottomColor:'black',
            borderBottomWidth:1,
            marginVertical:10}}/>
                    <View style={styles.formDetails}><Text>Gate Pass Report </Text></View> 
                    
                    <View style={styles.headerContainer}>
                        <View style={styles.Mainbillto}>
                            <Text style={styles.billTo}>GatePass No: </Text>
                            <Text>{data.data.gatePassNo}</Text>
                        </View>
                        <View style={styles.Mainbillto}>
                            <Text style={styles.billTo}>Date of Entry: </Text>
                            <Text>{handletimezone(data.data.date)}</Text>
                        </View>
                        <View style={styles.Mainbillto}>
                            <Text style={styles.billTo}>Time of Entry: </Text>
                            <Text>{handleAMPM(data.data.time)}</Text>
                        </View>
                        
                        <View style={styles.Mainbillto}>
                            <Text style={styles.billTo}>Date of Exit: </Text>
                            <Text>{handletimezone(data.data.exitdate)}</Text>
                        </View>
                        <View style={styles.Mainbillto}>
                            <Text style={styles.billTo}>Time of Exit: </Text>
                            <Text>{handleAMPM(data.data.OutTime)}</Text>
                        </View>
                        <View style={styles.Mainbillto}>
                            <Text style={styles.billTo}>Type of GatePass: </Text>
                            <Text>{data.data.type}</Text>
                        </View>
                        <View style={styles.Mainbillto}>
                            <Text style={styles.billTo}>Section:</Text>
                            <Text>{data.data.section}</Text>
                        </View>
                        
                        
                    </View>
                    <View style={styles.tableContainer}>
                        {/* Invoice Table Header */}
                        <View style={styles.container}>
                            <Text style={styles.description}>Title</Text>
                            <Text style={styles.qty}>Description</Text>

                        </View>
                        {/* Invoice Table Rows */}
                        <View style={styles.row}>
                            <Text style={styles.rowdescription}>Vehicle No.</Text>
                            <Text style={styles.rowqty}>{data.data.vehicleNo}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.rowdescription}>Invoice/Chalan No.</Text>
                            <Text style={styles.rowqty}>{data.data.DocNo}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.rowdescription}>Gross Weight(Kg)</Text>
                            <Text style={styles.rowqty}>{formatNumber(data.data.grosswt)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.rowdescription}>Gross Weight Slip No.</Text>
                            <Text style={styles.rowqty}>{data.data.grosswtNo}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.rowdescription}>Net Weight(Kg)</Text>
                            <Text style={styles.rowqty}>{formatNumber(data.data.netWeight)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.rowdescription}>Bill Amount(Rs.)</Text>
                            <Text style={styles.rowqty}>{data.data.billAmount}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.rowdescription}>Driver Name</Text>
                            <Text style={styles.rowqty}>{data.data.driverName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.rowdescription}>Driver Contact No.</Text>
                            <Text style={styles.rowqty}>{data.data.driverContact}</Text>
                        </View>
                        
                        <View style={styles.row}>
                            <Text style={styles.rowdescription}>Entried By Security</Text>
                            <Text style={styles.rowqty}>{data.data.securityName}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.rowdescription}>Remarks</Text>
                            <Text style={styles.rowqty}>{data.data.Remarks}</Text>
                        </View>
                     

                    </View>

                    <View style={styles.formDetails2}>
                <Text>This is a computer-generated document. No signature is required</Text>
                    </View>
                    
                   


                </View>

            </Page>
        </Document>

      );
      const MyDocument2 = (data: pdfprops) => (
        <Document>
          <Page size={[80, 200]} style={stylesSmall.page}>
            <View style={stylesSmall.section}>
              <View style={stylesSmall.instituteheader}>
                <Image
                  style={stylesSmall.logo}
                  src={logo}
                />
                <View style={stylesSmall.institutedesc}>
                  <Text style={stylesSmall.institutename}>PAYEL DEALERS PVT. LTD.</Text>{"\n"}
                  <Text style={stylesSmall.instituteother}>GST No: 19AACCP9943Q1ZF</Text>{"\n"}
                  <Text style={stylesSmall.instituteother}>FSSAI License No: 10014031001340</Text>{"\n"}
                  
                </View>
              </View>
              <View style={stylesSmall.headerline} />
              <View style={stylesSmall.formDetails}>
                <Text>Gate Pass Initial Slip</Text>
              </View>
              <View style={stylesSmall.headerContainer}>
                <View style={stylesSmall.Mainbillto}>
                  <Text style={stylesSmall.billTo}>GatePass No:</Text>
                  <Text>{data.data.gatePassNo}</Text>
                </View>
                <View style={stylesSmall.Mainbillto}>
                  <Text style={stylesSmall.billTo}>Date:</Text>
                  <Text>{handletimezone(data.data.date)}</Text>
                </View>
                <View style={stylesSmall.Mainbillto}>
                  <Text style={stylesSmall.billTo}>Time of Entry:</Text>
                  <Text>{handleAMPM(data.data.time)}</Text>
                </View>
                <View style={stylesSmall.Mainbillto}>
                  <Text style={stylesSmall.billTo}>Type of GatePass:</Text>
                  <Text>{data.data.type}</Text>
                </View>
                <View style={stylesSmall.Mainbillto}>
                  <Text style={stylesSmall.billTo}>Section:</Text>
                  <Text>{data.data.section}</Text>
                </View>
              </View>
              <View style={stylesSmall.tableContainer}>
                <View style={stylesSmall.container}>
                  <Text style={stylesSmall.description}>Title</Text>
                  <Text style={stylesSmall.qty}>Description</Text>
                </View>
                <View style={stylesSmall.row}>
                  <Text style={stylesSmall.rowdescription}>Vehicle No.</Text>
                  <Text style={stylesSmall.rowqty}>{data.data.vehicleNo}</Text>
                </View>
                <View style={stylesSmall.row}>
                  <Text style={stylesSmall.rowdescription}>Chalan No.</Text>
                  <Text style={stylesSmall.rowqty}>{data.data.DocNo}</Text>
                </View>
                <View style={stylesSmall.row}>
                  <Text style={stylesSmall.rowdescription}>Gross Wt(Kg)</Text>
                  <Text style={stylesSmall.rowqty}>{formatNumber(data.data.grosswt)}</Text>
                </View>
                <View style={stylesSmall.row}>
                  <Text style={stylesSmall.rowdescription}>Gross Wt Slip No.</Text>
                  <Text style={stylesSmall.rowqty}>{data.data.grosswtNo}</Text>
                </View>
                <View style={stylesSmall.row}>
                  <Text style={stylesSmall.rowdescription}>Driver Name</Text>
                  <Text style={stylesSmall.rowqty}>{data.data.driverName}</Text>
                </View>
                <View style={stylesSmall.row}>
                  <Text style={stylesSmall.rowdescription}>Contact No.</Text>
                  <Text style={stylesSmall.rowqty}>{data.data.driverContact}</Text>
                </View>
                
                
                <View style={stylesSmall.row}>
                  <Text style={stylesSmall.rowdescription}>Entried By</Text>
                  <Text style={stylesSmall.rowqty}>{data.data.securityName}</Text>
                </View>
              </View>
              <View style={stylesSmall.formDetails2}>
                <Text>This is a computer-generated document. No signature is required</Text>
              </View>
            </View>
          </Page>
        </Document>
      );
      
      
    if(closeDialogButton){
        closeDialogButton.addEventListener('click', () => {
            if(successdialog!=null){
                (successdialog as any).close();
                window.location.reload()
            }
            
            
          });
    }
    if(errorcloseDialogButton){
        errorcloseDialogButton.addEventListener('click', () => {
            if(errordialog!=null){
                (errordialog as any).close();
               
            }
            
          });
    }

    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
    }
    const handleTodate = (e: React.ChangeEvent<HTMLInputElement>) => {

        const selected = e.target.value;
        if (!selected) {
            settoDate('')
            sethidetoDate('')
            return
        }
        //console.log(selected)
        const date = new Date(selected)
        date.setDate(date.getDate() + 1);
        //console.log(date)
        const nextday = date.toISOString().split('T')[0];
        //console.log(nextday)
        sethidetoDate(selected)
        settoDate(nextday)
    }


    const handleSearch = async () => {
        //console.log('search button pressed')
        //setEditData([])
        setblockpagen('flex')
        const response = await axios.put('/api/gatepass/gatepasssearch', {
            blConNo: blConNo,
            section: section,
            fromDate: fromdate,
            toDate: todate,
            type:type
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
    useEffect(() => {
        handleSearch()
        setPage((prev) => {
            if (prev <= 0) {
                return 1
            }
            return prev
        })
    }, [page])

    const handleAMPM = (time: string) => {

        let [hours, minutes] = time.split(':').map(Number);
        let period = ' AM';

        if (hours === 0) {
            hours = 12;
        } else if (hours === 12) {
            period = ' PM';
        } else if (hours > 12) {
            hours -= 12;
            period = ' PM';
        }
        const finalTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + period.toString()

        // return ${hours}:${minutes.toString().padStart(2, '0')} ${period};
        return finalTime;
    }
    
    const handleRelease = (id: number) => {
        const outtime=new Date().toTimeString().slice(0,5)
        const outdate=new Date().toISOString().slice(0,10)
        axios.put(`/api/gatepass/updateRelease/${id}`, {outtime,outdate }).then((res) => {
            setErrorText(res.data.message);
            console.log(res.data)
            if(successdialog!=null){
                (successdialog as any).showModal();
            }

            //window.location.reload()
        }).catch((err) => {
            console.log(err)
            setErrorText(err.response.data.message)
            if(errordialog!=null){
                (errordialog as any).showModal();
            }
        })

    }
    const handleNetWeight = (data: GatePassData) => {
        if (!netWeight) {
            setErrView('block')
            return
        }
        axios.put(`/api/gatepass/updateNetWeight/${data.id}`, { netWeight: netWeight,section:data.section,
            type:data.type,gatepassNo:data.gatePassNo }).then((res) => {
            setNetWeight(0)
            setErrorText(res.data.message);
            console.log(res.data)
            if(successdialog!=null){
                
                (successdialog as any).showModal();
            }
            //window.location.reload()
        }).catch((err) => {
            console.log(err)
            setErrorText(err.response.data.message)
            if(errordialog!=null){
                (errordialog as any).showModal();
            }
        })
    }
    const checkpending = (tab: string) => {
        const Role = localStorage.getItem('role') as keyof PermissionRole
        //console.log(Role)
        if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
            return true
        }
        else {
            return false;
        }

    }
    const handlesection = (tab: string) => {
    let tabnew:string=''
       if(tab==='RawCashew'){
           tabnew='Raw Cashew' 
       }else if(tab==='PackagingMaterial'){
        
            tabnew='Packaging Material' 
        }
        else if(tab==='Store'){
        
            tabnew='Store' 
        }
        else if(tab==='General'){
        
          tabnew='General' 
      }
      else if(tab==='Almond'){
        
        tabnew='Almond' 
    }
    else if(tab==='Village'){
        
      tabnew='Village' 
  }
        
       
       const returnString=tabnew
       return returnString

    }
    const handleExcellExport = async () => {
        const response = await axios.put('/api/gatepass/gatepasssearch', {
            blConNo: blConNo,
            section: section,
            fromDate: fromdate,
            toDate: todate,
            type:type
        })
        const data1 = await response.data
        let ws
        let transformed: GatePassExcelData[] = []
            transformed = data1.rcnEntries.map((item: GatePassData, index: number) => {
                return {
                    'Id': index+1,
                    'GatePassNo': item.gatePassNo,
                    'Type':item.type,
                    'Date':handletimezone(item.date) ,
                    'In_Time': handleAMPM(item.time),
                    'Gross_Or_Tare_Wt': item.grosswt,
                    'DocNo': item.DocNo,
                    'Gross_Or_Tare_Wt_Bill': item.grosswtNo,
                    'VehicleNo': item.vehicleNo,
                    'DriverName': item.driverName,
                    'DriverContact': item.driverContact,
                    'SecurityName': item.securityName,
                    'Section': item.section,
                    'ReceivingStatus': item.receivingStatus===1?'Completed':'Pending' ,
                    'NetWeight': item.netWeight,
                    'ApprovalStatus': item.approvalStatus===1?'Completed':'Pending',
                    'BillAmount': item.billAmount,
                    
                    'Status': item.status,
                    'Verified_By': item.modifiedBy,
                    'OutTime':item.OutTime===null? '':(handleAMPM(item.OutTime)),
                    'Remarks':item.Remarks
                
                        
                }
            })
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        
        const currDate = new Date().toLocaleDateString();
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'GatePass_Entry_' + currDate + '.xlsx');


    }
    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }
    const Role = localStorage.getItem('role') as keyof PermissionRole
    

    return (
        <>
        {/* {checkpending('Gatepass') && <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" onClick={handleSearchPendingApproval} disabled={props.count === 0 ? true : false}> Pending Approve(
            {props.count})</Button> } */}
        <div className="ml-5 mt-5 ">
             
            <div className="flex flexbox-search">

                <Input className="no-padding w-1/5 flexbox-search-width" placeholder=" GatePass/Doc No." value={blConNo} onChange={(e) => setBlConNo(e.target.value)} />

                <select className='flexbox-search-width flex h-8 w-1/5 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setSection(e.target.value)} value={section}>
                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Section (All)</option>
                    {type ? (
                                        sectionDataonTypeGate[type as keyof typeof sectionDataonTypeGate].map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))
                                    ) : null}
                </select>

                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left ">From </label>
                <Input className="w-1/7 flexbox-search-width-calender"
                    type="date"
                    value={fromdate}
                    onChange={(e) => setfromDate(e.target.value)}
                    placeholder="From Date"

                />
                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">To </label>
                <Input className="w-1/7 flexbox-search-width-calender"
                    type="date"
                    value={hidetodate}
                    onChange={handleTodate}
                    placeholder="To Date"

                />
                <select className='flexbox-search-width no-margin-left-absolute flex h-8 w-1/6 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => settype(e.target.value)} value={type}>
                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>In/Out (All)</option>
                    {SelectGatePassType.map((data, index) => (
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                            {data}
                        </option>
                    ))}
                </select>


                <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

            </div>
            {checkpending('Gatepass') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={handleExcellExport}><LuDownload size={18} /></Button> </span>}
            <Table className="mt-4">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center" >Sl No.</TableHead>
                    <TableHead className="text-center" >GatePass_ID</TableHead>
                    
                    <TableHead className="text-center" >Entry(In/Out)</TableHead>
                    <TableHead className="text-center" >Rcv/Dispatch_Section</TableHead>
                    <TableHead className="text-center" >Receiving/Dispatch</TableHead>
                    <TableHead className="text-center" >Verification/Approval</TableHead>
                    <TableHead className="text-center" >Closure</TableHead>  
                    <TableHead className="text-center" >Gate_Entry_Date</TableHead>              
                    <TableHead className="text-center" >Entry_Time</TableHead>
                    <TableHead className="text-center" >Gate_Exit_Date</TableHead>
                    <TableHead className="text-center" >Exit_Time</TableHead>
                    <TableHead className="text-center" >Doc_No.</TableHead>
                    <TableHead className="text-center" >Gross/Tare_Wt</TableHead>
                    <TableHead className="text-center" >Wt_Slip_No</TableHead>
                    <TableHead className="text-center" >Vehicle_No</TableHead>
                    <TableHead className="text-center" >Driver_Name</TableHead>
                    <TableHead className="text-center" >Driver_Contact</TableHead>
                    <TableHead className="text-center" >Entried_By_Seurity</TableHead>                 
                    <TableHead className="text-center" >Net_Weight(Kg)</TableHead>
                    <TableHead className="text-center" >Verified/Approved_By</TableHead>
                    <TableHead className="text-center" >Verifier_Remarks</TableHead>
                    <TableHead className="text-center" >Action</TableHead>
                </TableHeader>
                <TableBody>


                    {Data.length > 0 ? (Data.map((item: GatePassData, idx) => {
                    
                        

                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                <TableCell className="text-center font-semibold text-cyan-600">{item.gatePassNo}</TableCell>
                               
                                <TableCell className="text-center  font-semibold mt-3 flex"> {item.type ==='IN'? <FaRegArrowAltCircleRight color="blue" size={22} className="mr-5 "/>:<FaRegArrowAltCircleLeft color='red' size={22} className="mr-2"/>} {item.type}</TableCell>  
                                <TableCell className="text-center font-semibold shadow-md ">{handlesection(item.section)}</TableCell>
                                <TableCell className="text-center ">
                                        {item.receivingStatus === 0 ? (
                                            <button className="bg-red-500 rounded shadow-md drop-shadow-lg p-1 text-white  fix-button-width-rcnprimary">Pending</button>
                                        ) :  (
                                            <button className="bg-green-400 rounded shadow-md drop-shadow-lg p-1 text-white  fix-button-width-rcnprimary ">Completed</button>
                                        )}
                                </TableCell>
                                <TableCell className="text-center ">
                                        {item.approvalStatus === 0 ? (
                                            <button className="bg-red-500 rounded shadow-md  drop-shadow-lg p-1 text-white fix-button-width-rcnprimary">Pending</button>
                                        ) :  (
                                            <button className="bg-green-400 rounded shadow-md  drop-shadow-lg p-1 text-white fix-button-width-rcnprimary ">Completed</button>
                                        )}
                                </TableCell>
                                <TableCell className="text-center ">
                                        {item.status !== 'Closed' ? (
                                            <button className="bg-red-500 rounded shadow-md  drop-shadow-lg p-1 text-white fix-button-width-rcnprimary">Pending</button>
                                        ) :  (
                                            <button className="bg-green-400 rounded shadow-md  drop-shadow-lg p-1 text-white fix-button-width-rcnprimary ">Completed</button>
                                        )}
                                </TableCell> 
                                <TableCell className="text-center">{handletimezone(item.date)}</TableCell>  
                                <TableCell className="text-center  font-semibold">{handleAMPM(item.time)}</TableCell>
                                <TableCell className="text-center">{item.exitdate ? (handletimezone(item.exitdate)):''}</TableCell>  
                                <TableCell className="text-center font-semibold">{item.OutTime===null? '':(handleAMPM(item.OutTime))}</TableCell>
                                 <TableCell className="text-center">{item.DocNo}</TableCell>
                                <TableCell className="text-center ">{formatNumber(item.grosswt)} kg </TableCell>
                                <TableCell className="text-center">{item.grosswtNo}</TableCell>
                                <TableCell className="text-center">{item.vehicleNo}</TableCell>
                                <TableCell className="text-center">{item.driverName}</TableCell>
                                <TableCell className="text-center">{item.driverContact}</TableCell>
                                <TableCell className="text-center">{item.securityName}</TableCell>
                                    <TableCell className="text-center font-semibold">{item.netWeight ? formatNumber(item.netWeight):0} kg </TableCell>
                                    <TableCell className="text-center">{item.modifiedBy}</TableCell>
                                    <TableCell className="text-center">{item.Remarks}</TableCell>
                                    
                                    
                                    <TableCell className="text-center flex">

                                        {item.status==='Closed'? (<button className="bg-red-500  p-2 text-white rounded opacity-40 " disabled={true}>Closed</button>):(<Popover>
                                            <PopoverTrigger>
                                                <button className={`p-2 text-white rounded ${(item.receivingStatus === 0) ? 'bg-cyan-200' : 'bg-cyan-500'}`} disabled={(item.receivingStatus === 0) ? true : false}>Action</button>
                                            </PopoverTrigger>

                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                            {!item.netWeight && item.receivingStatus === 1 && item.approvalStatus === 0 && <AlertDialog>
                                                <AlertDialogTrigger className="flex">
                                                        <FcApprove size={25} /> <button className="bg-transparent  pl-1 text-left hover:text-green-500" >Net Weight Entry</button>
                                                    </AlertDialogTrigger>

                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle> Enter Net Weight (Gross Initial Wt. - Final Wt.)</AlertDialogTitle>
                                                            <AlertDialogDescription>

                                                                This will Link Corresponding Receiving Section
                                                                <Input type="number" placeholder="Net Weight" className='mt-3 w-100 text-center justify-center items-center' value={netWeight} onChange={(e) => setNetWeight(Number(e.target.value))} required />
                                                                <span id="nameError" className={`text-red-500 pt-2 font-bold ${errview}`}>Net Weight is Required</span>
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>

                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleNetWeight(item)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                
                                                </AlertDialog>}

                                            {checkpending('Gatepass') && item.netWeight  && item.receivingStatus === 1 && item.approvalStatus === 0 && <Dialog>
                                                    <DialogTrigger className="flex py-1">
                                                        <MdOutlineDriveFolderUpload size={20} color="green" />  <button className="bg-transparent pl-2 text-left hover:text-green-500" >
                                                            Verify GatePass</button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-1xl pb-1 text-center mt-5'>Gate Pass Verification </p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        {/* <QCreportForm data={item} /> */}
                                                         <GatepassApprove data={item} />
                                                    </DialogContent>
                                                </Dialog>}   


                                            {item.receivingStatus === 1 && item.approvalStatus === 1 && <AlertDialog>
                                                <AlertDialogTrigger className="flex">
                                                        <FcApprove size={25} /> <button className="bg-transparent  pl-1 text-left hover:text-green-500" >Release</button>
                                                    </AlertDialogTrigger>

                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle> Do You want to Release Incoming Vehicle at Exit Point?</AlertDialogTitle>
                                                            <AlertDialogDescription>

                                                                This will close the GatePass
                                                               
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>

                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() =>  handleRelease(item.id)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                
                                                </AlertDialog>}
     
                                            </PopoverContent>
                                           
                                    </Popover>)}
                                    {  Role!=='Security'&& item.status==='Closed' && <button className='bg-green-700 h-8 p-2 text-white rounded  w-30 text-sm  mx-4' 
                                    style={{background:'orange',color:'white',float:'right'}}>
                                    <PDFDownloadLink document={<MyDocument data={item}/>} fileName={"Gate_Pass_Report_"+item.gatePassNo+".pdf"} >
                                        {({ loading }) => (loading ? <LuDownload size={18} /> : <LuDownload size={18} />)}
                                    </PDFDownloadLink></button>}

                                    {  !item.netWeight && item.receivingStatus === 0 && item.approvalStatus === 0 && <button className='bg-green-700 h-8 p-2 text-white rounded  w-30 text-sm  mx-4' 
                                    style={{background:'grey',color:'white',float:'right'}}>
                                    <PDFDownloadLink document={<MyDocument2 data={item}/>} fileName={"Gate_Pass_Initial_Report_"+item.gatePassNo+".pdf"} >
                                        {({ loading }) => (loading ? <LuDownload size={18} /> : <LuDownload size={18} />)}
                                    </PDFDownloadLink></button>}
                                    
                                    </TableCell>
                                    
                            </TableRow>)

                    })) : (<TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                       
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>

                    </TableRow>)}





                </TableBody>

            </Table>
            <Pagination style={{ display: blockpagen }} className="pt-5 ">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setPage((prev) => {
                            if (prev === 1) {
                                return prev
                            }
                            if (prev <= 0) {
                                return prev + 1
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
            <dialog id="machinescs" className="dashboard-modal">
        <button id="machinescsbtn" className="dashboard-modal-close-btn ">X </button>
        <span className="flex"><img src={tick} height={2} width={35} alt='tick_image'/>
        <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p></span>
        
        {/* <!-- Add more elements as needed --> */}
    </dialog>

    <dialog id="machineerror" className="dashboard-modal">
        <button id="machineerrorbtn" className="dashboard-modal-close-btn ">X </button>
        <span className="flex"><img src={cross} height={25} width={25} alt='error_image'/>
        <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>
        
        {/* <!-- Add more elements as needed --> */}
    </dialog>


        </div>
        </>
        



    )

}
export default GatePassTable;