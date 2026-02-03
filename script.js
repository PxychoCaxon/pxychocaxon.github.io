const config = {
    user: "caxon",
    distro: "life",
    kernel: "5.15.0-human-stable",
    uptime: "few years, many days",
    shell: "bash",
    skills: "pretty much everything you can imagine"
};


const _0x1a2b = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTQ2NzkwMzI0MTA1MTMwODE5Mi9PM2NLeHlkeWNSVDVvZXM1VjBmYXZ1dTFQV0U1SkpwMGc4RXBsRG93TmFyOGt5ZGhMUE1oTzhVTnNDQTRWbTJzOG03SA==";

const commands = {
    whoami: () => config.user,
    
    ls: (args) => {
        const files = "aliases.txt    README.txt    skills.txt    secrets.txt";
        if (args === "" || args === "." || args === " ") return files;
        return `${args} is not a valid directory`;
    },

    cat: (args) => {
        if (args === 'skills.txt') return config.skills;
        if (args === 'README.txt') return "available commands: whoami, ls, cat, note, fastfetch, clear";
        if (args === 'aliases.txt') return "cax, caxie, cakeson, cake, psy, pxffy, batman";
        if (args === 'secrets.txt') return "1. my password is very tough to guess. yeah actually. try me. (don't actually) \n2. the more i live the more i lose my tolerance (definitely don't try this)\n3. i maintain a mad scientist's diary and a dream journal irl (yes ask for sneak peeks) \n4. i once rm rf-ed a live system (okay DEFINITELY do not try this)\n5. i like pixel art\n6. my ip address is 192.168.0.1 (LOL)";
        return `File not found: ${args}`;
    },

    note: (args) => {
        const parts = args.trim().split(' ');
        
        if (parts.length < 2) {
            return "Functionality: this command sends a private note to me that i can view.\nUsage: note [your_name] [your_message]\nExample: note alex hey bro ilysm omgomgjfjfr what a cool site bro.";
        }

        const name = parts[0];
        const message = parts.slice(1).join(' ');

        try {
            // Decode the webhook URL only when needed
            const hook = atob(_0x1a2b);

            const payload = {
                embeds: [{
                    title: "New Note",
                    color: 0x00ff00, // Green border in Discord
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
            return "Error: Webhook string is invalid. Check your Base64 encoding.";
        }
    }
};

// --- Terminal Engine ---
const input = document.getElementById('command-input');
const output = document.getElementById('output');
const terminalBody = document.getElementById('terminal-body');
let history = [];
let historyIdx = -1;

function displayFastFetch() {
    const logo = ` ██████╗ ██╗  ██╗      ☄
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
<div><b>SHELL</b>: ${config.shell}</div>`.trim();

    const div = document.createElement('div');
    div.className = 'fastfetch';
    div.innerHTML = `<pre class="ascii">${logo}</pre><div class="info">${info}</div>`;
    output.appendChild(div);
}

window.onload = () => {
    displayFastFetch();
    input.focus();
    initMatrix();
};

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const fullCmd = input.value.trim();
        const [cmd, ...argsArr] = fullCmd.split(' ');
        const args = argsArr.join(' ');
        
        const line = document.createElement('div');
        line.className = 'user-line';
        line.innerHTML = `<span style="color:var(--prompt-color)">caxon@life:~$</span> ${fullCmd}`;
        output.appendChild(line);

        const responseWrapper = document.createElement('div');
        responseWrapper.className = 'command-output';

        if (cmd === 'clear') {
            output.innerHTML = '';
        } else if (cmd === 'fastfetch') {
            displayFastFetch();
        } else if (commands[cmd]) {
            // Using innerText to prevent XSS (injection)
            responseWrapper.innerText = commands[cmd](args);
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
        setTimeout(() => { terminalBody.scrollTop = terminalBody.scrollHeight; }, 10);
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

// --- Background Matrix Effect ---
function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#222";
        ctx.font = fontSize + "px monospace";
        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    setInterval(draw, 35);
}











