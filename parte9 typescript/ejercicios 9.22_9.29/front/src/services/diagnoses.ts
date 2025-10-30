import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAllDiagnoses = async () => {
    const { data } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
    );
    
    return data;
};

const getDiagnosisByCode = async (code: string) => {
    const { data } = await axios.get<Diagnosis>(
        `${apiBaseUrl}/diagnoses/${code}`
    );
    return data;
};

export default {
    getAllDiagnoses,
    getDiagnosisByCode
};