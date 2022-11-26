import { useState, useMemo } from 'react';
import { ChallengeStructure } from '@typing/ChallengeInterface';
// import { ChallengesPageStore } from './Challenges.store';
import { ChallengesPageLogic } from './Challenges.logic';

export function useChallengesPage(challenges: ChallengeStructure[]) {
    // #region [ Local State ]
    const [searchText, setSearchText] = useState('');
    const [selectedChallengeDirectory, setSelectedChallengeDirectory] =
        useState('');
    const filteredChallenges = useMemo(() => {
        // if (searchText === '') {
        //     return challenges;
        // }
        // return ChallengesPageLogic.filterChallenges(challenges, searchText);
        return challenges;
    }, [challenges]);
    // }, [challenges, searchText]);

    // #endregion

    // #region [ Methods ]
    function handleOpenDirectory(path: string) {
        if (selectedChallengeDirectory === path) {
            setSelectedChallengeDirectory('');
        } else {
            setSelectedChallengeDirectory(path);
        }
    }
    // #endregion

    // #region [ Effects ]

    // #endregion

    return {
        selectedChallengeDirectory,
        handleOpenDirectory,
        searchText,
        setSearchText,
        filteredChallenges,
    };
}
