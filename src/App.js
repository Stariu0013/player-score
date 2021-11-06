import React, {useEffect, useState} from 'react';
import PlayerTable from "./PlayerTable/PlayerTable";

import styles from './App.module.css';

let evtSource;

function App() {
    const [ usersData, setUsersData ] = useState([]);
    const [ sortType, setSortType ] = useState('ASC');
    const [ hidden, setHidden ] = useState(false);

    if (!evtSource) {
        evtSource = new EventSource("http://localhost:5000/");
    }

    useEffect(() => {
        const storageUsersData = localStorage.getItem('usersData') || '[]';
        const storageSortType = localStorage.getItem('sortType') || 'ASC';

        setUsersData(JSON.parse(storageUsersData));
        setSortType(storageSortType);
    }, []);

    useEffect(() => {
        if (!hidden) {
            const ac = new AbortController();

            evtSource.addEventListener('eventData', event => {
                setUsersData(prevState => [...prevState, JSON.parse(event.data)]);
            }, {
                signal: ac.signal,
            });

            return () => {
                ac.abort();
            };
        }
    }, [hidden]);

    useEffect(() => {
        localStorage.setItem('usersData', JSON.stringify(usersData));
        localStorage.setItem('sortType', sortType);
    }, [usersData, sortType]);

    return <div>
        <button onClick={() => {
            setHidden(!hidden);
        }} className={styles.btn}>Toggle Player Table</button>
        <button onClick={() => {
            setUsersData([]);
        }} className={styles.btn}>Clear data</button>

        {
            hidden ? <div/> : <PlayerTable usersData={usersData} setSortType={setSortType} sortType={sortType}/>
        }
    </div>
}

export default App;
