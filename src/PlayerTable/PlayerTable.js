import React from 'react';

import styles from './PlayerTable.module.css';

function PlayerTable(props) {
    const { usersData, setSortType, sortType } = props;

    const changeIsSorted = () => {
        setSortType(sortType === 'ASC' ? 'DESC' : 'ASC');
    };

    const sortDESC = (a, b) => {
        return b['score'] - a['score'];
    };
    const sortASC = (a, b) => {
        return a['score'] - b['score'];
    };

    return <table className={styles.table}>
        <thead>
        <tr>
            <td className={`${styles.td} ${styles.playerName}`}>Player</td>
            <td className={`${styles.td} ${styles.score}`} onClick={changeIsSorted}>Score</td>
        </tr>
        </thead>

        <tbody>
        {
            usersData.sort(sortType === 'ASC' ? sortASC : sortDESC)
                .map(userData => {
                    const {
                        player,
                        score,
                        id,
                    } = userData;

                    return <tr key={id}>
                        <td className={`${styles.td} ${styles.playerName}`}>{player}</td>
                        <td className={`${styles.td} ${styles.score}`}>{score}</td>
                    </tr>;
                })
        }
        </tbody>
    </table>;
}

export default PlayerTable;
