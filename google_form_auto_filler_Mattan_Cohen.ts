/*
    with this code you can auto fill google forms of any kind easily:
    - fill out the form and don't submit
    - press F12 to open devtools menu
    - press submit with devtools menu open
    - enter partial response from: devtools menu -> Network -> formResponse -> Payload -> partialResponse.
        should look something like that:
             [null,1318496477,["4"],0],[null,1568334200,["Yes"],0],0]],null,"8158843115958160585"]. 
             please remove the ending from it: %,null,"8158843115958160585"]%
             * please notice to delete any irrelevant [ in the start of the partial response`)
    - enter <URL> from the link of the form: https://docs.google.com/forms/<URL>/viewform?usp=sf_link
    - run the program
    - the program will generate two links, one with the option to review the answers before submitting
      and the other submits automatically.
    - before entering the link generated please make sure that no word in no question contains the character ".
      if so, please add it manually

      enjoy :) Like the repo to show you used it and liked it
*/
let addNewLineToString: (str: string) => string = str => {
    let i: number = 0
    let s: string = " "
    while(i<str.length){
        if (str.charAt(i) === ']' && str.charAt(i+1) === ','){
            s += '\n'
            i++;
        }
        else
            s += str.charAt(i)
        i++
    }
    return s
}

let stringToSplittedArray: (str: string) => string[] = s => addNewLineToString(s).split('\n').filter((c) => c != ' ' && c != '0')

let changeToEntryForLink: (str: string) => string = str => {
    let arr = stringToSplittedArray(str)
    let s = ""
    let i: number = 0
    while (i < arr.length - 1){
        let temp = arr[i]
        let t = "entry."
        t += temp.substring(temp.indexOf("l,") + 2,temp.lastIndexOf(",["))
        t += "="
        let c = temp.substring(temp.indexOf('"') + 1,temp.lastIndexOf('"'))
        while (c.lastIndexOf('"') > 0)
            c = c.substring(0, c.lastIndexOf('"')) + c.substring(c.lastIndexOf('"') + 1, c.length)
        
        let cSplit = c.split(',')
        for (let j = 0; j< cSplit.length; j++){
            s += t
            s += cSplit[j]
            if (j != cSplit.length - 1)
                s += "&"
        }

        i++    
        if (i < arr.length - 1 || cSplit.length == 0)
            s += "&"
    }
    return s
}


console.log(`Please fill out the google form and before submitting it press F12. 
Submit the form with devtools (F12) menu open.`)
console.log(`Enter partial response from: devtools menu -> Network -> formResponse -> Payload -> partialResponse.
should look something like that: [null,1318496477,["4"],0],[null,1568334200,["Yes"],0],0]],null,"8158843115958160585"], please remove from it the ending: %,null,"8158843115958160585"]%
 * please notice to delete any irrelevant [ in the start of the partial response`)
console.log('\n'+'\n')


// let str = "@FILL" 
let str = `[null,2046044105,["כן"],0],[null,372820035,["5+יח\"ל"],0],[null,1318496477,["4"],0],[null,1568334200,["3"],0],[null,1064063316,["3"],0],[null,1858795274,["כן"],0],[null,1723651328,["3-5+אנשים"],0],[null,351009359,["2"],0],[null,1172946426,["Zoom","Discord","WhatsApp","YouTube","Moodle"],0],[null,624412252,["Zoom","WhatsApp","Moodle"],0],[null,2022637823,["שיחת+וידאו+(עם+מצלמה)","שיחת+אודיו+(ללא+מצלמה)","צ'אט","העברת+קבצים","שיתוף+מסך","Annotate+(ציור+על+גבי+המסך+המוקרן)","הקלטת+השיחה"],0],[null,1773751331,["אינני+משתמש+בפלטפורמה+זו"],0],[null,1906688001,["שליחת+הודעות+טקסט","שליחת+הודעות+קוליות","שליחת+תמונות/סרטוני+וידאו","שליחת+קבצים+ומסמכים","שימוש+בקבוצות+מרובות+משתתפים"],0],[null,2089958668,["צפייה+בסרטוני+וידאו","צפייה+לפי+המלצת+YouTube+לתוכן+שמתאים+למשתמש"],0],[null,1049008555,["העלאת+תרגילי+בית+להגשה","מעבר+על+מערכי+השיעור","מעבר+על+מערכי+התרגול","צפייה+בשיעורים+מקוונים","שאילת+שאולות+בפורומים","צפייה+בחומרי+לימוד+בשנים+קודמות"],0],[null,1463035133,["Zoom","WhatsApp","YouTube","Moodle"],0],[null,1417815957,["2"],0],[null,1259693794,["Zoom","WhatsApp","YouTube","Moodle"],0],[null,1656317935,["Zoom","WhatsApp","YouTube","Moodle"],0],[null,1925100309,["Zoom","WhatsApp","YouTube","Moodle"],0],[null,55385583,["כי+אלו+הפלטפורמות+שאני+מכיר","כי+זו+הפלטפורמה+שהכי+נוחה+לי","הפלטפורמה+עונה+על+הצרכים+הפונקציונאליים+שלי"],0],[null,790357350,["חשבון+דיפרנציאלי+ואינטגרלי+(חדו\"א)","אלגברה+לינארית","מתמטיקה+דיסקטית/בדידה","סטטיסטיקה+והסתברות"],0],[null,511963287,["אלגברה+לינארית"],0],[null,30428549,["חשבון+דיפרנציאלי+ואינטגרלי+(חדו\"א)","אלגברה+לינארית","מתמטיקה+דיסקטית/בדידה","סטטיסטיקה+והסתברות"],0],[null,1893317231,["חשבון+דיפרנציאלי+ואינטגרלי+(חדו\"א)","אלגברה+לינארית","מתמטיקה+דיסקטית/בדידה","סטטיסטיקה+והסתברות"],0],[null,1931983749,["חשבון+דיפרנציאלי+ואינטגרלי+(חדו\"א)","אלגברה+לינארית","מתמטיקה+דיסקטית/בדידה","סטטיסטיקה+והסתברות"],0],[null,1459773320,["אני+נעזר+באנשים+אחרים","יותר+נוח+לי+להבין+כך+את+החומר","הפלטפורמה+מאפשרת+להציג+את+החומר+בצורה+נוחה"],0],[null,457064566,["Moodle"],0],[null,1066459113,["שיתוף+קבצים","הקלטת+שיחות","שיתוף+מסך","נגישות+לתוכן+ישן","צפייה+נגישה+בתכנים+לימודיים","יצירת+דיונים+בין+אנשים+(לדוגמה:+פורום+במודל,+תגובות+על+סרטונים+ביוטיוב,+שיחות+בשרתים+בדיסקורד)"],0]]`
console.log(`Your partial response is: ${str}`)

let base = `https://docs.google.com/forms/`
let viewPortEnd = `/viewform?` 
let formResponseEnd = `/formResponse?`
// let link = `@FILL` 
let link = `d/e/1FAIpQLSfHCAbj9_7ovNK8YyTvl5bcG5SE2xAc0Vbd02HorRsUTXTayw` 
console.log("Your URL for " + base + "<URL>" + viewPortEnd + `usp=sf_link is: ` + link)
console.log('\n'+'\n')


console.log(`CAUTION: IF THERE IS AN OPTION WHICH INCLUDES THE CHAR ", THE CHAR MUST BE ADDED MANUALLY`)
console.log(`FOR EXAMPLE: יח"ל TURNS TO יחל THEREFORE SHOULD BE CHANGED BACK MANUALLY IN THE LINK`)
let entries = changeToEntryForLink(str)
console.log(
`Enter this link to be able to watch the answers: 
    ${base + link + viewPortEnd + entries}`)
console.log(
`Enter this link to submit the form without watching the answers: 
    ${base + link + formResponseEnd + entries}`)