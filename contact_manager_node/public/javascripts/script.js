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
    this.root = document.querySelector('#root');
    this.contactList = document.querySelector('#contact-list');
    this.addContactButton = document.querySelector('.add-contact');
    this.listItemScript = this.generateListItemScript();
    this.formScript = this.genereateFormScript();
  }

  displayAllContacts(contactsData) {
    if (this.contactList.children.length > 0) {
      while (this.contactList.firstElementChild) {
        this.contactList.removeChild(this.contactList.firstChild);
      }
    } 

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

  hideMainPage() {
    let mainPageElements = document.querySelectorAll('.main');
    [...mainPageElements].forEach(ele => ele.style.display = 'none');
  }

  displayMainPage() {
    let mainPageElements = document.querySelectorAll('.main');
    [...mainPageElements].forEach(ele => ele.style.display = 'block');
  }

  bindDisplayAddContactForm(handler) {
    this.addContactButton.addEventListener('click', event => {
      event.preventDefault();
      this.hideMainPage();
      this.displayForm();

      let form = document.querySelector('form');

      form.addEventListener('submit', event => {
        event.preventDefault();

        let data = new FormData(form);
        let dataString = new URLSearchParams(data).toString();

        handler(dataString);
      });

      form.addEventListener('reset', event => {
        event.preventDefault();

        this.removeForm();
        this.displayMainPage();
      })
    });
  }

  genereateFormScript() {
    let template = document.getElementById('submission-form').innerHTML;
    let script = Handlebars.compile(template);
    return script;
  }

  displayForm() {
    let tempDiv = document.createElement('div');
    let form = this.formScript({type: 'Add Contact'});
    tempDiv.innerHTML = form;

    this.root.appendChild(tempDiv.firstElementChild);
  }

  removeForm() {
    let form = document.querySelector('form');
    form.remove();
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.getAllContacts();
    this.model.bindOnContactListChanged(this.onContactListChanged);

    this.view.bindDisplayAddContactForm(this.handleAddContact);
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

  handleAddContact = (contactData) => {
    fetch('/api/contacts', {
      method: 'POST',
      headers: {'Content-Type': "application/x-www-form-urlencoded"},
      body: contactData,
    })
    .then(response => console.log(response))
    .then(data => {
      console.log(data);
      this.getAllContacts();
      this.view.removeForm();
      this.view.displayMainPage();
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