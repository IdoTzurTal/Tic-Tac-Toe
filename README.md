# Tic-Tac-Toe
A fun Tic-Tac-Toe game with Single Player and Multiplayer modes.

The app's components:

***FRONTEND***

***Home***:
This component is a home page for an online Tic-Tac-Toe game. It allows users to sign up and sign in using their name and email address. The component uses Axios to make POST requests to a local server to create and sign in players. Once a user signs in, they are redirected to the mode selection page. The user's email is also stored in local storage.

***ModeSelect***:
This is a React component that renders a mode selection page for a Tic-Tac-Toe game. It imports the useNavigate hook from react-router-dom, which is used to navigate to different pages within the app. The component defines two functions, toSingle() and toMulti(), that use navigate() to navigate to the /SinglePlayer and /MultiPlayer pages, respectively. The return statement renders two buttons for the user to select either the singleplayer or multiplayer mode of the game. When the user clicks on either of the buttons, the corresponding function is called to navigate to the selected mode.

***Board***:
These components are used to build a game of Tic-Tac-Toe. The SinglePlayer component is used to handle the logic for playing against the computer, while the Board component is used to display the game board and handle the logic for determining the winner of the game. The MultiPlayer component is used to allow the user to choose between hosting a game or joining an existing game.

In the SinglePlayer component, there is an isPlayerXTurn state variable that determines whether it is the human player's turn or the computer's turn. There is also a useEffect hook that is used to automatically trigger the computer's turn when it is the computer's turn to play. The computerTurn function is used to randomly select a square on the game board for the computer to play.

The Board component takes in boardState and onSquareClick props. boardState is an array that represents the state of the game board, where each element in the array is either "X", "O", or null. onSquareClick is a function that is called when a square on the game board is clicked. The useEffect hook in the Board component is used to determine the winner of the game based on the current state of the game board. If there is a winner, the setWinner function is called to update the winner state variable.

Finally, the MultiPlayer component allows the user to choose between hosting a game or joining an existing game by clicking on the respective button. The useNavigate hook from the react-router-dom library is used to handle navigation between different pages of the application.

***SinglePlayer***:
The SinglePlayer component is a React component that implements a single player mode for the tic-tac-toe game. It receives the current state of the board, the function to update the board state, the current player and the function to update the current player as props. It uses the useState hook to keep track of whether it's the player's turn (isPlayerXTurn) and the useEffect hook to trigger the computer's turn if it's not the player's turn.

When it's the player's turn, clicking on an empty cell on the board triggers the onSquareClick function, which updates the board state with an "X" in the cell that was clicked, sets isPlayerXTurn to false and updates the current player to "O". When it's the computer's turn, the computerTurn function is called, which generates a random index to select an empty cell on the board and updates the board state with an "O" in that cell, sets isPlayerXTurn to true and updates the current player to "X". The setTimeout function is used to delay the computer's turn by 200ms to provide a better user experience.

The SinglePlayer component also renders a title, the current player, and the Board component, passing in the board state, onSquareClick function, and the current player as props.

***MultiPlayer***:
This component is a React functional component called MultiPlayer. It renders two buttons for the user to select whether they want to host a game or join an existing game. It uses the useNavigate hook from the react-router-dom library to navigate to the appropriate page when a button is clicked.

The toHost function is called when the "Host Game" button is clicked and navigates to the '/HostGame' route. The toJoin function is called when the "Join Game" button is clicked and navigates to the '/JoinGame' route.

The component returns a div that contains the two buttons.

***HostGame***:
This component is a React component that represents the host game view of the tic-tac-toe game in multiplayer mode. It receives several props including the current state of the game board, a function to handle square clicks, the current player, and the email address of the user.
The component renders a Board component with the given board state and click handler. Additionally, it has a button that allows the user to create an invitation link to invite a friend to play the game. The component uses the uuid library to generate a unique game id and creates a URL link with the game id and user email address as query parameters.
Once the user clicks the "Create Invitation Link" button, the component displays the generated link and provides a text input field for copying the link.

***JoinGame***:
These are two components for a Tic Tac Toe game in React, one for hosting a game and the other for joining a game. The HostGame component allows a user to create an invitation link that they can share with someone else to join the game. The JoinGame component allows a user to join a game using an invitation link.

The HostGame component has a state for the invitation link and game ID, which are set when the createInvitationLink function is called. When the button to create the invitation link is clicked, the function generates a unique game ID using the uuid library and sets the invitation link to include the game ID and the user's email address. The Board component is rendered with the current boardState and onSquareClick function, which are passed in as props.

The JoinGame component has states for the game ID, email, player ID, loading, error, player, board, isPlayer1, isPlayer2, and hasJoinedGame. The component fetches the game ID and email from the URL parameters and uses them to join the game by making a POST request to the server. If the request is successful, the player ID is set and the loading state is set to false. If there is an error, the error state is set to a message.

The component also establishes a socket connection with the server and listens for two events: "player2Joined" and "joinedGame". When a player2Joined event is received, the handlePlayer2Joined function is called and logs the player ID to the console. When a joinedGame event is received, the handleJoinedGame function is called and sets the player, board, isPlayer1, isPlayer2, and hasJoinedGame states based on the data received from the server.

The handleCellClick function is called when a cell on the board is clicked. If the user is not player 1 or the cell is not empty, the function does nothing. Otherwise, it sets the new board state with the user's symbol in the clicked cell and calls the onSquareClick function with the row, column, and symbol as arguments.

If the loading state is true, the component renders a "Loading..." message. If the error state is set, the component renders an error message. If the user has not yet joined the game, the component renders a message indicating that they are waiting for another player to join. If the user has joined the game, the component renders the game board and a message indicating whose turn it is.


***BACKEND***:

***index.js***:

This is a Node.js/Express server that connects to a MongoDB database and sets up routes for handling HTTP requests. It also uses Socket.IO to set up a real-time communication channel with clients.

The code initializes an instance of the express application and connects to the MongoDB database using the mongoose package. The cors package is used to allow cross-origin requests from the frontend.

The code sets up routes for handling HTTP requests related to creating a player, signing in a player, creating a game, joining a game, and playing a turn. These routes are handled by controllers (PlayerController and GameController) defined in separate files.

The code also initializes a Socket.IO instance and listens for connections on port 9003. When a client connects, it logs a message to the console and emits a 'hello' event to the client.

Finally, the code starts the server and listens on port 9001 for incoming requests.

***Player**:

This is a Node.js module that exports a Player model created using Mongoose.

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model application data, validate it, and perform CRUD (Create, Read, Update, Delete) operations on it.

This Player model defines the schema for a player object with two fields: name and email. Both fields are required, and the email field must be unique. The model is exported so that it can be used in other parts of the application to interact with the database.

***Game.js***:

The first code snippet is a React functional component that renders the game board and includes logic for determining the winner of the game. The component receives two props: boardState, which is an array of strings representing the current state of the game board, and onSquareClick, which is a callback function to be called when a square on the board is clicked. The component uses the useState and useEffect hooks to keep track of the winner and update the UI accordingly. The useEffect hook calls a function that checks for a winner by iterating over all possible winning combinations and checking if the same symbol is present in all three squares. If a winner is found, the setWinner function is called to update the winner state. The component also renders a strike-through line on the board to indicate the winning combination of squares.

The second code snippet is a Node.js server that uses the Express.js framework to handle HTTP requests and responses. It also uses the Mongoose library to connect to a MongoDB database and define schemas for the Player and Game models. The server defines several routes for handling game-related actions, such as creating a player, signing in a player, creating a game, joining a game, and playing a turn. The server also uses the Socket.io library to enable real-time communication between the client and server. The io object is initialized with a cors option to allow connections from the http://localhost:3000 origin. The io object listens for a connection event and emits a hello event when a client connects.

The third code snippet defines a Mongoose schema for the Player model. The schema includes two fields: name, which is a required string, and email, which is a unique required string. The mongoose.model function is used to create a Mongoose model for the schema and export it.

The fourth code snippet defines a Mongoose schema for the Game model. The schema includes four fields: player1 and player2, which are references to Player objects, board, which is a two-dimensional array of strings representing the game board, turn, which is a number representing the current turn, and winner, which is a string representing the symbol of the winner or null if there is no winner yet. The mongoose.model function is used to create a Mongoose model for the schema and export it.

***PlayerController.js***:

These are two controller functions for the player-related routes in the Express app.

The first function, createPlayer, receives a request object and a response object as arguments. It extracts the name and email properties from the request body, creates a new Player object using the Player model, and saves it to the database using the save method. If there is an error, it sends a 500 status code and the error message. If the player is successfully saved, it sends a 200 status code and a JSON object containing a message and the created player.

The second function, playerSignIn, also receives a request and a response object. It finds a player with the provided email address in the database using the findOne method. If there is an error, it sends a 500 status code and the error message. If there is no player found, it sends a 400 status code and a message. If a player is found, it sends a 200 status code and a message with the player's name.

***GameController***:

These components are related to the game logic of a tic-tac-toe game played over a socket connection.

The createGame function creates a new game instance in the database with a player1 field set to the email of the player who created the game. It emits a Game Created event to the socket client with the gameId.

The joinGame function allows a second player to join an existing game by setting the player2 field of the game instance in the database to the playerId passed in as a parameter. It emits a player2Joined event to the socket client with the playerId and a joinedGame event with the gameId. It also logs a message to the console indicating that a player has joined the game.

The playTurn function allows a player to make a move on the game board by updating the corresponding cell in the board field of the game instance in the database. It checks if the move is valid by verifying if it's the player's turn, if the game is already over, and if the chosen cell is already occupied. If the move is valid, it emits an Opponent Moved event to the other player in the game, and a Move Successful event to the current player with the updated game board, turn, and winner information.

The checkWinner function is not shown in these components, but it's likely used to determine if a player has won the game after making a move. It's probably a separate helper function that takes the game board as an argument and returns the winner (either 'X' or 'O') or null if there is no winner yet.
