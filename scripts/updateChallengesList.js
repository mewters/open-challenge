const { readFile, readdir, writeFile } = require('fs/promises');
const path = require('path');
const DATA_SOURCE_PATH = path.normalize('src/data/data-source');
const BASE_PATH = path.join(DATA_SOURCE_PATH, 'challenges');

async function* getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

async function getChallenges(filePath) {
    const file = await readFile(filePath, 'utf8');
    const challenges = JSON.parse(file);
    return challenges.map((challenge) => ({
        id: challenge.id,
        title: challenge.title,
    }));
}

async function getChallengesFiles() {
    const basePath = BASE_PATH;
    const filesList = [];

    for await (const filePath of getFiles(basePath)) {
        const challenges = await getChallenges(filePath);
        filesList.push({
            filePath: path.join('src', path.relative('src', filePath)),
            challenges,
        });
    }
    return filesList;
}

async function getChallengesPaths() {
    const challengesFiles = await getChallengesFiles();
    const challengesPaths = [];
    for (const challengeFile of challengesFiles) {
        const challengePath = challengeFile.filePath.replace('.json', '');
        for (const challenge of challengeFile.challenges) {
            challengesPaths.push(
                path.join(challengePath, challenge.id).split('\\').join('/')
            );
        }
    }
    return challengesPaths;
}

async function saveFile(data, fileName) {
    const filePath = path.join(DATA_SOURCE_PATH, `${fileName}.json`);
    await writeFile(filePath, JSON.stringify(data));
}

async function writeChallengesFilesList() {
    const challengesFiles = await getChallengesFiles();
    await saveFile(challengesFiles, 'challenges-files-list');
}

async function writeChallengesStructure() {
    const challengesStructure = await getChallengesStructure();
    await saveFile(challengesStructure, 'challenges-structure');
}

async function writeChallengesPaths() {
    const challengesPaths = await getChallengesPaths();
    await saveFile(challengesPaths, 'challenges-paths');
}

async function getChallengesStructure() {
    const basePath = BASE_PATH;
    const filesList = await getChallengesFiles();
    const newFilesList = filesList.map((file) => ({
        ...file,
        filePath: file.filePath.replace(basePath, ''),
    }));

    const structure = [];
    newFilesList.forEach((file) => {
        const { filePath, challenges } = file;
        const pathArray = filePath.split(path.sep);
        const fileName = pathArray.pop();
        let currentLevel = structure;
        pathArray.forEach((path) => {
            let level = currentLevel.find((item) => item.path === path);
            if (!level) {
                level = {
                    path,
                    children: [],
                };
                currentLevel.push(level);
            }
            if (level.children) {
                currentLevel = level.children;
            }
        });
        currentLevel.push({
            path: fileName.replace('.json', ''),
            challenges,
        });
    });

    return structure[0].children;
}

(async () => {
    await writeChallengesStructure();
    await writeChallengesPaths();
})();
