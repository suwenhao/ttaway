export const getName = () => {
  var code = ""
  var codeLength = 6 //验证码的长度
  ////所有候选组成验证码的字符，当然也可以用中文的
  var codeChars = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ]
  //循环组成验证码的字符串
  for (var i = 0; i < codeLength; i++)
  {
    //获取随机验证码下标
    var charNum = Math.floor(Math.random() * 62)
    //组合成指定字符验证码
    code += codeChars[charNum]
  }
  return code
}