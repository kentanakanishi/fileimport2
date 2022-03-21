import React, { useState, useEffect } from "react";
import axios from "axios";

const getData: any = async () => {
    const response = await axios.post("/data.json");
    return response.data;
};

export const ResultTable: React.FC = (props) => {
    const [data, setData] = useState<string[]>([]);
    useEffect(() => {
        (async () => {
            const response = await axios.get("/data.json");
            setData(response.data.data);
        })();
    }, []);

    const onClickHandler = async () => {
        const url = "/api/analyze";
        const item = window.localStorage.getItem("saved");
        const id = item ? "?id=" + item : "";
        console.log(url + id);
        const response = await axios.get(url + id);
        setData(response.data.data.data);
    };

    return (
        <div>
            <button type="button" onClick={onClickHandler}>
                reload
            </button>

            <table>
                <thead>
                    <tr>
                        <th>{data != undefined ? "got it" : "error"}</th>
                    </tr>
                </thead>
                {data != undefined
                    ? data.map((val: any, key: any) => (
                          <tr key={key}>
                              <th>{val.txt}</th>
                          </tr>
                      ))
                    : "nodata"}
                <tbody></tbody>
            </table>
        </div>
    );
};

export default ResultTable;
