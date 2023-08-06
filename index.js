const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');

// Function to generate the README content
function generateREADME(answers, licenseBadge) {
  return `
# ${answers.title}

${licenseBadge}

## Description
${answers.description}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This application is covered under the ${answers.license} license.

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
For additional questions, you can reach me through [GitHub](https://github.com/${answers.username}) or by email at ${answers.email}.
`;
}

// Function to get the license badge URL based on the selected license
function getLicenseBadgeURL(license) {
  // Here, you can implement a mapping of license names to badge URLs.
  // For example, using shields.io for license badges.
  switch (license) {
    case 'MIT':
      return 'https://img.shields.io/badge/License-MIT-yellow.svg';
    case 'Apache 2.0':
      return 'https://img.shields.io/badge/License-Apache%202.0-blue.svg';
    case 'GPL 3.0':
      return 'https://img.shields.io/badge/License-GPLv3-blue.svg';
    // Add more cases for other license options as needed.
    default:
      return '';
  }
}

// Prompt the user for project information
inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of your project:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter a description of your project:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Enter installation instructions:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Enter usage information:',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for your application:',
      choices: ['MIT', 'Apache 2.0', 'GPL 3.0'],
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Enter contribution guidelines:',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Enter test instructions:',
    },
    {
      type: 'input',
      name: 'username',
      message: 'Enter your GitHub username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address:',
    },
  ])
  .then((answers) => {
    // Get the license badge URL based on the selected license
    const licenseBadgeURL = getLicenseBadgeURL(answers.license);

    // Generate the README content
    const readmeContent = generateREADME(answers, licenseBadgeURL);

    // Save the generated README content to README.md
    fs.writeFile('README.md', readmeContent, (err) => {
      if (err) throw err;
      console.log('README.md has been generated successfully!');
    });
  })
  .catch((error) => console.error(error));
