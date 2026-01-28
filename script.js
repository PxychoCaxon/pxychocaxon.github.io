const config = {
    user: "caxon",
    distro: "life",
    kernel: "5.15.0-human-stable",
    uptime: "few years, many days",
    shell: "bash",
    skills: "pretty much everything you can imagine"
};

const commands = {
    man: () => "Available commands: whoami, ls, cat, fastfetch, clear, contact, social",
    whoami: () => config.user,
    ls: () => "aliases.txt README.txt skills.txt",
    social: () => "discord: pxychocaxon | github: @PxychoCaxon",
    cat: (args) => {
        if (args === 'skills.txt') return `${config.skills}`;
        if (args == 'README.txt') return "available commands: whoami, ls, cat, fastfetch, clear, social";
        if (args == 'aliases.txt') return "cax, cakeson, cake, pxy, pxffy, batman";
        return `File not found: ${args}`;
    },
    contact: () => "Redirecting to email... [mailto:hello@example.com]"
};

const input = document.getElementById('command-input');
const output = document.getElementById('output');
const terminalBody = document.getElementById('terminal-body');
let history = [];
let historyIdx = -1;

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
        const [cmd, ...args] = fullCmd.split(' ');
        
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
            responseWrapper.innerText = commands[cmd](args.join(' '));
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


