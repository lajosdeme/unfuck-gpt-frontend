import axios from "axios";

class Api {
    constructor(){
        axios.defaults.baseURL="https://unfuckgpt-98421f0f13ad.herokuapp.com/api/v1"
    }

    getReports = async () => {
        const res = await axios.get("/reports")
        if (res.data.status != "ok") {
            print("error: ",res.data.error)
        }
        return res;
    }

    getSentiments = async () => {
        const res = await axios.get("/sentiments")
        if (res.data.status != "ok") {
            print("error: ",res.data.error)
        }
        return res;
    }

    getPriceAnalysis = async () => {
        const res = await axios.get("/price")
        if (res.data.status != "ok") {
            print("error: ",res.data.error)
        }
        return res;
    }

    isMember = async (member) => {
        let url = `/member?address=${member}` 
        const res = await axios.get(url)
        if (res.data.status != "ok") {
            print("error: ",res.data.error)
        }
        return res;
    }
}

export default Api;