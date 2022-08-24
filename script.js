setURL('http://developerakademie.com/smallest_backend_ever')

//https://github.com/JunusErgin/smallest_backend_ever
/*Examples
If you want to see a full working example, open the file example.html. Imagine we're having an array of users:

let users = [];
Save
Add a user with this function:

function addUser() {
    users.push('John);
    backend.setItem('users', JSON.stringify(users));
}
If you want to wait for the request you can add the await keyword as well:

Add a user with this function:

async function addUser() {
    users.push('John);
    await backend.setItem('users', JSON.stringify(users));
}
Load
Fill your empty array with users from the Server

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}
Delete
Delete all users from your array:

function deleteUser(name) {
  await backend.deleteItem('users');
}*/
