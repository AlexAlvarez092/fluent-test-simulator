import { Acl, RestApi } from '@servicenow/sdk/core';
import { getCollectionsList, saveCollectionForCurrentUser } from '../../server/rest-api/test-simulator-api';

const testSimulatorApiAcl = Acl({
    $id: Now.ID['test_simulator_api_execute'],
    name: 'test_simulator_api',
    type: 'rest_endpoint',
    operation: 'execute',
    roles: ['x_2119443_test_sim.user', 'x_2119443_test_sim.admin'],
    securityAttribute: 'user_is_authenticated',
    adminOverrides: false,
});

RestApi({
    $id: Now.ID['test_simulator_api'],
    name: 'Test Simulator API',
    serviceId: 'test_simulator_api',
    shortDescription: 'Application REST API for Test Simulator',
    consumes: 'application/json',
    produces: 'application/json',
    enforceAcl: [testSimulatorApiAcl],
    routes: [
        {
            $id: Now.ID['test_simulator_api_collections_list'],
            name: 'Collections list',
            method: 'GET',
            path: '/collections',
            script: getCollectionsList,
            authentication: true,
            authorization: true,
            produces: 'application/json',
            enforceAcl: [testSimulatorApiAcl],
        },
        {
            $id: Now.ID['test_simulator_api_collections_save'],
            name: 'Save collection',
            method: 'POST',
            path: '/collections/save',
            script: saveCollectionForCurrentUser,
            authentication: true,
            authorization: true,
            consumes: 'application/json',
            produces: 'application/json',
            enforceAcl: [testSimulatorApiAcl],
        },
    ],
});