import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PermissionService } from '../services/permission.service';
import { UsersService } from '../services/users.service';

export const permissionsResolver: ResolveFn<any> = async (route, state) => {
  const perm = inject(PermissionService);
  const userService = inject(UsersService);

  const user = await userService.getUser();
  if (!user) {
    console.warn('No user found, cannot fetch permissions');
    return null; // or handle as needed
  }




  const res = await perm.getPermissions();
  console.log('Permissions Resolver:', res);
  // Example: fetch permissions (can be a real API call)
  return res; // make sure this returns an observable or promise
};
