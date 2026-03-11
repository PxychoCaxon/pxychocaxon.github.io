const config = {
    user: "caxon",
    shell: "bash",
    distro: "cometxOS (rolling)",
    kernel: "6.19-stable",
    uptime: "a few years",
    likes: "systems, game theory, psychology, poker, journaling."
};

const _0x1a2b = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTQ2NzkwMzI0MTA1MTMwODE5Mi9PM2NLeHlkeWNSVDVvZXM1VjBmYXZ1dTFQV0U1SkpwMGc4RXBsRG93TmFyOGt5ZGhMUE1oTzhVTnNDQTRWbTJzOG03SA==";

const bootLogo = `            /$$$$$$   /$$$$$$ 
           /$$__  $$ /$$__  $$
 /$$   /$$| $$  \\ $$| $$  \\__/
|  $$ /$$/| $$  | $$|  $$$$$$ 
 \\  $$$$/ | $$  | $$ \\____  $$
  >$$  $$ | $$  | $$ /$$  \\ $$
 /$$/\\  $$|  $$$$$$/|  $$$$$$/
|__/  \\__/ \\______/  \\______/ °
                              `;

const bootMessages = [
"[    0.000000] Booting Linux kernel 6.19-stable (cometxOS)",
"[    0.001120] Detected CPU: GenuineIntel(R) Core(TM) i7 @ 3.40GHz",
"[    0.002411] Initializing memory management subsystem",
"[    0.004392] ACPI: Early table checksum verification disabled",
"[    0.006112] PCI: Scanning bus for devices...",
"[    0.009214] Detected NVMe controller at 0000:01:00.0",
"[    0.011298] Loading kernel modules: virtio, nvme, ext4, drm",
"[    0.014881] Initializing virtual filesystem layer",
"[    0.018220] Mounting root filesystem on /dev/nvme1n1p2",
"[    0.021742] EXT4-fs: mounted filesystem with ordered data mode",
"[    0.024300] Starting systemd 255 (cometx build)",
"[    0.028611] Created slice: system.slice",
"[    0.031244] Created slice: user.slice",
"[    0.034212] Reached target: Local File Systems",
"[    0.038120] Starting Journal Service...",
"[    0.042314] Starting Network Manager...",
"[    0.046191] Starting Random Seed Service...",
"[    0.049772] Starting Matrix Background Engine...",
"[    0.053600] Bringing up network interface: eth0",
"[    0.058112] eth0: link up, 1Gbps full-duplex",
"[    0.061480] Reached target: Network",
"[    0.065314] Starting Comet UI Interface...",
"[    0.069442] Loading user environment...",
"[    0.072331] Reached target: Multi-User System",
"[    0.076882] cometxOS login services ready"
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const input = document.getElementById('command-input');
const output = document.getElementById('output');
const terminalBody = document.getElementById('terminal-body');
const inputContainer = document.getElementById('input-container');

let history = [];
let historyIdx = -1;

/* ---------------- COMMANDS ---------------- */

const commands = {

    whoami: () => config.user,

    ls: (args) => {
        const files = "aliases.txt    README.txt    secrets.txt";
        if (args === "" || args === "." || args === " ") return files;
        return `${args} is not a valid directory`;
    },

    cat: (args) => {
        if (args === 'README.txt') return "available commands: whoami, ls, cat, note, fastfetch, clear";
        if (args === 'aliases.txt') return "caxon, cax, caxie, cakeson, cake, psy, pxffy, batman";
        if (args === 'secrets.txt') return "1. my password is very tough to guess. try me. (don't actually)\n2. the more i live the more i lose my tolerance (definitely don't try this)\n3. i maintain a mad scientist's diary and a dream journal irl (ask for sneak peeks)\n4. i once rm rf-ed a live system (DEFINITELY do not try this)\n5. i like pixel art\n6. my ip address is 192.168.0.1 (LOL)";
        return `File not found: ${args}`;
    },

    note: (args) => {

        const parts = args.trim().split(' ');

        if (parts.length < 2) {
            return "Functionality: this command sends a private note to me that i can view.\nUsage: note [your_name] [your_message]\nExample: note alex hey bro im alex bro i swear STOP IGNORING ME AND REPLY TO MY DMS";
        }

        const name = parts[0];
        const message = parts.slice(1).join(' ');

        try {

            const hook = atob(_0x1a2b);

            const payload = {
                embeds: [{
                    title: "New Note",
                    color: 0x00ff00,
                    fields: [
                        { name: "From", value: `\`${name}\``, inline: true },
                        { name: "Message", value: message }
                    ],
                    footer: { text: "Sent from pxychocaxon.github.io" },
                    timestamp: new Date()
                }]
            };

            fetch(hook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            return `message sent.`;

        } catch (e) {
            return "Error: Webhook string is invalid.";
        }
    }
};

/* ---------------- BOOT SEQUENCE ---------------- */

async function runBootSequence() {

    const logoPre = document.createElement('pre');
    logoPre.className = 'boot-logo';
    logoPre.innerText = bootLogo;
    output.appendChild(logoPre);

    await sleep(1500);

    for (const msg of bootMessages) {

        const line = document.createElement('div');
        line.className = 'boot-line';
        line.innerHTML = `<span class="boot-ok">[  OK  ]</span> ${msg}`;
        output.appendChild(line);

        terminalBody.scrollTop = terminalBody.scrollHeight;

        await sleep(Math.random() + 50);
    }

    await sleep(1200);

    output.innerHTML = '';

    displayFastFetch();

    if (inputContainer) {
        inputContainer.classList.remove('hidden');
        input.focus();
    }
}

/* ---------------- FASTFETCH ---------------- */

function displayFastFetch() {

    const logo = ` ██████╗ ██╗  ██╗     ☄
 ██╔══██╗╚██╗██╔╝    °
 ██████╔╝ ╚███╔╝    °
 ██╔═══╝  ██╔██╗   °
 ██║     ██╔╝ ██╗ °
 ╚═╝     ╚═╝  ╚═╝°`;

    const info = `
<div><b>USER</b>: ${config.user}</div>
<div><b>OS</b>: ${config.distro}</div>
<div><b>KERNEL</b>: ${config.kernel}</div>
<div><b>UPTIME</b>: ${config.uptime}</div>
<div><b>LIKES</b>: ${config.likes}</div>`.trim();

    const div = document.createElement('div');
    div.className = 'fastfetch';

    div.innerHTML = `<pre class="ascii">${logo}</pre><div class="info">${info}</div>`;

    output.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

/* ---------------- TERMINAL INPUT ---------------- */

input.addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {

        const fullCmd = input.value.trim();

        const parts = fullCmd.split(/\s+/);
        const cmd = parts[0];
        const args = parts.slice(1).join(' ');

        const line = document.createElement('div');
        line.className = 'user-line';

        line.innerHTML = `<span style="color:var(--prompt-color)">caxon@xOS:~$</span> ${fullCmd}`;
        output.appendChild(line);

        const responseWrapper = document.createElement('div');
        responseWrapper.className = 'command-output';

        if (cmd === 'clear') {

            output.innerHTML = '';

        } else if (cmd === 'fastfetch') {

            displayFastFetch();

        } else if (commands.hasOwnProperty(cmd)) {

            responseWrapper.innerText = commands[cmd](args || "");
            output.appendChild(responseWrapper);

        } else if (cmd !== '') {

            responseWrapper.innerText = `command not found: ${cmd}`;
            responseWrapper.style.color = "#ff6666";
            output.appendChild(responseWrapper);
        }

        if (fullCmd) {
            history.push(fullCmd);
            historyIdx = history.length;
        }

        input.value = '';

        setTimeout(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 10);
    }

    if (e.key === 'ArrowUp' && historyIdx > 0) {

        historyIdx--;
        input.value = history[historyIdx];
        e.preventDefault();
    }

    if (e.key === 'ArrowDown') {

        if (historyIdx < history.length - 1) {
            historyIdx++;
            input.value = history[historyIdx];
        } else {
            historyIdx = history.length;
            input.value = '';
        }

        e.preventDefault();
    }
});

/* ---------------- MATRIX BACKGROUND ---------------- */

function initMatrix() {

    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01010101";
    const fontSize = 16;

    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {

        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#111";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {

            const text = chars.charAt(Math.floor(Math.random() * chars.length));

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

/* ---------------- INIT ---------------- */

window.onload = () => {
    initMatrix();
    runBootSequence();
};
