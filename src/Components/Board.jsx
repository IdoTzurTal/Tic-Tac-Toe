import React, { useState, useEffect } from 'react';
import './Board.css';

function Board({ boardState, onSquareClick }) {
    const [winner, setWinner] = useState(null)

    useEffect(() => {
        function checkForWinner() {
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                    return { symbol: boardState[a], line: i };
                }
            }

            return null;
        }
        setWinner(checkForWinner())
        
    }, [boardState])


    let message;

    if (winner) {
        message = `${winner.symbol} wins!`;
    }

    return (
        <div>
            <h2>Tic-Tac-Toe</h2>
            <div id="board">
                {boardState.map((value, index) => (
                    <div
                        key={index}
                        data-index={index}
                        className={`tile ${index % 3 !== 2 ? "right-border" : ""} ${index < 6 ? "bottom-border" : ""}`}
                        onClick={() => onSquareClick(index)}
                    >
                        {value}
                    </div>
                ))}
                {winner && (
                    <div
                        id="strike"
                        className={`strike ${winner.symbol === "X" ? "strike-x" : "strike-o"} strike-line-${winner.line}`}
                    ></div>
                )}
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Board;
