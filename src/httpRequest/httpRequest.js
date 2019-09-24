import Axios from "axios";
import qs from "qs";
const baseUrl = "http://127.0.0.1:3366"
/*
config 参数示例
{
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
}
*/
function httpRequest(config) {
    return axios(config).then((res) => {
        console.log("result", res);
        return res.data;
    });
}
function axios(config) {
    config.url = baseUrl + config.url;
    config.data = qs.stringify(config.data);
    const httpRequest = Axios.create({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    return httpRequest(config);
} 

export {httpRequest};