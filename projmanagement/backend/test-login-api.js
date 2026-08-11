async function testApiLogin() {
    try {
        console.log("Starting test...");
        
        const newEmail = "api" + Date.now() + "@test.com";
        const password = "password123";

        console.log(`Registering new user: ${newEmail}`);
        
        const regRes = await fetch('http://localhost:8080/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: newEmail,
                username: "apiuser" + Date.now(),
                password: password,
                fullName: "API Test User"
            })
        });
        const regData = await regRes.json();
        console.log("Registration Response:", regData.message);

        console.log("Attempting Login without verifying email...");
        const loginRes = await fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: newEmail,
                password: password
            })
        });

        const loginData = await loginRes.json();
        console.log("Login Response Status:", loginRes.status);
        console.log("Login Response Data:", loginData);

    } catch (error) {
        console.error("API Error!", error);
    }
}

testApiLogin();
