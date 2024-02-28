'use strict';

let form = document.forms["create"];
form.roles.options[1].selected=true;
createNewUser()
function createNewUser() {
    form.addEventListener("submit", ev => {
        ev.preventDefault();
        let roles = [];
        for (let i = 0; i < form.roles.options.length; i++) {
            if (form.roles.options[i].selected) roles.push({id: form.roles.options[i].value, role: "ROLE_" + form.roles.options[i].text});
        }
        fetch("/adminBootstrap/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // firstname: form.firstname.value,
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




