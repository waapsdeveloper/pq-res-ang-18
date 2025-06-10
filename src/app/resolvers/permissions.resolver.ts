import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PermissionService } from '../services/permission.service';
import { UsersService } from '../services/users.service';

export const permissionsResolver: ResolveFn<any> = async (route, state) => {
  const perm = inject(PermissionService);
  const userService = inject(UsersService);

  const user = await userService.getUser();
  if (!user) {    
    return null; // or handle as needed
  }




  const res = await perm.getPermissions();
  return res; // make sure this returns an observable or promise
};
