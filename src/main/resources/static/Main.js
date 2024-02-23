const URL = "http://localhost:8080/adminBootstrap/users";

const roleList = []
$(document).ready(function () {
    getCurrentUser();
    getAllUsers();
    fetch("http://localhost:8080/adminBootstrap/roles")
        .then(response => response.json())
        .then(roles => {
            roles.forEach(role => {
                roleList.push(role)
            })
        })
})

// function getAllUsers() {
//     const usersTable = $('.users-table')
//     usersTable.empty()
//     fetch(URL)
//         .then(response => response.json())
//         .then(users => {
//             users.forEach(user => {
//                 let row = `$(
//                     <tr>
//                         <td>${user.id}</td>
//                         <td>${user.username}</td>
//                         <td>${user.lastName}</td>
//                         <td>${user.age}</td>
//                         <td>${user.email}</td>
//                         <td>${user.roles.map(r => r.name.substring(0))}</td>
//                         <td>
//                             <button type="button" class="btn btn-primary" data-toggle="modal"
//                             onclick="showEditModal(${user.id})">Edit</button>
//                         </td>
//                         <td>
//                             <button type="button" class="btn btn-danger" data-bs-toggle="modal"
//                             onclick="showDeleteModal(${user.id})">Delete</button>
//                         </td>
//                     </tr>
//                 )`
//                 usersTable.append(row)
//             })
//         })
//         .catch(err => console.log(err))
// }

function getAllUsers() {
    const usersTable = $('.users-table');
    usersTable.empty();

    fetch(URL)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                let row = $(
                    `<tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${user.roles.map(r => r.name.substring(0))}</td>  
                        <td>
                            <button type="button" class="btn btn-primary" data-toggle="modal"
                            onclick="showEditModal(${user.id})">Edit</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" 
                            onclick="showDeleteModal(${user.id})">Delete</button>
                        </td>
                    </tr>`
                );
                usersTable.append(row);
            });
        })
        .catch(err => console.log(err));
}


function getCurrentUser() {
    fetch("adminBootstrap/user")
        .then(res => res.json())
        .then(js => {
            // Очистить содержимое элементов перед обновлением
            $('#emailCurrentUser').empty();
            $('#roleCurrentUser').empty();
            $('#oneUser').empty();

            // Обновить информацию о текущем пользователе
            $('#emailCurrentUser').append(`<span>${js.email}</span>`);
            $('#roleCurrentUser').append(`<span>${js.roles.map(r => r.name.substring(0))}</span>`);
            const user = $(`
                <tr>
                    <td>${js.id}</td>
                    <td>${js.username}</td>
                    <td>${js.lastName}</td>
                    <td>${js.age}</td>
                    <td>${js.email}</td>
                    <td>${js.roles.map(r => r.name.substring(0))}</td>
                </tr>`);
            $('#oneUser').append(user);
        });
}


function newUser() {
    let newUserForm = $('#new-user-form')[0]
    fillRoles(newUserForm);
    newUserForm.addEventListener("submit", (ev) => {
        ev.preventDefault()
        ev.stopPropagation()

        let newUser = JSON.stringify({
            username: $(`[name="username"]`, newUserForm).val(),
            lastName: $(`[name="lastName"]`, newUserForm).val(),
            age: $(`[name="age"]`, newUserForm).val(),
            email: $(`[name="email"]`, newUserForm).val(),
            password: $(`[name="password"]`, newUserForm).val(),
            roles: getRole(newUserForm)
        })
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: newUser
        }).then(r => {
            newUserForm.reset();
            $('#users-table-tab')[0].click();
            location.reload(); // Добавлено обновление страницы
        })
    })
}


function showEditModal(id) {
    const editModal = new bootstrap.Modal(document.querySelector('#edit'));
    const editForm = $('#edit-form')[0]
    showModal(editForm, editModal, id)
    editForm.addEventListener('submit', (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        let newUser = JSON.stringify({
            id: $(`[name="id"]`, editForm).val(),
            username: $(`[name="username"]`, editForm).val(),
            lastName: $(`[name="lastName"]`, editForm).val(),
            age: $(`[name="age"]`, editForm).val(),
            email: $(`[name="email"]`, editForm).val(),
            password: $(`[name="password"]`, editForm).val(),
            roles: getRole(editForm)
        })
        fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: newUser
        }).then(r => {
            editModal.hide()
            $('#users-table-tab')[0].click()
            if (!r.ok) {
                alert("User with this email already exists!!")
            } else {
                location.reload();
            }
        })
    })
}

//deleteModal
function showDeleteModal(id) {
    const deleteModal = new bootstrap.Modal(document.querySelector('#delete'));
    const deleteForm = $('#delete-form')[0]
    showModal(deleteForm, deleteModal, id)
    deleteForm.addEventListener('submit', (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        fetch(URL + `/${$(`[name="id"]`, deleteForm).val()}`, {
            method: 'DELETE'
        }).then(r => {
            deleteModal.hide()
            $('#users-table-tab')[0].click()
        })
    })
}


//Utils
function showModal(form, modal, id) {
    modal.show()
    fillRoles(form)
    fetch(URL + `/${id}`).then(response => {
        response.json().then(user => {
            $(`[name="id"]`, form).val(user.id)
            $(`[name="username"]`, form).val(user.username)
            $(`[name="lastName"]`, form).val(user.lastName)
            $(`[name="age"]`, form).val(user.age)
            $(`[name="email"]`, form).val(user.email)
            $(`[name="password"]`, form).val(user.password)
        })
    })
}


function fillRoles(form) {
    const rolesSelect = $(`[name="roles"]`, form);

    // Очистка элемента <select>
    rolesSelect.empty();

    roleList.forEach(role => {
        let option = `<option value="${role.id}">
                                 ${role.name}
                            </option>`;
        rolesSelect.append(option);
    });
}

function getRole(form) {
    let role = []
    let options = $(`[name="roles"]`, form)[0].options
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            role.push(roleList[i])
        }
    }
    return role
}

