export const isAuthenticated = request => {
    if (!request.user) {
        throw Error('You need to login in to perform this action');
    }
    return;
}