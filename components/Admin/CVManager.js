import { useState, useEffect } from "react";
import { FaEye, FaPen, FaFilePdf, FaSpinner } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import styles from "../../styles/admin.module.css";

const colorMap = {
  teal: "linear-gradient(135deg, #065f46, #059669)",
  amber: "linear-gradient(135deg, #92400e, #d97706)",
};

// Extracts upload date from filename format: cv-{lang}-{timestamp}.pdf
function getUploadDate(fileName) {
  if (!fileName) return null;
  const match = fileName.match(/cv-(?:en|es)-(\d+)\.pdf/);
  if (!match) return null;
  return new Date(parseInt(match[1])).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CVManager({ lang, color }) {
  const [cvData, setCvData] = useState({ url: "", exists: false });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { data } = await supabase
        .from("cv_data")
        .select("*")
        .eq("language", lang)
        .single();
      if (isMounted && data) {
        setCvData({
          url: data.file_url,
          fileName: data.file_path,
          exists: !!data.file_url,
        });
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [lang]);

  const handleEditResume = () => {
    document.getElementById(`resume-upload-${lang}`).click();
  };

  const handleViewResume = () => {
    if (cvData.url) {
      window.open(cvData.url, "_blank", "noopener,noreferrer");
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileName = `cv-${lang}-${Date.now()}.pdf`;

      const { error: uploadError } = await supabase.storage
        .from("cvs")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("cvs").getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from("cv_data")
        .update({ file_url: publicUrl, file_path: fileName })
        .eq("language", lang);

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
    <div
      className={styles.statCard}
      style={{ background: colorMap[color] || colorMap.teal }}
    >
      <div className={styles.statIconWhite}>
        {uploading ? <FaSpinner className={styles.spinner} /> : <FaFilePdf />}
      </div>
      <div className={styles.statInfo}>
        <span className={styles.statLabelWhite}>
          {lang === "en" ? "English CV" : "Spanish CV"}
        </span>
        <div className={styles.cvStatusRow}>
          <span
            className={cvData.exists ? styles.cvDotActive : styles.cvDotEmpty}
          />
          <span className={styles.cvStatusText}>
            {cvData.exists
              ? `Active · ${getUploadDate(cvData.fileName) ?? "—"}`
              : "No file uploaded"}
          </span>
        </div>
        {cvData.exists && cvData.fileName && (
          <span className={styles.cvFileName} title={cvData.fileName}>
            {cvData.fileName}
          </span>
        )}
        <div className={styles.resumeActions}>
          <button
            className={styles.miniBtnWhite}
            onClick={handleViewResume}
            disabled={!cvData.exists || uploading}
            title="View CV"
          >
            <FaEye /> View
          </button>
          <button
            className={styles.miniBtnWhite}
            onClick={handleEditResume}
            disabled={uploading}
            title="Update CV"
          >
            <FaPen /> Update
          </button>
          <input
            type="file"
            id={`resume-upload-${lang}`}
            style={{ display: "none" }}
            accept=".pdf"
            onChange={onFileChange}
          />
        </div>
      </div>
    </div>
  );
}
