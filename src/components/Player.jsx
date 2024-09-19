import { useState } from "react";

const  Player  = ({initialName, symbol, isActive, onChangePlayerName}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);
    const handleEditClick = () => {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangePlayerName(symbol, playerName);
        }
    }

    const handleChange = (newPlayerName) => {
        setPlayerName(newPlayerName.target.value);
    }

    const editablePlayerName = isEditing ?
        <input type="text" required value={playerName} onChange={ handleChange}/> :
        <span className="player-name">{playerName}</span>



    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
              <button
                  onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}
              </button>
            </span>
        </li>
    )
}

export default Player;