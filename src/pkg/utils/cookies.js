export async function setCookies(res , accessToken){
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: toMs('hours', 1),
        });
}