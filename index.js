/* eslint-disable no-console */

const translate = require('@vitalets/google-translate-api');
const nouns = require('./nounList');

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line

const translateNoun = async (noun) => {
  console.log(`translating "${noun}"`);
  try {
    const res = await translate(noun, { from: 'en', to: 'no' });
    console.log(`translation response: ${JSON.stringify(res, null, 2)}`);
    return res.text;
  } catch (error) {
    console.log('translate err', JSON.stringify(error, null, 2));
    throw error;
  }
};

const getRandomNoun = () => {
  const randomIndex = getRandomInt(0, nouns.length - 1);
  const n = nouns[randomIndex];
  console.log(`random noun "${n}"`);
  return n;
};

const makeApparat = async () => {
  const noun = getRandomNoun();
  const norwegianNoun = await translateNoun(noun);
  const apparat = `${norwegianNoun}apparat`;
  console.log(`result: ${apparat}`);
  return apparat;
};

exports.makeApparat = makeApparat;

exports.generateApparat = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const result = await makeApparat();
      res.send(result);
      break;
    }
    case 'POST': {
      const result = {
        text: await makeApparat(),
        response_type: 'in_channel',
      };
      res.send(result);
      break;
    }
    default:
      res.status(400).send('bad request');
      break;
  }
};
