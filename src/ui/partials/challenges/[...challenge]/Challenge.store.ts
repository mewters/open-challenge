import { createStore } from '@udecode/zustood';


export const ChallengePageStore = createStore('ChallengePage')({
    value: '',
})
//.extendSelectors((set, get, api) => ({
//    newGetValue: () => get.value(),
//}))
//.extendActions((set, get, api) => ({
//    newSetValue(newValue) {
//        set.value = newValue;
//    },
//}));
