const attackValue = 10;
const strongAttackValue = 17;
const monstarAttackValue = 14;
const healValue = 20;

const log_Event_Player_Attack = "player attack";
const log_Event_Player_Strong_Attack = "player strong attack";
const log_Event_Monster_Attack = "monster attack";
const log_Event_Player_Heal = "player heal";
const log_Event_Game_Over = "game over";

let choosenMaxHealth = parseInt(prompt("maximum life you want", "100"));
if (isNaN(choosenMaxHealth) || choosenMaxHealth <= 0) {
    choosenMaxHealth = 100;
}
let currentMonsterHealth = choosenMaxHealth;
let currentPlayerHealth = choosenMaxHealth;
let hasBonusLife = true;
let battellog = [];

adjustHealthBars(choosenMaxHealth);

// log function
function writetolog(ev, val, monsterHealth, playerHealth) {
    let logentry;
    if (ev == log_Event_Player_Attack) {
        logentry = {
            event: ev,
            value: val,
            target: "monster",
            finalmonsterhealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (ev == log_Event_Player_Strong_Attack) {
        logentry = {
            event: ev,
            value: val,
            target: "monster",
            finalmonsterhealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (ev == log_Event_Player_Heal) {
        logentry = {
            event: ev,
            value: val,
            target: "player",
            finalmonsterhealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (ev == log_Event_Game_Over) {
        logentry = {
            event: ev,
            value: val,
            finalmonsterhealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    }

    battellog.push(logentry);
}

function reset() {
    currentMonsterHealth = choosenMaxHealth;
    currentPlayerHealth = choosenMaxHealth;
    resetGame(choosenMaxHealth);
}

function endround() {
    const intialhealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(monstarAttackValue);
    currentPlayerHealth -= playerDamage;
    writetolog(log_Event_Monster_Attack,playerDamage,currentPlayerHealth)
    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = intialhealth;
        alert("mar gaya hota bach gaya beta");
        setPlayerHealth(intialhealth);
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth >= 0) {
        alert("won");
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth >= 0) {
        alert("lose");
        reset();
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("draw");
        reset();
    }
}

function attackMonster(mode) {
    let maxDamage;
    if (mode === "ATTACK") {
        maxDamage = attackValue;
    } else if (mode === "STRONG_ATTACK") {
        maxDamage = strongAttackValue;
    }

    const monsterDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= monsterDamage;
    endround();
}

function attackHandler() {
    attackMonster("ATTACK");

}

function strongAttackHandler() {
    attackMonster("STRONG_ATTACK");
}

function healPlayerHandler() {
    let healvar;
    if (currentPlayerHealth >= choosenMaxHealth - healValue) {
        healvar = choosenMaxHealth - currentPlayerHealth;
    } else {
        healvar = healValue;
    }

    increasePlayerHealth(healvar);
    currentPlayerHealth += healvar;
    endround();
}

function logHandler(){
    console.log(battellog)
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click",logHandler)