- Creating a game constructor
  - Objective:
    - Create a game constructor that we can use to create a new game object

  - States that game needs to track:
    - Word chosen for the current game
    - Number of incorrect guesses (apples shown on tree)
    - All the letters guessed (letters shown for "Guesses")
    - Total allowed wrong guesses: Should be 6

  - Behavior available to object
    - Choose a word from the words array as the word of the game
    - Number of incorrect guesses should be initialized to 0
    - The letters guessed should be initialized as an empty array
    - Set total allowed wrong guesses to 6
    - Create blanks in the "Word" container. 
      The number of blanks should be the same way as the chosen word

  - Potential approach
    - Pseudo-classical and OLOO approaches can both work. 
    
    - For Pseudo-classical
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

- setBlanksForWordContainer
  - Find the `#spaces` div
  - Append `<span>` elements corresponding to the total amount of letters in the word chosen