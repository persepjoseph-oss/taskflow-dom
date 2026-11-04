const  form = document.querySelector('#task-form')
const input = document.querySelector('#task-input')
const list = document.querySelector('#task-list')
const emptyMsg  = document.querySelector('#empty-msg')
const statTotal = document.querySelector('#stat-total')
const statPending = document.querySelector('#stat-pending')
const statDone = document.querySelector('#stat-done')
const progressBar = document.querySelector('#progress-bar')



let tasks =[];
form.addEventListener('submit' , (event)=>{
        event.preventDefault();
        const text = input.value.trim();
        if (text === ' ') return ;
        
        const task = {id : Date.now(), text : text, done : false};
        tasks.push(task);
        input.value = '';
        render();
});

function render(){

}


function render() {
  list.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task';
    if (task.done) li.classList.add('done');
    li.dataset.id = task.id;

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'task-check';
    check.checked = task.done;


    const title = document.createElement('span');
    title.className = 'task-title';
    title.textContent = task.text;

    const del = document.createElement('button');
    del.className = 'task-delete';
    del.textContent = 'BORRAR';

    li.appendChild(check);
    li.appendChild(title);
    li.appendChild(del);
    list.appendChild(li);
  });                     

  updateStats();
}

function updateStats(){
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    const pending = total-done ;

    statTotal.textContent = total ;
    statPending.textContent = pending;
    statDone.textContent = done;

    const  percent =total ===0 ? 0 : Math.round((done/total)*100);
    progressBar.style.width = '${percent}%';

    emptyMsg.hidden = total > 0 ; 
}

render();