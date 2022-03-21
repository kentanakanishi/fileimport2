import axios from "axios";
import React, { useEffect, useState } from "react";

export const SelectBox: React.FC = (props) => {
    const [data, setData] = useState<string[]>([]);
    useEffect(() => {
        (async () => {
            const response = await axios.get("/data2.json");
            setData(response.data.data);
        })();
    }, []);

    return (
        <select name="" id="">
            {data.map((val: any, key: any) => (
                <option key={key} value={val.txt}>
                    {val.txt}
                </option>
            ))}
        </select>
    );
};

export default SelectBox;
