# Creating a game constructor
  - ## Objective:
    - Create a game constructor that we can use to create a new game object

  - ## States that game needs to track:
    - Word chosen for the current game
    - Number of incorrect guesses (apples shown on tree)
    - All the letters guessed (letters shown for "Guesses")
    - Total allowed wrong guesses: Should be 6

  - ## Behavior available to object
    - Choose a word from the words array as the word of the game
    - Number of incorrect guesses should be initialized to 0
    - The letters guessed should be initialized as an empty array
    - Set total allowed wrong guesses to 6
    - Create blanks in the "Word" container. 
      The number of blanks should be the same way as the chosen word

  - ## Potential approach
    - Pseudo-classical and OLOO approaches can both work. 
    
    - ### For Pseudo-classical
      - Create a constructor that has a private `randomWord` method, as well as initializes the following properties
        - word to guess
          - Using `randomWord`
        - incorrect guesses
          - Set to 0
        - Letters guessed
          - Empty array
        - Total allowed wrong guesses
          - Set to 6
        - Create blanks in word container

# setBlanksForWordContainer
  - Find the `#spaces` div
  - Append `<span>` elements corresponding to the total amount of letters in the word chosen

# Event Handling and Gameplay

  - ## General requirements
    - Bind a keypress event to the document that will check the guessed letter against the word
    - When a letter is guessed, write it to the guesses container
    - If the number of incorrect guesses mathces the number of guesses available for a game (6 in this case), the game is over
      - Display a message and a link to start a new game
      - Unbind the keypress event
    - If all of the letters of the word have been revealed, display a win message and a link to start a new game
      - Unbind the keypress event
    - When the "Play another button is clicked, a new game is constructed.
      - The class on the apples container gets reset to show 6 apples again

- ## Potential approach  
    - ### Binding a keypress
      1.  Add an event listener to document that will handle a `keypress` event
      2. This event listener will only handle keys that are letters
        - Keycodes for a-z go from 97 to 122
      3. Add letter to array of guessed letters
      4. If the guess matches at least one letter in the word:
        - Output each instance of the guessed letter in the respective blank spaces
      5. If the guess is not a match:
        - Increment the incorrect guess count and change the class name on the apples container to change the count of apples
      6. If the letter has already been guessed, ignore it

    - ### Write letter to guess container
      - Locate the `#guesses` element
      - Create a new `<span>` element
        - Change the textContent of the `span` element to the guessed letter
      - Append the span to the `#guesses` event