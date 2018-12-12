const axios = require('axios');
const internals = {};

internals.seleniumHubServiceName = 'selenium-hub';

internals.developmentDeploySeleniumStandalones = async (dTO) => {
  const numberOfRequestedStandalones = dTO.length;
  if (numberOfRequestedStandalones < 1 || numberOfRequestedStandalones > 12) throw new Error(`The number of selenium nodes requested was: ${numberOfRequestedStandalones}. The supported number of testSessions is from 1-12`);

  const http = axios.create({baseURL: 'http://docker-compose-ui:5000/api/v1', headers: {'Content-type': 'application/json'}});

  const browserCounts = {};
  for (let i = 0; i < dTO.length; i += 1) {
    browserCounts[dTO[i]] = 1 + (browserCounts[dTO[i]] || 0);
  }

  const promisedResponses = Object.keys(browserCounts).map(b => http.put('/services', {service: b, project: 'selenium-standalone', num: browserCounts[b]}));
  let successful;
  await Promise.all(promisedResponses);

  const containers = await http.get('/projects/selenium-standalone');
  const seleniumStandaloneServiceNames = containers.data.containers.map(c => c.name);

  const itemsCopy = [...items];

  Array.from(dTO, b => )


};

internals.productionDeploySeleniumStandalones = async (event) => {
  throw new Error('Not Implemented');
  // Todo: KC: Deploy ECS Task
};

exports.provisionSeleniumStandalones = async (event, context) => {
  const env = process.env.NODE_ENV;
  const { seleniumHubServiceName } = internals;
  const {  } = event;
  //const response = {};
  //try {
    const result = await internals[`${env}DeploySeleniumStandalones`](event);

  //} catch (error) {
  //  return { body: error };
  //}
  const response = {
    //'statusCode': 200,
    body: { seleniumStandaloneServiceNames, requestedSeleniumStandalonesWereProvisioned: result }
  };

  return response
};
