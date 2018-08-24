const axios = require('axios');

export const request = (opctions)=>{
      return new Promise((resolve,reject)=>{
        axios({
                 method: opctions.method || 'get',
                 url: opctions.url || '',
                 data: opctions.data || null
                    })
        .then((result)=>{
            let data = result.data;
            resolve(data);
        })
        .catch((err)=>{
             reject(err)
        })  
          


    }) 

} 


    