getCurrentUser()

function getCurrentUser() {
    fetch("userBootstrap/auth")
        .then(res => res.json())
        .then(js => {
            $('#emailCurrentUser').append(`<span>${js.email}</span>`)
            $('#roleCurrentUser').append(`<span>${js.roles.map(r => r.name.substring(0))}</span>`)
            const user = `$(
                    <tr>
                        <td>${js.id}</td>
                        <td>${js.username}</td>
                        <td>${js.lastName}</td>
                        <td>${js.age}</td>
                        <td>${js.email}</td>
                        <td>${js.roles.map(r => r.name.substring(0))}</td>
                    </tr>)`;
            $('#oneUser').append(user)
        })
}