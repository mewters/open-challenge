// import { ChallengesPageStore } from './Challenges.store';
// import { ChallengesPageLogic } from './Challenges.logic';

import { useState } from 'react';

export function useChallengesPage() {
    // #region [ Local State ]
    const [selectedChallengeDirectory, setSelectedChallengeDirectory] =
        useState('');
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

    return { selectedChallengeDirectory, handleOpenDirectory };
}
