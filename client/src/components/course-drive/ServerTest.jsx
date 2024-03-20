import axios from "axios";
import { useEffect } from "react";

const ServerTest = ({ setcoolList }) => {
    useEffect(() => {
        axios
            .get(
                "https://f7108b77-984b-45e4-93fc-4508868a4594.mock.pstmn.io/list",
            )
            .then((res) => {
                setcoolList(res.data);
            });
    }, []);

    return <div>하위</div>;
};

export default ServerTest;
