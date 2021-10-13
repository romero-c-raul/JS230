// 1. Locate the template by ID and compile it to a template function. Render the post to the body element using the function.

// let post = {
//   title: 'Lorem ipsum dolor sit amet',
//   published: 'April 1, 2015',
//   body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
// };

// let template = $('#post').html();
// let templateScript = Handlebars.compile(template);

// let html = templateScript(post);

// $(document.body).append(html);

// 2. Change your post object's body property to contain HTML elements as part of the string. Modify your Handlebars template to allow HTML to be output unescaped.

{/* <script id="post" type="text/x-handlebars">
  <article>
    <h1>{{title}}</h1>
    <p><time>Posted on {{published}}</time></p>
    {{{body}}} 
  </article>
</script> */}

// 3. Add a property called tags on the post object that will be an array of strings to represent tags added to the blog post. Use the Handlebars each built-in helper to output all tags for the post.

// post.tags = ['Food', 'Cooking', 'Vegetables'];

// <script id="post" type="text/x-handlebars">
//   <article>
//     <h1>{{title}}</h1>
//     <p><time>Posted on {{published}}</time></p>
//     {{{body}}}
//     <footer>
//       <p>
//         Tags:
//         {{#each tags}}
//         <strong>{{this}}</strong>
//         {{/each}}
//       </p>
//     </footer>
//   </article>
// </script>

//4. Create a separate template for the HTML element that wraps each tag. Using the handlebars partial method, register the template as a partial using the name "tag" and replace the HTML for tags in the main template with a reference to the partial.

{/* <script id="tag" type="text/x-handlebars">
  <strong>{{this}}</strong>
</script>

<script id="post" type="text/x-handlebars">
  <article>
    <h1>{{title}}</h1>
    <p><time>Posted on {{published}}</time></p>
    {{{body}}}
    <footer>
      <p>
        Tags:
        {{#each tags}}
        {{>tag}}
        {{/each}}
      </p>
    </footer>
  </article>
</script>

Handlebars.registerPartial('tag', $('#tag').html()); */}

// 5. Create a posts array, adding the existing post to it. Add a second post with no tags property. Modify your template to check for the existence of tags, and if none exist, output a "Not tagged" message. Wrap the template in an each loop to output each post.

// let partial = Handlebars.registerPartial('tag', $('#tag').html());

// let post = {
//   title: 'Lorem ipsum dolor sit amet',
//   published: 'April 1, 2015',
//   body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
// };

// let newPost = Object.assign({}, post);

// post.body = '<p>' + post.body + '</p>'
// post.tags = ['a', 'ab', 'abc', 'abcd'];

// let postArr = [post, newPost]

// let template = $('#post').html();
// let templateScript = Handlebars.compile(template);

// let html = templateScript({posts: postArr});
// $(document.body).append(html);


// <script id="post" type="text/x-handlebars">
//       {{#each posts}}  {/* This is the each loop */}
//         <article>
//           <h1>{{title}}</h1>
//           <p><time>Posted on {{published}}</time></p>
//           {{{body}}}
//           <footer>
//             <p>
//               {{#if tags}}
//                 Tags: {{#each tags}}
//                   {{> tag}}
//                 {{/each}}
//               {{else}}
//                 Not Tagged
//               {{/if}}
//             </p>
//           </footer>
//         </article>
//       {{/each}}
//     </script>