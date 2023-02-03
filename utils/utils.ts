export const updateUsers = (users, userId: string, userInfoToUpdate) => {
  return users.map((user) => {
    if (user.id === userId) {
      return {
        ...user,
        ...userInfoToUpdate,
      }
    }

    return user
  })
}