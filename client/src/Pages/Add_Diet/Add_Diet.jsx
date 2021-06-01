import axios from 'axios';
import React, { useState } from 'react';

function Add_Diet() {

    const [AddDiet, setAddDiet] = useState({
        name: '',
    })

    const handleChange = e => { setAddDiet({ ...AddDiet, [e.target.name]: e.target.value }) }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`http://localhost:3001/diets/`, AddDiet)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error)
            })
    }

    return <div className="content">
        <form onSubmit={handleSubmit}>
            <div className="Container_Name">
                <label>Diet: </label>
                <input type="text" placeholder="Name Diet..." name="name" value={AddDiet.name} onChange={handleChange} required />
            </div>
            <input type="submit" value="Add New Diet!" />
        </form>
    </div>
}

export default Add_Diet