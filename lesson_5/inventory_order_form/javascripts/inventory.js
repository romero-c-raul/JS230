var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      let dateElement = document.querySelector('#order_date');
      dateElement.textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      let inventoryItemTemplate = document.querySelector('#template').innerHTML;
      let inventoryTemplateScript = Handlebars.compile(inventoryItemTemplate);
      this.template = inventoryTemplateScript;
    },
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        console.log(typeof item.id, typeof idx);

        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function(currentItem) {          
      var id = this.findID(currentItem),
          item = this.get(id);

      item.name = currentItem.querySelector("input[name^=item_name]").value;
      item.stock_number = currentItem.querySelector("input[name^=item_stock_number]").value;
      item.quantity = currentItem.querySelector("input[name^=item_quantity]").value;
    },
    newItem: function(e) {
      e.preventDefault();

      var item = this.add()
      let context = { ID: item.id };

      let newItem = this.template(context);

      document.querySelector('#inventory').insertAdjacentHTML('beforeend', newItem);
    },
    findParent: function(e) {
      return e.target.closest('tr');
    },
    findID: function(item) {
      return Number(item.querySelector('input').value);
    },
    deleteItem: function(e) {
      e.preventDefault();

      let target = event.target;

      if (target.tagName !== 'A' && target.className !== 'delete') {
        return;
      }

      let item = this.findParent(e);
      item.remove();

      this.remove(this.findID(item));
    },
    updateItem: function(e) {
      let target = e.target;
      if (target.tagName !== 'INPUT') { return };

      var item = this.findParent(e);

      this.update(item);
    },
    bindEvents: function() {
      let addItem = document.querySelector('#add_item');
      let inventoryList = document.querySelector('#inventory');

      addItem.addEventListener('click', this.newItem.bind(this));
      inventoryList.addEventListener('click', this.deleteItem.bind(this));
      inventoryList.addEventListener('focusout', this.updateItem.bind(this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  inventory.init();
});

/*
- IMPLEMENTING HANDLEBARS
  - Key points:
    - Initial implementation of `cacheTemplate` saves the current template as a `template` property of the inventory object (in string form)
    - This template property is used in one other method: `newItem`
      - newItem essentially parses through the string and replaces the `id` value with the last item id

  - How to implement handlebars?
    - Retrieve the template and get the html
    - Create a temmplateScript, this function will now be a property of the object
    - In the `newItem` method, we will pass an object with the new item id, so it can be dynamically replacede
    - We will append the newly created html to the inventory element

- findParent Method
  - Utilized in two other methods: deleteItem and updateItem

- update and updateItem methods
  - Replace jQuery find with vanilla JS querySelector
*/