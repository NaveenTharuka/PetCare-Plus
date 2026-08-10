import styles from '../dashboard/VetDashboard.module.css';

export default function Appointment({ appt, index = 0 }) {
    const getStatusClasses = (type) => {
        switch (type) {
            case 'checkedin':
                return 'bg-tertiary-container/40 text-on-tertiary-container';
            case 'urgent':
                return 'bg-error-container/20 text-on-error-container';
            default:
                return 'bg-surface-container-highest text-on-surface-variant';
        }
    };

    // Determine status type based on appt.status
    const getStatusType = (status) => {
        const statusLower = status?.toLowerCase() || '';
        if (statusLower.includes('checked') || statusLower.includes('check in')) {
            return 'checkedin';
        }
        if (statusLower.includes('urgent') || statusLower.includes('emergency')) {
            return 'urgent';
        }
        return 'default';
    };

    const statusType = getStatusType(appt.status);
    const statusClasses = getStatusClasses(statusType);

    return (
        <tr
            className={`hover:bg-surface-container-highest/30 transition-colors group`}
        >
            <td className="px-4 md:px-6 py-5 font-bold text-primary text-sm whitespace-nowrap">{appt.time}</td>
            <td className="px-4 md:px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container flex-shrink-0">
                        {appt.avatar || appt.img ? (
                            <img className="w-full h-full object-cover" src={appt.avatar || appt.img} alt={appt.pet} />
                        ) : (
                            <span className="material-symbols-outlined w-full h-full flex items-center justify-center text-on-surface-variant">
                                pets
                            </span>
                        )}
                    </div>
                    <span className="font-bold text-on-surface text-sm">{appt.pet}</span>
                </div>
            </td>
            <td className="px-4 md:px-6 py-5 text-sm text-on-surface-variant hidden sm:table-cell">{appt.owner}</td>
            <td className="px-4 md:px-6 py-5">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusClasses}`}>
                    {appt.status}
                </span>
            </td>
            <td className="px-4 md:px-6 py-5 text-right">
                <button className="p-2 hover:bg-primary/10 text-primary rounded-full transition-colors">
                    <span className="material-symbols-outlined text-xl">visibility</span>
                </button>
            </td>
        </tr>
    );
}