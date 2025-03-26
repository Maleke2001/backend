export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
};

export const AUTH_MODES = {
    LOCAL: 'local',
    GOOGLE: 'google',
}

export const USER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    BLOCKED: 'blocked'
};


export const PERMISSIONS = {
    [USER_ROLES.ADMIN]: ['create', 'read', 'update', 'delete'],
    [USER_ROLES.USER]: ['read']
};
