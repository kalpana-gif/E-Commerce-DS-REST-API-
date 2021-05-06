import axios from 'axios'

class AthenticationDataService{

    getUser(userId){
        return axios.get(`http://localhost:8080/ShoppingSite/login/${userId}`);
    }

}

export default new AthenticationDataService();