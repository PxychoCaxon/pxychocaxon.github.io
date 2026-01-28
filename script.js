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
    }
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
    div.innerHTML = `
        <pre class="ascii">${logo}</pre>
        <div class="info">${info}</div>
    `;
    output.appendChild(div);
}

// Initialization
window.onload = () => {
    displayFastFetch();
    input.focus();
};

// Command Handler
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const fullCmd = input.value.trim();
        const [cmd, ...args] = fullCmd.split(' ');
        
        const line = document.createElement('div');
        line.innerHTML = `<span style="color:var(--prompt-color)">caxon@profile:~$</span> ${fullCmd}`;
        output.appendChild(line);

        if (cmd === 'clear') {
            output.innerHTML = '';
        } else if (cmd === 'fastfetch') {
            displayFastFetch();
        } else if (commands[cmd]) {
            const result = document.createElement('div');
            result.style.marginBottom = "15px";
            result.innerText = commands[cmd](args.join(' '));
            output.appendChild(result);
        } else if (cmd !== '') {
            const error = document.createElement('div');
            error.innerText = `command not found: ${cmd}`;
            output.appendChild(error);
        }

        if (fullCmd) {
            history.push(fullCmd);
            historyIdx = history.length;
        }
        
        input.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    // History (Up/Down Arrows)
    if (e.key === 'ArrowUp') {
        if (historyIdx > 0) {
            historyIdx--;
            input.value = history[historyIdx];
        }
    }
    if (e.key === 'ArrowDown') {
        if (historyIdx < history.length - 1) {
            historyIdx++;
            input.value = history[historyIdx];
        } else {
            historyIdx = history.length;
            input.value = '';
        }
    }
});