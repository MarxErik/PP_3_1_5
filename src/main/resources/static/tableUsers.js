'use strict';
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
