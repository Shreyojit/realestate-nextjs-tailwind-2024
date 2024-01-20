import jwt from 'jsonwebtoken'

// signing jwt
export function signJwtToken(payload, options = {}) {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, options);
    return token;
}


// verifying jwt
export function verifyJwtToken(token) {
    try {
        const secret = process.env.JWT_SECRET;
        const payload = jwt.verify(token, secret);
        return payload;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function authorize(req) {
    const accessToken = req.headers.get('authorization')

    const token = accessToken.split(" ")[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(
            JSON.stringify({ message: "unauthorized (wrong or expired token)" }),
            { status: 403 }
        )
    }

    return decodedToken
}