import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmpDetail = () => {
    const { empid } = useParams();
    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid)
            .then((res) => res.json())
            .then((resp) => {
                empdatachange({
                    name: resp.name || "N/A",
                    designation: resp.designation || "N/A",
                    id: resp.id || "N/A",
                    address: resp.address || {},
                    contact_methods: resp.contact_methods || [],
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [empid]);

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-title text-center p-3 border-bottom">
                    <h2>Employee Details</h2>
                </div>
                <div className="card-body">
                    {Object.keys(empdata).length === 0 ? (
                        <p>Loading employee details...</p>
                    ) : (
                        <div>
                            <div className="mb-4">
                                <h5>The Employee name is: <b>{empdata.name}</b> ({empdata.id})</h5>
                                <h5>Designation: <b>{empdata.designation}</b></h5>
                            </div>
                            <div className="mb-4">
                                <h5><u>Address Details</u></h5>
                                <p><strong>Address Line1:</strong> {empdata.address?.line1 || "N/A"}</p>
                                <p><strong>City:</strong> {empdata.address?.city || "N/A"}</p>
                                <p><strong>Country:</strong> {empdata.address?.country || "N/A"}</p>
                                <p><strong>Zip Code:</strong> {empdata.address?.zip_code || "N/A"}</p>
                            </div>
                            <div className="mb-4">
                                <h5><u>Contact Details</u></h5>
                                {empdata.contact_methods?.map((method, index) => (
                                    <div key={index}>
                                        <p><strong>Contact Method:</strong> {method.contact_method || "N/A"}</p>
                                        <p><strong>Value:</strong> {method.value || "N/A"}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center">
                                <Link className="btn btn-outline-danger" to="/">
                                    Back to Listing
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmpDetail;
