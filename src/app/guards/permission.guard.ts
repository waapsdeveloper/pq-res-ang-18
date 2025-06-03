import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PermissionService } from '../services/permission.service';

export const permissionGuard: CanActivateFn = (route, state) => {

  const permissionService = inject(PermissionService);

  console.log('Permission Guard:', permissionService.permissionInstance);

  const permissions = permissionService.permissionInstance;

  const d = route.data as any;  

  const entity = d?.entity;
  const action = d?.action;

  if (!permissions || !entity || !action) {
    console.warn('No permissions or entity/action data found');
    return false;
  }

  
  const requiredSlug = `${entity}.${action}`;

  const hasPermission = permissions.some((perm: any) => perm.slug === requiredSlug);

  if (!hasPermission) {
    console.warn(`Missing permission for: ${requiredSlug}`);
  }

  return hasPermission;
};
