'use strict';

// adminBootstrap/user
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