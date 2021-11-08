class Model {
  constructor() {
    this.contacts = null;
    this.onContactListChanged = null;
    this.onTagListChanged = null;
    this.tags = null;
  }

  updateContacts(contactsData) {
    this.contacts = contactsData;
    this.onContactListChanged(this.contacts, 'allContacts');
    this.updateTags();
  }

  findMatchingContactNames(string) {
    if (string.length < 1) {
      this.onContactListChanged(this.contacts);
    }

    let matchingContacts;

    matchingContacts = this.contacts.filter(contact => {
      let pattern = new RegExp(`^${string}`, 'i');

      return contact.full_name.match(pattern);
    });

    this.onContactListChanged(matchingContacts, 'filteredContacts');
  }

  bindOnContactListChanged(callback) {
    this.onContactListChanged = callback;
  }

  bindOnTagListChanged(callback) {
    this.onTagListChanged = callback;
  }

  updateTags() {
    let tags = [];

    if (this.contacts.length > 0) {
      this.contacts.forEach(contact => {
        let allTags = contact.tags.split(',');
  
        allTags.forEach(tag => {
          if (tags.includes(tag)) {
            return;
          } else {
            tags.push(tag);
          }
        });
  
        this.tags = tags;
      });
    } else {
      this.tags = null;
    }

    this.onTagListChanged(this.tags);
  }

  filterContacts(tags) {
    let matches;

    matches = this.contacts.filter(contact => {
      let contactTags = contact.tags.split(',');
      return tags.every(tag => {
        return contactTags.includes(tag);
      });
    });

    this.onContactListChanged(matches, 'tagFilter');
  }
}

class View {
  constructor() {
    this.root = document.querySelector('#root');
    this.contactList = document.querySelector('#contact-list');
    this.tagList = document.querySelector('#tag-list');
    this.addContactButton = document.querySelector('.add-contact');
    this.searchBar = document.querySelector('.search');

    this.listItemScript = this.generateListItemScript();
    this.formScript = this.genereateFormScript();
    this.tagScript = this.generateTagScript();
  }

  resetContactList() {
    if (this.contactList.children.length > 0) {
      while (this.contactList.firstElementChild) {
        this.contactList.removeChild(this.contactList.firstChild);
      }
    } 
  }

  resetTagList() {
    if (this.tagList.children.length > 0) {
      while (this.tagList.firstElementChild) {
        this.tagList.removeChild(this.tagList.firstElementChild);
      }
    }
  }

  generateTagScript() {
    let template = document.querySelector('#tag-template').innerHTML;
    let script = Handlebars.compile(template);
    return script;
  }

  displayEmptyContactsMessage(keyword) {
    let paragraph = document.createElement('p');
    let text;

    if (keyword === 'allContacts') {
      text = 'There are no contacts.';
    } else if (keyword === 'filteredContacts'){
      let searchValue = this.searchBar.value;
      text = 'There are no matches for ' + `"${searchValue}"`;
    } else if (keyword === 'tagFilter') {
      text = 'There are no contacts with these tags.'
    }

    paragraph.textContent = text;
    this.contactList.appendChild(paragraph);
  }

  displayContacts(contactsData, keyword) {
    this.resetContactList();

    if (contactsData.length < 1) {
      this.displayEmptyContactsMessage(keyword);
    } else {
      let tempDiv = document.createElement('div');
  
      contactsData.forEach(contact => {
        let contactHtml = this.listItemScript({
          name: contact.full_name,
          number: contact.phone_number,
          email: contact.email,
          id: contact.id,
          tags: contact.tags,
        });
  
        tempDiv.innerHTML = contactHtml;
        this.contactList.appendChild(tempDiv.firstElementChild);
      });
    }
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
    this.searchBar.value = '';
    let mainPageElements = document.querySelectorAll('.main');
    [...mainPageElements].forEach(ele => ele.style.display = 'block');
  }

  bindDisplayAddContactForm(handler) {
    this.addContactButton.addEventListener('click', event => {
      event.preventDefault();
      this.hideMainPage();
      this.displayForm('Add Contact');

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
      });
    });
  }

  bindDisplayEditContactForm(handler) {
    this.contactList.addEventListener('click', event => {
      let target = event.target;

      if (target.tagName === 'A' && target.className === 'edit') {
        event.preventDefault();
        this.hideMainPage();
        this.displayForm('Edit Contact');
        this.populateEditForm(target);

        let form = document.querySelector('form');
        let path = target.getAttribute('href');

        form.addEventListener('submit', event => {
          event.preventDefault();

          let data = new FormData(form);
          let dataString = new URLSearchParams(data).toString();

          handler(path, dataString);
        });

        form.addEventListener('reset', event => {
          event.preventDefault();
  
          this.removeForm();
          this.displayMainPage();
        });
      }
    });
  }

  populateEditForm(target) {
    let listItem = target.closest('li');
    let contactName = listItem.querySelector('h2').textContent;
    let contactInfo = listItem.querySelectorAll('dd');
    let contactNumber = contactInfo[0].textContent;
    let contactEmail = contactInfo[1].textContent;
    let contactTags = contactInfo[2].textContent;

    let form = document.querySelector('form');
    
    form.full_name.value = contactName;
    form.phone_number.value = contactNumber;
    form.email.value = contactEmail;
    form.tags.value = contactTags;
  }

  bindDeleteContact(handler) {
    this.contactList.addEventListener('click', event => {
      let target = event.target;

      if (target.tagName === 'A' && target.className === 'delete') {
        event.preventDefault();
        handler(target.getAttribute('href'));
      }
    });
  }

  genereateFormScript() {
    let template = document.getElementById('submission-form').innerHTML;
    let script = Handlebars.compile(template);
    return script;
  }

  displayForm(formType) {
    let tempDiv = document.createElement('div');
    let form = this.formScript({type: formType});
    tempDiv.innerHTML = form;

    this.root.appendChild(tempDiv.firstElementChild);
  }

  removeForm() {
    let form = document.querySelector('form');
    form.remove();
  }

  bindSearchFunction(handler) {
    this.searchBar.addEventListener('keyup', event => {
      let target = event.target;
      let string = target.value;
      handler(string);
    });
  }

  displayNoTagCreatedMessage() {
    let paragraph = document.createElement('paragraph');
    paragraph.textContent = 'You have not defined any tags.';

    this.tagList.appendChild(paragraph);
  }

  displayTags(tags) {
    this.resetTagList();

    if (!tags) {
      this.displayNoTagCreatedMessage();
    } else {
      tags.forEach(tag => {
        let tempDiv = document.createElement('div');
        let radioElement = this.tagScript({tagName: tag});
        tempDiv.innerHTML = radioElement;
  
        this.tagList.appendChild(tempDiv.firstElementChild);
      });
    }
  }

  bindSelectingTag(handler) {
    this.tagList.addEventListener('click', event => {
      let target = event.target;

      if (target.type === 'checkbox') {
        let checkedTags = [];
        let parent = target.closest('div#tag-list');
        let allCheckboxes = [...parent.querySelectorAll('input')];
        
        allCheckboxes.forEach(checkbox => {
          if (checkbox.checked) {
            checkedTags.push(checkbox.value);
          }
        });

        handler(checkedTags);
      }
    })
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.getContactsAndUpdateModel();

    this.model.bindOnContactListChanged(this.onContactListChanged);
    this.model.bindOnTagListChanged(this.onTagListChanged);

    this.view.bindDisplayAddContactForm(this.handleAddContact);
    this.view.bindDisplayEditContactForm(this.handleEditContact);
    this.view.bindDeleteContact(this.handleDeleteContact);
    this.view.bindSearchFunction(this.handleSearchFunction);
    this.view.bindSelectingTag(this.handleSelectingTag);
  }

  getContactsAndUpdateModel() {
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
    .then(() => {
      this.getContactsAndUpdateModel();
      this.view.removeForm();
      this.view.displayMainPage();
    });
  }

  handleDeleteContact = (path) => {
    fetch(path, {
      method: 'DELETE',
    })
    .then(() => {
      this.getContactsAndUpdateModel();
    });
  }

  handleEditContact = (path, contactData) => {
    fetch(path, {
      method: 'PUT',
      headers: {'Content-Type': "application/x-www-form-urlencoded"},
      body: contactData,
    })
    .then(() => {
      this.getContactsAndUpdateModel();
      this.view.removeForm();
      this.view.displayMainPage();
    });
  }

  handleSearchFunction = (string) => {
    this.model.findMatchingContactNames(string);
  }

  onContactListChanged = (contactsData, keyword) => {
    this.view.displayContacts(contactsData, keyword);
  }

  onTagListChanged = (allTags) => {
    this.view.displayTags(allTags);
  }

  handleSelectingTag = (tag) => {
    this.model.filterContacts(tag)
  }
}

let app;

document.addEventListener('DOMContentLoaded', () => {
  app = new Controller(new Model(), new View());
});