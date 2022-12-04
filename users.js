const userHeads = ["name","age","status"];
const addUser = document.querySelector("#usersForm");
const usersWrapper = document.querySelector("#usersBody");
const addBtn = document.querySelector("#btnAdd");
let operation = 'create';
let tempIndex;
const readDataFromStorage = (itemKey = "users",resType = "json")=>{
  let usersData = localStorage.getItem(itemKey);
  if(resType == "json") {
    try{
        usersData = JSON.parse(usersData) || [];
    }
    catch(e){
        usersData = []
    }
  }
  return usersData;
}

const writeDataToStorage = (data,itemKey="users")=>{
  localStorage.setItem(itemKey,JSON.stringify(data));
}


  addUser.addEventListener("submit", (e)=>{
    e.preventDefault();
    let user = {};
    userHeads.forEach(elem => {
      user[elem] = addUser.elements[elem].value
    } )
    const userData = readDataFromStorage();
    userData.push(user);
    writeDataToStorage(userData); 
    // if( operation === 'create') {
      
    // } else {
    //   userData[tempIndex] = user;
    //   console.log(userData[tempIndex]);
    //   operation = 'create';
    //   addBtn.innerHTML = "Add";
    // }
    
  })
  
  
  const displayUsers = ()=>{
    const allUsers = readDataFromStorage();
    allUsers.forEach((user,index) => {
      createSingleUser(user,index); 
    }) 
  }
  
  const createSingleUser = (user,index)=>{
    usersWrapper.innerHTML += `
    <tr>
    <td>${index}</td>
    <td>${user.name}</td>
    <td>${user.age}</td>
    <td>${user.status}</td>
    <td><button id="update" onclick="updateUser(${index})">Update</button></td>
    <td><button id="delete" onclick="deleteUser(${index})">Delete</button></td>
    </tr>
    `
    addUser.reset();
  }

  displayUsers();

  const deleteUser = (index)=>{
    const userData = readDataFromStorage();
    userData.splice(index,1);
    console.log(userData)
    writeDataToStorage(userData);
    displayUsers();
  }
  const updateUser = (index)=>{
    const userData = readDataFromStorage();
    addUser.elements.name.value = userData[index].name;
    addUser.elements.age.value = userData[index].age;
    addUser.elements.status.value = userData[index].status;
    addBtn.innerHTML = "Update";
    tempIndex = index;
   console.log(addUser.elements.name.value,addUser.elements.age.value,addUser.elements.status.value)
  }
