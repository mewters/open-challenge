// import { ChallengesPageStore } from './Challenges.store';

import { ChallengeStructure } from '@typing/ChallengeInterface';

export class ChallengesPageLogic {
    static filterChallenges(
        challengesList: ChallengeStructure[],
        searchText: string
    ) {
        return challengesList;
    }
}
