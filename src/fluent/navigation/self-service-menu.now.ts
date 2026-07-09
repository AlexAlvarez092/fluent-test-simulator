import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['test_simulator_self_service_module_home'],
    table: 'sys_app_module',
    data: {
        title: 'Test Simulator',
        application: '08771d0cc0a8016401f604303b94b999',
        link_type: 'DIRECT',
        query: 'x_2119443_test_sim_app.do',
        window_name: '_blank',
        roles: ['x_2119443_test_sim.user'],
        override_menu_roles: true,
        active: true,
        order: 105,
    },
})