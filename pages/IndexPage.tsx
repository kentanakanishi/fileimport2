import { UiFileInputButton } from "./UiFileInputButton";
import axios from "axios";
export const IndexPage = () => {
    const onChange = async (formData: any) => {
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: (event: { loaded: number; total: number }) => {
                console.log(
                    `Current progress:`,
                    Math.round((event.loaded * 100) / event.total)
                );
            },
        };

        const response = await axios.post("/api/uploads", formData, config);

        console.log("response", response.data.data);
        window.localStorage.setItem("saved", response.data.data);
    };

    return (
        <UiFileInputButton
            label="Upload Single File"
            uploadFileName="theFiles"
            onChange={onChange}
        />
    );
};

export default IndexPage;
