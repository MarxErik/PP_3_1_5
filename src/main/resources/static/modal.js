async function openAndFillInTheModal(form, modal, id) {
    modal.show();
    let user = await getOneUser(id);
    console.log(user + "1123123123");
    form.id.value = user.id;
    form.lastname.value = user.lastName;
    form.age.value = user.age;
    form.email.value = user.email;
    form.username.value = user.username;
    form.password.value = user.password;
    form.roles.value = user.roles.join(',');
}