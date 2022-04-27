import { Exp, Program, ProcExp, VarDecl,
         isBoolExp, isNumExp, isStrExp,
         isVarRef, isProcExp, isAppExp,
         isIfExp, isPrimOp, isLetExp,
         LetExp,Binding, isDefineExp, isProgram ,parseL3Exp} from '../imp/L3-ast';
// ===========================================================
// AST type models
import { map, pipe, reduce, zipWith } from "ramda";
import { makeEmptySExp, makeSymbolSExp, SExpValue, makeCompoundSExp, valueToString } from '../imp/L3-value'
import { first, second, rest, allT, isEmpty } from "../shared/list";
import { isArray, isString, isNumericString, isIdentifier } from "../shared/type-predicates";
import { Result, makeOk, makeFailure, bind, mapResult, mapv, isOk } from "../shared/result";
import { parse as p, isSexpString, isToken } from "../shared/parser";
import { Sexp, Token } from "s-expression";
import { AppExp, CExp, makeAppExp } from './L31-ast';

/*
Purpose: Transform L3 AST to JavaScript program string
Signature: l30ToJS(l2AST)
Type: [EXP | Program] => Result<string>
*/
export const l30ToJS = (exp: Exp | Program): Result<string>  => makeOk(unparseL30(exp))

const l30ToJSPrint = (exp: Exp | Program): Result<string>  => 
{
    console.log(exp)
    return makeOk(unparseL30(exp))
}
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

const unparseL30 = (exp: Exp | Program | CExp): string  => 
    isBoolExp(exp) ? valueToString(exp.val) :
    isNumExp(exp) ? valueToString(exp.val) :
    isStrExp(exp) ? valueToString(exp.val) :
    //  isLitExp(exp) ? unparseLitExp(exp) :   
    // used to make '().
    isVarRef(exp) ? exp.var :
    isProcExp(exp) ? unparseProcExp(exp) :
    isIfExp(exp) ? `(${unparseL30(exp.test)} ? ${unparseL30(exp.then)} : ${unparseL30(exp.alt)})` :
    isAppExp(exp) ? (isPrimOp(exp.rator)) ? `(` + appExpToString(exp) + `)` 
        : unparseL30(exp.rator) + '(' + map(unparseL30, exp.rands).join(",") + ')'  :
    
    isPrimOp(exp) ? exp.op :
    isLetExp(exp) ? unparseLetExp(exp) :
    // isLetPlusExp(exp) ? unparseLetPlusExp(exp) :
    isDefineExp(exp) ? `const ${exp.var.var} = ${unparseL30(exp.val)}` :
    isProgram(exp) ? `(L30 ${unparseLExps(exp.exps)})` :
    "unparseL30 bad program";

const unparseProcExp = (pe: ProcExp): string => 
`((${map((p: VarDecl) => p.var, pe.args).join(",")}) => ${unparseLExps(pe.body)})`


const unparseLExps = (les: Exp[]): string =>
    map(unparseL30, les).join(" ");

    
const unparseLetExp = (le: LetExp) : string => 
`(let (${map((b: Binding) => `(${b.var.var} ${unparseL30(b.val)})`, le.bindings).join(" ")}) ${unparseLExps(le.body)})`






const l30toJSResult = (x: string): Result<string> =>
    bind(bind(p(x), parseL3Exp), l30ToJSPrint);


const toCHeck = `(- ((lambda (x y) (* x y)) 3 4) ((lambda (x) (* x x)) 2))`
const res = l30toJSResult(toCHeck)
// isOk(res) ? console.log(res.value) : console.log(res.message)

