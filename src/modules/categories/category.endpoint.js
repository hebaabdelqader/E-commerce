const roles ={
    Admin :'Admin' , User:'User'
}
 const endPoint ={
    create:[roles.Admin],
    getAll:[roles.Admin],
    getActive:[roles.User],
    update:[roles.Admin],
    specifc:[roles.User,roles.Admin]
}
export default endPoint;