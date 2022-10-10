const FPS = 30
let scale = 1
let paused = false
let showPauseMenu = false
let dead = false
let showMainMenu = true

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth
canvas.height = window.innerHeight

function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function alert(text) {
    alertMsg = text
    setTimeout(() => {alertMsg = '' }, 3000)
}

let startSelected = true
let incr = 0
let colorIncr = 0
let colorRise = true

const menuStars = []
for (let i = 0; i < 500; i++) {
    let star = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() + 1
    }
    menuStars.push(star)
}

function drawMenuStars() {
    menuStars.map((star) => {
        ctx.fillStyle = `rgb(${(Math.random() * 10)+ 245}, ${(Math.random() * 10)+ 245}, ${(Math.random() * 10) + 200})`
        ctx.fillRect(star.x, star.y, star.size, star.size)
    })
}

function menuLoop() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    incr += 2
    if (incr >= 2590) incr = -canvas.height

    colorRise ? colorIncr += 1 : colorIncr -= 1
    if (colorIncr >= 255) colorRise = false
    if (colorIncr <= 0) colorRise = true

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawMenuStars();

    let grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    grd.addColorStop(0, `rgb(${colorIncr * 2}, 80, 80)`)
    grd.addColorStop(0.2, `rgb(80, ${255 - colorIncr * 2}, 80)`)
    grd.addColorStop(0.4, `rgb(80, 80, ${colorIncr * 2})`)
    grd.addColorStop(0.8, `rgb(${255 - colorIncr * 2}, ${colorIncr * 2}, ${colorIncr * 2})`)
    grd.addColorStop(1, `rgb(${colorIncr * 2}, ${colorIncr * 2}, ${255 - colorIncr * 2})`)
    ctx.fillStyle = grd
    ctx.font = "14pt courier new"
    ctx.fillText('                         ###', 15, 0 - incr)
    ctx.fillText('                        e#  ##', 15, 15 - incr)
    ctx.fillText('                         #   ,#', 15, 30 - incr)
    ctx.fillText('                         #    ,#', 15, 45 - incr)
    ctx.fillText('                         #----,#', 15, 60 - incr)
    ctx.fillText('                         #    !#', 15, 75 - incr)
    ctx.fillText('                         #    ,#', 15, 90 - incr)
    ctx.fillText('                         # () ,#', 15, 105 - incr)
    ctx.fillText('                         # () ,#', 15, 120 - incr)
    ctx.fillText('                         # () ,#', 15, 135 - incr)
    ctx.fillText('                         #----,#', 15, 150 - incr)
    ctx.fillText('                         #    !#', 15, 165 - incr)
    ctx.fillText('                         #    ,#', 15, 180 - incr)
    ctx.fillText('                        *#    ,#', 15, 195 - incr)
    ctx.fillText('                        *#    ,#', 15, 210 - incr)
    ctx.fillText('                       /*#    ,#', 15, 225 - incr)
    ctx.fillText('                       * #    ,#', 15, 240 - incr)
    ctx.fillText('                       * #    ,#', 15, 255 - incr)
    ctx.fillText('                      /* #----,#', 15, 270 - incr)
    ctx.fillText('                      *  #    `#`', 15, 285 - incr)
    ctx.fillText('                      *  #    ,#*', 15, 300 - incr)
    ctx.fillText('                      * /#    ,#*', 15, 315 - incr)
    ctx.fillText('                     /*/ #    ,#o*', 15, 330 - incr)
    ctx.fillText('                     */  #    ,#o*', 15, 345 - incr)
    ctx.fillText('                     *   #    ,#o*', 15, 360 - incr)
    ctx.fillText('                     *  /#    ,#o *', 15, 375 - incr)
    ctx.fillText('                     * / #    ,#o *', 15, 390 - incr)
    ctx.fillText('                     * / #    ,#o *', 15, 405 - incr)
    ctx.fillText('                     */  #    ,#o  *', 15, 420 - incr)
    ctx.fillText('                    **   #    ,#o   *', 15, 435 - incr)
    ctx.fillText('                 ****    #----,#o    *', 15, 450 - incr)
    ctx.fillText('               **   *   /#    `#O     *', 15, 465 - incr)
    ctx.fillText('              **    *  / #    ,#o      *', 15, 480 - incr)
    ctx.fillText('              *     * /  #    ,#o       *', 15, 495 - incr)
    ctx.fillText('            ***     */   #    ,#o       *', 15, 510 - incr)
    ctx.fillText('           *  * ()  *    #    ,#o       **', 15, 525 - incr)
    ctx.fillText('           *  * ()  *    #    ,#o    O  * *', 15, 540 - incr)
    ctx.fillText('          #*  * ()  * o  #    ,#O O  O  * *', 15, 555 - incr)
    ctx.fillText('         (#*  * ()  *   (#-----#o----O--* *', 15, 570 - incr)
    ctx.fillText('          #*  * ()  *   (#    ,#o    O  * *', 15, 585 - incr)
    ctx.fillText('           *  * ()  * o  #    ,#O O  O  * *', 15, 600 - incr)
    ctx.fillText('           *  *     *    #    ,#o    O  *O*', 15, 615 - incr)
    ctx.fillText('           *  *     *    #    ,#o      O**', 15, 630 - incr)
    ctx.fillText('           *o *     *`   #    ,#O      O*', 15, 645 - incr)
    ctx.fillText('           *oO*     * `  #    ,#O     "O*', 15, 660 - incr)
    ctx.fillText('            ***:,   *  ` #    ,#O"   "O*', 15, 675 - incr)
    ctx.fillText('              *o::, *   `#----/#O""""O*', 15, 690 - incr)
    ctx.fillText('              **oO::*`   #    ,#O"""O*', 15, 705 - incr)
    ctx.fillText('               *oOOOO*`  #    ,#OOOO*', 15, 720 - incr)
    ctx.fillText('                **oOO* ` #    ,#OOO*', 15, 735 - incr)
    ctx.fillText('                 ***o*  `#    ,#OO*', 15, 750 - incr)
    ctx.fillText('                   ***   *    ,#o*', 15, 765 - incr)
    ctx.fillText('                    **`  #    ,#O*', 15, 780 - incr)
    ctx.fillText('                     **` #    ,#O*', 15, 795 - incr)
    ctx.fillText('                      *o`#    ,#O*', 15, 810 - incr)
    ctx.fillText('                      *oO#    ,#*                             O', 15, 825 - incr)
    ctx.fillText('                      *oO#----/#**                            I', 15, 840 - incr)
    ctx.fillText('                       *o#    ,#*O*                           I', 15, 855 - incr)
    ctx.fillText('                       *o#    ,#OOO*                   -------I-------', 15, 870 - incr)
    ctx.fillText('                       *o#    "#OOOO*                  **       /OOO**', 15, 885 - incr)
    ctx.fillText('                       *o#   ""#OOOOO*                   `*********/', 15, 900 - incr)
    ctx.fillText('                       **#   ""#oOOOOO*                     `***/', 15, 915 - incr)
    ctx.fillText('                       **#"""""#oOOOOOO*             *******************', 15, 930 - incr)
    ctx.fillText('                       * #"""""#oOOOOOOO*          ***********************', 15, 945 - incr)
    ctx.fillText('                       * #""""o#OOO   : O*         *      ---------   ,OO***`', 15, 960 - incr)
    ctx.fillText('                       * #"""oO#OO    :   *        *      *       *O  ,OO*  *', 15, 975 - incr)
    ctx.fillText('                       * #o()OO#O     :    *      *********       ********* *', 15, 990 - incr)
    ctx.fillText('                       * #oOOOO#O     :     *     *       * 88888 *O  ,OOO* *', 15, 1005 - incr)
    ctx.fillText('                       * #o()OO#O     :     :*   ********** 88888 ***********', 15, 1020 - incr)
    ctx.fillText('                       * #oOOOO#O     :     : * *         * 88/`8 *O  ,OOOOO**', 15, 1035 - incr)
    ctx.fillText('                       * #oOO##OO    O: O   :  ************ 8/  ` ************', 15, 1050 - incr)
    ctx.fillText('                       * #oOOOO#O    O: O O :   *  :    :   / -- `  :,,""OOO**', 15, 1065 - incr)
    ctx.fillText('                       * #oOO##OO     : O   :  *  :     :  / /88`)  :,,""OO#**', 15, 1080 - incr)
    ctx.fillText('                       * #o##OOOO   O : O O :O *  :     :  l/8888   :,,""OO#**', 15, 1095 - incr)
    ctx.fillText('                       * ###oOOOO     :     :  *  :     :   88888   :,,""OOO**', 15, 1110 - incr)
    ctx.fillText('                       * ###***oO     :     :O *  :     :   88888   :,,""OOO**', 15, 1125 - incr)
    ctx.fillText('                       * ###* **o     :     :  *  :     :   88888   :,,""OOO**', 15, 1140 - incr)
    ctx.fillText('                        *****   **"   :     :  *  :     :   8"888   :,,""oOO**', 15, 1155 - incr)
    ctx.fillText('                                 **"" :     :  *  :     :   8 8"8   :,,""oOO**', 15, 1170 - incr)
    ctx.fillText('                                   **":     :  *  :     :   8 8 8   :,(""oOO**', 15, 1185 - incr)
    ctx.fillText('                                    **""    :  *  :     :   8 8 8   :,(""oOO**', 15, 1200 - incr)
    ctx.fillText('        /**********`                  **"   :  *  :     :   8 8 8   :,,""OOO**', 15, 1215 - incr)
    ctx.fillText('      /**          **`                 **"" :  *  :     :   8 8 8   :,,""OOO**', 15, 1230 - incr)
    ctx.fillText('      *            oO*                   **":  *,,:,,,,,:,,,8,8,8,,,:,,""OOO**', 15, 1245 - incr)
    ctx.fillText('      *           "oO*                    **"" *  :     :     8 8   :,,""OOO**', 15, 1260 - incr)
    ctx.fillText('      */`       "OOOO*                      **" * :     :     8 8   :,,""OOO**', 15, 1275 - incr)
    ctx.fillText('     **l***************                      **"*  :    :     8 8   :,,""OOO**', 15, 1290 - incr)
    ctx.fillText('     *             oOO*                        **  :    :     8 8   :,,""OOO**', 15, 1305 - incr)
    ctx.fillText('     *******************                        ** :    :     8     :,,""oOO*/', 15, 1320 - incr)
    ctx.fillText('      ************* *  *                         * :    :     8     :,,"oOO**', 15, 1335 - incr)
    ctx.fillText('     ************** *  *                         * :    :     8     :,,"oOO*/', 15, 1350 - incr)
    ctx.fillText('     *:!          * *  *                         * :    :     8    ,,"""oOO*', 15, 1365 - incr)
    ctx.fillText('     *:!          * ****                         * :    :     8    ,,""oOO**', 15, 1380 - incr)
    ctx.fillText('     *:!          **,,,*                         * :    :          ,,""oOO*/', 15, 1395 - incr)
    ctx.fillText('     *:!          *,,,**                         * :    :          ,,""oOO*', 15, 1410 - incr)
    ctx.fillText('     *:!          ******                         * :    :          ,,""oOO*', 15, 1425 - incr)
    ctx.fillText('     *:!          ""oO**                         * :    :          ,""OOO**', 15, 1440 - incr)
    ctx.fillText('     *:!    888   ""oO**                         * :    :   O    O,,""OOO*/', 15, 1455 - incr)
    ctx.fillText('     *:!    888   ""oO**                         * :    :        O,,""OOO*', 15, 1470 - incr)
    ctx.fillText('     *:!    /`8   ""OO**                         *,:,,,,:,,,O,,O,,,""OOO**', 15, 1485 - incr)
    ctx.fillText('     *:!   / -`   ""OO**                         *  :   :        ,,""OOO*/', 15, 1500 - incr)
    ctx.fillText('     *:!  / /8`)  ""OO**                         *  :   :      O ,,""OOO*', 15, 1515 - incr)
    ctx.fillText('     *:!  l/888   ""OO********************************* :        ,,""OOO*', 15, 1530 - incr)
    ctx.fillText('     *:!    888   ""oO*O                   ,  ,,::""OO* :        O,""OOO*', 15, 1545 - incr)
    ctx.fillText('     *:!    888   ""oO*O                   ,  ,,::""OO* :        O,""OOO*', 15, 1560 - incr)
    ctx.fillText('     *:!    888   ""o/*O                   ,  ,,::""OO* :         ,""OOO*', 15, 1575 - incr)
    ctx.fillText('     *:!    888   ""*********************************** :         ""oOOO*', 15, 1590 - incr)
    ctx.fillText('     *:!    888   "oO*                            * OOO :        ""OO****', 15, 1605 - incr)
    ctx.fillText('     *:!    888   "oO*                            * OOO :       "OO**', 15, 1620 - incr)
    ctx.fillText('     *:!    888   "oO*                            * OOO :       "**', 15, 1635 - incr)
    ctx.fillText('     *:!    888   "oO*                            * OOO :     ,"OO*', 15, 1650 - incr)
    ctx.fillText('     *:!    888   "oO*                            * OOO :     :OO*', 15, 1665 - incr)
    ctx.fillText('     *:!    888   "oO*                            * OOO :     ::**', 15, 1680 - incr)
    ctx.fillText('     *:!    888   "oO*                            * O,,,:,,,,,::*', 15, 1695 - incr)
    ctx.fillText('     *:!          "oO*                            *OO   :     O:*', 15, 1710 - incr)
    ctx.fillText('     *:!   #####  "oO*                            *OO   :     O:*', 15, 1725 - incr)
    ctx.fillText('     *:!          "oO*                           (*O:   :     :**', 15, 1740 - incr)
    ctx.fillText('     *:!   #####  "oO*                          ((*O:   : $$$$$$$', 15, 1755 - incr)
    ctx.fillText('     *:!   #   #  "oO*                           e*":   **-----**', 15, 1770 - incr)
    ctx.fillText('     *:!   #####  "oO*                            * :  *`------**', 15, 1785 - incr)
    ctx.fillText('     *:!          "oO*                            *****', 15, 1800 - incr)
    ctx.fillText('     *:!   ##     "oO*', 15, 1815 - incr)
    ctx.fillText('     *:!   # #    "oO*', 15, 1830 - incr)
    ctx.fillText('     *:!   #  ##  "oO*', 15, 1845 - incr)
    ctx.fillText('     *:!          "oO*', 15, 1860 - incr)
    ctx.fillText('     *:!   #####  "oO*', 15, 1875 - incr)
    ctx.fillText('     *:!          "oO*', 15, 1890 - incr)
    ctx.fillText('     *:!     #    "oO*', 15, 1905 - incr)
    ctx.fillText('     *:!          "oO*', 15, 1920 - incr)
    ctx.fillText('     *:!   #   #  "oO*', 15, 1935 - incr)
    ctx.fillText('     *:!   #   #  "oO*', 15, 1950 - incr)
    ctx.fillText('     *:!   #####  "oO*', 15, 1965 - incr)
    ctx.fillText('     *:!          "oO*', 15, 1980 - incr)
    ctx.fillText('     *:!   #   #  "oO*', 15, 1995 - incr)
    ctx.fillText('     *:!   #   #  "oO*', 15, 2010 - incr)
    ctx.fillText('     *:!   #####  "oO*', 15, 2025 - incr)
    ctx.fillText('     *:!          "oO*', 15, 2040 - incr)
    ctx.fillText('     *:!   #####  "oO*', 15, 2055 - incr)
    ctx.fillText('     *:!     #    "oO*', 15, 2070 - incr)
    ctx.fillText('     *:!    #     "oO*', 15, 2085 - incr)
    ctx.fillText('     *:!   #####  "oO*', 15, 2100 - incr)
    ctx.fillText('     *:!          "oO*', 15, 2115 - incr)
    ctx.fillText('     *:!    88    "o*', 15, 2130 - incr)
    ctx.fillText('     *:!    88   ,"o*', 15, 2145 - incr)
    ctx.fillText('     *:!    88   ,"o*', 15, 2160 - incr)
    ctx.fillText('     *:!    8p   ,"O*', 15, 2175 - incr)
    ctx.fillText('     *:!    8    ,"o*', 15, 2190 - incr)
    ctx.fillText('   /*****   8    ,"o*', 15, 2205 - incr)
    ctx.fillText(`   * '''*   8    ,"o*`, 15, 2220 - incr)
    ctx.fillText(`   * '***   8    ,"o*`, 15, 2235 - incr)
    ctx.fillText(`   * '*     8    ,"o*`, 15, 2250 - incr)
    ctx.fillText(`   * '*:    8    ,"o*`, 15, 2265 - incr)
    ctx.fillText(`   * '*:         ,"o*`, 15, 2280 - incr)
    ctx.fillText(`   * '*:         ,"o*`, 15, 2295 - incr)
    ctx.fillText(`   * '*:         ,"o*`, 15, 2310 - incr)
    ctx.fillText(`   * '*:         ,"o*`, 15, 2325 - incr)
    ctx.fillText(`   * '*:         ,"o*`, 15, 2340 - incr)
    ctx.fillText(`   * '*:         ,"o*`, 15, 2355 - incr)
    ctx.fillText(`   * '*:  ####   ,"o*`, 15, 2370 - incr)
    ctx.fillText(`   * '*:  #++#   ,"o*`, 15, 2385 - incr)
    ctx.fillText(`   * '*:  #++#   ,"o*`, 15, 2400 - incr)
    ctx.fillText(`   * '*:  #++#   ,"o*`, 15, 2415 - incr)
    ctx.fillText(`   * '*:  #++#   ,"o*`, 15, 2430 - incr)
    ctx.fillText('   *====* ####   ,"o*', 15, 2445 - incr)
    ctx.fillText('   `***** ####   ,"O*', 15, 2460 - incr)
    ctx.fillText('     *------------"o*', 15, 2475 - incr)
    ctx.fillText('     *------------"o*', 15, 2490 - incr)
    ctx.fillText('     *:!         ,"o*', 15, 2505 - incr)
    ctx.fillText('     *:!     *******', 15, 2520 - incr)
    ctx.fillText('     *:!   **    o', 15, 2535 - incr)
    ctx.fillText('     *:! /*    oO', 15, 2550 - incr)
    ctx.fillText('     *:!**oOOOO', 15, 2565 - incr)
    ctx.fillText('     ***', 15, 2580 - incr)

    ctx.fillText("          ______ _______ ______ ______    _______ ______  ______ __  __", canvas.width - canvas.width / 2, 200)
    ctx.fillText("         / __  //__  __// __  // __  /   /__  __// __  / / ____// / / /", canvas.width - canvas.width / 2, 215)
    ctx.fillText("        / / /_/   / /  / /_/ // /_/ /      / /  / /_/ / / /__  / //'/'", canvas.width - canvas.width / 2, 230)
    ctx.fillText("        _\\ \\     / /  / __  //   __/      / /  /   __/ / __ / /  '/'", canvas.width - canvas.width / 2, 245)
    ctx.fillText("      / /_/ /   / /  / / / // /\\ \\       / /  / /\\ \\  / /___ / /\\ \\", canvas.width - canvas.width / 2, 260)
    ctx.fillText("     /_____/   /_/  /_/ /_//_/  \\_\\     /_/  /_/  \\_\\/_____//_/  \\_\\", canvas.width - canvas.width / 2, 275)

    ctx.fillText("               .", canvas.width - canvas.width / 2.70, 330)
    ctx.fillText("              .:.", canvas.width - canvas.width / 2.70, 345)
    ctx.fillText("             .:::.", canvas.width - canvas.width / 2.70, 360)
    ctx.fillText("            .:::::.", canvas.width - canvas.width / 2.70, 375)
    ctx.fillText("        ***.:::::::.***", canvas.width - canvas.width / 2.70, 390)
    ctx.fillText("   *******.:::::::::.*******", canvas.width - canvas.width / 2.70, 405)
    ctx.fillText(" ********.:::::::::::.********", canvas.width - canvas.width / 2.70, 420)
    ctx.fillText("********.:::::::::::::.********", canvas.width - canvas.width / 2.70, 435)
    ctx.fillText("*******.::::::'***`::::.*******", canvas.width - canvas.width / 2.70, 450)
    ctx.fillText("******.::::'*********`::.******", canvas.width - canvas.width / 2.70, 465)
    ctx.fillText(" ****.:::'*************`:.****", canvas.width - canvas.width / 2.70, 480)
    ctx.fillText("   *.::'*****************`.*", canvas.width - canvas.width / 2.70, 495)
    ctx.fillText("   .:'  ***************    .", canvas.width - canvas.width / 2.70, 510)
    ctx.fillText("  .", canvas.width - canvas.width / 2.70, 525)

    ctx.fillText('___    __    __ _     __', canvas.width - canvas.width / 2.8, 600)
    ctx.fillText(' | |_||_    /__|_||V||_ ', canvas.width - canvas.width / 2.8, 615)
    ctx.fillText(' | | ||__   \\_|| || ||__', canvas.width - canvas.width / 2.8, 630)

    ctx.strokeStyle = 'rgb(238, 238, 238)'
    ctx.lineWidth = 3
    ctx.shadowColor = 'rgb(238, 238, 238)'
    ctx.shadowBlur = 10
    ctx.strokeRect(canvas.width - canvas.width / 4, canvas.height - canvas.height / 4, canvas.width / 12, canvas.height / 15)
    ctx.strokeRect(canvas.width - canvas.width / 2.5, canvas.height - canvas.height / 4, canvas.width / 12, canvas.height / 15)
    ctx.shadowBlur = 0
    
    if (!startSelected) {
        ctx.fillStyle = "rgb(171, 183, 183)"
        ctx.fillRect(canvas.width - canvas.width / 4, canvas.height - canvas.height / 4, canvas.width / 12, canvas.height / 15)
        ctx.fillStyle = "rgb(30, 30, 30)"
        ctx.fillRect(canvas.width - canvas.width / 2.5, canvas.height - canvas.height / 4, canvas.width / 12, canvas.height / 15)
        
        ctx.font = "24pt trebuchet ms"
        ctx.textAlign = "center"
        ctx.fillStyle = "rgb(30, 30, 30)"
        ctx.fillStyle = "rgb(171, 183, 183)"
        ctx.fillText('START', canvas.width - canvas.width / 2.78, canvas.height - canvas.height / 4.95)
        ctx.fillStyle = "rgb(30, 30, 30)"
        ctx.fillText('LEADERS', canvas.width - canvas.width / 4.8, canvas.height - canvas.height / 4.95)
    } else {
        ctx.fillStyle = "rgb(30, 30, 30)"
        ctx.fillRect(canvas.width - canvas.width / 4, canvas.height - canvas.height / 4, canvas.width / 12, canvas.height / 15)
        ctx.fillStyle = "rgb(171, 183, 183)"
        ctx.fillRect(canvas.width - canvas.width / 2.5, canvas.height - canvas.height / 4, canvas.width / 12, canvas.height / 15)
        
        ctx.font = "24pt trebuchet ms"
        ctx.textAlign = "center"
        ctx.fillStyle = 'rgb(20, 20, 20)'
        ctx.fillText('START', canvas.width - canvas.width / 2.78, canvas.height - canvas.height / 4.95)
        ctx.fillStyle = "rgb(171, 183, 183)"
        ctx.fillText('LEADERS', canvas.width - canvas.width / 4.8, canvas.height - canvas.height / 4.90)
    }

    ctx.font = "16pt trebuchet ms"
    ctx.textAlign = "center"
    ctx.fillStyle = "rgb(171, 183, 183)"
    ctx.fillText('Press Esc for Controls', canvas.width - canvas.width / 16, canvas.height / 32)
    
    if (showPauseMenu) drawPauseMenu();

    if (!showMainMenu) {
        requestAnimationFrame(loop) 
    } else {
        setTimeout(() => {
            requestAnimationFrame(menuLoop)
        }, 1000 / FPS)
    }
}


