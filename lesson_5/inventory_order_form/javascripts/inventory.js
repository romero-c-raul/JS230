var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      let dateElement = document.querySelector('#order_date');
      dateElement.textContent = date.toUTCString();
      // $("#order_date").text(date.toUTCString());
    },
    cacheTemplate: function() {
      // var $iTmpl = $("#inventory_item").remove();
      // console.log($iTmpl);
      // this.template = $iTmpl.html();

      let inventoryItemTemplate = document.querySelector('#template').innerHTML;
      let inventoryTemplateScript = Handlebars.compile(inventoryItemTemplate);
      this.template = inventoryTemplateScript;
      console.log(inventoryTemplateScript);
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
    update: function($item) {
      var id = this.findID($item),
          item = this.get(id);

      item.name = $item.find("[name^=item_name]").val();
      item.stock_number = $item.find("[name^=item_stock_number]").val();
      item.quantity = $item.find("[name^=item_quantity]").val();
    },
    newItem: function(e) {
      e.preventDefault();

      // var item = this.add(),
      //     $item = $(this.template.replace(/ID/g, item.id));

      var item = this.add()
      let context = { ID: item.id };

      let newItem = this.template(context);
      console.log(newItem);

      document.querySelector('#inventory').insertAdjacentHTML('beforeend', newItem);
      // $("#inventory").append($item);
    },
    findParent: function(e) {
      return $(e.target).closest("tr");
    },
    findID: function($item) {
      return +$item.find("input[type=hidden]").val();
    },
    deleteItem: function(e) {
      e.preventDefault();

      let target = event.target;

      if (target.tagName !== 'A' && target.className !== 'delete') {
        return;
      }

      var $item = this.findParent(e).remove();

      this.remove(this.findID($item));
    },
    updateItem: function(e) {
      let target = e.target;
      if (target.tagName !== 'INPUT') { return };

      var $item = this.findParent(e);

      this.update($item);
    },
    bindEvents: function() {
      // $("#add_item").on("click", $.proxy(this.newItem, this));
      // $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
      // $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));

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

// $($.proxy(inventory.init, inventory));
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
*/