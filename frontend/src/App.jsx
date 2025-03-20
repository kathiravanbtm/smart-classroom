import React, { useState, useEffect } from "react";
import axios from "axios";

const EquipmentStatus = () => {
    const [equipment, setEquipment] = useState([]);

    useEffect(() => {
        axios.get("/api/equipment")
            .then(response => setEquipment(response.data))
            .catch(error => console.error("Error fetching equipment data:", error));
    }, []);

    const updateStatus = (id, status) => {
        axios.put(`/api/equipment/${id}`, { status })
            .then(() => {
                setEquipment(prev => prev.map(item => item.id === id ? { ...item, status } : item));
            })
            .catch(error => console.error("Error updating equipment status:", error));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Equipment Status</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {equipment.map(item => (
                    <div key={item.id} className="p-4 border rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p>Status: {item.status}</p>
                        <select
                            value={item.status}
                            onChange={(e) => updateStatus(item.id, e.target.value)}
                            className="mt-2 p-2 border rounded-md"
                        >
                            <option value="available">Available</option>
                            <option value="in-use">In Use</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EquipmentStatus;