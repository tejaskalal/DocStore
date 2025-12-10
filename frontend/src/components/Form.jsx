import { useState, useRef } from "react";
import axios from "axios";

const Form = () => {
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMsg("");
    setErrorMsg("");

    if (!file) {
      setErrorMsg("Please upload a PDF before submitting.");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("documentName", documentName);
    formData.append("documentType", documentType);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:3000/documents/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSuccessMsg(res.data.message);
      setDocumentName("");
      setDocumentType("");
      setDescription("");
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }

      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Upload failed");

      setTimeout(() => setErrorMsg(""), 2000);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow-sm p-4">
        <h3 className="mb-4 text-center text-dark">Upload Medical Document</h3>

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Document Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Blood Test Report"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Document Type</label>
            <select
              className="form-select"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="Prescription">Prescription</option>
              <option value="Lab report">Lab Report</option>
              <option value="Scan report">Scan Report</option>
              <option value="Referral note">Referral Note</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Upload PDF</label>
            <input
              type="file"
              className="form-control"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              ref={fileInputRef}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description (optional)</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Any notes about this document..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button className="btn btn-dark w-100">Upload Document</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
