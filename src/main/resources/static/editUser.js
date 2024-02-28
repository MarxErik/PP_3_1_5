let formEdit = document.forms["formEdit"];
editUser();

async function editModal(id) {
    const modal = new bootstrap.Modal(document.querySelector('#edit'));
    await openAndFillInTheModal(formEdit, modal, id);
    formEdit.roles.options[1].selected=true;
    formEdit.password.value;
}

function editUser() {
    formEdit.addEventListener("submit", ev => {
        ev.preventDefault();
        let roles = [];
        for (let i = 0; i < formEdit.roles.options.length; i++) {
            if (formEdit.roles.options[i].selected) {
                roles.push({id: form.roles.options[i].value, role: "ROLE_" + form.roles.options[i].text});
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
                roles:roles
            })
        }).then(() => {
            $('#closeEdit').click();
            getTableUser()
        });
        console.log(formEdit)
    });
}
