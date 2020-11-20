class BasePrint {
  msg?: string;
  error?: any;
  constructor({msg, error}: {msg?: string; error?: any;}) {
    this.msg = msg
    if (error) {
      this.error = error
    }
  }
}

export class SuccessPrint extends BasePrint{
  constructor(msg?: string) {
    super({msg})
    console.log(msg)
  }
}

export class ErrorPrint extends BasePrint{
  constructor({msg, error}: {msg?: string; error?: any;}) {
    super({msg, error})
    console.error(msg)
    console.error(error)
  }
}

export default {
  SuccessPrint,
  ErrorPrint
}