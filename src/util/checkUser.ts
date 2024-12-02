export const checkValidateUser = (currentUserId:number, todoUserId:number) => {
  return currentUserId === todoUserId;
}