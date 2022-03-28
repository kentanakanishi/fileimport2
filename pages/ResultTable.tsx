import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select ,{SelectChangeEvent}from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export const ResultTable: React.FC = (props) => {
    const [data, setData] = useState<[string,string][]>([]);
    const [targetList,setTargetList] = useState<string[]>([]);
    const [target,setTarget] = useState<string>("");
    useEffect(() => {
        (async () => {
            const response = await axios.get("/data2.json");
            setTargetList(response.data.services);
        })();
    }, []);

    const handleChange = (event:SelectChangeEvent) => {
        setTarget(event.target.value);
    }

    const onClickHandler = async () => {
        const url = "/api/analyze";
        const item = window.localStorage.getItem("saved");
        const data:any = { id: item };
        data["target"]= target == null ? "none": target;
        console.log(data);
        const response = await axios.post(url, data).then((res) => {
            const result = res.data.output;
            console.log(result);
            const array: [string,string][] = Object.entries(result);
            setData(array);
        });
    };

    return (
        <div>
            <Box>
                <FormControl fullWidth>
                    <Select onChange={handleChange}>
                        {targetList.map((item) => (
                            <MenuItem value={item} key={item}>
                            {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="outlined" onClick={onClickHandler}>
                    Reload
                </Button>
                <List dense={true}>
                    {data.map(val => (
                        <ListItem key={val[0]}>
                            <ListItemText primary={val[1]} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
};

export default ResultTable;
