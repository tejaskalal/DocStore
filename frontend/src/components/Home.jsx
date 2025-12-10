import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Home = () => {
  const navigate = useNavigate();

  const goToUploads = () => {
    navigate("/documents/upload");
  };

  const goToMydocuments = () => {
    navigate("/documents");
  };

  return (
    <div className="bg-dark text-secondary px-4 py-5 text-center mt-5">
      <div className="py-5">
        <h1 className="display-5 fw-bold text-white mb-2">DocStore</h1>
        <div className="col-lg-6 mx-auto">
          <p className="fs-5 mb-4">
            DocStore is a simple and secure platform where users can upload,
            store, and manage their health-related documents such as medical
            reports, prescriptions, scans, and notes. Easily add descriptions,
            organize files, and access them anytime from one safe place.
          </p>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg px-4 me-sm-3 fw-bold"
              onClick={goToUploads}
            >
              Upload Documents
              <AiOutlineCloudUpload className="ms-2" />
            </button>

            <button
              type="button"
              className="btn btn-outline-light btn-lg px-4"
              onClick={goToMydocuments}
            >
              My documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
