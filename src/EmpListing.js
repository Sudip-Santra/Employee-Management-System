import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmpListing = () => {
    const [empdata, empdatachange] = useState([]);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/employee/detail/" + id);
    };

    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);
    };

    const RemoveFunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/employee/" + id, {
                method: "DELETE"
            })
                .then((res) => {
                    alert('Removed successfully.');
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    useEffect(() => {
        fetch("http://localhost:8000/employee/")
            .then((res) => res.json())
            .then((resp) => {
                empdatachange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-title text-center p-3 border-bottom">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                        
                        <Link to={"employee/create"} className="btn btn-success">
                            Add New (+)
                        </Link>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Emp Id</th>
                                    <th>Name</th>
                                    <th>Address Line1</th>
                                    <th>City</th>
                                    <th>Country</th>
                                    <th>Zip Code</th>
                                    <th>Contact</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empdata && empdata.map((item) => {
                                    const email = item.contact_methods?.find(
                                        (cm) => cm.contact_method === 'EMAIL'
                                    )?.value;
                                    const phone = item.contact_methods?.find(
                                        (cm) => cm.contact_method === 'PHONE'
                                    )?.value;
                                    const address = item.address || {};

                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{address.line1}</td>
                                            <td>{address.city}</td>
                                            <td>{address.country}</td>
                                            <td>{address.zip_code}</td>
                                            <td>
                                                {email && (
                                                    <div>
                                                        <strong>Email:</strong> {email}
                                                        <br />
                                                    </div>
                                                )}
                                                {phone && (
                                                    <div>
                                                        <strong>Phone:</strong> {phone}
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        LoadDetail(item.id);
                                                    }}
                                                    className="btn btn-outline-primary btn-sm me-2"
                                                >
                                                    Details
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        LoadEdit(item.id);
                                                    }}
                                                    className="btn btn-outline-success btn-sm me-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        RemoveFunction(item.id);
                                                    }}
                                                    className="btn btn-outline-danger btn-sm"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpListing;
