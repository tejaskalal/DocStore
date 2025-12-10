import { useState, useEffect } from "react";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { MdOutlineFileDownload } from "react-icons/md";

const Alldocs = () => {
  const [docs, setDocs] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const fetchDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/documents");
      setDocs(res.data);
    } catch (err) {
      showMessage("Failed to fetch documents!", "error");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/documents/${id}`);
      setDocs(docs.filter((d) => d._id !== id));
      showMessage("Document deleted successfully!", "success");
    } catch (err) {
      showMessage("Failed to delete document!", "error");
    }
  };

  const handleDownload = (doc) => {
    window.open(`http://localhost:3000/documents/${doc._id}`, "_blank");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4 text-dark">My Documents</h2>

      {message && (
        <div
          className={`alert ${
            messageType === "success" ? "alert-success" : "alert-danger"
          } text-center`}
        >
          {message}
        </div>
      )}

      {docs.length === 0 ? (
        <p className="text-center text-muted">No documents found.</p>
      ) : (
        docs.map((doc) => (
          <div key={doc._id} className="card p-3 mb-3 shadow-sm">
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="mb-1">{doc.documentName || doc.originalName}</h5>
                <p className="text-muted mb-1">{doc.documentType}</p>
                {doc.description && (
                  <p className="small text-secondary">{doc.description}</p>
                )}
              </div>

              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleDownload(doc)}
                >
                  Download <MdOutlineFileDownload className="ms-2" />
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(doc._id)}
                >
                  Delete <GoTrash className="ms-2" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Alldocs;
