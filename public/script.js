// 
async function getdata() {
    
    const res = await fetch("http://localhost:3000/tasks");
    console.log(res);

    const data = await res.json();
    console.log(data);

    let str = "";
    data.forEach(e => {
        str+=`
        <div class="list">
            <div class="task"><input type="checkbox" ${e.task?"checked":""}/><span>${e.task}</span></div>

            <div class="btn">
                <button class="button" onclick="updatefn('${e._id}', '${e.task}')">Edit</button>
                <button class="button" onClick='deleteTask("${e._id}")'>Delete</button>

            </div>

        </div>`
    })
    document.getElementById("menu").innerHTML=str;
}
getdata()

async function updatedata() {
    
}





current_id=null
 
function updatefn(id, task){
    document.getElementById("task").value = task
    document.getElementById("addbtn").textContent = "Update"
    current_id = id
}

document.getElementById('form').addEventListener('submit', async (e)=>{
    e.preventDefault()
    let task = document.getElementById("task").value
    if(current_id){
        await updateTask(current_id,task)
    }
    else{
        await addTask(task)
    }
})


async function addTask(task){
    try{

        const res = await fetch('http://localhost:3000/addtask',{
            method:"POST",
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({task})
        })
        const data = await res.json()
        if(res.status==201){
            getdata()
            document.getElementById("task").value=""
            alert("Task Added")
        }
        else{
            alert(data.error)
        }
    }
    catch(error){
        console.log(error)
    }
}

async function updateTask(id,updated_task) {
    try{
        const response = await fetch(`http://localhost:3000/update/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: updated_task }),
        });
        if (response.ok) {
            alert("Task Updated");
            document.getElementById("task").value=""
            getdata();
        }
    }
    catch(error){
        console.log(error)
    }
}



async function deleteTask(id) {
    
    const res = await fetch(`http://localhost:3000/delete/${id}`)
    const data = res.json()
    if(res.status==200){
        getdata()
        alert("Task Deleted")
    } else {
        alert(data.error)
    }
  }








//   document.getElementById("form").addEventListener("submit",async(e)=> {
    //     e.preventDefault();
    //     console.log("inside....")
    //     try{
    //         console.log("inside");
            
    //         const task = document.getElementById("task").value;
    //         console.log(document.getElementById("task").value);
            
    //         const res = await fetch("/addtask",{
    //             method:"POST",
    //             headers:{"Content-Type":"application/json"},
    //             body:JSON.stringify({task})
    //         })
    //         console.log(res);
            
    //         console.log("after respond");
            
    //         const data = await res.json()
    //         if(res.status == 201){
    //             getdata();
    //             document.getElementById("task").value="";
    //             alert("task added");
    //         }
    //         else{
    //             alert(data.error);
    //         }
    //     }
    //     catch(error){
    //         console.log(error);
            
    //     }
    // })
    







// console.log("successfully received data");
// async function getdata(){
//     const res = await fetch("/getdata");
//     const data = await res.json();
//     console.log(data);

//     let str = "";
//     data.forEach(e => {
//         str+=`
//         <div class="list">
//             <div class="task">${e.task}</div>
//             <div class="btn">
//                 <button class="button" type="submit" onclick="updatefn('${e._id}', '${e.task}')">Edit</button>
//                 <a href="/delete/${e._id}"><button class="button">Delete</button></a>
//             </div>
//         </div>`
//     })
//     document.getElementById("menu").innerHTML=str;
// }
// getdata()

// function updatefn(id,task){
//     document.getElementById("task").value = task;
//     document.getElementById("addbtn").textContent = "Update";
//     const form = document.getElementById("form")
//     form.action = `/update/${id}`;
// }
