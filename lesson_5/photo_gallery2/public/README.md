# Step 1 - Render photos and photo information

  - ## Objective:
    - Fetch Photos Data and Render Photos on Page Load

  - ## Steps: 
    1. Issue an AJAX request to get the server to get the JSON data for all the photos on page load
    2. Render the `photos` template, and write it to the `#slides` div
    3. Render the `photo_information` template using the first photo's data, and write it to the `section > header` element that needs to contain the photo information

  - ## API needed:
    - Path: `/photos`
    - HTTP method: GET
    - Returns: an array of photos data in JSON format

  - ## Implementation
    1. ### Get JSON data for all photos on page load
        - Create a new `XMLHttpRequest` and perform a `GET` request to `/photos`

    2. ### Render the `photos` template, and write it to the `#slides` div
        - What is the `photos` template?
          - Here we are using an `if` helper to iterate over an array of objects that each contain an `id`, `src`, and `caption` property
          - Example: `context = { photos = [object1, object2, object3]}`
        - After rendering the template, the HTML will be appended to `#slides`

    3. ### Render the `photo_information` template using the first photos data
      - What is the `photo_information` template?
        - This template takes the attributes of: `title`, `created_at`, `id`, `likes`, `favorites`;
      - Extract the first object from the JSON that we received as a response
      - Render the template using the information from that first object
  
# Step 2 - Render Comments for the First Photo
  - ## Objective:
    - Request the comments data for the first photo and render it on page load

  - ## API Needed:
    - Path: `/comments?photo_id=\<number\>`
      - Where number is the photo id
    - HTTP method: GET
    - Returns: An array of comments for the photo with photo_id

  - ## Implementation
    - Create a method that takes an id and uses that to render the comments associated with that id on the page
    - For this, we need to make use of the `photo_comments` template as well as the `photo_comment` partial
    - What does the `photo_comments` template do?
      - Iterates through an array of comments
      - For each comment, you will use the partial comment template `photo_comment`
      - Context looks like: `{ comments = commentObj1, commentObj2... commentObjX}`
    
    - Create a request to `/comments?photo_id=\<number\>`
    - The response will be an array of comments
    - Create the context and pass it to the template `photo_comments`
    - Insert the rendered comments as a child of `#comments ul`