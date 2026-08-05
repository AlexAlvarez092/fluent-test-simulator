import { ApplicationMenu, Record } from '@servicenow/sdk/core';

const quizSimulatorMenu = ApplicationMenu({
    $id: Now.ID['quiz_simulator_menu'],
    title: 'Quiz Simulator',
    hint: 'Quiz Simulator navigation',
    description: 'Navigation menu for Quiz Simulator application',
    roles: ['x_2119443_quiz_sim.user'],
    active: true,
    category: '',
});

Record({
    $id: Now.ID['quiz_simulator_menu_module_home'],
    table: 'sys_app_module',
    data: {
        title: 'Quiz Simulator',
        application: quizSimulatorMenu,
        link_type: 'DIRECT',
        query: 'x_2119443_quiz_sim_app.do',
        window_name: '_blank',
        active: true,
        order: 100,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
});

Record({
    $id: Now.ID['quiz_simulator_menu_module_collections'],
    table: 'sys_app_module',
    data: {
        title: 'Collections',
        application: quizSimulatorMenu,
        link_type: 'LIST',
        name: 'x_2119443_quiz_sim_collection',
        active: true,
        order: 200,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
});

Record({
    $id: Now.ID['quiz_simulator_menu_module_user_collections'],
    table: 'sys_app_module',
    data: {
        title: 'User Collections',
        application: quizSimulatorMenu,
        link_type: 'LIST',
        name: 'x_2119443_quiz_sim_user_collection',
        active: true,
        order: 300,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
});

Record({
    $id: Now.ID['quiz_simulator_menu_module_questions'],
    table: 'sys_app_module',
    data: {
        title: 'Questions',
        application: quizSimulatorMenu,
        link_type: 'LIST',
        name: 'x_2119443_quiz_sim_question',
        active: true,
        order: 400,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
});

Record({
    $id: Now.ID['quiz_simulator_menu_module_answers'],
    table: 'sys_app_module',
    data: {
        title: 'Answers',
        application: quizSimulatorMenu,
        link_type: 'LIST',
        name: 'x_2119443_quiz_sim_answer',
        active: true,
        order: 500,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
});

Record({
    $id: Now.ID['quiz_simulator_menu_module_quizzes'],
    table: 'sys_app_module',
    data: {
        title: 'Quizzes',
        application: quizSimulatorMenu,
        link_type: 'LIST',
        name: 'x_2119443_quiz_sim_quiz',
        active: true,
        order: 600,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
});

Record({
    $id: Now.ID['quiz_simulator_menu_module_quiz_questions'],
    table: 'sys_app_module',
    data: {
        title: 'Quiz Questions',
        application: quizSimulatorMenu,
        link_type: 'LIST',
        name: 'x_2119443_quiz_sim_quiz_question',
        active: true,
        order: 700,
        override_menu_roles: false,
        require_confirmation: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        uncancelable: false,
    },
});
