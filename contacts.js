const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.join("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then(data => JSON.parse(data))
    .then(data => console.table(data))
    .catch(err => console.log(err));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then(data => JSON.parse(data))
    .then(data =>
      console.table(data.find(contact => +contact.id === contactId))
    )
    .catch(err => console.log(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then(data => JSON.parse(data))
    .then(data => {
      const contact = data.filter(contact => +contact.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(contact));
      listContacts();
    })
    .catch(err => console.log(err));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then(data => JSON.parse(data))
    .then(data => {
      const contact = [...data, { id: uid(5), name, email, phone }];
      fs.writeFile(contactsPath, JSON.stringify(contact));
      listContacts();
    })
    .catch(err => console.log(err));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
