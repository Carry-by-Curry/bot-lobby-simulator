const gameCodeInput = document.getElementById("gameCode");
const botCountInput = document.getElementById("botCount");
const addBotsButton = document.getElementById("addBots");
const clearBotsButton = document.getElementById("clearBots");

const displayCode = document.getElementById("displayCode");
const botList = document.getElementById("botList");
const botCounter = document.getElementById("botCounter");

let bots = [];

gameCodeInput.addEventListener("input", () => {
    displayCode.textContent = gameCodeInput.value || "---";
});

addBotsButton.addEventListener("click", () => {
    const amount = Number(botCountInput.value);

    if (amount < 1 || amount > 100) {
        alert("Bitte eine Zahl zwischen 1 und 100 eingeben.");
        return;
    }

    for (let i = 0; i < amount; i++) {
        const botNumber = bots.length + 1;

        bots.push({
            id: botNumber,
            name: createBotName(botNumber),
            status: "Verbunden"
        });
    }

    renderBots();
});

clearBotsButton.addEventListener("click", () => {
    bots = [];
    renderBots();
});

function createBotName(number) {
    const names = [
        "TestBot",
        "QuizBot",
        "DemoBot",
        "PlayerBot",
        "Simulator"
    ];

    const randomName =
        names[Math.floor(Math.random() * names.length)];

    return `${randomName}_${String(number).padStart(2, "0")}`;
}

function renderBots() {
    botList.innerHTML = "";

    botCounter.textContent =
        `${bots.length} ${bots.length === 1 ? "Bot" : "Bots"}`;

    if (bots.length === 0) {
        botList.innerHTML = `
            <div class="empty">
                Noch keine Test-Bots in der Lobby.
            </div>
        `;
        return;
    }

    bots.forEach(bot => {
        const element = document.createElement("div");

        element.className = "bot";

        element.innerHTML = `
            <div class="bot-name">${escapeHTML(bot.name)}</div>
            <div class="bot-status">${bot.status}</div>
        `;

        botList.appendChild(element);
    });
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
