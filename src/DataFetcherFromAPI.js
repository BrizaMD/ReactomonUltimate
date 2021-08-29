import axios from "axios";
import * as url from "url";

export const fetcher = async(url) => {
    let result = {};
    await axios.get(url)
               .then(res => {result = res.data;});
    return result;
}

export default fetcher(url);