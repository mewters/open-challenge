import { Challenge } from '@typing/ChallengeInterface';

const { readFile, readdir } = require('fs/promises');
const path = require('path');

async function* getFiles(dir: string): AsyncGenerator<string> {
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

async function getChallengesIds(filePath: string) {
    const file = await readFile(filePath, 'utf8');
    const challenges = JSON.parse(file);
    return challenges.map((challenge: Challenge) => challenge.id);
}

export async function getChallengesFiles() {
    const basePath = path.normalize('src/data/data-source/challenges');
    const filesList = [];

    for await (const filePath of getFiles(basePath)) {
        const challenges = await getChallengesIds(filePath);
        filesList.push({
            filePath: path.join('src', path.relative('src', filePath)),
            challenges,
        });
    }
    return filesList;
}
