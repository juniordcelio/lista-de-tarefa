const tasks = []

function toggleModalAdd () {
    const modalAdd = document.querySelector('#modal')

    if (modalAdd.classList.contains('closeModal')) {
        modalAdd.classList.remove('closeModal')
        modalAdd.classList.add('openModal')
        document.querySelector('#taskDesc').focus()
    } else {
        modalAdd.classList.remove('openModal')
        modalAdd.classList.add('closeModal')
    }

    document.querySelector('.inputWarn').style.display = 'none'
}

function addTask () {
    const task = {
        desc: document.querySelector('#taskDesc'),
        date: document.querySelector('#taskDate'),
        check: false
    }

    if (task.desc.value != '') {
        tasks.push({
            desc: task.desc.value,
            date: task.date.value,
            check: task.check
        })


        parseToHTML()

        task.desc.value = ''
        task.date.value = ''

        toggleModalAdd()
    } else {
        document.querySelector('.inputWarn').style.display = 'inline-block'
    }

}

document.querySelector('#taskDesc').addEventListener('keyup', event => {
    if (event.which == 13 || event.keyCode == 13) {
        addTask()
    }else if (event.which == 27 || event.keyCode == 27) {
        toggleModalAdd()
    }
        
    return
})

function parseToHTML () {
    let listTasks = '<ul>'

        for (let i = 0; i < tasks.length; i++) {
            listTasks += `<li>
                <div class="task">
                    <div>
                        <input type="checkbox" name="did" id="checkbox${i}" value="${tasks[i].check}"> ${tasks[i].desc}
                        <p>Data da tarefa: ${tasks[i].date}</p>                  
                    </div>
                    <div class="taskBtns">
                        <button id="${i}" onclick="deleteTask(this)">Excluir</button>
                    </div>
                </div>
            </li>`
        }

        listTasks += '</ul>'
        document.querySelector('#list').innerHTML = listTasks
}

function deleteTask (element) {
    tasks.splice(element.getAttribute('id'), 1)
    parseToHTML()
}
