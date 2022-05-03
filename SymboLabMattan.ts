/*
I got bored of symbolam so heres my version of it
*/


let e = Math.exp
let P = Math.pow

let factorial: (x:number) => number = x => x === 0 ? 1 : x*factorial(x-1)
//chooseoose
let choose: (n: number, m:number) => number = 
    (n,m) => n >= m ? (factorial(n))/((factorial(m)) * factorial(n-m)) : -1
let integral: (integrated: (n: number) => number, top: number, bottom: number) => number = 
    (f, t, b) => f(t) - f(b)



/*
let decrypt:(s: string) => string = s => s.length == 0? s :
s.charAt(0) === 'A' ? 'N' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'B' ? 'O' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'C' ? 'P' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'D' ? 'Q' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'E' ? 'R' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'F' ? 'S' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'G' ? 'T' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'H' ? 'U' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'I' ? 'V' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'J' ? 'W' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'K' ? 'X' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'L' ? 'Y' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'M' ? 'Z' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'N' ? 'A' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'O' ? 'B' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'P' ? 'C' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'Q' ? 'D' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'R' ? 'E' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'S' ? 'F' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'T' ? 'G' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'U' ? 'H' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'V' ? 'I' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'W' ? 'J' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'X' ? 'K' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'Y' ? 'L' + decrypt(s.slice(1,s.length)) : 
s.charAt(0) === 'Z' ? 'M' + decrypt(s.slice(1,s.length)) :
' ' + decrypt(s.slice(1,s.length))
console.log(
decrypt("VA GUR SRAPR CVYYNE ARNE GUR TNGR UVATRF")
    )
    
console.log(integral(
    x => (-e(-x)/factorial(5))*(P(x, 5) + 5 * P(x,4) + (5*4) * P(x,3) + 
                           (5*4*3) * P(x,2) + factorial(5) * x + factorial(5))    
    ,3,0))

    let p1 = e(-1) - e(-3/2)

let p2 = 1 - p1
let foo1: (p: number,q: number) => number =
    (p,q) => P(p,2)*P(q,2) - P(p,1)*P(q,2) + P(q,4)

let foo2: (p: number,q: number) => number =
    (p,q) => choose(4,2)*P(p,2)*P(q,2)

let foo3: (p: number,q: number) => number =
    (p,q) => choose(4,1)*P(p,4) - choose(4,2)*P(p,3)*P(q,1) + choose(4,2)*P(p,2)*P(q,2) - choose(4,1)*P(q,4)

let foo4: (p:number, q:number) => number = p => P(p,2)

let fun = foo2
Math.abs((0.092 - fun (p1,p2))) <= 0.002 

?   console.log("true. your answer: "+fun(p1,p2))
:   console.log("their answer: " + 0.0092 + " your answer: " + fun(p1, p2))


let q1 = e(-1/2)
let q2 = e(-3/5)
console.log("2 " + (q1-q2)/q1)

let f1 = 1- e(-1/10)
console.log(f1)
console.log()
console.log()
console.log()
console.log()
console.log(e(-21/25)-e(-28/25))
console.log((1-e(-17/25))/(1-e(-22/25)))
console.log((e(-20/25)-e(-25/25))/(e(-20/25)))

console.log()
console.log()
let ruined = 1-e(-1)

let Exa: (a:number) => number = (a) => (1/(4*(a+1)))*(P(3,a+1)-P(-1,a+1))
console.log(
    Exa(8) - P(Exa(4),2)

)
*/