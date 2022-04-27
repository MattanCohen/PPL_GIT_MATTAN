import { Exp, Program, parseL31} from "./L31-ast";
import { Result, makeFailure, isFailure } from "../shared/result";


/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> =>
    makeFailure("TODO");

    

/*
goal: make sure end L3 expression won't contain let*
how: let* has a list of bindings and expressions that rely on those binding from left to right
for each binding we'll replace the cexpressions in a recrusive order
design: 

1. work on string literal and replace let* with let
2. how: we need a recursive function to add let in everything
*/