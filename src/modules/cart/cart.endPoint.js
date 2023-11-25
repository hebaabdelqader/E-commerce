import {roles} from '../../middlewarre/auth.js';
export const endpoints ={
create:[roles.User],
delete:[roles.User],
get:[roles.User],
clear:[roles.User]
}