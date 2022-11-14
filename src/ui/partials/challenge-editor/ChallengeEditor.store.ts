import { createStore } from '@udecode/zustood';

export const ChallengeEditorPageStore = createStore('ChallengeEditorPage')({
    value: '',
});
//.extendSelectors((set, get, api) => ({
//    newGetValue: () => get.value(),
//}))
//.extendActions((set, get, api) => ({
//    newSetValue(newValue) {
//        set.value = newValue;
//    },
//}));
