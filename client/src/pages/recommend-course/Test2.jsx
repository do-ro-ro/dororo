import axios from "axios";
import { useEffect } from "react";

const Test2 = () => {
    useEffect(() => {
        axios
            .get(
                "https://ccd8f72d-f344-4e8d-8ee0-579f9c938880.mock.pstmn.io/maps",
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return <div>gdgd</div>;
};

export default Test2;
