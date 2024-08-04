import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmpDetail = () => {
    const { empid } = useParams();
    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("https://free-ap-south-1.cosmocloud.io/development/api/employee_db" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            <div className="container">
                <div className="card row" style={{ "textAlign": "left" }}>
                    <div className="card-title">
                        <h2>Employee Details</h2>
                    </div>
                    <div className="card-body"></div>

                    {empdata && (
                        <div style={{marginLeft: "10px"}}>
                            <h2>The Employee name is: <b>{empdata.name}</b> ({empdata.id})</h2>
                            <h3>Address Details</h3>
                            <h5>Address Line1: {empdata.address.line1}</h5>
                            <h5>City: {empdata.address.city}</h5>
                            <h5>Country: {empdata.address.country}</h5>
                            <h5>Zip Code: {empdata.address.zip_code}</h5>
                            <h3>Contact Details</h3>
                            {empdata.contact_methods.map((method, index) => (
                                <div key={index}>
                                    <h5>Contact Method: {method.contact_method}</h5>
                                    <h5>Value: {method.value}</h5>
                                </div>
                            ))}
                            <Link className="btn btn-danger" to="/">Back to Listing</Link>
                        </div>
                    )}

                </div>
            </div>
        </div >
    );
}

export default EmpDetail;