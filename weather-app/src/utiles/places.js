import { placesHttp } from "./http";


const getCities = async (city) => {
    
  const res = await placesHttp.get(`/json?input=${city}&types=(cities)&language=en_US&key=AIzaSyDel8UE3ZkgKSwBpF6GF_r0YR_0fthrOzI`
);
console.log(res,"res");
  return res;
};
export { getCities };
