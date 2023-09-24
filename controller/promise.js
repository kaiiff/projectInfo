




function prom(complete){
    return new Promise(function (resolve,reject){
    if (complete){
        resolve("i am done")
    }else{
        reject("i am not done yet")
    })
}

console.log(prom(true))