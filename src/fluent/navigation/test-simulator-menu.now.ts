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

Record({
    $id: Now.ID['test_simulator_menu_module_user_collections'],
    table: 'sys_app_module',
    data: {
        title: 'User Collections',
        application: testSimulatorMenu,
        link_type: 'LIST',
        name: 'x_2119443_test_sim_user_collection',
        active: true,
        order: 300,
    },
})

Record({
    $id: Now.ID['test_simulator_menu_module_questions'],
    table: 'sys_app_module',
    data: {
        title: 'Questions',
        application: testSimulatorMenu,
        link_type: 'LIST',
        name: 'x_2119443_test_sim_question',
        active: true,
        order: 400,
    },
})

Record({
    $id: Now.ID['test_simulator_menu_module_answers'],
    table: 'sys_app_module',
    data: {
        title: 'Answers',
        application: testSimulatorMenu,
        link_type: 'LIST',
        name: 'x_2119443_test_sim_answer',
        active: true,
        order: 500,
    },
})

Record({
    $id: Now.ID['test_simulator_menu_module_tests'],
    table: 'sys_app_module',
    data: {
        title: 'Tests',
        application: testSimulatorMenu,
        link_type: 'LIST',
        name: 'x_2119443_test_sim_test',
        active: true,
        order: 600,
    },
})

Record({
    $id: Now.ID['test_simulator_menu_module_test_questions'],
    table: 'sys_app_module',
    data: {
        title: 'Test Questions',
        application: testSimulatorMenu,
        link_type: 'LIST',
        name: 'x_2119443_test_sim_test_question',
        active: true,
        order: 700,
    },
})