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
                        table: 'sys_ui_form_section'
                        id: '055e348354dc46a4b15188b134d241c4'
                        key: {
                            sys_ui_form: {
                                id: '5e005bc2b0bb4b0796a12f0993ff7382'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Details'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
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
                        table: 'sys_dictionary'
                        id: '0e3edd459c6045e9805ab60f7a39ff58'
                        key: {
                            name: 'x_2119443_test_sim_answer'
                            element: 'is_correct'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0f318f9b7cd44c4a94d1c861aac68cb7'
                        key: {
                            name: 'x_2119443_test_sim_answer'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '0fa1cdd8bb444e509861f16936579afd'
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Details'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'type'
                            position: '3'
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
                        table: 'sys_ui_element'
                        id: '2ca3fd09463f474dae1d230fc4a61edc'
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Details'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2da04fee733183106fb2f7303ab8b755'
                        key: {
                            sys_ui_section: {
                                id: '6da04fee733183106fb2f7303ab8b718'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'name'
                            position: '0'
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
                        table: 'sys_ui_section'
                        id: '370484edf14f4a29bc639479575b6353'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            caption: 'Details'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
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
                        table: 'sys_ui_element'
                        id: '3d0c152e44d34a889ef5865036d93748'
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Details'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3f85bfdc16f043e2900aaf2346556b39'
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Details'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'collection'
                            position: '1'
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
                        id: '4bba6a35aee34715bc6cab284f8c866c'
                        key: {
                            name: 'x_2119443_test_sim_answer'
                            element: 'question'
                            language: 'en'
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
                        table: 'sys_ui_list'
                        id: '5195b69b080a48d7907e60b5df2a51a8'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
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
                        table: 'sys_ui_element'
                        id: '58bba834ccaf4733bda3f43b31202f22'
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Details'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'docs'
                            position: '7'
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
                        table: 'sys_ui_form'
                        id: '5e005bc2b0bb4b0796a12f0993ff7382'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5e25e05b1bd94f1ba2df9621bc3e5e69'
                        key: {
                            name: 'x_2119443_test_sim_answer'
                            element: 'NULL'
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
                        table: 'sys_ui_list_element'
                        id: '6b29702f07ed4f8ca404689e465279f3'
                        key: {
                            list_id: {
                                id: '5195b69b080a48d7907e60b5df2a51a8'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'question'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '6da04fee733183106fb2f7303ab8b718'
                        key: {
                            name: 'x_2119443_test_sim_collection'
                            caption: 'NULL'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6dc5e6921e2d4deba6a84f1687e82dc1'
                        key: {
                            name: 'x_2119443_test_sim_answer'
                            element: 'question'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '76ec1a0381ef41cfa1aad2d895fc9f63'
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Details'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '80e96c185c754689a6e09e790559d22d'
                        key: {
                            name: 'x_2119443_test_sim_answer'
                            element: 'is_correct'
                            language: 'en'
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
                        table: 'sys_documentation'
                        id: '858087198429474c8c34c8d65388e226'
                        key: {
                            name: 'x_2119443_test_sim_answer'
                            element: 'answer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '88173451ac494ad5ac5391cee78960a6'
                        key: {
                            name: 'x_2119443_test_sim_answer'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8ae46090ff5e41bc8612b4e90f8663be'
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Details'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'question'
                            position: '5'
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
                        table: 'sys_ui_list_element'
                        id: '8fbf83dc7b9e4f888ec1185b01f3d0f7'
                        key: {
                            list_id: {
                                id: '5195b69b080a48d7907e60b5df2a51a8'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '9d9d6fb257d04316ac9d8d9de709e66e'
                        key: {
                            list_id: {
                                id: '5195b69b080a48d7907e60b5df2a51a8'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'collection'
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
                        table: 'sys_db_object'
                        id: 'b4deba3ee98d469baaa34abf16b1d727'
                        key: {
                            name: 'x_2119443_test_sim_answer'
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
                        table: 'sys_ui_element'
                        id: 'c077240323574d6390d4e6da734dc951'
                        key: {
                            sys_ui_section: {
                                id: '370484edf14f4a29bc639479575b6353'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Details'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'rationale'
                            position: '6'
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
                        table: 'sys_dictionary'
                        id: 'fa6dc696cb0346f28d856c0361d04369'
                        key: {
                            name: 'x_2119443_test_sim_answer'
                            element: 'answer'
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
