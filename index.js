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
    // If the result's text is the same as the input, we didn't get a translation
    if (res.text === noun) {
      return null;
    }
    return res.text;
  } catch (error) {
    console.error('translate err', JSON.stringify(error, null, 2));
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
  const maxAttempts = 10;
  try {
    let norwegianNoun = null;
    let i = 0;
    while (norwegianNoun === null && i < maxAttempts) {
      const noun = getRandomNoun();
      norwegianNoun = await translateNoun(noun);
      i++;
    }
    if (norwegianNoun) {
      const apparat = `${norwegianNoun}apparat`;
      console.log(`result: ${apparat}`);
      return apparat;
    }
    return null;
  } catch (error) {
    console.error(`makeApparat error: ${err}`);
    return null;
  }
};

exports.makeApparat = makeApparat;

exports.generateApparat = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const result = await makeApparat();
      if (result) {
        res.send(result);
      } else {
        res.status(500).send("something crashed...");
      }
      break;
    }
    case 'POST': {
      const result = await makeApparat();
      if (result.text) {
        res.send({
          text: result,
          response_type: 'in_channel',
        });
      } else {
        res.status(500).send({
          text: `[something crashed :poop:]`,
          response_type: 'in_channel',
        })
      }
      break;
    }
    default:
      res.status(400).send('bad request');
      break;
  }
};
