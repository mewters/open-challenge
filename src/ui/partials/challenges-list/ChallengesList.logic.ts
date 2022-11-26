// import { ChallengesPageStore } from './Challenges.store';

import { ChallengeStructure } from '@typing/ChallengeInterface';

export class ChallengesListPageLogic {
    static filterChallenges(
        challengesList: ChallengeStructure[],
        searchText: string
    ) {
        return challengesList;
    }
}
