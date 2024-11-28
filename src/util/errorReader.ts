
export const readError = (err) => {

  const errors = err.errors;
  const message = [];


  for ( let errorMessage of errors ) {
     message.push(errorMessage)
  }
 
  return {
    message : message,
  };
}