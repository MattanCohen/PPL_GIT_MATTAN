import {  AppExp, Exp, isAppExp, isExp, CExp, Program, isProgram, makeProgram, isIfExp, makeDefineExp, isCExp, makeAppExp, makeIfExp, makeProcExp, makeLetExp, Binding, makeBinding, isLetPlusExp, LetPlusExp, makeLetPlusExp, LetExp, parseL31} from "./L31-ast";
import { Result, makeFailure, isOk, makeOk} from "../shared/result";
import { isAtomicExp, isDefineExp, isLetExp, isProcExp, makeLitExp, unparseL3 } from "../imp/L3-ast";

/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> =>
    isExp(exp)?
        makeOk(convertToL3(exp)):
        isProgram(exp)?
            (makeOk(makeProgram(exp.exps.map(convertToL3)))):
            makeFailure("exp not Exp or Program");


const convertToL3 = (exp: Exp): Exp =>
isDefineExp(exp)?
    makeDefineExp(exp.var, convertToL3CExp(exp.val)):
    isCExp(exp)?convertToL3CExp(exp):exp;            

    
// CompoundExp = AppExp | IfExp | ProcExp | LetExp | LitExp;
const convertToL3CExp = (exp: CExp):CExp =>
    isAtomicExp(exp)?
        exp:
        isLetPlusExp(exp)?
            convertToLet(exp):
            isAppExp(exp)?
            makeAppExp(convertToL3CExp(exp.rator),exp.rands.map(convertToL3CExp)):
                isIfExp(exp)?
                    makeIfExp(convertToL3CExp(exp.test),convertToL3CExp(exp.then),convertToL3CExp(exp.alt)):
                        isProcExp(exp)?
                            makeProcExp(exp.args,exp.body.map(convertToL3CExp)):
                            isLetExp(exp)?
                                makeLetExp(exp.bindings.map(convertToL3Binding),exp.body.map(convertToL3CExp)):
                                exp; // lit exp

const convertToL3Binding= (exp: Binding): Binding => makeBinding(exp.var.var,convertToL3CExp(exp.val));

const convertToLet = (exp:LetPlusExp): LetExp => 
    exp.bindings.length===1?
        makeLetExp(exp.bindings,exp.body.map(convertToL3CExp)):
        makeLetExp([exp.bindings[0]],[convertToLet(makeLetPlusExp(exp.bindings.slice(1),exp.body))])

            
// const exp:string = '(L31 (let* ((a 1)) (+ a 5)))'//`(L31 (let* ((a 1) (b 2) (c 3)) (+ a 5)))`;
// const res:Result<Program|Exp> = parseL31(exp);
// console.log(JSON.stringify(res));
// // const res2:Result<Program|Exp> = isOk(res)?L31ToL3(res.value):res;
// // console.log(JSON.stringify(res2));
