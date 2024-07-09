import InformationCountry from './InformationCountry'
import React, { useState, useEffect } from 'react';

const Country = ({ countries, strFilter }) => {

    const [selectedCountry, setSelectedCountry] = useState(null)
    const countriesFilter = countries.filter(c => c.name.common.toLowerCase().includes(strFilter.toLowerCase()));

    useEffect(() => {
        setSelectedCountry(null);
    }, [strFilter]);

    if (countriesFilter.length > 10) return (
        <div>
            <p>Too many matches, specify another filter</p>
        </div>
    )
    else if (countriesFilter.length === 1) {
        return <InformationCountry country={countriesFilter[0]} />
    }

    else {
        if (selectedCountry){
            return <InformationCountry country={selectedCountry} />
        }
        else
            return (
                <div>
                    {countriesFilter.map(c => <li key={c.name.common}>
                        {c.name.common}
                        <button onClick={() => setSelectedCountry(c)} > Show</button>
                    </li>)}
                </div>
            )
    }
}

export default Country
