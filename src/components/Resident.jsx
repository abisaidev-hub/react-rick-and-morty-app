import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Resident = ({resident}) => {

    const [ residentData, setResidentData ] = useState([])

    useEffect(() => {
        axios.get(resident)
            .then(res => setResidentData(res.data))
    }, [])

    const rStatus = () => {
        if( residentData.status === 'Alive' ){
            return (
                <div className="resident-status" style={{backgroundColor: 'green'}}></div>
            )
        }else if( residentData.status === 'Dead' ){
            return (
                <div className="resident-status" style={{backgroundColor: 'red'}}></div>
            )
        }else{
            return (
                <div className="resident-status" style={{backgroundColor: 'gray'}}></div>
            )
        }
    }

    // console.log(residentData)

    return (
        <div className='resident-card'>
            <li>
                <div>
                    <img src={residentData.image} alt="" />
                </div>
                <div className='resident-data'>
                    <div className='resident-name'>                    
                        <h3>{residentData.name}</h3>
                    </div>
                    <div className='r-status'>
                        <p><b>Status</b>: {residentData.status}</p>
                        {rStatus()}
                    </div>
                    <p><b>Origin</b>: {residentData.origin?.name}</p>
                    <p><b>Episode{`(s)`}</b>: {residentData.episode?.length}</p>
                </div>
            </li>
        </div>
    );
};

export default Resident;