const program = require('commander');
const inquirer = require('inquirer');
const logController = require('./app/controllers/logController');
const databaseConfig = require('./config/database');

program
  .version('1.0.0')
  .description('Log Query Interface');

program
  .command('search')
  .action(async () => {
    let continueSearching = true;

    while (continueSearching) {
      const { queryType } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'queryType',
          message: 'Select the attribute to query (choose "Quit" to exit):',
          choices: [
            'level',
            'message',
            'resourceId',
            'traceId',
            'spanId',
            'commit',
            'metadata.parentResourceId',
            'Quit',
          ],
          default: 'Quit'
        },
      ]);

      if (queryType === 'Quit') {
        console.log('Exiting the search cli...');
        process.exit(0);
      }

      const options = await getUserInput(queryType);
      await logController.search(options);

      const { continueSearch } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'continueSearch',
          message: 'Do you want to continue searching?',
          default: true,
        },
      ]);

      if (!continueSearch) {
        console.log('Exiting the search cli...');
        process.exit(0);
      }

      continueSearching = continueSearch;
    }
  });

program.parse(process.argv);

async function getUserInput(queryType) {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'queryValue',
      message: 'Enter the value to search for:',
    },
    {
      type: 'input',
      name: 'numberOfLogs',
      message: 'Enter the number of logs to retrieve (press Enter for all logs):',
      validate: (value) => {
        if (value === '' || /^\d+$/.test(value)) {
          return true;
        }
        return 'Please enter a valid number or press Enter for all logs.';
      },
    },
    {
      type: 'confirm',
      name: 'enableTimestampFilter',
      message: 'Do you want to filter logs by timestamp?',
      default: false,
    },
    {
      type: 'input',
      name: 'startTimestamp',
      message: 'Enter the start timestamp (e.g., "2023-09-10T00:00:00Z"):',
      when: (answers) => answers.enableTimestampFilter,
    },
    {
      type: 'input',
      name: 'endTimestamp',
      message: 'Enter the end timestamp (e.g., "2023-09-15T23:59:59Z"):',
      when: (answers) => answers.enableTimestampFilter,
    },
  ]);
   const valuesArray = answers.queryValue.split(',');
   const resultObject = {};

   for (let i = 0; i < queryType.length; i++) {
     resultObject[queryType[i]] = valuesArray.length >= i ? valuesArray[i] : undefined;
   }
   if(answers.startTimestamp && answers.enableTimestamp){
       resultObject['timestamp'] = {
        $gte: new Date(answers.startTimestamp),
        $lte: new Date(answers.endTimestamp),
     };
   }else if(answers.startTimestamp || answers.enableTimestamp){
        if(answers.startTimestamp){
           resultObject['timestamp'] = {
               $gte: new Date(answers.startTimestamp),
            };
        }else{
           resultObject['timestamp'] = {
               $lte: new Date(answers.endTimestamp),
            };
        }
   }

  const options = {
    query: resultObject,
    limit: answers.numberOfLogs ? parseInt(answers.numberOfLogs, 10) : undefined,
  };

  return options;
}