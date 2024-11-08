import styled from './CertificateModal.module.css';

const CertificateModal = ({ imageUrl, onClose }) => {
  return (
    <div className={styled.modal} onClick={onClose}>
      <img src={imageUrl} className={styled.enlargedCertificate} alt="Enlarged Certificate" />
    </div>
  );
};

export default CertificateModal;