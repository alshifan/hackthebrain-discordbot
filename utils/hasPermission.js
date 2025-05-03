function hasPermission(member, ...permissions) {
    return permissions.some(permission => member.permissions.has(permission));
}

module.exports = hasPermission;
