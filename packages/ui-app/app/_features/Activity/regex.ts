const userReg = /(@[\w\d]*(?=\b))/

const linkNameReg = /\[[^[]+\]/
const linkRefReg = /\(.*\)/
const linkReg = new RegExp(`(${linkNameReg.source}${linkRefReg.source})`)

const lineBreakReg = /\n/

export { userReg, linkNameReg, linkRefReg, linkReg, lineBreakReg }
