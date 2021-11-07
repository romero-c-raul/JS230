class Model {
  constructor() {
    this.contacts = null;
    this.onContactListChanged = null;
    
  }

  updateContacts(contactsData) {
    this.contacts = contactsData;
    this.onContactListChanged(this.contacts);
  }

  bindOnContactListChanged(callback) {
    this.onContactListChanged = callback;
  }


}

class View {
  constructor() {
    this.contactList = document.querySelector('#contact-list');
    this.listItemScript = this.generateListItemScript();
  }

  displayAllContacts(contactsData) {
    let tempDiv = document.createElement('div');

    contactsData.forEach(contact => {
      let contactHtml = this.listItemScript({
        name: contact.full_name,
        number: contact.phone_number,
        email: contact.email,
      });

      tempDiv.innerHTML = contactHtml;
      this.contactList.appendChild(tempDiv.firstElementChild);
    });
  }

  generateListItemScript() {
    let template = document.querySelector('#list-item').innerHTML;
    let script = Handlebars.compile(template);
    return script;
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.getAllContacts();
    this.model.bindOnContactListChanged(this.onContactListChanged);
  }

  getAllContacts() {
    fetch('/api/contacts', {
      method: "GET"
    })
    .then(response => response.json())
    .then(data => {
      this.model.updateContacts(data);
    });
  }

  onContactListChanged = (contactsData) => {
    this.view.displayAllContacts(contactsData);
  }
}

let app;

document.addEventListener('DOMContentLoaded', () => {
  app = new Controller(new Model(), new View());
});