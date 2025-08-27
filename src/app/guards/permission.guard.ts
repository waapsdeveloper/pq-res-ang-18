import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PermissionService } from '../services/permission.service';

export const permissionGuard: CanActivateFn = async (route, state) => {

  const permissionService = inject(PermissionService);

  const permissions = await permissionService.getPermissions();

  // console.log('Permission Guard:', permissions);

  const d = route.data as any;  

  const entity = d?.entity;
  const action = d?.action;

  if (!permissions || !entity || !action) {
    // console.warn('No permissions or entity/action data found');
    return false;
  }

  
  const requiredSlug = `${entity}.${action}`;

  const hasPermission = permissions.some((perm: any) => perm.slug === requiredSlug);

  if (!hasPermission) {
    // console.warn(`Missing permission for: ${requiredSlug}`);
    alert(`You do not have permission to perform this action: ${action} on ${entity}`);
  }

  return hasPermission;
};
