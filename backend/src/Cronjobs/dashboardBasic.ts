import cron from 'node-cron';
import axios from 'axios';
import { WpMsgGatePassDashboard } from '../helper/wpDashboard';

const dashboardBasic = async () => {
try {
        console.log('[CRON] Running dashboard fetch and WhatsApp send job...');

       const response = await axios.get(`${process.env.API_BASE_URL}/api/dashboard/basicdashboard`);
        
        const data = response.data;
    //console.log(data)
        // Section mapping structure
        const sections = [
            { name: 'Boiling', lot: 'latestLotboil' },
            { name: 'Scooping', lot: 'latestLotscoop' },
            { name: 'Borma', lot: 'latestLotborma' },                              // no vlot/backlog
            { name: 'Humidifier', lot: 'latestLothumid' },
            { name: 'Peeling', lot: 'latestLotpeel', vlot: 'latestvLotpeel' }, // no backlog
            { name: 'Mayur', lot: 'latestLotMayur', vlot: 'latestVLotMayur', backlog: 'backlogMayurdata' },
            { name: 'Hamsa', lot: 'latestLothamsa', vlot: 'latestVLothamsa', backlog: 'backloghamsadata' },
            { name: 'DPDS', lot: 'latestLotdpds', vlot: 'latestvLotdpds', backlog: 'backlogdpdsdata' },
            { name: 'Sorting', lot: 'latestLotsorting', vlot: 'latestvLotsorting', backlog: 'backlogsortingdata' },
            { name: 'Wholes', lot: 'latestLotwholes', vlot: 'latestvLotwholes', backlog: 'backlogwholesdata' },
            { name: 'LW', lot: 'latestLotlw', vlot: 'latestvLotlw', backlog: 'backloglwdata' },
            { name: 'Big Taiho', lot: 'latestLotbigT', vlot: 'latestvLotbigT', backlog: 'backlogbigTdata' },
            { name: 'Village', lot: 'latestLotvil', vlot: 'latestvLotvil', backlog: 'backlogvildata' },
            { name: 'Rejection', lot: 'latestLotrej', vlot: 'latestvLotrej', backlog: 'backlogrejdata' },
            
            
            
            
        ];

        // Helper: Format each section
        const formatSection = (
            name: string,
            lotKey: string,
            vlotKey?: string,
            backlogKey?: string
        ): string => {
            const lot = lotKey && data[lotKey]?.LotNo;
            const vlot = vlotKey && data[vlotKey]?.LotNo;
            const backlogRaw = backlogKey && data[backlogKey]?.[0]?.current_backlog;
            const backlog = backlogRaw ? `${Number(backlogRaw).toLocaleString()} Kg` : null;

            if (!lot && !vlot && !backlog) return '';

            let sectionText = `Section: ${name},`;
            if (lot) sectionText += ` Lot: ${lot},`;
            if (vlot) sectionText += ` V-Lot: ${vlot},`;
            if (backlog) sectionText += ` Backlog: ${backlog}`;

            return sectionText;
        };

        // Build full info message
        const info = sections
            .map(s => formatSection(s.name, s.lot, s.vlot, s.backlog))
            .filter(Boolean)
             .join('-----'); // separate sections with line breaks

        // 🔄 Send to WhatsApp

        console.log(info)
        await WpMsgGatePassDashboard(info, 'dashboard_basic');
        console.log('[CRON] WhatsApp message sent.');
        
    } catch (error) {
        console.error('[CRON] Error fetching dashboard or sending WhatsApp:', error);
    }
}
// Schedule: Every day at 9 AM (adjust as needed)
cron.schedule('0 9 * * *',  () => {
    console.log('Running scheduled stock update job...');
    dashboardBasic();
    
});

export { dashboardBasic };