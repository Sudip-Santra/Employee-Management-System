import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EmpCreate.css';

const EmpCreate = () => {
    const [id, idChange] = useState("");
    const [name, nameChange] = useState("");
    const [address_line1, address_line1Change] = useState("");
    const [city, cityChange] = useState("");
    const [country, countryChange] = useState("");
    const [zip_code, zip_codeChange] = useState("");
    const [contactMethod, setContactMethod] = useState('EMAIL');
    const [contactValue, setContactValue] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/employee/")
            .then((res) => res.json())
            .then((data) => {
                const highestId = Math.max(...data.map(emp => emp.id), 0);
                idChange(highestId + 1);
            })
            .catch((err) => console.error(err.message));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const empData = {
            name,
            address: {
                line1: address_line1,
                city,
                country,
                zip_code
            },
            contact_methods: [
                { contact_method: contactMethod, value: contactValue }
            ]
        };

        fetch("http://localhost:8000/employee/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empData)
        }).then((res) => {
            alert("Employee Details Saved Successfully.");
            navigate("/");
        }).catch((err) => {
            console.error(err.message);
        });
    };

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card shadow-lg" style={{ padding: "20px", marginTop: "30px" }}>
                            <div className="card-title text-center p-3 border-bottom">
                                <h2>Add Employee</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Employee ID:</label>
                                            <input value={"Will Be Generated Automatically "} disabled="disabled" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name:</label>
                                            <input value={name} onChange={e => nameChange(e.target.value)} className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Address Line1:</label>
                                            <input value={address_line1} onChange={e => address_line1Change(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>City:</label>
                                            <input value={city} onChange={e => cityChange(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Country:</label>
                                            <input value={country} onChange={e => countryChange(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Zip Code:</label>
                                            <input value={zip_code} onChange={e => zip_codeChange(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Contact Method:</label>
                                            <div style={{ display: 'flex', gap: '20px' }}>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        value="EMAIL"
                                                        checked={contactMethod === 'EMAIL'}
                                                        onChange={(e) => setContactMethod(e.target.value)}
                                                    />
                                                    Email
                                                </label>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        value="PHONE"
                                                        checked={contactMethod === 'PHONE'}
                                                        onChange={(e) => setContactMethod(e.target.value)}
                                                    />
                                                    Phone
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>{contactMethod === 'EMAIL' ? 'Email' : 'Phone'}:</label>
                                            <input
                                                className="form-control"
                                                value={contactValue}
                                                onChange={(e) => setContactValue(e.target.value)} required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12" style={{ textAlign: "center" }}>
                                        <div className="form-group" style={{ marginTop: "15px" }}>
                                            <button className='btn btn-success' type='submit'>Save</button>
                                            <Link to="/" className='btn btn-danger'>Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmpCreate;
