import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUserDocument } from "@/model/User";

interface DecodedToken extends JwtPayload {
  sub: string;
}

interface AuthResult {
  user: IUserDocument; // User Document
  newAccessToken?: string;
}

export async function getUserFromToken(accessToken?: string, refreshToken?: string): Promise<AuthResult | null> {
    if (!accessToken) return null;

    try {
        const secret = process.env.JWT_ACCESS_SECRET!;
        const decoded = jwt.verify(accessToken, secret) as DecodedToken;
        // console.log("decoded inside auth:", decoded);

        const user = await User.findById(decoded.sub);
        if (!user) return null;

        return { user }; // 항상 객체 반환
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError && refreshToken) {
            try {
                const refreshSecret = process.env.JWT_REFRESH_SECRET!;
                const decodedRefresh = jwt.verify(refreshToken, refreshSecret) as DecodedToken;

                const user = await User.findById(decodedRefresh.sub).exec();
                if (!user || user.refreshToken?.token !== refreshToken) return null;

                // 새 AccessToken 발급
                const newAccessToken = jwt.sign(
                    { sub: user._id.toString() },
                    process.env.JWT_ACCESS_SECRET!,
                    { expiresIn: "1h" }
                );

                return { user, newAccessToken };
            } catch (refreshErr) {
                if (refreshErr instanceof Error) {
                    console.error("Refresh token 검증 실패:", refreshErr.message);
                } else {
                    console.error("Refresh token 검증 실패:", refreshErr);
                }
                return null;
            }
        }

        if (err instanceof Error) {
            console.error("토큰 검증 실패:", err.message);
        } else {
            console.error("토큰 검증 실패:", err);
        }
        return null;
    }
}
