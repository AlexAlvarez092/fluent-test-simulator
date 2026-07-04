import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    answer_create: {
                        table: 'sys_security_acl'
                        id: '5784d9517ed349c09cf192c056c5b3cb'
                    }
                    answer_delete: {
                        table: 'sys_security_acl'
                        id: '8e2bca1186274811b435ad947380252a'
                    }
                    answer_read: {
                        table: 'sys_security_acl'
                        id: '07ffdbbf61a84733b389920949f01413'
                    }
                    answer_write: {
                        table: 'sys_security_acl'
                        id: 'fea81f2a1dc44b6791b80349bf37fb70'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'a57cf2663b334410a9bab3ca853a595a'
                    }
                    collection_create: {
                        table: 'sys_security_acl'
                        id: 'd91c0b6c3fac4e559b632f3a3a3f62f3'
                    }
                    collection_delete: {
                        table: 'sys_security_acl'
                        id: '6b2c8721634e4beab3109713ca06e4f3'
                    }
                    collection_read: {
                        table: 'sys_security_acl'
                        id: '2370e53ff8d147659f8cf35d2dd55671'
                    }
                    collection_write: {
                        table: 'sys_security_acl'
                        id: 'e20310520b6f4c44b66834a3f32d36df'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '402585b55cab48c6ae83c90758d3b786'
                    }
                    question_create: {
                        table: 'sys_security_acl'
                        id: '73063a9f88824ece83882dd01739e595'
                    }
                    question_delete: {
                        table: 'sys_security_acl'
                        id: '83337a135a5a4bd2abc750f9a6c7a7ca'
                    }
                    question_read: {
                        table: 'sys_security_acl'
                        id: 'b8a15a4aa47a48629d02e55d25f2f354'
                    }
                    question_write: {
                        table: 'sys_security_acl'
                        id: '7adb29b9beed4267935f7a8bee21cb75'
                    }
                }
                composite: [
                    {
                        table: 'sys_security_acl_role'
                        id: '0010c222cabc4737b11e69f2437edc10'
                        key: {
                            sys_security_acl: 'b8a15a4aa47a48629d02e55d25f2f354'
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459'
                                key: {
                                    name: 'x_2119443_test_sim.user'
                                }
                            }
                        }
                    },
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
                        table: 'sys_ui_element'
                        id: '0bd513ede39c4904b18e1ccecaac518e'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'bab6ec0e4cca43e4ba9d97f85b098f76'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Related answers'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_2119443_test_sim_question.x_2119443_test_sim_answer.question'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '0c3ef26c9c464a7fb2051b2766e488a4'
                        key: {
                            name: 'x_2119443_test_sim_answer'
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
                        table: 'sys_security_acl_role'
                        id: '2317abd5534a4573aa6c6e7b5dc7541a'
                        key: {
                            sys_security_acl: '73063a9f88824ece83882dd01739e595'
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19'
                                key: {
                                    name: 'x_2119443_test_sim.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '26252050bdec4455a5eb78802093c1e1'
                        key: {
                            sys_ui_section: {
                                id: '83352c54d8144f969fd048934285da7d'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
                                    caption: 'Questions'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_2119443_test_sim_collection.x_2119443_test_sim_question.collection'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '27656469ed674ff288b379bba45ffdcb'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            caption: 'Answers'
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
                        deleted: true
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
                        table: 'sys_security_acl_role'
                        id: '3021ca39a69246199d7426e7942a509c'
                        key: {
                            sys_security_acl: '8e2bca1186274811b435ad947380252a'
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19'
                                key: {
                                    name: 'x_2119443_test_sim.admin'
                                }
                            }
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
                        table: 'sys_ui_list_element'
                        id: '343e51c312624d9ea2b9e32a46f6f952'
                        key: {
                            list_id: {
                                id: 'a1930da59f38462389befa8531167b81'
                                key: {
                                    name: 'x_2119443_test_sim_answer'
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
                        table: 'sys_security_acl_role'
                        id: '4c1b3229afe540f1bfbbbf15e6c3ef64'
                        key: {
                            sys_security_acl: 'fea81f2a1dc44b6791b80349bf37fb70'
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19'
                                key: {
                                    name: 'x_2119443_test_sim.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '4c3ba64be9db490e915123234193960c'
                        key: {
                            name: 'x_2119443_test_sim_answer'
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
                        table: 'sys_documentation'
                        id: '4c86d9dc66ae4abcacbf2963196c1104'
                        key: {
                            name: 'x_2119443_test_sim_question'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4ecda02c940b4404bc87be92712d9e4d'
                        key: {
                            sys_security_acl: '7adb29b9beed4267935f7a8bee21cb75'
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19'
                                key: {
                                    name: 'x_2119443_test_sim.admin'
                                }
                            }
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
                        table: 'sys_ui_section'
                        id: '578b1de49b014cd0ae60ca1609900758'
                        deleted: true
                        key: {
                            name: 'x_2119443_test_sim_collection'
                            caption: 'Related questions'
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
                        table: 'sys_ui_form_section'
                        id: '5851241e70304156b841b3bdd6586e0b'
                        deleted: true
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
                                id: 'bab6ec0e4cca43e4ba9d97f85b098f76'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Related answers'
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
                        table: 'sys_ui_form'
                        id: '59303da14668477aaee9f0f3654658d5'
                        key: {
                            name: 'x_2119443_test_sim_collection'
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
                        table: 'sys_ui_form_section'
                        id: '640c3f6b3c4547eda2da9ff1ede7e143'
                        key: {
                            sys_ui_form: {
                                id: '59303da14668477aaee9f0f3654658d5'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
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
                                id: '83352c54d8144f969fd048934285da7d'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
                                    caption: 'Questions'
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
                        table: 'sys_security_acl_role'
                        id: '687fd504e3e3407ea1576d270f0b35fb'
                        key: {
                            sys_security_acl: '5784d9517ed349c09cf192c056c5b3cb'
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19'
                                key: {
                                    name: 'x_2119443_test_sim.admin'
                                }
                            }
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
                        deleted: true
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
                        id: '6e7107edc7cb46bfb2f48d9c87158c89'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '9d7aa06d56f243e89b38819710fd7386'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
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
                            element: '12M.x_2119443_test_sim_collection.x_2119443_test_sim_question.collection'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6fb425c94b3e4439ba0d7c585d313264'
                        key: {
                            sys_ui_section: {
                                id: '27656469ed674ff288b379bba45ffdcb'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Answers'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_2119443_test_sim_question.x_2119443_test_sim_answer.question'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '768106e59dfa4a128afdabf3df2ac26f'
                        key: {
                            sys_security_acl: 'd91c0b6c3fac4e559b632f3a3a3f62f3'
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19'
                                key: {
                                    name: 'x_2119443_test_sim.admin'
                                }
                            }
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
                        table: 'sys_ui_list_element'
                        id: '78c8caf3328e49c4a11eb790bda1fec7'
                        key: {
                            list_id: {
                                id: 'a1930da59f38462389befa8531167b81'
                                key: {
                                    name: 'x_2119443_test_sim_answer'
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
                            element: 'answer'
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
                        table: 'sys_ui_section'
                        id: '83352c54d8144f969fd048934285da7d'
                        key: {
                            name: 'x_2119443_test_sim_collection'
                            caption: 'Questions'
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
                        table: 'sys_ui_form_section'
                        id: '888c10cb3b564bd390950f68901e7921'
                        key: {
                            sys_ui_form: {
                                id: '0c3ef26c9c464a7fb2051b2766e488a4'
                                key: {
                                    name: 'x_2119443_test_sim_answer'
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
                                id: '4c3ba64be9db490e915123234193960c'
                                key: {
                                    name: 'x_2119443_test_sim_answer'
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
                        table: 'sys_security_acl_role'
                        id: '8bf3bf1d18bc4d718b34556ebac7f227'
                        key: {
                            sys_security_acl: '83337a135a5a4bd2abc750f9a6c7a7ca'
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19'
                                key: {
                                    name: 'x_2119443_test_sim.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8d4641b66070465b89c05a38b10c813f'
                        key: {
                            sys_ui_section: {
                                id: '4c3ba64be9db490e915123234193960c'
                                key: {
                                    name: 'x_2119443_test_sim_answer'
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
                            element: 'is_correct'
                            position: '3'
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
                        table: 'sys_ui_element'
                        id: '926c579c963f427a84c93605efe385c6'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '578b1de49b014cd0ae60ca1609900758'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
                                    caption: 'Related questions'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_2119443_test_sim_collection.x_2119443_test_sim_question.collection'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '984ea0123f4a4cc982e6a516b698fb05'
                        key: {
                            sys_ui_section: {
                                id: '4c3ba64be9db490e915123234193960c'
                                key: {
                                    name: 'x_2119443_test_sim_answer'
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
                        table: 'sys_ui_list'
                        id: '9c134d6d2d0a486286d513bb3612ff02'
                        key: {
                            name: 'x_2119443_test_sim_collection'
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
                        table: 'sys_ui_section'
                        id: '9d7aa06d56f243e89b38819710fd7386'
                        key: {
                            name: 'x_2119443_test_sim_collection'
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
                        table: 'sys_ui_list_element'
                        id: '9e3c1f6f2e5d45d483178ba85299c960'
                        key: {
                            list_id: {
                                id: 'a1930da59f38462389befa8531167b81'
                                key: {
                                    name: 'x_2119443_test_sim_answer'
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
                            element: 'is_correct'
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
                        table: 'sys_ui_list'
                        id: 'a1930da59f38462389befa8531167b81'
                        key: {
                            name: 'x_2119443_test_sim_answer'
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
                        table: 'sys_ui_element'
                        id: 'a445111546f94bdd82fcdcd2c52585c4'
                        key: {
                            sys_ui_section: {
                                id: '4c3ba64be9db490e915123234193960c'
                                key: {
                                    name: 'x_2119443_test_sim_answer'
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
                        table: 'sys_security_acl_role'
                        id: 'a72a4f7a01d249a3bafeb236502b3092'
                        key: {
                            sys_security_acl: '07ffdbbf61a84733b389920949f01413'
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459'
                                key: {
                                    name: 'x_2119443_test_sim.user'
                                }
                            }
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
                        table: 'sys_ui_element'
                        id: 'a8696cbf6c354c8fad3ed166f0909aca'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '9d7aa06d56f243e89b38819710fd7386'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
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
                            element: '12M.x_2119443_test_sim_collection.x_2119443_test_sim_question.question'
                            position: '1'
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
                        table: 'sys_ui_form_section'
                        id: 'ab720ce1c8c54effb7d8840a03b05e32'
                        deleted: true
                        key: {
                            sys_ui_form: {
                                id: '59303da14668477aaee9f0f3654658d5'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
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
                                id: '578b1de49b014cd0ae60ca1609900758'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
                                    caption: 'Related questions'
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
                        table: 'sys_ui_element'
                        id: 'b0bd2f34ec5e4bd18bcba0556453f144'
                        key: {
                            sys_ui_section: {
                                id: '4c3ba64be9db490e915123234193960c'
                                key: {
                                    name: 'x_2119443_test_sim_answer'
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
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b21023ed25194cd0b7574b229a69523e'
                        key: {
                            sys_ui_section: {
                                id: '4c3ba64be9db490e915123234193960c'
                                key: {
                                    name: 'x_2119443_test_sim_answer'
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
                        table: 'sys_ui_section'
                        id: 'bab6ec0e4cca43e4ba9d97f85b098f76'
                        deleted: true
                        key: {
                            name: 'x_2119443_test_sim_question'
                            caption: 'Related answers'
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
                        table: 'sys_ui_list_element'
                        id: 'c4d7974c16804d9f9eb049f30afd1a08'
                        key: {
                            list_id: {
                                id: '9c134d6d2d0a486286d513bb3612ff02'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
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
                            element: 'name'
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
                        table: 'sys_ui_element'
                        id: 'cd7da894b6be48419e56ceb73109af35'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '578b1de49b014cd0ae60ca1609900758'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
                                    caption: 'Related questions'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_2119443_test_sim_collection.x_2119443_test_sim_question.question'
                            position: '0'
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
                        table: 'sys_ui_form_section'
                        id: 'd51a963a43e54368b279cb56af29b7cc'
                        key: {
                            sys_ui_form: {
                                id: '59303da14668477aaee9f0f3654658d5'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
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
                                id: '9d7aa06d56f243e89b38819710fd7386'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
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
                        table: 'sys_security_acl_role'
                        id: 'dc0b0713c08945f5a9471063b2d0e87e'
                        key: {
                            sys_security_acl: '6b2c8721634e4beab3109713ca06e4f3'
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19'
                                key: {
                                    name: 'x_2119443_test_sim.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e090cd0b9fb34d489520f4e9bd1dd0b5'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'bab6ec0e4cca43e4ba9d97f85b098f76'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Related answers'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_2119443_test_sim_question.x_2119443_test_sim_question.answer'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'e1c93385ac814da29e12d6931394b3d9'
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
                                id: '27656469ed674ff288b379bba45ffdcb'
                                key: {
                                    name: 'x_2119443_test_sim_question'
                                    caption: 'Answers'
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
                        table: 'sys_ui_element'
                        id: 'e823bd42efd847e4a7c2f00d8a5b1230'
                        key: {
                            sys_ui_section: {
                                id: '9d7aa06d56f243e89b38819710fd7386'
                                key: {
                                    name: 'x_2119443_test_sim_collection'
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
                            element: 'name'
                            position: '0'
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
                        table: 'sys_security_acl_role'
                        id: 'f9bf39c549c148189cf2773e66026e7c'
                        key: {
                            sys_security_acl: '2370e53ff8d147659f8cf35d2dd55671'
                            sys_user_role: {
                                id: 'f74ee8ed21944ff38fda41fe018e8459'
                                key: {
                                    name: 'x_2119443_test_sim.user'
                                }
                            }
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
                    {
                        table: 'sys_ui_element'
                        id: 'fb5d5f63e1a540b3989e859bad186c72'
                        key: {
                            sys_ui_section: {
                                id: '4c3ba64be9db490e915123234193960c'
                                key: {
                                    name: 'x_2119443_test_sim_answer'
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
                            element: 'answer'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ff55d61cbf4b4a868b7dcb816189905a'
                        key: {
                            sys_security_acl: 'e20310520b6f4c44b66834a3f32d36df'
                            sys_user_role: {
                                id: '423ad4aad7114375bed65afe3b8c8a19'
                                key: {
                                    name: 'x_2119443_test_sim.admin'
                                }
                            }
                        }
                    },
                ]
            }
        }
    }
}
