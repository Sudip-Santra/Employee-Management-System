import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams();
    const navigate = useNavigate();

    const [empdata, setEmpData] = useState({
        name: "",
        address: {
            line1: "",
            city: "",
            country: "",
            zip_code: ""
        },
        contact_methods: [],
        isactive: true
    });
    const [validation, setValidation] = useState(false);
    const [contactMethod, setContactMethod] = useState('EMAIL');
    const [contactValue, setContactValue] = useState('');

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid)
            .then((res) => res.json())
            .then((resp) => {
                setEmpData({
                    name: resp.name || "",
                    address: resp.address || {
                        line1: "",
                        city: "",
                        country: "",
                        zip_code: ""
                    },
                    contact_methods: resp.contact_methods || [],
                    isactive: resp.isactive || false
                });
                if (resp.contact_methods && resp.contact_methods.length > 0) {
                    setContactMethod(resp.contact_methods[0].contact_method || 'EMAIL');
                    setContactValue(resp.contact_methods[0].value || '');
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [empid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmpData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setEmpData((prevData) => ({
            ...prevData,
            address: {
                ...prevData.address,
                [name]: value
            }
        }));
    };

    const handleActiveChange = (e) => {
        setEmpData((prevData) => ({
            ...prevData,
            isactive: e.target.checked
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedEmpData = {
            ...empdata,
            contact_methods: [
                { contact_method: contactMethod, value: contactValue }
            ]
        };

        fetch("http://localhost:8000/employee/" + empid, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedEmpData)
        })
            .then(() => {
                alert("Saved successfully.");
                navigate("/");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card shadow-lg" style={{ padding: "20px", marginTop: "30px" }}>
                            <div className="card-title text-center p-3 border-bottom">
                                <h2>Edit Employee</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name:</label>
                                            <input
                                                required
                                                name="name"
                                                value={empdata.name}
                                                onMouseDown={() => setValidation(true)}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            />
                                            {empdata.name.length === 0 && validation && (
                                                <span className="text-danger">Enter the name</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <h4 style={{ marginTop: "10px" }}>Address Details</h4>
                                        <div className="form-group">
                                            <label>Line 1:</label>
                                            <input
                                                name="line1"
                                                value={empdata.address.line1}
                                                onChange={handleAddressChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>City:</label>
                                            <input
                                                name="city"
                                                value={empdata.address.city}
                                                onChange={handleAddressChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Country:</label>
                                            <input
                                                name="country"
                                                value={empdata.address.country}
                                                onChange={handleAddressChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Zip Code:</label>
                                            <input
                                                name="zip_code"
                                                value={empdata.address.zip_code}
                                                onChange={handleAddressChange}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <h4 style={{ marginTop: "10px" }}>Contact Method</h4>
                                        <div className="form-group">
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
                                                onChange={(e) => setContactValue(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-check" style={{ textAlign: "left" }}>
                                            <input
                                                checked={empdata.isactive}
                                                onChange={handleActiveChange}
                                                type="checkbox"
                                                className="form-check-input"
                                            />
                                            <label className="form-check-label">Is Active</label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12" style={{ textAlign: "center" }}>
                                        <div className="form-group" style={{ marginTop: "15px" }}>
                                            <button className="btn btn-success" type="submit">
                                                Save
                                            </button>
                                            <Link to="/" className="btn btn-danger">
                                                Back
                                            </Link>
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
};

export default EmpEdit;
