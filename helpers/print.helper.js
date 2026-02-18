
function print(message, data){
    if(process.env.ENV == "dev"){
        console.log("----------"+message+"----------\n", data);
    }
}

export default print;