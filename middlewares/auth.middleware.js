export const authCheck = (req, res, next) => {
  if (true) {
    console.log("This is middleware")
    next()
  }
}