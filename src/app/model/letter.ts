export class Letter {
  constructor(public from: string,
              public to: string[],
              public cc: string[],
              public bcc: string[],
              public subject: string,
              public body: string,
              public date: string) {
  }
}
