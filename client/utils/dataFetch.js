export const getData = async(url,token) => {
    const res = await fetch(`${process.env.BASE_URI}/${url}` , {
        headers:{
            "Authorization": token,
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data
}


export const postData = async (url,body) => {
    const res = await fetch(`${process.env.BASE_URI}/${url}`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await res.json()
    return data
}

export const putData = async (url,body,token) => {
    const res  = await fetch(`${process.env.BASE_URI}/${url}`, {
        method: "PUT",
        headers:{
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await res.json()
    return data
}


export const imageupload = async (avatar) => {
    const data =  new FormData()
    data.append('file',avatar)
    data.append('upload_preset',"blogApp")
    data.append('cloud_name',"themrzlyv")
    const res = await fetch("https://api.cloudinary.com/v1_1/themrzlyv/image/upload",{
        method:"POST",
        body:data
    })
    const res2  = await res.json()
    return res2.url
}
