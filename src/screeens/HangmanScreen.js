import React, {useEffect, useState} from "react";
import {words} from "../config/words";

const HangmanScreen = () => {
    const [input, setInput] = useState('');
    const [secret, setSecret] = useState(['*','*','*','*','*','*','*','*','*','*','*','*','*','*']);
    const [handWorld, setHandWorld] = useState('');
    const [life, setLife] = useState(9);

    useEffect(() => {
        setHandWorld(pickOne(words));
    }, []);

    const pickOne = (words) => {
        const val = words[Math.floor(words.length * Math.random())]
        console.log('handWorld', val)

        return val;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        //check if input is in the word
        const index = handWorld.indexOf(input);
        console.log('index', index);

        if (index !== -1) { //if it s in update secret word

            let tmpSecret = [...secret]
            tmpSecret[index - 1] = input;

            setSecret(tmpSecret)
        } else { //if not lose one life and update hangman
            setLife(life => life -1)
        }
        //rest input
        setInput('');
    };

    const handleChange = (event) => {
        let value = event.target.value;
        if (!/[a-zA-Z]/.test(event.target.value)) {
            value = ''
        }
        setInput(value.toLowerCase())
    };

    return (
        <div>
            <h1>Jeu du pendu !</h1>
            <p>Veuillez saisir une lettre parmis celle proposé</p>
            <p>'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
                'v', 'w', 'x', 'y', 'z'</p>
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={handleChange} maxLength="1"/>
                <br/>
                <input style={{marginTop: 10}} type="submit" value="Submit"/>
            </form>
            <div style={{marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                {secret.map((val, index) => {
                    return <div key={index}>{val}</div>
                })}
            </div>
            <p>Life number: {life}</p>
            {
                life < 1 && <h2>You fucking lose noob</h2>
            }
            {
                !secret.includes('*') && <h2>You fucking WIN</h2>
            }
        </div>
    );
};

export default HangmanScreen
