export const sendWhasAppMsg = (phoneNumber, arrayMsgReceived) => {
  const joinedMsgArray = arrayMsgReceived.join(', ')
  const textWithoutSpace = joinedMsgArray.replaceAll(/ +/g, '+')
  return `https://wa.me/${phoneNumber}?text=${textWithoutSpace}`
}
