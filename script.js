const analysisMessages = [
    "🔍 Cloning repository...",
    "📂 Analyzing directory structure...",
    "🔎 Looking for main entry points...",
    "📝 Analyzing code quality...",
    "🤔 Evaluating code style...",
    "🔍 Searching for potential issues...",
    "📈 Generating insights...",
    "🎯 Finalizing analysis..."
];

const roasts = [
    "😔 Beta, try UPSC. This is not for you.",
    "💀 Even ChatGPT refused to understand this.",
    "📉 You write one more loop like this, Sensex will crash.",
    "😵‍💫 This code has more bugs than a Delhi PG.",
    "📿 Pray to Saraswati and rewrite this entire file.",
    "🤡 You put async but forgot the await. Just like your life: full of promises, no delivery.",
    "👹 If this code had a caste, it would be *‘undefined’.*",
    "📞 Calling your parents to inform them you're doing BTech in disgrace.",
    "🚮 Throw this code and yourself in the dustbin. Both need restart.",
    "🤲 May Lord Vishwakarma bless you with better code and logic.",
    "🧬 Is this code or your unfiltered trauma dump?",
    "📿 Ask your nani to do a nazar utaarna before deploying this.",
    "👴 Even my 80-year-old uncle writes better if-else statements in Excel.",
    "🚷 If your code was a dish, it would be overcooked Maggi.",
    "🚿 Go shower. Then uninstall Node.js.",
    "🪔 Light a diya. Maybe the divine can guide this code.",
    "🧃 This code is like Rasna without sugar. Exists but sad.",
    "📚 This code made your father cancel your JEE coaching subscription.",
    "😑 Even your Sharma uncle stopped bragging about you after seeing this.",
    "📞 After analyzing your code, your relatives just updated your bio from 'engineer' to 'trying his best'.",
    "🫥 Even Swiggy would take longer to deliver this many bugs.",
    "🧓 This is the kind of code that makes your nani say, 'Shaadi kar lo, sab theek ho jaayega.'",
    "🤷‍♂️ You have 99 problems and this file is at least 63 of them.",
    "💼 This isn’t startup material. It’s shutdown material.",
    "😞 Beta, become a CA. At least Excel will respect you.",
    "📚 Try MBA. You can BS there and still get placement.",
    "😬 This is why your parents wanted you to do government job.",
    "💔 Even Indian Idol gave fewer red flags.",
    "🫠 Your parents said ‘do what you love’ once. They're still regretting it.",
    "🚧 No future in this. Try photography. Or silence.",
    "🛕 Saraswati Mata closed her eyes while you were typing.",
];

let messageInterval;
let messageIndex = 0;

function showNextMessage() {
    const output = document.getElementById("roastOutput");
    if (messageIndex < analysisMessages.length) {
        output.innerHTML = `<div class="loading">${analysisMessages[messageIndex]} <span class="loading-dots"></span></div>`;
        messageIndex++;
        const randomDelay = 300 + Math.random() * 400;
        messageInterval = setTimeout(showNextMessage, randomDelay);
    }
}

function isValidGitHubRepoUrl(url) {
    // Check for both HTTP/HTTPS and SSH formats
    const githubRepoRegex = /^(https?:\/\/)?(www\.)?github\.com\/[^\s/]+\/[^\s/]+(\/)?$/i;
    const githubSshRegex = /^git@github\.com:[^\s/]+\/[^\s/]+\.git$/i;
    
    // Also accept just 'username/repo' format
    const simpleRepoRegex = /^[^\s/]+\/[^\s/]+$/;
    
    return githubRepoRegex.test(url) || githubSshRegex.test(url) || simpleRepoRegex.test(url);
}

function showError(message) {
    const output = document.getElementById("roastOutput");
    output.style.color = '#ff6b6b';
    output.innerHTML = message;
    output.style.opacity = '1';
    output.style.maxHeight = '1000px';
    
    // Re-enable the button
    const button = document.querySelector('button');
    button.disabled = false;
    button.innerHTML = 'Analyze Repo 🔎';
    
    // Clear any pending message updates
    if (messageInterval) {
        clearTimeout(messageInterval);
    }
}

function roastCode() {
    const output = document.getElementById("roastOutput");
    const button = document.querySelector('button');
    const codeInput = document.getElementById('code');
    const repoUrl = codeInput.value.trim();
    
    // Validate the repository URL
    if (!repoUrl) {
        showError('Please enter a GitHub repository URL');
        return;
    }
    
    if (!isValidGitHubRepoUrl(repoUrl)) {
        showError('Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo or username/repo)');
        return;
    }

    const originalButtonText = button.innerHTML;
    messageIndex = 0;

    if (messageInterval) {
        clearTimeout(messageInterval);
    }

    output.innerHTML = "";
    output.style.color = '#f8f8f2'; // Reset text color
    button.disabled = true;
    button.innerHTML = 'Analyzing...';
    output.style.opacity = '1';
    output.style.maxHeight = '1000px';
    showNextMessage();

    // Simulate API call to check if repo exists
    let repoPath = repoUrl;
    
    // Convert 'username/repo' format to API URL
    if (!repoUrl.startsWith('http') && !repoUrl.startsWith('git@')) {
        repoPath = `https://api.github.com/repos/${repoUrl}`;
    } else if (repoUrl.startsWith('git@')) {
        // Convert SSH URL to API URL format
        const match = repoUrl.match(/git@github\.com:([^\s/]+)\/([^\s/]+)(?:\.git)?$/);
        if (match) {
            repoPath = `https://api.github.com/repos/${match[1]}/${match[2]}`;
        }
    } else {
        // Convert HTTPS URL to API URL
        const match = repoUrl.match(/github\.com\/([^\s/]+)\/([^\s/]+)(?:\.git)?/);
        if (match) {
            repoPath = `https://api.github.com/repos/${match[1]}/${match[2]}`;
        }
    }
    
    // Check if repo exists using GitHub API
    fetch(repoPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Repository not found or access denied');
            }
            return response.json();
        })
        .then(data => {
            // If we get here, the repo exists
            if (messageInterval) {
                clearTimeout(messageInterval);
            }
            
            const roast = roasts[Math.floor(Math.random() * roasts.length)];
            let i = 0;
            output.innerHTML = '';

        const type = setInterval(() => {
                if (i < roast.length) {
                    output.innerHTML = roast.substring(0, i + 1);
                    i++;
                } else {
                    clearInterval(type);
                    button.disabled = false;
                    button.innerHTML = 'Analyze Again';
                }
            }, 30);
        })
        .catch(error => {
            console.error('Error checking repository:', error);
            showError('Error: Could not find the repository. Please check the URL and try again.');
        });
}