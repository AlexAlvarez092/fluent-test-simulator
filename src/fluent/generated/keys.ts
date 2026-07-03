import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: 'a57cf2663b334410a9bab3ca853a595a'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '402585b55cab48c6ae83c90758d3b786'
                    }
                }
                composite: [
                    {
                        table: 'sys_choice'
                        id: '0b831b0a90a34bf1a522c0ad72383bb0'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'type'
                            value: 'single'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '1a2f724e2cab4ba4bf42476d6ac4760f'
                        key: {
                            name: 'x_2119443_test_sim_collection'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1e2cfee4b3444886961d7af4a4c10a3c'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'docs'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2a3706f0ef804d719772ae325c93710f'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'question'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '326590b4fcf8474187ff83576e6e5184'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'rationale'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '37ff983bf26842758b71ba03f475e14d'
                        key: {
                            application_file: '5b809b60a2aa408b83e12d66ee5ba01e'
                            source_artifact: 'cd71a92692a04d61a29ce275323d4ee6'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '423ad4aad7114375bed65afe3b8c8a19'
                        key: {
                            name: 'x_2119443_test_sim.admin'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '42bf41fd321a408e9bc0ab7b86caae32'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'type'
                            value: 'multiple'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '441ac68d1f4a41a0b921a7920127ee5d'
                        key: {
                            application_file: 'f36527aeee9c4f97b76394ef37ba5be7'
                            source_artifact: 'cd71a92692a04d61a29ce275323d4ee6'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '44d1b6fa8d564e23844fce3474ecfcea'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'rationale'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4b6150825ae94c989975bf1fec615d74'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'collection'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4c86d9dc66ae4abcacbf2963196c1104'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5313f0d3843e42b79cd7ed98f70eba50'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '5b809b60a2aa408b83e12d66ee5ba01e'
                        key: {
                            name: 'x_2119443_test_sim/vendor-react-dom--003b9c7e'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5cfe23b8c8d843d791e6d5821599c28c'
                        key: {
                            name: 'x_2119443_test_sim_collection'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '61198a1a41224273ad4b6306133617f9'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '81000a06116c4423b17c876f420cc8e9'
                        key: {
                            application_file: 'a7a1e2a2f1d9441f8da83ca9d7c08d15'
                            source_artifact: 'cd71a92692a04d61a29ce275323d4ee6'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '81564a94cded4fc3a5821433fe307b2a'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '8423b6219076456eb62c2ab7e71744d8'
                        key: {
                            name: 'x_2119443_test_sim_question'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '8dccab7c504d4b9ca818f77dcb972122'
                        key: {
                            application_file: 'd39c6f1455eb42cfab635a833e37799c'
                            source_artifact: 'cd71a92692a04d61a29ce275323d4ee6'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9eb4ef6526a94513a4d99d16343dbb9c'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'type'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '9ef34c57ca294153a8a91dcbc42c3ae6'
                        key: {
                            name: 'x_2119443_test_sim_question'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'a7a1e2a2f1d9441f8da83ca9d7c08d15'
                        key: {
                            name: 'x_2119443_test_sim/main'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a8d44c1c570a469baf979c51a256cff1'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'collection'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'aa789c3ee8dd4ad78bdb932f79092951'
                        key: {
                            name: 'x_2119443_test_sim_collection'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b672e10cce42469d954d06313fa06dfa'
                        key: {
                            name: 'x_2119443_test_sim_collection'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'bebd44b27f2b4dbb9757d5e59de9b27f'
                        key: {
                            application_file: 'd8a00b91ab984f3086fbbf020eae7d40'
                            source_artifact: 'cd71a92692a04d61a29ce275323d4ee6'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bef8647c19da49b1b73e411ce9ce6c42'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'docs'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: 'cd71a92692a04d61a29ce275323d4ee6'
                        key: {
                            name: 'x_2119443_test_sim_incident_manager.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'd39c6f1455eb42cfab635a833e37799c'
                        key: {
                            name: 'x_2119443_test_sim/main.js.map'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'd8a00b91ab984f3086fbbf020eae7d40'
                        key: {
                            name: 'x_2119443_test_sim/vendor-react-dom--003b9c7e.js.map'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dbc088eb20ff4234b11c099c84d9bcd6'
                        key: {
                            name: 'x_2119443_test_sim_collection'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f26a610877e74325b26e9f925d119367'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'question'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'f36527aeee9c4f97b76394ef37ba5be7'
                        key: {
                            endpoint: 'x_2119443_test_sim_incident_manager.do'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'f74ee8ed21944ff38fda41fe018e8459'
                        key: {
                            name: 'x_2119443_test_sim.user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fac2b803a08346a7bf41c1ce3ad91e6d'
                        key: {
                            name: 'x_2119443_test_sim_collection'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
