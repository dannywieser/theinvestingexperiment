import inquirer from 'inquirer';
import { questions } from './questions';
import { contribute } from './contribute';



console.log('-- Transaction Handler --');

const handlers = {
  contribute,
};

inquirer.prompt(questions).then(answers => {
  const { type } = answers;
  const handler = handlers[type];
  handler(answers);
});
