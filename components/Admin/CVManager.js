import { useState, useEffect } from "react";
import { FaEye, FaPen, FaFilePdf, FaSpinner } from 'react-icons/fa';
import { supabase } from "../../lib/supabase";
import styles from '../../styles/admin.module.css';

export default function CVManager({ lang }) {
    const [cvData, setCvData] = useState({ url: '', exists: false });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        (async () => {
            const { data } = await supabase
                .from('cv_data')
                .select('*')
                .eq('language', lang)
                .single();
            if (isMounted && data) {
                setCvData({ url: data.file_url, fileName: data.file_path, exists: !!data.file_url });
            }
        })();
        return () => { isMounted = false; };
    }, [lang]);

    const handleEditResume = () => {
        document.getElementById(`resume-upload-${lang}`).click();
    };

    const handleViewResume = () => {
        if (cvData.url) {
            window.open(cvData.url, '_blank', 'noopener,noreferrer');
        }
    };

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileName = `cv-${lang}-${Date.now()}.pdf`;

            const { error: uploadError } = await supabase.storage
                .from('cvs')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('cvs')
                .getPublicUrl(fileName);

            const { error: dbError } = await supabase
                .from('cv_data')
                .update({ file_url: publicUrl, file_path: fileName })
                .eq('language', lang);

            if (dbError) throw dbError;

            setCvData({ url: publicUrl, exists: true });
            alert(`CV ${lang.toUpperCase()} updated successfully!`);

        } catch (err) {
            alert("Error: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.statCard}>
            <div className={styles.statIcon}>
                {uploading ? <FaSpinner className={styles.spinner} /> : <FaFilePdf />}
            </div>
            <div className={styles.statInfo}>
                <span className={styles.statLabel}>
                    {lang === 'en' ? 'English CV' : 'Spanish CV'}
                </span>
                <div className={styles.resumeActions}>
                    <button
                        className={styles.miniBtn}
                        onClick={handleViewResume}
                        disabled={!cvData.exists || uploading}
                        title="View CV"
                    >
                        <FaEye />
                    </button>
                    <button
                        className={styles.miniBtn}
                        onClick={handleEditResume}
                        disabled={uploading}
                        title="Update CV"
                    >
                        <FaPen />
                    </button>
                    <i style={{ fontSize: '12px', color: 'gray' }}>{cvData.exists ? cvData.fileName : ''}</i>
                    <input
                        type="file"
                        id={`resume-upload-${lang}`}
                        style={{ display: 'none' }}
                        accept=".pdf"
                        onChange={onFileChange}
                    />
                </div>
            </div>
        </div>
    );
}