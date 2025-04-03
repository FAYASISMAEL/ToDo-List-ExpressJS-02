console.log("successfully received data");
async function getdata(){
    const res = await fetch("/getdata");
    const data = await res.json();
    console.log(data);

    let str = "";
    data.forEach(e => {
        str+=`
        <div class="list">
            <div class="task">${e.task}</div>
            <div class="btn">
                <button class="button" type="submit" onclick="updatefn('${e._id}', '${e.task}')">Edit</button>
                <a href="/delete/${e._id}"><button class="button">Delete</button></a>
            </div>
        </div>`
    })
    document.getElementById("menu").innerHTML=str;
}
getdata()

function updatefn(id,task){
    document.getElementById("task").value = task;
    document.getElementById("addbtn").textContent = "Update";
    const form = document.getElementById("form")
    form.action = `/update/${id}`;
}
