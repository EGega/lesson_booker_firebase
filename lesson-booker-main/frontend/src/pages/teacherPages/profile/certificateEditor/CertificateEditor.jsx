import { auth, db } from "../../../../firebase/firebase";
import { setCertificates, addCertificate } from "../../../../store/index.js"
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react"
import { IoIosCloudUpload } from "react-icons/io";
import styled from "./CertificateEditor.module.css"

const CertificateEditor = ({ openCertModal }) => {
  const dispatch = useDispatch();
  const [certificates, setCertificatesState] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch current certificates from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "teachers", auth.currentUser.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const certs = data.certificates || [];
          setCertificatesState(certs);
          dispatch(setCertificates(certs)); 
        }
      }
    );

    return () => unsubscribe();
  }, [dispatch]);

const handleUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 1 * 1024 * 1024) {
    alert("Max file size is 1MB");
    return;
  }

  setIsUploading(true);

  try {
    const storage = getStorage();

    let updatedCertificates = [...certificates];

    // If already 2 certificates, delete the oldest one
    if (updatedCertificates.length >= 2) {
      const oldestUrl = updatedCertificates[0];

      const baseUrl = "https://firebasestorage.googleapis.com/v0/b/" + process.env.REACT_APP_FIREBASE_STORAGE_BUCKET + "/o/";
      const encodedPath = oldestUrl.replace(baseUrl, "").split("?")[0];
      const decodedPath = decodeURIComponent(encodedPath);

      const oldFileRef = ref(storage, decodedPath);
      await deleteObject(oldFileRef);

      // Remove oldest URL from array
      updatedCertificates.shift();
    }

    // Upload new file
    const newStorageRef = ref(
      storage,
      `certificates/${auth.currentUser.uid}/${Date.now()}_${file.name}`
    );
    await uploadBytes(newStorageRef, file);
    const newUrl = await getDownloadURL(newStorageRef);

    // Add new URL to certificates array
    updatedCertificates.push(newUrl);

    // Update Firestore
    await updateDoc(doc(db, "teachers", auth.currentUser.uid), {
      certificates: updatedCertificates,
    });

    // Update local state + redux
    setCertificatesState(updatedCertificates);
    dispatch(setCertificates(updatedCertificates));
  } catch (error) {
    console.error("Error uploading certificate:", error);
  } finally {
    setIsUploading(false);
  }
};


  return (
    <div  className={styled.container}>
      <h2>Certificates</h2>
      <label >
        <IoIosCloudUpload  />
        {isUploading ? "Uploading..." : "Upload Certificate"}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className
          disabled={isUploading}
        />
      </label>

      <div className={styled.img}>
        {certificates.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Certificate ${index + 1}`}
            onClick={() => openCertModal(url)}
          />
        ))}
      </div>
    </div>
  );
};

export default CertificateEditor;