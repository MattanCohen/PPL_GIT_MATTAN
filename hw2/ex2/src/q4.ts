import { Exp, Program, ProcExp, VarDecl,
    isBoolExp, isNumExp, isStrExp,
    isVarRef, isProcExp, isAppExp,
    isIfExp, isPrimOp, isLetExp,
    LetExp,Binding, isDefineExp, isProgram 
    ,parseL3Exp, isLitExp, LitExp, parseL3} from '../imp/L3-ast';
    
// ===========================================================
// AST type models
import { map, pipe, reduce, zipWith } from "ramda";
import { makeEmptySExp, makeSymbolSExp, SExpValue, makeCompoundSExp,
    valueToString, isEmptySExp, isSymbolSExp, isCompoundSExp } from '../imp/L3-value'
import { first, second, rest, allT, isEmpty, cons } from "../shared/list";
import { isArray, isString, isNumericString, isIdentifier } from "../shared/type-predicates";
import { Result, makeOk, makeFailure, bind, mapResult, mapv, isOk } from "../shared/result";
import { parse as p, isSexpString, isToken } from "../shared/parser";
import { Sexp, Token } from "s-expression";
import { AppExp, CExp, makeAppExp, PrimOp, VarRef } from './L31-ast';

const errorMSG: string = `unparseL30 bad program`

/*
Purpose: Transform L3 AST to JavaScript program string
Signature: l30ToJS(l2AST)
Type: [EXP | Program] => Result<string>
*/
export const l30ToJS = (exp: Exp | Program): Result<string>  => 
unparseL30(exp) === errorMSG ? makeFailure(unparseL30(exp)) : makeOk(unparseL30(exp))

const unparseL30 = (exp: Exp | Program | CExp): string  => 
isBoolExp(exp) ? boolExpToString(exp.val) :
isNumExp(exp) ? valueToString(exp.val) :
isStrExp(exp) ? valueToString(exp.val) :

isVarRef(exp) ?  unparseVarRefPrimOp(exp) :
isLitExp(exp) ? unparseLitExp(exp) :
isProcExp(exp) ? unparseProcExp(exp) :
isIfExp(exp) ? `(${unparseL30(exp.test)} ? ${unparseL30(exp.then)} : ${unparseL30(exp.alt)})` :
isDefineExp(exp) ? `const ${exp.var.var} = ${unparseL30(exp.val)}` :
isAppExp(exp) ? unparseAppExp(exp) :    
isPrimOp(exp) ? unparseVarRefPrimOp(exp) :
isLetExp(exp) ? unparseLetExp(exp) :
isProgram(exp) ? `${map(unparseL30, exp.exps).join(';\n')}` :
errorMSG;

const boolExpToString = (b: boolean): string => b ? "true" : "false"

const unparseVarRefPrimOp = (exp: VarRef | PrimOp): string =>
(isVarRef(exp)) ? (isTypeOf(exp.var)) 
                   ? `((x) => (typeof (x) === ${exp.var.slice(0,exp.var.length - 1)}))`
                   : exp.var
: (isTypeOf(exp.op)) ? (exp.op === "string=?" || exp.op === "eq?") 
                       ? `===`
                       :`((x) => (typeof (x) === ${exp.op.slice(0,exp.op.length - 1)}))` 
                    : exp.op


const unparseLitExp = (le: LitExp): string =>
isEmptySExp(le.val) ? `""` :
isSymbolSExp(le.val) ? `Symbol.for("${valueToString(le.val)}")` :
isCompoundSExp(le.val) ? `'${valueToString(le.val)}` :
`${le.val}`;


const unparseProcExp = (pe: ProcExp): string => 
`((${map((p: VarDecl) => p.var, pe.args).join(",")}) => ${unparseLExps(pe.body)})`

const unparseAppExp = (exp: AppExp): string =>
(isPrimOp(exp.rator)) ? (exp.rator.op === `not`) ? `(!` + appExpToString(exp) + `)` : `(` + appExpToString(exp) + `)` 
: (isVarRef(exp.rator)) ? parseRandsWithCommas(exp, exp.rator)
: unparseL30(exp.rator) + '(' + map(unparseL30, exp.rands).join(",") + ')' 



const unparseLExps = (les: Exp[]): string =>
map(unparseL30, les).join(" ");


const unparseLetExp = (le: LetExp) : string => 
`((${map((b: Binding) =>  `${b.var.var}` , le.bindings).join(",")}) => ${unparseLExps(le.body)})` + 
   `(${map((b: Binding) => `${unparseL30(b.val)}`, le.bindings).join(",")})`



const parseRandsWithCommas = (exp: AppExp, expRator: VarRef): string =>
`${expRator.var}(${map(unparseL30, exp.rands).join(",")})` 



/**
* 
* @param app (operator, rands[])
* @returns rands[0] operator rands[1] operator rand[2] ....
*/
const appExpToString = (app: AppExp): string => 
(app.rands.length === 1) 
? `${unparseL30(app.rands[0])}` 
: (unparseL30(app.rator) === "=") 
   ? `${unparseL30(app.rands[0])} === ` +
               appExpToString(makeAppExp(app.rator, app.rands.slice(1, app.rands.length))) 
   : `${unparseL30(app.rands[0])} ${unparseL30(app.rator)} ` +
               appExpToString(makeAppExp(app.rator, app.rands.slice(1, app.rands.length))) 




const isTypeOf = (x:string): boolean => 
["eq?", "string=?", "number?", "boolean?", "symbol?", "string?"].includes(x);

const isPrimitiveOp = (x: string): boolean =>
["+", "-", "*", "/", ">", "<", "=", "not", "and", "or"].includes(x) || isTypeOf(x);







//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const l30ToJSPrint = (exp: Exp | Program | undefined): Result<string>  => 
{
if (exp === undefined)
 return makeFailure("l30ToJSPrint failed exp undefined")
console.log(JSON.stringify(exp, null, 2))
return makeOk(unparseL30(exp))
}

const l30toJSResult = (x: string): Result<string> =>
bind(bind(p(x), parseL3Exp), l30ToJSPrint);

const getVal = (r: Result<Program>): Program|undefined => isOk(r) ? r.value : undefined

const printASTandTS = (str: string) : void =>{
console.log("~~~~~~~~~~~~~~~~~~~~")
const trty = getVal(parseL3(str))
let s = isProgram(trty) ? l30ToJS(trty) : makeFailure("")
console.log('\n' + "original L3: " + '\n' + str + '\n')
isOk(s) ? console.log("JavaScript Output: " + '\n' + s.value + '\n') : console.log(s.message)
console.log("AST: "); l30ToJSPrint(trty)
console.log("~~~~~~~~~~~~~~~~~~~~")
}



let str = `(L3 (if (< x 5) #t #f))`
// let str = `(L3 (define f 3) (define b ((lambda (x y z) (+ x y z)) f 3 4))
// (define s (let ((x 4) (y 5)) (* x y))) 
// (if ((lambda (x) (< x 5)) 4) #t (if (< 3 4) 4 #f))
// )`

// printASTandTS(str)