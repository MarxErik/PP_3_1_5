'use strict';


//CurrentUser
function getCurrentUser() {
    fetch("/userBootstrap/auth")
        .then(res => res.json())
        .then(user => {
            const roles = user.roles.map(role => role.name).join(',')
            $('#emailCurrentUser').append(`<span>${user.email}</span>`)
            $('#roleCurrentUser').append(`<span>${roles.replace('ROLE_', '') + ' '}</span>`)
            const u = `$(
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.lastName}</td>
                        <td>${user.email}</td>
                        <td>${user.age}</td>
                        <td>${user.username}</td>
                        <td>${roles.replace('ROLE_', '') + ' '}</td>
                    </tr>)`;
            $('#oneUser').append(u)
        })
}

getCurrentUser()


//Delete User

let deleteForm = document.forms["formDelete"]

async function deleteModal(id) {
    const modal = new bootstrap.Modal(document.querySelector('#delete'));
    await openAndFillInTheModal(deleteForm, modal, id);
    switch (deleteForm.roles.value) {
        case '1':
            deleteForm.roles.value = 'ADMIN';
            break;
        case '2':
            deleteForm.roles.value = 'USER';
            break;
    }
    deleteUser()
}

function deleteUser() {
    deleteForm.addEventListener("submit", ev => {
        ev.preventDefault();
        fetch("/adminBootstrap/users/" + deleteForm.id.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            $('#closeDelete').click();
            getTableUser();
        });
    });
}


//Edit User
let formEdit = document.forms["formEdit"];

editUser();

async function editModal(id) {
    const modal = new bootstrap.Modal(document.querySelector('#edit'));
    await openAndFillInTheModal(formEdit, modal, id);
    formEdit.roles.options[1].selected = true;
    formEdit.password.value;
}

function editUser() {
    formEdit.addEventListener("submit", ev => {
        ev.preventDefault();
        let roles = [];
        for (let i = 0; i < formEdit.roles.options.length; i++) {
            if (formEdit.roles.options[i].selected) {
                roles.push({
                    id: form.roles.options[i].value,
                    role: "ROLE_" + form.roles.options[i].text
                });
            }


        }
        fetch("/adminBootstrap/users", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: formEdit.id.value,
                lastName: formEdit.lastname.value,
                age: formEdit.age.value,
                email: formEdit.email.value,
                username: formEdit.username.value,
                password: formEdit.password.value,
                roles: roles
            })
        }).then(() => {
            $('#closeEdit').click();
            getTableUser()
        });
        console.log(formEdit)
    });
}


//Get User
async function getOneUser(id) {
    let url = "/adminBootstrap/users/" + id;
    let response = await fetch(url);
    return await response.json();
}



//Model
async function openAndFillInTheModal(form, modal, id) {
    modal.show();
    let user = await getOneUser(id);
    form.id.value = user.id;
    form.lastname.value = user.lastName;
    form.age.value = user.age;
    form.email.value = user.email;
    form.username.value = user.username;
    form.password.value = user.password;
    form.roles.value = user.roles.join(',');
}




//Create User
let form = document.forms["create"];
form.roles.options[1].selected = true;
createNewUser()

function createNewUser() {
    form.addEventListener("submit", ev => {
        ev.preventDefault();
        let roles = [];
        for (let i = 0; i < form.roles.options.length; i++) {
            if (form.roles.options[i].selected) roles.push({
                id: form.roles.options[i].value,
                role: "ROLE_" + form.roles.options[i].text
            });
        }
        fetch("/adminBootstrap/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lastName: form.lastname.value,
                age: form.age.value,
                email: form.email.value,
                username: form.username.value,
                password: form.password.value,
                roles: roles
            })
        }).then(() => {
            form.reset();
            $('#home-tab').click();
            getTableUser();
        });
    });
}


//AllUser
const tbody = $('#AllUsers');
getTableUser();

function getTableUser() {
    tbody.empty();
    fetch("/adminBootstrap/users")
        .then(res => res.json())
        .then(js => {
            console.log(js);
            js.forEach(user => {
                const roles = user.roles.map(role => role.name).join(',');
                const users = $(
                    `<tr>
                        <td class="pt-3" id="userID">${user.id}</td>
                        <td class="pt-3" >${user.lastName}</td>
                        <td class="pt-3" >${user.email}</td>
                        <td class="pt-3" >${user.age}</td>
                        <td class="pt-3" >${user.username}</td>
                        <td class="pt-3" >${roles.replace('ROLE_', '') + ' '}</td>
                        <td>
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#edit" onclick="editModal(${user.id})">
                            Edit
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete" onclick="deleteModal(${user.id})">
                                Delete
                            </button>
                        </td>
                    </tr>`
                );
                tbody.append(users);
            });
        })
}