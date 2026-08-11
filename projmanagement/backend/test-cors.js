async function testCORS() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'OPTIONS',
            headers: {
                'Origin': 'http://localhost:5173',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        });
        console.log("CORS Status:", response.status);
        console.log("CORS Headers:", Object.fromEntries(response.headers.entries()));
    } catch (e) {
        console.error("CORS Error:", e.message);
    }
}
testCORS();
