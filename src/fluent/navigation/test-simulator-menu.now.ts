import { ApplicationMenu, Record } from '@servicenow/sdk/core'

const testSimulatorMenu = ApplicationMenu({
    $id: Now.ID['test_simulator_menu'],
    title: 'Test Simulator',
    hint: 'Test Simulator navigation',
    description: 'Navigation menu for Test Simulator application',
    roles: ['x_2119443_test_sim.admin'],
    active: true,
})

Record({
    $id: Now.ID['test_simulator_menu_module_home'],
    table: 'sys_app_module',
    data: {
        title: 'Test Simulator',
        application: testSimulatorMenu,
        link_type: 'DIRECT',
        query: 'x_2119443_test_sim_app.do',
        window_name: '_blank',
        active: true,
        order: 100,
    },
})

Record({
    $id: Now.ID['test_simulator_menu_module_collections'],
    table: 'sys_app_module',
    data: {
        title: 'Collections',
        application: testSimulatorMenu,
        link_type: 'LIST',
        name: 'x_2119443_test_sim_collection',
        active: true,
        order: 200,
    },
})