import axios from 'axios'

const useAxios=axios.create({
    baseURL:'http://localhost:3000'

})

export default useAxios