import axios from "axios"
import { http } from "./http"

const getWeather=async(cities)=>{
    const promiseArr=cities.map((city)=>http.get(`/forecast.json?key=5bcb44ae91b44a859ea45015232501&q=${city}&days=1&aqi=no&alerts=no`))
    const res=await Promise.all(promiseArr)
    
    return res.map(res=>res.data)

}

const getCities=async(str)=>{

    const res=await http.get(`/search.json?key=5bcb44ae91b44a859ea45015232501&q=${str}`)
    
    return res

}
export {getWeather,getCities}