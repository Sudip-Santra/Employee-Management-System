import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmpListing = () => {
    const [empdata, empdatachange] = useState([]);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/employee/detail/" + id)
    }

    const RemoveFunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("https://free-ap-south-1.cosmocloud.io/development/api/employee_db/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("https://free-ap-south-1.cosmocloud.io/development/api/employee_db").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className='divbtn'>
                        <Link to={"employee/create"} className='btn btn-success'>Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead>
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
                            {empdata && empdata.map(item => {
                                const email = item.contact_methods?.find(cm => cm.contact_method === 'EMAIL')?.value;
                                const phone = item.contact_methods?.find(cm => cm.contact_method === 'PHONE')?.value;
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
                                            {email && <div>Email: {email}<br /></div>}
                                            {phone && <div>Phone: {phone}</div>}
                                        </td>
                                        <td>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                            <a onClick={() => { RemoveFunction(item.id) }} className="btn btn-danger">Delete</a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmpListing;
