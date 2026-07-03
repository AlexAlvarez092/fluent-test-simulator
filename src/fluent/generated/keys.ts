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
                        table: 'sn_glider_source_artifact_m2m'
                        id: '37ff983bf26842758b71ba03f475e14d'
                        key: {
                            application_file: '5b809b60a2aa408b83e12d66ee5ba01e'
                            source_artifact: 'cd71a92692a04d61a29ce275323d4ee6'
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
                        table: 'sys_ux_lib_asset'
                        id: '5b809b60a2aa408b83e12d66ee5ba01e'
                        key: {
                            name: 'x_2119443_test_sim/vendor-react-dom--003b9c7e'
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
                        table: 'sn_glider_source_artifact_m2m'
                        id: '8dccab7c504d4b9ca818f77dcb972122'
                        key: {
                            application_file: 'd39c6f1455eb42cfab635a833e37799c'
                            source_artifact: 'cd71a92692a04d61a29ce275323d4ee6'
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
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'bebd44b27f2b4dbb9757d5e59de9b27f'
                        key: {
                            application_file: 'd8a00b91ab984f3086fbbf020eae7d40'
                            source_artifact: 'cd71a92692a04d61a29ce275323d4ee6'
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
                        table: 'sys_ui_page'
                        id: 'f36527aeee9c4f97b76394ef37ba5be7'
                        key: {
                            endpoint: 'x_2119443_test_sim_incident_manager.do'
                        }
                    },
                ]
            }
        }
    }
}
