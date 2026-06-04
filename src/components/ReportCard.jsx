"use client"
import { useEffect, useState } from "react";
import styles from "../app/user/me/pets/[petId]/page.module.css";
import { getDownloadLinkById } from "@/apiServices/reports.api";

export default function ReportCard({ report }) {
    const [link, setLink] = useState("")

    useEffect(() => {
        getDownloadLinkById(report.id).then((res) => {
            setLink(res)
        })
    }, [report.id])

    const download = () => {
        if (link) {
            window.open(link, "_blank");
        }
    }

    return (
        <div className={styles.reportItem} >
            <div className={styles.reportIconWrapper}>
                <span className="material-symbols-outlined">description</span>
            </div>
            <div className={styles.reportInfo}>
                <p className={styles.reportTitle}>{report.title}</p>
                <p className={styles.reportDate}>{report.created_at}</p>
            </div>
            <button className={styles.reportDownloadBtn} onClick={download}>
                <span className={`material-symbols-outlined ${styles.downloadIcon}`}>download</span>
            </button>
        </div>
    )
}