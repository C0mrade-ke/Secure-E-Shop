function checkSite() {
    const url = document.getElementById("urlInput").value.trim();
    const resultBox = document.getElementById("result");

    if (url === "") {
        resultBox.className = "result-box warning";
        resultBox.innerHTML = "⚠ Please enter a website URL.";
        return;
    }

    let score = 0;
    let messages = [];

    // HTTPS check
    if (url.startsWith("https://")) {
        score += 40;
        messages.push("✔ Website uses HTTPS (information is encrypted).");
    } else {
        messages.push("❌ Website does NOT use HTTPS.");
        messages.push("⚠ Data such as passwords and payment details can be intercepted.");
    }

    // Clean URL for checks
    const cleanUrl = url.replace("https://", "").replace("http://", "");

    // Suspicious character check
    if (cleanUrl.includes("@")) {
        messages.push("⚠ Suspicious characters detected in the website address.");
    } else {
        score += 20;
    }

    // IP address check
    const ipPattern = /\b\d{1,3}(\.\d{1,3}){3}\b/;
    if (ipPattern.test(cleanUrl)) {
        messages.push("⚠ Website uses an IP address instead of a domain name.");
    } else {
        score += 20;
    }

    // E-commerce awareness
    if (cleanUrl.includes("checkout") || cleanUrl.includes("login") || cleanUrl.includes("cart")) {
        messages.push("ℹ This page may handle sensitive customer information.");
    }

    // Final result
    if (score >= 80) {
        resultBox.className = "result-box safe";
        resultBox.innerHTML = `
            <strong>✅ Website appears SAFE</strong><br><br>
            ${messages.join("<br>")}
            <br><br><strong>Good practice:</strong> This website follows basic e-commerce security standards.
        `;
    } 
    else if (score >= 50) {
        resultBox.className = "result-box caution";
        resultBox.innerHTML = `
            <strong> Proceed with CAUTION</strong><br><br>
            ${messages.join("<br>")}
            <br><br><strong>Advice:</strong> Confirm the website’s authenticity before entering personal or payment details.
        `;
    } 
    else {
        resultBox.className = "result-box warning";
        resultBox.innerHTML = `
            <strong>❌ Website appears UNSAFE</strong><br><br>
            ${messages.join("<br>")}
            <br><br><strong>Recommendation:</strong> Avoid entering passwords, card details, or personal information.
        `;
    }
}
