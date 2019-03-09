import path from 'path';
import fs from 'fs';
import translate from 'google-translate-api';
import { getRandomInt } from '../utils/randomUtil';

const translateNoun = async (noun) => {
  console.log(`Translating noun "${noun}"`);
  try {
    const res = await translate(noun, { to: 'no' });
    return res.text;
  } catch (error) {
    console.log('translate err', error);
    throw error;
  }
};

const getRandomNoun = () => {
  console.log('__dirname', __dirname);
  const nounlistPath = path.resolve(__dirname, 'data', 'nounlist.txt');
  console.log('nounlistPath', nounlistPath);
  const nounsAsString = fs.readFileSync(nounlistPath, { encoding: 'UTF-8' });
  console.log('nounsAsString', nounsAsString);
  const nouns = nounsAsString.split('\n');
  const randomIndex = getRandomInt(0, nouns.length - 1);
  const n = nouns[randomIndex];
  console.log('n', n);
  return n;
};

const generateApparat = async () => {
  const noun = getRandomNoun();
  const norwegianNoun = await translateNoun(noun);
  return `${norwegianNoun}apparat`;
};

export default generateApparat;
