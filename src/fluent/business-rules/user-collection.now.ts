import { BusinessRule } from '@servicenow/sdk/core';
import { setUserOnCollectionSave } from '../../server/modules/business-rules/set-user-on-collection-save';

BusinessRule({
    $id: Now.ID['set-user-on-collection-save'],
    name: 'Set User on Collection Save',
    table: 'x_2119443_test_sim_user_collection',
    when: 'before',
    action: ['insert'],
    order: 100,
    script: setUserOnCollectionSave,
});
