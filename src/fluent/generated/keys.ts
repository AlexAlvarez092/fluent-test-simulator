import '@servicenow/sdk/global';

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    answer_create: {
                        table: 'sys_security_acl';
                        id: '5784d9517ed349c09cf192c056c5b3cb';
                    };
                    answer_delete: {
                        table: 'sys_security_acl';
                        id: '8e2bca1186274811b435ad947380252a';
                    };
                    answer_read: {
                        table: 'sys_security_acl';
                        id: '07ffdbbf61a84733b389920949f01413';
                    };
                    answer_write: {
                        table: 'sys_security_acl';
                        id: 'fea81f2a1dc44b6791b80349bf37fb70';
                    };
                    bom_json: {
                        table: 'sys_module';
                        id: 'a57cf2663b334410a9bab3ca853a595a';
                    };
                    collection_create: {
                        table: 'sys_security_acl';
                        id: '4b188f68af6d40e59b276ff75ff7c426';
                    };
                    collection_delete: {
                        table: 'sys_security_acl';
                        id: 'f0c1275dfbaa491c84e29d2bafe05d0d';
                    };
                    collection_read: {
                        table: 'sys_security_acl';
                        id: '2370e53ff8d147659f8cf35d2dd55671';
                    };
                    collection_write: {
                        table: 'sys_security_acl';
                        id: 'e20310520b6f4c44b66834a3f32d36df';
                    };
                    package_json: {
                        table: 'sys_module';
                        id: '402585b55cab48c6ae83c90758d3b786';
                    };
                    question_create: {
                        table: 'sys_security_acl';
                        id: '73063a9f88824ece83882dd01739e595';
                    };
                    question_delete: {
                        table: 'sys_security_acl';
                        id: '83337a135a5a4bd2abc750f9a6c7a7ca';
                    };
                    question_read: {
                        table: 'sys_security_acl';
                        id: 'b8a15a4aa47a48629d02e55d25f2f354';
                    };
                    question_write: {
                        table: 'sys_security_acl';
                        id: '7adb29b9beed4267935f7a8bee21cb75';
                    };
                    'src_server_rest-api_test-simulator-api_ts': {
                        table: 'sys_module';
                        id: '75acb671e2b94ebfa7e3aa69cdc73129';
                    };
                    test_create: {
                        table: 'sys_security_acl';
                        id: 'ffa20f69f6ee4142a534afd4e12469fe';
                    };
                    test_delete: {
                        table: 'sys_security_acl';
                        id: '5dec2295cf0e4cf79127653140e346c1';
                    };
                    test_question_create: {
                        table: 'sys_security_acl';
                        id: 'aea18198398b42ef8584e15e86d47731';
                    };
                    test_question_delete: {
                        table: 'sys_security_acl';
                        id: 'd8ea190e02df4616a336e08d17560350';
                    };
                    test_question_read: {
                        table: 'sys_security_acl';
                        id: 'ebaf0fdd05a440abb90c56baf32d4375';
                    };
                    test_question_write: {
                        table: 'sys_security_acl';
                        id: '8778c4f8d93b4979b6a35f2f23b62705';
                    };
                    test_read: {
                        table: 'sys_security_acl';
                        id: '5019c6f612894345813d219222eab42f';
                    };
                    test_simulator_api: {
                        table: 'sys_ws_definition';
                        id: '046c0f8f5beb4d088855493801f2c521';
                    };
                    test_simulator_api_authenticated_execute: {
                        table: 'sys_security_acl';
                        id: 'c937814a6bbe4f3f929dc902648b97e5';
                    };
                    test_simulator_api_collections_list: {
                        table: 'sys_ws_operation';
                        id: 'a471e9dc5c9a4b33898bd9d636127e4d';
                    };
                    test_simulator_api_collections_list_saved_only_param: {
                        table: 'sys_ws_query_parameter';
                        id: '58e057b51ccf421fbd40a97b88770f95';
                    };
                    test_simulator_api_collections_open_overview: {
                        table: 'sys_ws_operation';
                        id: 'f13958821b45479d8772303d6cb13b94';
                    };
                    test_simulator_api_collections_open_overview_collection_id_param: {
                        table: 'sys_ws_query_parameter';
                        id: '42d10dd53cbf45959f4454bc359cfe38';
                    };
                    test_simulator_api_collections_publish: {
                        table: 'sys_ws_operation';
                        id: 'e974d685bccf428598a4ac8a36d88ea9';
                    };
                    test_simulator_api_collections_remove: {
                        table: 'sys_ws_operation';
                        id: '9e487cef169d4d7e91444e24c56a5c78';
                    };
                    test_simulator_api_collections_save: {
                        table: 'sys_ws_operation';
                        id: '0f9d2127a4e94510bba50cd68b1e2fcd';
                    };
                    test_simulator_api_execute: {
                        table: 'sys_security_acl';
                        id: 'c23b08a3a48f4b58a6b56c9bfa644f1e';
                    };
                    test_simulator_api_me_roles: {
                        table: 'sys_ws_operation';
                        id: 'e5307468fcda41fe8fed49c1fdcc4e49';
                    };
                    test_simulator_api_tests_create: {
                        table: 'sys_ws_operation';
                        id: '83889bc32c16494db75af241132037fd';
                    };
                    test_simulator_api_tests_detail: {
                        table: 'sys_ws_operation';
                        id: 'b68a05fcbf4249e5b9d349b4377584cb';
                    };
                    test_simulator_api_tests_detail_test_id_param: {
                        table: 'sys_ws_query_parameter';
                        id: '2d6596b111c1402e9092c0454e81f839';
                    };
                    test_simulator_menu: {
                        table: 'sys_app_application';
                        id: 'c8c7ec1cb79a4cb89974fdc95eade74c';
                    };
                    test_simulator_menu_module_collections: {
                        table: 'sys_app_module';
                        id: '8756b1a69f0743c8b7372168695e66dd';
                    };
                    test_simulator_menu_module_home: {
                        table: 'sys_app_module';
                        id: 'dd76f4b8533b4b08b6358dc07dced9b7';
                    };
                    test_simulator_self_service_module_home: {
                        table: 'sys_app_module';
                        id: '4ec5f388df244ea084090426fab6015e';
                    };
                    test_write: {
                        table: 'sys_security_acl';
                        id: '2784e8387e30439ca30bdabddf145e2d';
                    };
                    user_collection_create: {
                        table: 'sys_security_acl';
                        id: '1464c8dae8384b53a3cfaeb204146af1';
                    };
                    user_collection_delete: {
                        table: 'sys_security_acl';
                        id: 'df2308a197634cc4b4914d52e15e04a6';
                    };
                    user_collection_read: {
                        table: 'sys_security_acl';
                        id: '7520538ea7294522b84a49341566cb64';
                    };
                    user_collection_write: {
                        table: 'sys_security_acl';
                        id: 'f000115e5a644fd5b3e8090295659c2c';
                    };
                };
                composite: [
                    {
                        table: 'sys_security_acl_role';
                        id: '0010c222cabc4737b11e69f2437edc10';
                        key: {
                            sys_security_acl: 'b8a15a4aa47a48629d02e55d25f2f354';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ux_lib_asset';
                        id: '030656d1319f49f982c072ea3d283ac5';
                        deleted: false;
                        key: {
                            name: 'x_2119443_test_sim/vendor-react-dom--966e429a.js.map';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '034fc965ce4741acbcbc4456320901f4';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'status';
                        };
                    },
                    {
                        table: 'sys_ui_section';
                        id: '04dd1f20f15841b19f38c0ffc170e305';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            caption: 'Details';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_ui_form_section';
                        id: '055e348354dc46a4b15188b134d241c4';
                        key: {
                            sys_ui_form: {
                                id: '5e005bc2b0bb4b0796a12f0993ff7382';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '05b02e039a6649d7b18f379eef89b3ff';
                        key: {
                            sys_ui_section: {
                                id: '5ced6aeb9626449daf24df1f5cf1a5d3';
                                key: {
                                    name: 'x_2119443_test_sim_test';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.split';
                            position: '3';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '08ccff0aaa8147aab04bb43a81470d2f';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'never_seen_questions';
                        };
                    },
                    {
                        table: 'sys_choice';
                        id: '0b831b0a90a34bf1a522c0ad72383bb0';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'type';
                            value: 'single';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '0bdf4acca69647e497b31301a1660207';
                        key: {
                            sys_ui_section: {
                                id: '5ced6aeb9626449daf24df1f5cf1a5d3';
                                key: {
                                    name: 'x_2119443_test_sim_test';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'result';
                            position: '5';
                        };
                    },
                    {
                        table: 'sys_ws_query_parameter_map';
                        id: '0c0eb5a57a8e487896a684377507818d';
                        key: {
                            web_service_operation: 'f13958821b45479d8772303d6cb13b94';
                            web_service_query_parameter: '42d10dd53cbf45959f4454bc359cfe38';
                        };
                    },
                    {
                        table: 'sys_ui_section';
                        id: '0c373d6ed4c141af86ea7ef1bfe98df2';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            caption: 'Question Progress Lists';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_ui_form';
                        id: '0c3ef26c9c464a7fb2051b2766e488a4';
                        key: {
                            name: 'x_2119443_test_sim_answer';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '0e3edd459c6045e9805ab60f7a39ff58';
                        key: {
                            name: 'x_2119443_test_sim_answer';
                            element: 'is_correct';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '0f318f9b7cd44c4a94d1c861aac68cb7';
                        key: {
                            name: 'x_2119443_test_sim_answer';
                            element: 'NULL';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '0fa1cdd8bb444e509861f16936579afd';
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'type';
                            position: '3';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '1176f68f277c410fb2eb3ebecf74ce05';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'user';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '12d082c9269149479e2bccd8e19a6f8e';
                        key: {
                            sys_ui_section: {
                                id: '5ced6aeb9626449daf24df1f5cf1a5d3';
                                key: {
                                    name: 'x_2119443_test_sim_test';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'status';
                            position: '2';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '152b340d02724ea0b0e84821c05a0511';
                        key: {
                            sys_ui_section: {
                                id: '0c373d6ed4c141af86ea7ef1bfe98df2';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    caption: 'Question Progress Lists';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'correct_questions';
                            position: '1';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '15cd21beb12f48969f4d1acc57c2aa98';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'selected_answers';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '16c20c7763254de8bbbf0e1a0ee071cf';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            element: 'result';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '18d5eb4196084035b57d4c2f331183ef';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'test';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_db_object';
                        id: '1a2f724e2cab4ba4bf42476d6ac4760f';
                        key: {
                            name: 'x_2119443_test_sim_collection';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '1cb87801cad448c198fae33961e39176';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'NULL';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_db_object';
                        id: '1da1dfa1b2cb47348489c9d3066af49f';
                        key: {
                            name: 'x_2119443_test_sim_test';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '1e2cfee4b3444886961d7af4a4c10a3c';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'docs';
                        };
                    },
                    {
                        table: 'sys_ui_list';
                        id: '1f96123aa6d44057be6fb6300b118bc6';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                            element: 'NULL';
                            relationship: 'NULL';
                            parent: 'NULL';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '2307bb589ecd476b84623ef9990cd700';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'status';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_ui_list';
                        id: '230aa5a8607c4705bcac7db345efb079';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                            element: 'NULL';
                            relationship: 'NULL';
                            parent: 'NULL';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '2317abd5534a4573aa6c6e7b5dc7541a';
                        key: {
                            sys_security_acl: '73063a9f88824ece83882dd01739e595';
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19';
                                key: {
                                    name: 'x_2119443_test_sim.admin';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '26252050bdec4455a5eb78802093c1e1';
                        key: {
                            sys_ui_section: {
                                id: '83352c54d8144f969fd048934285da7d';
                                key: {
                                    name: 'x_2119443_test_sim_collection';
                                    caption: 'Questions';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '12M.x_2119443_test_sim_collection.x_2119443_test_sim_question.collection';
                            position: '0';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '26a8c24905ce4f439c30cd627bec06fa';
                        key: {
                            sys_ui_section: {
                                id: '5ced6aeb9626449daf24df1f5cf1a5d3';
                                key: {
                                    name: 'x_2119443_test_sim_test';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'user';
                            position: '4';
                        };
                    },
                    {
                        table: 'sys_ui_section';
                        id: '27656469ed674ff288b379bba45ffdcb';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            caption: 'Answers';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m';
                        id: '2838d512d0a34b6ea3f35720871aa296';
                        key: {
                            application_file: 'd39c6f1455eb42cfab635a833e37799c';
                            source_artifact: 'e1271c69f51442ff9879aed6a6291428';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '2a3706f0ef804d719772ae325c93710f';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'question';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '2bd4ef2d7d9f4140878ff05adb2e92cb';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            element: 'user';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '2ca3fd09463f474dae1d230fc4a61edc';
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.begin_split';
                            position: '0';
                        };
                    },
                    {
                        table: 'sys_ui_form';
                        id: '2d184a58bedc4308ac085e93ccf995ee';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '2d8d2a07af244e3eba34a6aec28bf108';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'correct_questions';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '3021ca39a69246199d7426e7942a509c';
                        key: {
                            sys_security_acl: '8e2bca1186274811b435ad947380252a';
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19';
                                key: {
                                    name: 'x_2119443_test_sim.admin';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '326590b4fcf8474187ff83576e6e5184';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'rationale';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: '343e51c312624d9ea2b9e32a46f6f952';
                        key: {
                            list_id: {
                                id: 'a1930da59f38462389befa8531167b81';
                                key: {
                                    name: 'x_2119443_test_sim_answer';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'question';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '347b4137af0644eb84a89c6c74978787';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'NULL';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_choice';
                        id: '367eaa854f0d48bda54314e2a78c6ed1';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            element: 'status';
                            value: 'in_progress';
                        };
                    },
                    {
                        table: 'sys_ui_section';
                        id: '370484edf14f4a29bc639479575b6353';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            caption: 'Details';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '3899356669de4f80af980090be9c0d51';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            element: 'collection';
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: '3a4fa011d18c49c4b782db4b00ce06ab';
                        key: {
                            list_id: {
                                id: '230aa5a8607c4705bcac7db345efb079';
                                key: {
                                    name: 'x_2119443_test_sim_test';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'result';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '3d0c152e44d34a889ef5865036d93748';
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.end_split';
                            position: '4';
                        };
                    },
                    {
                        table: 'sys_ui_form';
                        id: '3ddcc3d595624c3a98dd781f4a52ea39';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '3ede440b333446efadad80f8c044c542';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'last_attempt_failed_questions';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '3f85bfdc16f043e2900aaf2346556b39';
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'collection';
                            position: '1';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '3fed9dbbcc294775b79bcc12b019a04a';
                        key: {
                            sys_ui_section: {
                                id: '04dd1f20f15841b19f38c0ffc170e305';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.split';
                            position: '2';
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: '402911e6aa5f438e91d1cbda8f4e5011';
                        key: {
                            list_id: {
                                id: '230aa5a8607c4705bcac7db345efb079';
                                key: {
                                    name: 'x_2119443_test_sim_test';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'collection';
                        };
                    },
                    {
                        table: 'sys_user_role';
                        id: '423ad4aad7114375bed65afe3b8c8a19';
                        key: {
                            name: 'x_2119443_test_sim.admin';
                        };
                    },
                    {
                        table: 'sys_choice';
                        id: '42bf41fd321a408e9bc0ab7b86caae32';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'type';
                            value: 'multiple';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '44d1b6fa8d564e23844fce3474ecfcea';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'rationale';
                        };
                    },
                    {
                        table: 'sys_choice_set';
                        id: '46e2d57bd40247959f8be29ffedbe6a2';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            element: 'status';
                        };
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m';
                        id: '47dcfa78421b4b6690c445fc5107f2ac';
                        key: {
                            application_file: '9b2c5d3f95bf45c5bd0e56a0668fa021';
                            source_artifact: 'e1271c69f51442ff9879aed6a6291428';
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: '4a5d46871d754fefa104a0cf0002dc7d';
                        key: {
                            list_id: {
                                id: '96c2c4375de44b508ae38e55d631dbfd';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'status';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '4b6150825ae94c989975bf1fec615d74';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'collection';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '4bba6a35aee34715bc6cab284f8c866c';
                        key: {
                            name: 'x_2119443_test_sim_answer';
                            element: 'question';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '4c1b3229afe540f1bfbbbf15e6c3ef64';
                        key: {
                            sys_security_acl: 'fea81f2a1dc44b6791b80349bf37fb70';
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19';
                                key: {
                                    name: 'x_2119443_test_sim.admin';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_section';
                        id: '4c3ba64be9db490e915123234193960c';
                        key: {
                            name: 'x_2119443_test_sim_answer';
                            caption: 'Details';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '4c86d9dc66ae4abcacbf2963196c1104';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'NULL';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '4ecda02c940b4404bc87be92712d9e4d';
                        key: {
                            sys_security_acl: '7adb29b9beed4267935f7a8bee21cb75';
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19';
                                key: {
                                    name: 'x_2119443_test_sim.admin';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '500ef58290dd4155823f32c3dbef4233';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'NULL';
                        };
                    },
                    {
                        table: 'sys_ui_list';
                        id: '5195b69b080a48d7907e60b5df2a51a8';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                            element: 'NULL';
                            relationship: 'NULL';
                            parent: 'NULL';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '5313f0d3843e42b79cd7ed98f70eba50';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'type';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '559840f318224ef09c8588652b1f8963';
                        key: {
                            sys_security_acl: 'f000115e5a644fd5b3e8090295659c2c';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '57c9c0fd1edc49bd8d5e7a5b0261fa38';
                        key: {
                            sys_ui_section: {
                                id: '5ced6aeb9626449daf24df1f5cf1a5d3';
                                key: {
                                    name: 'x_2119443_test_sim_test';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.begin_split';
                            position: '0';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '58bba834ccaf4733bda3f43b31202f22';
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'docs';
                            position: '7';
                        };
                    },
                    {
                        table: 'sys_ui_form';
                        id: '59303da14668477aaee9f0f3654658d5';
                        key: {
                            name: 'x_2119443_test_sim_collection';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_ui_section';
                        id: '5ced6aeb9626449daf24df1f5cf1a5d3';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            caption: 'Details';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '5cfe23b8c8d843d791e6d5821599c28c';
                        key: {
                            name: 'x_2119443_test_sim_collection';
                            element: 'name';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '5d7c9d20e52545ffb37d3e87220f438f';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'question';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_choice';
                        id: '5de308e82f7f4ff5a00f95c7c8b22e0a';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            element: 'status';
                            value: 'completed';
                        };
                    },
                    {
                        table: 'sys_ui_form';
                        id: '5e005bc2b0bb4b0796a12f0993ff7382';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '5e25e05b1bd94f1ba2df9621bc3e5e69';
                        key: {
                            name: 'x_2119443_test_sim_answer';
                            element: 'NULL';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '5ec83286fc6c437aa7dda1b678dfe6b9';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'correct_questions';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '61198a1a41224273ad4b6306133617f9';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'NULL';
                        };
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m';
                        id: '61379d41db1f4f4195d59e503227e0cf';
                        key: {
                            application_file: '030656d1319f49f982c072ea3d283ac5';
                            source_artifact: 'e1271c69f51442ff9879aed6a6291428';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '6188ca166ff34f4d9ec4d958299b9dff';
                        key: {
                            sys_ui_section: {
                                id: '04dd1f20f15841b19f38c0ffc170e305';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'status';
                            position: '3';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '627a0489536f4d03a35dbf032880a42f';
                        key: {
                            sys_ui_section: {
                                id: '6e996fd6ac14467b998d99a59add1f79';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.end_split';
                            position: '4';
                        };
                    },
                    {
                        table: 'sys_ui_form_section';
                        id: '640c3f6b3c4547eda2da9ff1ede7e143';
                        key: {
                            sys_ui_form: {
                                id: '59303da14668477aaee9f0f3654658d5';
                                key: {
                                    name: 'x_2119443_test_sim_collection';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            sys_ui_section: {
                                id: '83352c54d8144f969fd048934285da7d';
                                key: {
                                    name: 'x_2119443_test_sim_collection';
                                    caption: 'Questions';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: '6473c18455f44fc19d672c86524a4768';
                        key: {
                            list_id: {
                                id: '1f96123aa6d44057be6fb6300b118bc6';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'user';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '647692c031e3493ca9b22092573dc3d0';
                        key: {
                            sys_ui_section: {
                                id: '0c373d6ed4c141af86ea7ef1bfe98df2';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    caption: 'Question Progress Lists';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'last_attempt_failed_questions';
                            position: '3';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '64f606e3f38b433b9d69e4e83da9a9b5';
                        key: {
                            sys_ui_section: {
                                id: '6e996fd6ac14467b998d99a59add1f79';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'collection';
                            position: '3';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '687fd504e3e3407ea1576d270f0b35fb';
                        key: {
                            sys_security_acl: '5784d9517ed349c09cf192c056c5b3cb';
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19';
                                key: {
                                    name: 'x_2119443_test_sim.admin';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '68e357c54cdd4c59872607aed02c6bab';
                        key: {
                            sys_security_acl: '4b188f68af6d40e59b276ff75ff7c426';
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19';
                                key: {
                                    name: 'x_2119443_test_sim.admin';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: '6b29702f07ed4f8ca404689e465279f3';
                        key: {
                            list_id: {
                                id: '5195b69b080a48d7907e60b5df2a51a8';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'question';
                        };
                    },
                    {
                        table: 'sys_ui_form';
                        id: '6d95d92a4ff9412d9a43b96864169b1b';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '6dc5e6921e2d4deba6a84f1687e82dc1';
                        key: {
                            name: 'x_2119443_test_sim_answer';
                            element: 'question';
                        };
                    },
                    {
                        table: 'sys_ui_section';
                        id: '6e996fd6ac14467b998d99a59add1f79';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            caption: 'Details';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '6f58ab0690ac43008fec7eb191d1f41b';
                        key: {
                            sys_ui_section: {
                                id: '04dd1f20f15841b19f38c0ffc170e305';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.end_split';
                            position: '4';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '6fb425c94b3e4439ba0d7c585d313264';
                        key: {
                            sys_ui_section: {
                                id: '27656469ed674ff288b379bba45ffdcb';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    caption: 'Answers';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '12M.x_2119443_test_sim_question.x_2119443_test_sim_answer.question';
                            position: '0';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '757f2d5a9728410898da4157c749fd87';
                        key: {
                            sys_ui_section: {
                                id: '0c373d6ed4c141af86ea7ef1bfe98df2';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    caption: 'Question Progress Lists';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'never_seen_questions';
                            position: '0';
                        };
                    },
                    {
                        table: 'sys_ws_query_parameter_map';
                        id: '766d11ec301b47bc8853317e3977ef73';
                        key: {
                            web_service_operation: 'b68a05fcbf4249e5b9d349b4377584cb';
                            web_service_query_parameter: '2d6596b111c1402e9092c0454e81f839';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '76ec1a0381ef41cfa1aad2d895fc9f63';
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.split';
                            position: '2';
                        };
                    },
                    {
                        table: 'ua_table_licensing_config';
                        id: '774bf874cbbe4751bda2e8a78b4dc770';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                        };
                    },
                    {
                        table: 'sys_ui_form_section';
                        id: '784c47eec4b44e75b092dfbcd4cf4183';
                        key: {
                            sys_ui_form: {
                                id: '6d95d92a4ff9412d9a43b96864169b1b';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            sys_ui_section: {
                                id: '0c373d6ed4c141af86ea7ef1bfe98df2';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    caption: 'Question Progress Lists';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '78bfcd2747434fe8b2153029be5f150e';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'last_attempt_failed_questions';
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: '78c8caf3328e49c4a11eb790bda1fec7';
                        key: {
                            list_id: {
                                id: 'a1930da59f38462389befa8531167b81';
                                key: {
                                    name: 'x_2119443_test_sim_answer';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'answer';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '78fa32d221bd4271ba3bcba3514deefc';
                        key: {
                            sys_ui_section: {
                                id: '6e996fd6ac14467b998d99a59add1f79';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.begin_split';
                            position: '0';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '792a2acaf40a425eba80a5b119cea0be';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            element: 'status';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '7948a868bc86409a8b32433cf1710357';
                        key: {
                            sys_security_acl: 'f0c1275dfbaa491c84e29d2bafe05d0d';
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19';
                                key: {
                                    name: 'x_2119443_test_sim.admin';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '796b20638a974622858f446be002ce4a';
                        key: {
                            sys_security_acl: 'df2308a197634cc4b4914d52e15e04a6';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '7a15f812f41447dc926e4930b210e3f5';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'collection';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '7a48ad8c3ab149f589698d93fa9a2043';
                        key: {
                            sys_security_acl: '5dec2295cf0e4cf79127653140e346c1';
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19';
                                key: {
                                    name: 'x_2119443_test_sim.admin';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_form_section';
                        id: '7af8b4ddbaaf44e8a80ceaab9bceffcf';
                        key: {
                            sys_ui_form: {
                                id: '3ddcc3d595624c3a98dd781f4a52ea39';
                                key: {
                                    name: 'x_2119443_test_sim_test';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            sys_ui_section: {
                                id: '5ced6aeb9626449daf24df1f5cf1a5d3';
                                key: {
                                    name: 'x_2119443_test_sim_test';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_choice';
                        id: '7cbbb279763842c78369caafe2a37b16';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'status';
                            value: 'unanswered';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '80c188b1f96647eebaf1da8f2e04ad32';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            element: 'status';
                        };
                    },
                    {
                        table: 'sys_ui_form_section';
                        id: '80dc548b157441d8b7ee179847b4aa68';
                        key: {
                            sys_ui_form: {
                                id: '2d184a58bedc4308ac085e93ccf995ee';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            sys_ui_section: {
                                id: 'fc81537dc534416f8f3f3ed996e75035';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    caption: 'Question Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '80e96c185c754689a6e09e790559d22d';
                        key: {
                            name: 'x_2119443_test_sim_answer';
                            element: 'is_correct';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: '81564a94cded4fc3a5821433fe307b2a';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'type';
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: '82657c20b8e648fd9b54dabc754d4d63';
                        key: {
                            list_id: {
                                id: '230aa5a8607c4705bcac7db345efb079';
                                key: {
                                    name: 'x_2119443_test_sim_test';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'status';
                        };
                    },
                    {
                        table: 'sys_ui_section';
                        id: '83352c54d8144f969fd048934285da7d';
                        key: {
                            name: 'x_2119443_test_sim_collection';
                            caption: 'Questions';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_db_object';
                        id: '8423b6219076456eb62c2ab7e71744d8';
                        key: {
                            name: 'x_2119443_test_sim_question';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '858087198429474c8c34c8d65388e226';
                        key: {
                            name: 'x_2119443_test_sim_answer';
                            element: 'answer';
                            language: 'en';
                        };
                    },
                    {
                        table: 'ua_table_licensing_config';
                        id: '88173451ac494ad5ac5391cee78960a6';
                        key: {
                            name: 'x_2119443_test_sim_answer';
                        };
                    },
                    {
                        table: 'sys_ui_form_section';
                        id: '888c10cb3b564bd390950f68901e7921';
                        key: {
                            sys_ui_form: {
                                id: '0c3ef26c9c464a7fb2051b2766e488a4';
                                key: {
                                    name: 'x_2119443_test_sim_answer';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            sys_ui_section: {
                                id: '4c3ba64be9db490e915123234193960c';
                                key: {
                                    name: 'x_2119443_test_sim_answer';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '8ae31a9560694f6ab553803cc36e487c';
                        key: {
                            sys_security_acl: 'ffa20f69f6ee4142a534afd4e12469fe';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '8ae46090ff5e41bc8612b4e90f8663be';
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'question';
                            position: '5';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '8bf3bf1d18bc4d718b34556ebac7f227';
                        key: {
                            sys_security_acl: '83337a135a5a4bd2abc750f9a6c7a7ca';
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19';
                                key: {
                                    name: 'x_2119443_test_sim.admin';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '8d4641b66070465b89c05a38b10c813f';
                        key: {
                            sys_ui_section: {
                                id: '4c3ba64be9db490e915123234193960c';
                                key: {
                                    name: 'x_2119443_test_sim_answer';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'is_correct';
                            position: '3';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '8ef9b2a133a74076be79678d2ba4bb80';
                        key: {
                            sys_security_acl: '5019c6f612894345813d219222eab42f';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: '8fbf83dc7b9e4f888ec1185b01f3d0f7';
                        key: {
                            list_id: {
                                id: '5195b69b080a48d7907e60b5df2a51a8';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'type';
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: '90059f04af0d4fc7bd91776d92c43510';
                        key: {
                            list_id: {
                                id: '96c2c4375de44b508ae38e55d631dbfd';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'test';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '93a8a3039e944a1690d88529abfbeca7';
                        key: {
                            sys_ui_section: {
                                id: 'fc81537dc534416f8f3f3ed996e75035';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    caption: 'Question Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'question';
                            position: '0';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '95df385208e24fa0a307a308d9100169';
                        key: {
                            sys_ui_section: {
                                id: '6e996fd6ac14467b998d99a59add1f79';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.split';
                            position: '2';
                        };
                    },
                    {
                        table: 'ua_table_licensing_config';
                        id: '95edcac17e4b4dfcb569b28db4045925';
                        key: {
                            name: 'x_2119443_test_sim_test';
                        };
                    },
                    {
                        table: 'sys_ui_list';
                        id: '96c2c4375de44b508ae38e55d631dbfd';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                            element: 'NULL';
                            relationship: 'NULL';
                            parent: 'NULL';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '971dbcd8f9ee4bddb682aeb8db2c7e83';
                        key: {
                            sys_security_acl: '1464c8dae8384b53a3cfaeb204146af1';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '9758de6669dd4de89558f5939735b5e6';
                        key: {
                            sys_ui_section: {
                                id: '04dd1f20f15841b19f38c0ffc170e305';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.begin_split';
                            position: '0';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '984ea0123f4a4cc982e6a516b698fb05';
                        key: {
                            sys_ui_section: {
                                id: '4c3ba64be9db490e915123234193960c';
                                key: {
                                    name: 'x_2119443_test_sim_answer';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.begin_split';
                            position: '0';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '98a57fbff90c4b619946fd5cdff50d93';
                        key: {
                            sys_security_acl: 'c23b08a3a48f4b58a6b56c9bfa644f1e';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '9a2c7f4a2a5d499b8bdc1900335bd169';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            element: 'collection';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: '9a615c737eab4e41a4497e69f20d1c5f';
                        key: {
                            sys_ui_section: {
                                id: '0c373d6ed4c141af86ea7ef1bfe98df2';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    caption: 'Question Progress Lists';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'ever_failed_questions';
                            position: '2';
                        };
                    },
                    {
                        table: 'sys_ux_lib_asset';
                        id: '9b2c5d3f95bf45c5bd0e56a0668fa021';
                        deleted: false;
                        key: {
                            name: 'x_2119443_test_sim/vendor-react-dom--966e429a';
                        };
                    },
                    {
                        table: 'sys_ui_list';
                        id: '9c134d6d2d0a486286d513bb3612ff02';
                        key: {
                            name: 'x_2119443_test_sim_collection';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                            element: 'NULL';
                            relationship: 'NULL';
                            parent: 'NULL';
                        };
                    },
                    {
                        table: 'sys_ui_section';
                        id: '9d7aa06d56f243e89b38819710fd7386';
                        key: {
                            name: 'x_2119443_test_sim_collection';
                            caption: 'Details';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: '9d9d6fb257d04316ac9d8d9de709e66e';
                        key: {
                            list_id: {
                                id: '5195b69b080a48d7907e60b5df2a51a8';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'collection';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: '9ddf134a256a464795854e16c9760187';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            element: 'NULL';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: '9e3c1f6f2e5d45d483178ba85299c960';
                        key: {
                            list_id: {
                                id: 'a1930da59f38462389befa8531167b81';
                                key: {
                                    name: 'x_2119443_test_sim_answer';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'is_correct';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: '9e523239fe7244a9aa1f1ba814dfdcf3';
                        key: {
                            sys_security_acl: 'd8ea190e02df4616a336e08d17560350';
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19';
                                key: {
                                    name: 'x_2119443_test_sim.admin';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_choice_set';
                        id: '9eb4ef6526a94513a4d99d16343dbb9c';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'type';
                        };
                    },
                    {
                        table: 'ua_table_licensing_config';
                        id: '9ef34c57ca294153a8a91dcbc42c3ae6';
                        key: {
                            name: 'x_2119443_test_sim_question';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: 'a05b1c636b404712aecf7e6a2220c4df';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            element: 'NULL';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: 'a05e712970fd475ca89a4e7489445121';
                        key: {
                            sys_security_acl: 'aea18198398b42ef8584e15e86d47731';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_list';
                        id: 'a1930da59f38462389befa8531167b81';
                        key: {
                            name: 'x_2119443_test_sim_answer';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                            element: 'NULL';
                            relationship: 'NULL';
                            parent: 'NULL';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: 'a21b634dcf8c41e68b7e8d7434bc9fe6';
                        key: {
                            sys_ui_section: {
                                id: '6e996fd6ac14467b998d99a59add1f79';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'user';
                            position: '1';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: 'a445111546f94bdd82fcdcd2c52585c4';
                        key: {
                            sys_ui_section: {
                                id: '4c3ba64be9db490e915123234193960c';
                                key: {
                                    name: 'x_2119443_test_sim_answer';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.split';
                            position: '2';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: 'a5bcb3c57b064cabbf583df9810e4dbd';
                        key: {
                            sys_ui_section: {
                                id: '04dd1f20f15841b19f38c0ffc170e305';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'test';
                            position: '1';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: 'a606bb1ec04a41ee8d953da260c7f789';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'ever_failed_questions';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: 'a641419ef1b4440e8c4caf98d73f8b9f';
                        key: {
                            sys_ui_section: {
                                id: '5ced6aeb9626449daf24df1f5cf1a5d3';
                                key: {
                                    name: 'x_2119443_test_sim_test';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'collection';
                            position: '1';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: 'a72a4f7a01d249a3bafeb236502b3092';
                        key: {
                            sys_security_acl: '07ffdbbf61a84733b389920949f01413';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: 'a77de67520264381b419069b6613b975';
                        key: {
                            list_id: {
                                id: '96c2c4375de44b508ae38e55d631dbfd';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'question';
                        };
                    },
                    {
                        table: 'sys_ux_lib_asset';
                        id: 'a7a1e2a2f1d9441f8da83ca9d7c08d15';
                        key: {
                            name: 'x_2119443_test_sim/main';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: 'a8d44c1c570a469baf979c51a256cff1';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'collection';
                            language: 'en';
                        };
                    },
                    {
                        table: 'ua_table_licensing_config';
                        id: 'aa789c3ee8dd4ad78bdb932f79092951';
                        key: {
                            name: 'x_2119443_test_sim_collection';
                        };
                    },
                    {
                        table: 'sys_ui_form_section';
                        id: 'ab0f7db506da4f65b8643ecf081bd239';
                        key: {
                            sys_ui_form: {
                                id: '6d95d92a4ff9412d9a43b96864169b1b';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            sys_ui_section: {
                                id: '6e996fd6ac14467b998d99a59add1f79';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: 'ac7295372b5f4563bbb4695989c04e5d';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'user';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: 'ad94cd45a41843f7adc6ca334e2bd48d';
                        key: {
                            sys_ui_section: {
                                id: '5ced6aeb9626449daf24df1f5cf1a5d3';
                                key: {
                                    name: 'x_2119443_test_sim_test';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.end_split';
                            position: '6';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: 'b0bd2f34ec5e4bd18bcba0556453f144';
                        key: {
                            sys_ui_section: {
                                id: '4c3ba64be9db490e915123234193960c';
                                key: {
                                    name: 'x_2119443_test_sim_answer';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'question';
                            position: '1';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: 'b1bf25ac0d1640d08d871ce213be8576';
                        key: {
                            sys_security_acl: '2784e8387e30439ca30bdabddf145e2d';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: 'b21023ed25194cd0b7574b229a69523e';
                        key: {
                            sys_ui_section: {
                                id: '4c3ba64be9db490e915123234193960c';
                                key: {
                                    name: 'x_2119443_test_sim_answer';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: '.end_split';
                            position: '4';
                        };
                    },
                    {
                        table: 'sys_db_object';
                        id: 'b333045cf9e145a4b280f8c4879aacc8';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                        };
                    },
                    {
                        table: 'sys_db_object';
                        id: 'b4deba3ee98d469baaa34abf16b1d727';
                        key: {
                            name: 'x_2119443_test_sim_answer';
                        };
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m';
                        id: 'b5da52767dd24b35a02b32acd3a96450';
                        key: {
                            application_file: 'f36527aeee9c4f97b76394ef37ba5be7';
                            source_artifact: 'e1271c69f51442ff9879aed6a6291428';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: 'b672e10cce42469d954d06313fa06dfa';
                        key: {
                            name: 'x_2119443_test_sim_collection';
                            element: 'name';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_choice';
                        id: 'bcb039712c2b4be6b9cb5b81826019dc';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'status';
                            value: 'correct';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: 'bebf22820ebd4fffbbcef087fc805f81';
                        key: {
                            sys_security_acl: '7520538ea7294522b84a49341566cb64';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: 'bef8647c19da49b1b73e411ce9ce6c42';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'docs';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: 'c077240323574d6390d4e6da734dc951';
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'rationale';
                            position: '6';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: 'c152a633a378454ba42313d5dad67767';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'never_seen_questions';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: 'c4954f49562a41799995e7716e4e4e96';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'question';
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: 'c4d7974c16804d9f9eb049f30afd1a08';
                        key: {
                            list_id: {
                                id: '9c134d6d2d0a486286d513bb3612ff02';
                                key: {
                                    name: 'x_2119443_test_sim_collection';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'name';
                        };
                    },
                    {
                        table: 'ua_table_licensing_config';
                        id: 'c6568919cf8f4020af12c1eea6482754';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                        };
                    },
                    {
                        table: 'sys_ui_form_section';
                        id: 'c75e6eb4741348c6b30a3b2e7582f733';
                        key: {
                            sys_ui_form: {
                                id: '2d184a58bedc4308ac085e93ccf995ee';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            sys_ui_section: {
                                id: '04dd1f20f15841b19f38c0ffc170e305';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: 'c7c882236823470396477da5a60531af';
                        key: {
                            sys_security_acl: 'c23b08a3a48f4b58a6b56c9bfa644f1e';
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19';
                                key: {
                                    name: 'x_2119443_test_sim.admin';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: 'ca520af93b0942c783d30c29ffb20155';
                        key: {
                            sys_security_acl: '8778c4f8d93b4979b6a35f2f23b62705';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: 'ccba95ebfa8b45899f54ecf9ccb78475';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'NULL';
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: 'cee1a414ec5a442396d95f0a5703b069';
                        key: {
                            list_id: {
                                id: '1f96123aa6d44057be6fb6300b118bc6';
                                key: {
                                    name: 'x_2119443_test_sim_user_collection';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'collection';
                        };
                    },
                    {
                        table: 'sys_ui_list_element';
                        id: 'cfdb493c1cdf4bfc84a14d02aae0ef3d';
                        key: {
                            list_id: {
                                id: '230aa5a8607c4705bcac7db345efb079';
                                key: {
                                    name: 'x_2119443_test_sim_test';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                    element: 'NULL';
                                    relationship: 'NULL';
                                    parent: 'NULL';
                                };
                            };
                            element: 'user';
                        };
                    },
                    {
                        table: 'sys_choice_set';
                        id: 'd090139641c74f5e916004a2c5ec1b57';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'status';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: 'd0a18bf0a2ef49f8aef5aee856d758b8';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            element: 'result';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: 'd15c6afb3dfc4c0799a0b912de7930f1';
                        key: {
                            sys_ui_section: {
                                id: 'fc81537dc534416f8f3f3ed996e75035';
                                key: {
                                    name: 'x_2119443_test_sim_test_question';
                                    caption: 'Question Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'selected_answers';
                            position: '1';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: 'd17e978a25ec4066839d62e40d8ba5c3';
                        key: {
                            sys_security_acl: 'ebaf0fdd05a440abb90c56baf32d4375';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_ux_lib_asset';
                        id: 'd39c6f1455eb42cfab635a833e37799c';
                        key: {
                            name: 'x_2119443_test_sim/main.js.map';
                        };
                    },
                    {
                        table: 'sys_ws_query_parameter_map';
                        id: 'd4b5dddb2083408f92f88fdb290644cc';
                        key: {
                            web_service_operation: 'a471e9dc5c9a4b33898bd9d636127e4d';
                            web_service_query_parameter: '58e057b51ccf421fbd40a97b88770f95';
                        };
                    },
                    {
                        table: 'sys_ui_form_section';
                        id: 'd51a963a43e54368b279cb56af29b7cc';
                        key: {
                            sys_ui_form: {
                                id: '59303da14668477aaee9f0f3654658d5';
                                key: {
                                    name: 'x_2119443_test_sim_collection';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            sys_ui_section: {
                                id: '9d7aa06d56f243e89b38819710fd7386';
                                key: {
                                    name: 'x_2119443_test_sim_collection';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_db_object';
                        id: 'd6823fe95d934dcca7efe568fc8fd588';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: 'dbc088eb20ff4234b11c099c84d9bcd6';
                        key: {
                            name: 'x_2119443_test_sim_collection';
                            element: 'NULL';
                        };
                    },
                    {
                        table: 'sn_glider_source_artifact';
                        id: 'e1271c69f51442ff9879aed6a6291428';
                        key: {
                            name: 'x_2119443_test_sim_app.do - BYOUI Files';
                        };
                    },
                    {
                        table: 'sys_ui_form_section';
                        id: 'e1c93385ac814da29e12d6931394b3d9';
                        key: {
                            sys_ui_form: {
                                id: '5e005bc2b0bb4b0796a12f0993ff7382';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            sys_ui_section: {
                                id: '27656469ed674ff288b379bba45ffdcb';
                                key: {
                                    name: 'x_2119443_test_sim_question';
                                    caption: 'Answers';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_choice';
                        id: 'e3379caf80554ee283f85a420c95afd8';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'status';
                            value: 'failed';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: 'e3ff86e35f2240e19f3a93d2dddc4081';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'test';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: 'e823bd42efd847e4a7c2f00d8a5b1230';
                        key: {
                            sys_ui_section: {
                                id: '9d7aa06d56f243e89b38819710fd7386';
                                key: {
                                    name: 'x_2119443_test_sim_collection';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'name';
                            position: '0';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: 'ed843f8935444de1a96d7a1513f70cde';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            element: 'selected_answers';
                        };
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m';
                        id: 'ed915b1c96b9464a831214121b9817e8';
                        key: {
                            application_file: 'a7a1e2a2f1d9441f8da83ca9d7c08d15';
                            source_artifact: 'e1271c69f51442ff9879aed6a6291428';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: 'ef3b426df1f3433e91083c07519ed912';
                        key: {
                            name: 'x_2119443_test_sim_test';
                            element: 'user';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: 'f26a610877e74325b26e9f925d119367';
                        key: {
                            name: 'x_2119443_test_sim_question';
                            element: 'question';
                        };
                    },
                    {
                        table: 'sys_ui_page';
                        id: 'f36527aeee9c4f97b76394ef37ba5be7';
                        key: {
                            endpoint: 'x_2119443_test_sim_app.do';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: 'f522ad188cb4401cb9482c82502ced85';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'ever_failed_questions';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_user_role';
                        id: 'f74ee8ed21944ff38fda41fe018e8459';
                        key: {
                            name: 'x_2119443_test_sim.user';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: 'f9bf39c549c148189cf2773e66026e7c';
                        key: {
                            sys_security_acl: '2370e53ff8d147659f8cf35d2dd55671';
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459';
                                key: {
                                    name: 'x_2119443_test_sim.user';
                                };
                            };
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: 'fa2aeb63b82e4048853f885e3f8a3019';
                        key: {
                            name: 'x_2119443_test_sim_user_collection';
                            element: 'collection';
                        };
                    },
                    {
                        table: 'sys_dictionary';
                        id: 'fa6dc696cb0346f28d856c0361d04369';
                        key: {
                            name: 'x_2119443_test_sim_answer';
                            element: 'answer';
                        };
                    },
                    {
                        table: 'sys_documentation';
                        id: 'fac2b803a08346a7bf41c1ce3ad91e6d';
                        key: {
                            name: 'x_2119443_test_sim_collection';
                            element: 'NULL';
                            language: 'en';
                        };
                    },
                    {
                        table: 'sys_ui_element';
                        id: 'fb5d5f63e1a540b3989e859bad186c72';
                        key: {
                            sys_ui_section: {
                                id: '4c3ba64be9db490e915123234193960c';
                                key: {
                                    name: 'x_2119443_test_sim_answer';
                                    caption: 'Details';
                                    view: {
                                        id: 'Default view';
                                        key: {
                                            name: 'NULL';
                                        };
                                    };
                                    sys_domain: 'global';
                                };
                            };
                            element: 'answer';
                            position: '5';
                        };
                    },
                    {
                        table: 'sys_ui_section';
                        id: 'fc81537dc534416f8f3f3ed996e75035';
                        key: {
                            name: 'x_2119443_test_sim_test_question';
                            caption: 'Question Details';
                            view: {
                                id: 'Default view';
                                key: {
                                    name: 'NULL';
                                };
                            };
                            sys_domain: 'global';
                        };
                    },
                    {
                        table: 'sys_security_acl_role';
                        id: 'ff55d61cbf4b4a868b7dcb816189905a';
                        key: {
                            sys_security_acl: 'e20310520b6f4c44b66834a3f32d36df';
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19';
                                key: {
                                    name: 'x_2119443_test_sim.admin';
                                };
                            };
                        };
                    },
                ];
            }
        }
    }
}
