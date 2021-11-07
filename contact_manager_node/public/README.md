## Application Structure
  - The framework used to build this application will be MVC
  - The Model represents a local representation of our contacts
    - Here, we will have an array of objects as our part of our Model's state. These objects represent the contact itself, while the properties represent the information about that specific contact
  - The View is concerned with our output, which is what we look at on the website
    - This is the interface through which the user can perform actions such as add, remove, edit, and filter contacts
  - The Controller helps us interface between both. In the Controller we will perform AJAX requests. These AJAX requests will be used to update the model

## Application Workflow
  - For example, when the page first loads:
    - Event listener defined on the View gets triggered
    - This event listener calls a method in the Controller class
    - The Controller performs an AJAX requests 
      - The Controller is interacting with the API to obtain the contact information
    - Once the response is received, a method will be called in the Model class
      - For example, maybe we were getting all the contacts, so we need to update the Model's state to reflect all the contacts that were returned by the API
    - Once the model is updated, a method will be called, that will call a controller method, that will call a view method that will update our output

## Building The Application
  ### 1. Initial Page

  #### Objective
  - In this step, our main focus is to render unto the page the contacts that are already in existance
  - This will include writing some HTML for creating a contact as well as search bar
  - Using the API to obtain all the contacts that already exist
  - Update the model
  - Render the output according to the newest version of our model

  #### Steps
  - On the constructor method in `View`, define a property that points to the contacts `div`
  <!-- - Define a method on `View` called `bindInitialPageLoad`
    - This method will add an event listener that will get called when the DOM is constructed -->
    - This method will take a handler called `getAllContacts`, this handler will be defined in the `Controller` and will perform an AJAX request to obtain all the contacts from the API
  - Method `getAllContacts` will perform an AJAX request, and upon receiving a response, will update the state of the `Model`.
    - The `Model` will update its `contacts` property, which will point to an array of objects that reflects the contacts provided by the API
    - Once the `contacts` property is updated, the function (which is a property of model) `onContactListChanged` will be called
  - Method `bindOnContactListChanged` will be defined in the `Model`
    - This method will take a callback, and this callback will be set as a property of `Model`
  - Method `onContactListChanged` will be defined in the `Controller`
    - This method will call a method on the `View` called `displayAllContacts`
  - Method `displayAllContacts` will take an an array of objects
    - Use the array of objects to generate the HTML of each contact
      - We will do this with Handlebars
    - We will find the `div#contacts` and add the elements that represent all the contacts
  - Handlebars template will be defined in script tag on index file
    - 
    
      
